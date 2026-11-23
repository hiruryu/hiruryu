'use strict';
    /* ================= 3D 起動本体 =================
       レンダラー生成に失敗したとき、ページ全体を再読み込みせずに最初から
       やり直せるよう、3D の初期化一式（セットアップ／夜空／UI）をひとつの
       関数にまとめている。生成に失敗した場合は例外 '__glretry__' が投げ
       られ、直後の起動ドライバが時間をおいてこの関数を呼び直す。生成より
       前では画面や DOM を変更しないため、呼び直しは安全。 */
    window.__boot3D = function(){
    if (window.__halted) return;
    /* ================= Three.js セットアップ ================= */
    var wrap = document.getElementById('scene-wrap');
    var renderer = null;
    // three.js r186 の WebGLRenderer は WebGL2 専用で、WebGL2 が使えない
    // 端末・ブラウザ（古い Safari、一部のアプリ内ブラウザ、GPU のブロック等）では
    // 生成自体が例外になる。まず通常設定、次に軽い設定でも試し、それでも
    // 作れなければ致命画面で止めず 2D フォールバック表示に切り替える。
    var rendererAttempts = [
      { antialias:true },
      { antialias:false },
      { antialias:false, powerPreference:'low-power', failIfMajorPerformanceCaveat:false, stencil:false, alpha:false }
    ];
    for (var ra = 0; ra < rendererAttempts.length && !renderer; ra++){
      var cand = null;
      try {
        cand = new THREE.WebGLRenderer(rendererAttempts[ra]);
        var gl = cand.getContext();
        if (!gl || (gl.isContextLost && gl.isContextLost())) throw new Error('webgl-context-lost');
        renderer = cand;
      } catch (eR) {
        renderer = null;
        // 失敗した候補は必ず破棄する。作りっぱなしにすると WebGL コンテキストが
        // リークし、ブラウザの同時コンテキスト数上限（端末により8〜16個）を
        // 圧迫して、次の試行や再読み込みまで失敗し続ける原因になる。
        if (cand){
          try { cand.forceContextLoss(); } catch (eF) {}
          try { cand.dispose(); } catch (eD) {}
          try { if (cand.domElement && cand.domElement.parentNode) cand.domElement.parentNode.removeChild(cand.domElement); } catch (eX) {}
        }
      }
    }
    if (!renderer) {
      // ここでは 2D に落とさない。分割ビューの作り直し直後など、GPU の
      // 準備が整っていないだけの一時的な失敗があり得るため、起動ドライバ
      // （このスクリプトの直後）側で、時間をおいて生成からやり直す。
      throw new Error('__glretry__');
    }
    // WebGLコンテキストの喪失（モバイルのメモリ圧迫、分割ビューでの
    // WebView作り直し、ページの凍結・復元などで起きる）への対応。
    // 以前は喪失が3秒続くと「再読み込みしてください」の致命画面を出して
    // いたが、それが行き止まりになっていた。一度落ちたあとに開き直すと、
    // 前回のコンテキストがまだ解放されておらず新しいコンテキストも
    // すぐに喪失することがあり、そのたびに同じ致命画面が出て、再読み込み
    // しても古いコンテキストが残ったまま直らなかった。
    // そのため致命画面は廃止し、次の順で自動回復する。
    //   1. まずブラウザ自身の復元（webglcontextrestored）を待つ
    //   2. 2.5秒待っても戻らなければ forceContextRestore を1回試す
    //   3. 合計7秒待っても戻らなければ、その場で2D表示に切り替える
    // 2D表示は WebGL を使わないため、この経路に入れば必ず操作できる。
    var contextLost = false;
    var glTimers = [];
    function glLater(fn, ms){ glTimers.push(setTimeout(fn, ms)); }
    function glClearTimers(){ glTimers.forEach(function(t){ clearTimeout(t); }); glTimers = []; }
    function showGlWait(text){
      var w = document.getElementById('gl-wait');
      if (!w) return;
      var p = w.querySelector('p');
      if (p && text) p.textContent = text;
      w.classList.add('is-shown');
    }
    function hideGlWait(){
      var w = document.getElementById('gl-wait');
      if (w) w.classList.remove('is-shown');
    }
    function giveUpTo2D(){
      if (window.__halted) return;
      glClearTimers();
      hideGlWait();
      // 死んだコンテキストは明示的に解放する。解放しないまま再読み込みや
      // 再作成を繰り返すと、ブラウザの同時コンテキスト数上限を圧迫して
      // 次に開いたときまで失敗し続ける。
      try { renderer.forceContextLoss(); } catch (eGL) {}
      try { renderer.dispose(); } catch (eGD) {}
      try { if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); } catch (eGX) {}
      var lb = document.getElementById('labels');
      if (lb) lb.innerHTML = '';
      // 2Dへ切り替えた理由が「端末がWebGL不可」と誤解されないよう文面を差し替える
      var nspan = document.querySelector('#fallback-notice span');
      if (nspan) nspan.textContent = '3D表示が復帰しなかったため、2D表示に切り替えました。星系の表示と操作はそのまま使えます。';
      window.__activateFallback();
    }
    renderer.domElement.addEventListener('webglcontextlost', function(e){
      e.preventDefault();
      if (contextLost) return;
      contextLost = true;
      showGlWait('3D表示が一時的に止まったため、復帰を試みています…');
      glLater(function(){
        if (contextLost){ try { renderer.forceContextRestore(); } catch (eFR) {} }
      }, 2500);
      glLater(function(){
        if (contextLost) giveUpTo2D();
      }, 7000);
    });
    renderer.domElement.addEventListener('webglcontextrestored', function(){
      contextLost = false;
      glClearTimers();
      hideGlWait();
      errBox.style.display = 'none';
      fatalBox.classList.remove('is-shown');
    });
    // ページが破棄されるときはコンテキストを先に解放し、次に開いたときに
    // 古いコンテキストが残って新規作成の邪魔をしないようにする。
    // （bfcache に残る場合はページが生き続けるので何もしない）
    window.addEventListener('pagehide', function(e){
      if (e.persisted) return;
      try { renderer.forceContextLoss(); } catch (ePH) {}
    });
    // 凍結・bfcache から復帰した時点で既に喪失していたら、復元を即試す
    window.addEventListener('pageshow', function(e){
      if (e.persisted && contextLost){ try { renderer.forceContextRestore(); } catch (ePS) {} }
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    wrap.appendChild(renderer.domElement);

    var labelRenderer = new THREE.CSS2DRenderer({ element: document.getElementById('labels') });
    labelRenderer.domElement.style.pointerEvents = 'none';

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04060d);
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 3000);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 4;
    controls.maxDistance = 700;

    scene.add(new THREE.AmbientLight(0xbdd0ff, 0.5));
    var fill = new THREE.DirectionalLight(0x8fb7ff, 0.35);
    fill.position.set(-60, 80, -40);
    scene.add(fill);

    /* ---------- テクスチャ生成 ---------- */
    function canvasTex(w, h, draw){
      var c = document.createElement('canvas'); c.width = w; c.height = h;
      draw(c.getContext('2d'), w, h);
      var t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }
    var dotTex = canvasTex(64, 64, function(g){
      var gr = g.createRadialGradient(32,32,0,32,32,30);
      gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(0.4,'rgba(255,255,255,.85)');
      gr.addColorStop(1,'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(0,0,64,64);
    });
    var glowTex = canvasTex(256, 256, function(g){
      var gr = g.createRadialGradient(128,128,0,128,128,128);
      gr.addColorStop(0,'rgba(255,225,180,.95)'); gr.addColorStop(0.25,'rgba(255,179,107,.55)');
      gr.addColorStop(0.6,'rgba(255,143,61,.16)'); gr.addColorStop(1,'rgba(255,143,61,0)');
      g.fillStyle = gr; g.fillRect(0,0,256,256);
    });
    var ringTex = canvasTex(256, 256, function(g){
      g.strokeStyle = 'rgba(255,255,255,1)'; g.lineWidth = 7;
      g.beginPath(); g.arc(128,128,112,0,Math.PI*2); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 16;
      g.beginPath(); g.arc(128,128,112,0,Math.PI*2); g.stroke();
    });
    function icyTex(){
      return canvasTex(512, 256, function(g, w, h){
        g.fillStyle = '#8fb0d8'; g.fillRect(0,0,w,h);
        var cols = ['#a9c4e4','#7ea3cf','#bcd2ec','#6f97c4'];
        for (var i=0;i<260;i++){
          g.fillStyle = cols[i%cols.length]; g.globalAlpha = 0.25 + Math.random()*0.3;
          g.beginPath(); g.ellipse(Math.random()*w, Math.random()*h, 8+Math.random()*36, 5+Math.random()*18, Math.random()*3, 0, Math.PI*2); g.fill();
        }
        g.globalAlpha = 0.92; g.fillStyle = '#eef4fb';
        g.fillRect(0,0,w,26); g.fillRect(0,h-30,w,30);
        for (var j=0;j<130;j++){
          g.globalAlpha = 0.35 + Math.random()*0.45; g.fillStyle = '#ffffff';
          g.beginPath(); g.ellipse(Math.random()*w, Math.random()*h, 6+Math.random()*26, 4+Math.random()*12, 0, 0, Math.PI*2); g.fill();
        }
        g.globalAlpha = 1;
      });
    }
    function bandTex(base, bands){
      return canvasTex(512, 256, function(g, w, h){
        g.fillStyle = base; g.fillRect(0,0,w,h);
        var y = 0;
        for (var i=0; y<h; i++){
          var bh = 10 + Math.random()*26;
          g.fillStyle = bands[i % bands.length]; g.globalAlpha = 0.35 + Math.random()*0.3;
          g.fillRect(0, y, w, bh); y += bh;
        }
        g.globalAlpha = 0.16; g.fillStyle = '#ffffff';
        for (var j=0;j<40;j++){ g.fillRect(Math.random()*w, Math.random()*h, 30+Math.random()*70, 3); }
        g.globalAlpha = 1;
      });
    }
    function swirlTex(){
      return canvasTex(512, 256, function(g, w, h){
        g.fillStyle = '#dfb96f'; g.fillRect(0,0,w,h);
        for (var i=0;i<90;i++){
          g.strokeStyle = i%2 ? '#f0d69a' : '#c9a254'; g.globalAlpha = 0.28;
          g.lineWidth = 4 + Math.random()*9; g.beginPath();
          var y0 = Math.random()*h;
          g.moveTo(-10, y0);
          g.bezierCurveTo(w*0.3, y0+14-Math.random()*28, w*0.7, y0+14-Math.random()*28, w+10, y0);
          g.stroke();
        }
        g.globalAlpha = 1;
      });
    }

    /* ---------- 背景の星空 ---------- */
    var ambientStars = (function starfield(){
      var N = 1600, pos = new Float32Array(N*3), col = new Float32Array(N*3);
      var tint = [[1,1,1],[0.82,0.89,1],[1,0.92,0.8],[0.75,0.95,0.9]];
      for (var i=0;i<N;i++){
        var v = new THREE.Vector3().randomDirection().multiplyScalar(900 + Math.random()*500);
        pos.set([v.x, v.y, v.z], i*3);
        var t = tint[Math.floor(Math.random()*tint.length)], b = 0.35 + Math.random()*0.65;
        col.set([t[0]*b, t[1]*b, t[2]*b], i*3);
      }
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      var mat = new THREE.PointsMaterial({ size:2.1, sizeAttenuation:false, map:dotTex, vertexColors:true,
        transparent:true, opacity:0.9, depthWrite:false });
      var pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return pts;
    })();

    /* ---------- 共通ヘルパー ---------- */
    function makeLabel(html, cls){
      var div = document.createElement('div');
      div.className = 'lbl' + (cls ? ' ' + cls : '');
      div.innerHTML = html;
      return new THREE.CSS2DObject(div);
    }
    function circleLine(radius, color, opacity, dashed){
      var pts = [];
      for (var i=0;i<=180;i++){
        var a = i/180 * Math.PI*2;
        pts.push(new THREE.Vector3(Math.cos(a)*radius, 0, Math.sin(a)*radius));
      }
      var geo = new THREE.BufferGeometry().setFromPoints(pts);
      var mat = dashed
        ? new THREE.LineDashedMaterial({ color:color, transparent:true, opacity:opacity, dashSize:1.6, gapSize:1.1 })
        : new THREE.LineBasicMaterial({ color:color, transparent:true, opacity:opacity });
      var line = new THREE.Line(geo, mat);
      if (dashed) line.computeLineDistances();
      return line;
    }
    function fmt(n, digits){ return n.toFixed(digits === undefined ? 3 : digits); }

    /* ================= 惑星系ビュー ================= */
    var AU_SCALE = 13;
    function auDist(au){ return AU_SCALE * Math.sqrt(au); }

    var systemGroup = new THREE.Group();
    scene.add(systemGroup);
    var pickables = [];       // {mesh, view, id}
    var bodies = {};          // id -> runtime record
    var orbitLines = [];

    // 恒星 Nóshih
    var starLight = new THREE.PointLight(0xffd9ae, 2.4, 0, 0);
    systemGroup.add(starLight);
    var starMesh = new THREE.Mesh(
      new THREE.SphereGeometry(3.0, 48, 32),
      new THREE.MeshStandardMaterial({ color:0xffc98c, emissive:0xff9a3d, emissiveIntensity:1.55, roughness:1 })
    );
    systemGroup.add(starMesh);
    var starGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, color:0xffc27d, transparent:true, opacity:0.95, depthWrite:false, blending:THREE.AdditiveBlending }));
    starGlow.scale.setScalar(17);
    systemGroup.add(starGlow);
    var starLabel = makeLabel('Nóshih<small>恒星 ・ G9.5V</small>', 'star');
    starLabel.position.set(0, 4.1, 0);
    starMesh.add(starLabel);
    bodies['noshih'] = { view:'system', data:STAR, obj:starMesh, radius:3.0, fixed:true };
    pickables.push({ mesh:starMesh, view:'system', id:'noshih' });

    // ハビタブルゾーン
    var hzGroup = new THREE.Group();
    var hzMesh = new THREE.Mesh(
      new THREE.RingGeometry(auDist(HZ_IN), auDist(HZ_OUT), 128),
      new THREE.MeshBasicMaterial({ color:0x57d9a3, transparent:true, opacity:0.10, side:THREE.DoubleSide, depthWrite:false })
    );
    hzMesh.rotation.x = -Math.PI/2;
    hzGroup.add(hzMesh);
    hzGroup.add(circleLine(auDist(HZ_IN), 0x57d9a3, 0.4));
    hzGroup.add(circleLine(auDist(HZ_OUT), 0x57d9a3, 0.4));
    var hzLabel = makeLabel('ハビタブルゾーン', 'ref');
    hzLabel.position.set(-auDist(HZ_OUT)*0.72, 0.3, -auDist(HZ_OUT)*0.72);
    hzGroup.add(hzLabel);
    systemGroup.add(hzGroup);

    // フロストライン
    var frostLine = circleLine(auDist(FROST_AU), 0x9fd8ff, 0.55, true);
    systemGroup.add(frostLine); orbitLines.push(frostLine);
    var frostLabel = makeLabel('フロストライン 3.504 AU', 'ref');
    frostLabel.position.set(auDist(FROST_AU)*0.72, 0.3, auDist(FROST_AU)*0.72);
    systemGroup.add(frostLabel);

    // 大型衛星（小さい衛星は省略し、大型のみを公転表示する）
    // period は3D表示用の公転周期（日）。衛星の正式な周期・名称は未定のため、設定値としては扱わない。
    var largeMoonPivots = [];
    var LARGE_MOONS = {
      p6: [
        { roman:'I',   r:0.34, dist:3.5, period:38,  color:0xd9c9a8, inclX: 0.06, inclZ: 0.04, phase:0.4 },
        { roman:'II',  r:0.29, dist:4.6, period:58,  color:0xb9c7d6, inclX:-0.10, inclZ: 0.07, phase:2.2 },
        { roman:'III', r:0.24, dist:5.8, period:88,  color:0xc4b096, inclX: 0.14, inclZ:-0.05, phase:4.1 },
        { roman:'IV',  r:0.20, dist:7.1, period:132, color:0x9fb4c8, inclX:-0.05, inclZ:-0.12, phase:5.5 }
      ],
      p7: [
        { roman:'I',   r:0.30, dist:4.4, period:42,  color:0xe3d7b8, inclX: 0.22, inclZ: 0.10, phase:1.1 },
        { roman:'II',  r:0.26, dist:5.4, period:64,  color:0xc9d2dc, inclX: 0.18, inclZ:-0.08, phase:3.0 },
        { roman:'III', r:0.22, dist:6.6, period:96,  color:0xb8a888, inclX: 0.30, inclZ: 0.05, phase:0.2 },
        { roman:'IV',  r:0.19, dist:7.9, period:142, color:0xaec6d4, inclX: 0.12, inclZ:-0.16, phase:4.8 },
        { roman:'V',   r:0.16, dist:9.3, period:198, color:0xd0c4ae, inclX: 0.26, inclZ: 0.14, phase:2.7 }
      ],
      p8: [
        { roman:'I',   r:0.22, dist:2.1, period:46,  color:0xcfe0e2, inclX: 0.45, inclZ: 0.30, phase:0.9 },
        { roman:'II',  r:0.20, dist:2.8, period:72,  color:0xb9c9ce, inclX:-0.35, inclZ: 0.55, phase:2.6 },
        { roman:'III', r:0.17, dist:3.6, period:108, color:0xd8d2c2, inclX: 0.70, inclZ:-0.25, phase:4.4 },
        { roman:'IV',  r:0.15, dist:4.5, period:156, color:0xa8bcc4, inclX:-0.55, inclZ:-0.45, phase:5.9 },
        { roman:'V',   r:0.13, dist:5.5, period:218, color:0xcac0ae, inclX: 0.25, inclZ: 0.80, phase:1.8 }
      ]
    };
    function createLargeMoons(p, mesh){
      var specs = LARGE_MOONS[p.id];
      if (!specs) return;
      specs.forEach(function(s, idx){
        var holder = new THREE.Group();
        holder.rotation.x = s.inclX;
        holder.rotation.z = s.inclZ;
        mesh.add(holder);
        var oLine = circleLine(s.dist, 0xcfe0ff, 0.30);
        holder.add(oLine); orbitLines.push(oLine);
        var pivot = new THREE.Group();
        pivot.rotation.y = s.phase;
        holder.add(pivot);
        var mm = new THREE.Mesh(
          new THREE.SphereGeometry(s.r, 24, 18),
          new THREE.MeshStandardMaterial({ color:s.color, roughness:0.92, metalness:0.02 })
        );
        mm.position.set(s.dist, 0, 0);
        pivot.add(mm);
        var lb = makeLabel('衛星 ' + s.roman, '');
        lb.position.set(0, s.r + 0.34, 0);
        mm.add(lb);
        var mid = p.id + '-m' + (idx + 1);
        var mdata = {
          id: mid, name: p.name + ' 衛星' + s.roman, kind: '衛星（大型）',
          sub: '名称未定 ― ' + p.name + 'の大型衛星',
          rows: [
            ['分類', '大型衛星（名称未定）'],
            ['母星', p.name],
            ['公転周期', '約 ' + s.period + ' 日（3D表示用）'],
            ['軌道', '母星の半径の約 ' + (s.dist / p.size).toFixed(1) + ' 倍（表示上の距離）']
          ],
          note: p.name + 'の衛星 ' + (p.id === 'p6' ? '68' : p.id === 'p7' ? '80' : '24') + ' 個のうち、大型のものだけを3Dで公転表示している。名称・質量・正確な公転周期はまだ決まっていないため、周期と軌道は表示用に設定した値。'
        };
        bodies[mid] = { view:'system', data:mdata, obj:mm, radius:s.r };
        pickables.push({ mesh:mm, view:'system', id:mid });
        largeMoonPivots.push({ pivot:pivot, period:s.period });
      });
    }

    // 惑星と小惑星帯
    var beltPoints = null;
    PLANETS.forEach(function(p){
      var dist = auDist(p.au);
      var ring = circleLine(dist, p.plufka ? 0x7fe3d0 : 0x8fb7ff, p.plufka ? 0.55 : 0.30);
      systemGroup.add(ring); orbitLines.push(ring);

      var data = {
        id:p.id, name:p.name, kind:p.kind, sub:p.sub,
        rows: p.rowsExtra.concat([
          ['軌道半径', fmt(p.au, p.au < 1 ? 3 : 2) + ' AU'],
          ['公転周期', p.period || periodText(p.au)]
        ]),
        note:p.note
      };

      if (p.belt){
        var N = 1700, pos = new Float32Array(N*3);
        for (var i=0;i<N;i++){
          var a = Math.random()*Math.PI*2, r = dist + (Math.random()-0.5)*3.4;
          pos[i*3] = Math.cos(a)*r; pos[i*3+1] = (Math.random()-0.5)*0.8; pos[i*3+2] = Math.sin(a)*r;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        beltPoints = new THREE.Points(geo, new THREE.PointsMaterial({ color:0xc9b694, size:0.16, map:dotTex, transparent:true, opacity:0.85, depthWrite:false }));
        systemGroup.add(beltPoints);
        var beltHit = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 8),
          new THREE.MeshBasicMaterial({ visible:false }));
        beltHit.position.set(dist, 0, 0);
        systemGroup.add(beltHit);
        var beltLabel = makeLabel('小惑星帯<small>2.74 AU</small>');
        beltLabel.position.set(0, 1.2, 0); beltHit.add(beltLabel);
        bodies[p.id] = { view:'system', data:data, obj:beltHit, radius:1.5, belt:true, dist:dist };
        pickables.push({ mesh:beltHit, view:'system', id:p.id });
        return;
      }

      var mat;
      if (p.plufka)      mat = new THREE.MeshStandardMaterial({ map:icyTex(), roughness:0.85, metalness:0 });
      else if (p.bands)  mat = new THREE.MeshStandardMaterial({ map:bandTex('#d9b48a', ['#b98d5f','#ecd3a4','#c49a68','#f2e2bc']), roughness:0.7, metalness:0 });
      else if (p.venus)  mat = new THREE.MeshStandardMaterial({ map:swirlTex(), roughness:0.9, metalness:0 });
      else               mat = new THREE.MeshStandardMaterial({ color:p.color, roughness:0.9, metalness:0.02 });

      var pivot = new THREE.Group();
      pivot.rotation.y = p.angle;
      systemGroup.add(pivot);
      var mesh = new THREE.Mesh(new THREE.SphereGeometry(p.size, 40, 28), mat);
      mesh.position.set(dist, 0, 0);
      pivot.add(mesh);

      if (p.ring){
        var rg = new THREE.Mesh(
          new THREE.RingGeometry(p.size*1.45, p.size*2.15, 96),
          new THREE.MeshBasicMaterial({ color:0xe6dcc2, transparent:true, opacity:0.5, side:THREE.DoubleSide, depthWrite:false })
        );
        rg.rotation.x = -Math.PI/2 + 0.42;
        mesh.add(rg);
      }
      var label = makeLabel(p.name + '<small>' + fmt(p.au, p.au < 1 ? 3 : 2) + ' AU</small>', p.plufka ? 'plufka' : '');
      label.position.set(0, p.size + 0.75, 0);
      mesh.add(label);

      bodies[p.id] = { view:'system', data:data, obj:mesh, radius:p.size, pivot:pivot, au:p.au, angle:p.angle, dist:dist };
      pickables.push({ mesh:mesh, view:'system', id:p.id });

      if (p.plufka){
        // 月 Mísih
        var moonPivot = new THREE.Group();
        mesh.add(moonPivot);
        var moon = new THREE.Mesh(new THREE.SphereGeometry(0.23, 24, 18),
          new THREE.MeshStandardMaterial({ color:0xd8dce2, roughness:0.95 }));
        moon.position.set(2.1, 0.35, 0);
        moonPivot.add(moon);
        var moonLabel = makeLabel('Mísih', '');
        moonLabel.position.set(0, 0.55, 0);
        moon.add(moonLabel);
        bodies['misih'] = { view:'system', data:MOON, obj:moon, radius:0.23, moonPivot:moonPivot };
        pickables.push({ mesh:moon, view:'system', id:'misih' });
        // プルフカの強調リング
        var halo = new THREE.Sprite(new THREE.SpriteMaterial({ map:ringTex, color:0x7fe3d0, transparent:true, opacity:0.85, depthWrite:false }));
        halo.scale.setScalar(p.size*3.4);
        mesh.add(halo);
        bodies[p.id].halo = halo;
      }

      createLargeMoons(p, mesh);
    });

    /* ================= 近傍恒星ビュー ================= */
    var LY = 4.2;
    var nearbyGroup = new THREE.Group();
    nearbyGroup.visible = false;
    scene.add(nearbyGroup);
    var nearbyLines = [];

    var nStar = new THREE.Mesh(new THREE.SphereGeometry(1.35, 40, 28),
      new THREE.MeshStandardMaterial({ color:0xffc98c, emissive:0xff9a3d, emissiveIntensity:1.5, roughness:1 }));
    nearbyGroup.add(nStar);
    var nGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, color:0xffc27d, transparent:true, opacity:0.95, depthWrite:false, blending:THREE.AdditiveBlending }));
    nGlow.scale.setScalar(8.5);
    nearbyGroup.add(nGlow);
    var nLight = new THREE.PointLight(0xffd9ae, 1.6, 0, 0);
    nearbyGroup.add(nLight);
    var nLabel = makeLabel('Nóshih<small>プルフカ系 ・ 原点</small>', 'star');
    nLabel.position.set(0, 2.1, 0);
    nStar.add(nLabel);
    bodies['noshih-near'] = { view:'nearby', data:STAR, obj:nStar, radius:1.35, fixed:true };
    pickables.push({ mesh:nStar, view:'nearby', id:'noshih-near' });

    [5, 10].forEach(function(r){
      var c = circleLine(r*LY, 0x8fb7ff, r === 10 ? 0.30 : 0.18);
      nearbyGroup.add(c); orbitLines.push(c); nearbyLines.push(c);
      var lb = makeLabel(r + ' ly', 'ref');
      lb.position.set(r*LY*0.72, 0.2, -r*LY*0.72);
      nearbyGroup.add(lb);
    });

    var starTints = [0xfff3e0, 0xdfe9ff, 0xffe3c2, 0xffffff, 0xffd9b0, 0xe8f1ff, 0xfff6ea, 0xd9e6ff, 0xffe9d2, 0xffffff];
    NEARBY.forEach(function(s, i){
      var pos = new THREE.Vector3(s.x*LY, s.z*LY, s.y*LY);
      var lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), pos]);
      var line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color:0x8fb7ff, transparent:true, opacity: s.nearest ? 0.5 : 0.14 }));
      nearbyGroup.add(line); nearbyLines.push(line);

      var m = new THREE.Mesh(new THREE.SphereGeometry(0.55, 28, 20),
        new THREE.MeshStandardMaterial({ color:starTints[i % starTints.length], emissive:starTints[i % starTints.length], emissiveIntensity:0.55, roughness:0.8 }));
      m.position.copy(pos);
      nearbyGroup.add(m);
      var gl = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, color:starTints[i % starTints.length], transparent:true, opacity:0.5, depthWrite:false, blending:THREE.AdditiveBlending }));
      gl.scale.setScalar(3.4);
      m.add(gl);
      var lb = makeLabel('星系' + s.n + '<small>' + s.d.toFixed(2) + ' ly</small>', s.nearest ? 'nearest' : '');
      lb.position.set(0, 1.0, 0);
      m.add(lb);

      var data = {
        id:'sys' + s.n, name:'星系 ' + s.n, kind:'近傍恒星系', sub: s.nearest ? 'Nóshih に最も近い星系' : '名称・スペクトル型は未決定',
        rows:[['Nóshih からの距離', s.d.toFixed(2) + ' 光年'],
              ['座標 (x, y, z)', s.x.toFixed(2) + ', ' + s.y.toFixed(2) + ', ' + s.z.toFixed(2) + ' ly']],
        note: s.nearest
          ? 'プルフカ系に最も近い星系で、3.91光年先にある。将来の星座や航海の目印の候補。'
          : '10光年以内にある星系のひとつ。プルフカの空では恒星として見えるが、名称とスペクトル型の割り振りはまだ決まっていない。'
      };
      bodies['sys' + s.n] = { view:'nearby', data:data, obj:m, radius:0.55, fixed:true, line:line };
      pickables.push({ mesh:m, view:'nearby', id:'sys' + s.n });
    });
    /* ================= プルフカの夜空ビュー（星座創作用の仮の星空） ================= */
    // 星の配置・等級はシード固定の乱数で生成する。開くたびに同じ空になることが
    // 星座を作るうえでの前提になるため、乱数の種は変更しないこと。
    function mulberry32(seed){
      return function(){
        seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
        var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    var SKY_R = 800;
    var skyGroup = new THREE.Group();
    skyGroup.visible = false;
    scene.add(skyGroup);

    // 地面：地平線より下の星を隠す
    var groundDisc = new THREE.Mesh(
      new THREE.CircleGeometry(782, 64),
      new THREE.MeshBasicMaterial({ color:0x05080f })
    );
    groundDisc.rotation.x = -Math.PI / 2;
    groundDisc.position.y = -3;
    skyGroup.add(groundDisc);
    var horizonLine = circleLine(772, 0x44648c, 0.4);
    horizonLine.position.y = -2.6;
    skyGroup.add(horizonLine);
    // 方位の目印（北＝-Z、東＝+X、南＝+Z、西＝-X）。空の回転に連れていかれないよう
    // celestial ではなく skyGroup 直下に置き、見上げたときに方角が分かるようにする。
    [['北', 0, -758, 'cardinal north'], ['東', 758, 0, 'cardinal'], ['南', 0, 758, 'cardinal'], ['西', -758, 0, 'cardinal']].forEach(function(c){
      var cl = makeLabel(c[0], c[3]);
      cl.position.set(c[1], 26, c[2]);
      skyGroup.add(cl);
    });

    // 天球：地軸の傾き（23.5°）に合わせて傾け、日周運動で回す
    var poleAxis = new THREE.Vector3(
      Math.sin(0.41) * Math.cos(-0.6), Math.cos(0.41), Math.sin(0.41) * Math.sin(-0.6)
    ).normalize();
    var skyTilt = new THREE.Group();
    skyTilt.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), poleAxis);
    skyGroup.add(skyTilt);
    var celestial = new THREE.Group();
    skyTilt.add(celestial);

    function fmtMag(m){ return (m < 0 ? '−' : '') + Math.abs(m).toFixed(1); }
    function lonLatOf(dir){
      var lon = Math.atan2(dir.z, dir.x) * 180 / Math.PI;
      if (lon < 0) lon += 360;
      var lat = Math.asin(Math.max(-1, Math.min(1, dir.y))) * 180 / Math.PI;
      return { lon: lon, lat: lat };
    }
    function latText(lat){ return (lat >= 0 ? '+' : '−') + Math.abs(lat).toFixed(1) + '°'; }
    function glowSprite(tex, color, scale, opacity){
      var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map:tex, color:color, transparent:true, opacity:opacity, depthWrite:false, blending:THREE.AdditiveBlending }));
      sp.scale.setScalar(scale);
      return sp;
    }

    /* ---- 背景の星（仮の星空） ---- */
    var rng = mulberry32(20261123);
    var GREEK = ['α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω'];
    var STAR_COLS = [
      { c:0xcfe0ff, w:0.10, name:'青白' },
      { c:0xffffff, w:0.30, name:'白' },
      { c:0xfff3d6, w:0.24, name:'淡い黄' },
      { c:0xffe9b8, w:0.18, name:'黄' },
      { c:0xffd9a0, w:0.11, name:'橙' },
      { c:0xffab7a, w:0.07, name:'赤みのある橙' }
    ];
    function pickStarCol(r){
      var acc = 0;
      for (var i = 0; i < STAR_COLS.length; i++){ acc += STAR_COLS[i].w; if (r <= acc) return STAR_COLS[i]; }
      return STAR_COLS[STAR_COLS.length - 1];
    }
    var galN = new THREE.Vector3(0.35, 0.75, -0.56).normalize();
    var skyStars = [];
    while (skyStars.length < 980){
      var v = new THREE.Vector3(rng()*2-1, rng()*2-1, rng()*2-1);
      if (v.lengthSq() > 1 || v.lengthSq() < 0.01) continue;
      v.normalize();
      if (rng() < 0.45){
        // 星の帯（銀河の円盤の方向）に寄せる
        v.addScaledVector(galN, -v.dot(galN) * (0.55 + rng() * 0.35)).normalize();
      }
      var mag = -0.8 + 7.3 * Math.pow(rng(), 0.25);
      skyStars.push({ dir: v, mag: mag, col: pickStarCol(rng()) });
    }
    skyStars.sort(function(a, b){ return a.mag - b.mag; });

    // 小さい星：等級帯ごとの Points としてまとめて描く
    var bandPts = [[], [], []];
    skyStars.forEach(function(s, idx){
      if (idx < 24) return;
      bandPts[s.mag < 3.0 ? 0 : (s.mag < 4.8 ? 1 : 2)].push(s);
    });
    [
      { size:3.1, opacity:0.95 },
      { size:2.3, opacity:0.88 },
      { size:1.8, opacity:0.68 }
    ].forEach(function(band, bi){
      var arr = bandPts[bi];
      var pos = new Float32Array(arr.length * 3);
      var col = new Float32Array(arr.length * 3);
      arr.forEach(function(s, i){
        pos.set([s.dir.x * SKY_R, s.dir.y * SKY_R, s.dir.z * SKY_R], i * 3);
        var c = new THREE.Color(s.col.c);
        col.set([c.r, c.g, c.b], i * 3);
      });
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      var mat = new THREE.PointsMaterial({ size:band.size, sizeAttenuation:false, map:dotTex, vertexColors:true,
        transparent:true, opacity:band.opacity, depthWrite:false });
      celestial.add(new THREE.Points(geo, mat));
    });

    var SKY_LIST_IDS = ['sky-misih', 'sky-p2', 'sky-p6', 'sky-p4', 'sky-p1', 'sky-p7', 'sky-p8',
      'sky-sys4', 'sky-sys9', 'sky-sys3', 'sky-sys6', 'sky-sys7', 'sky-sys2', 'sky-sys5', 'sky-sys8', 'sky-sys10', 'sky-sys1'];

    // 明るい星24個：α〜ω の仮符号を付け、クリックできるようにする
    skyStars.slice(0, 24).forEach(function(s, idx){
      var letter = GREEK[idx];
      var scale = 15.5 - s.mag * 2.4;
      var grp = new THREE.Group();
      grp.position.copy(s.dir).multiplyScalar(SKY_R);
      celestial.add(grp);
      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(scale * 0.30, 16, 12),
        new THREE.MeshBasicMaterial({ color: s.col.c })
      );
      grp.add(mesh);
      grp.add(glowSprite(dotTex, s.col.c, scale, 0.85));
      if (idx < 6) grp.add(glowSprite(glowTex, s.col.c, scale * 2.6, 0.30));
      var lb = makeLabel(letter + '<small>' + fmtMag(s.mag) + ' 等</small>', 'bright');
      lb.position.set(0, scale * 0.72, 0);
      grp.add(lb);
      var ll = lonLatOf(s.dir);
      var id = 'sky-g' + idx;
      var data = {
        id: id, name: letter + ' 星（仮符号）', kind: '恒星', listSub: fmtMag(s.mag) + ' 等 ・ ' + s.col.name,
        sub: 'プルフカの夜空で ' + (idx + 1) + ' 番目に明るい星',
        rows: [
          ['仮符号', letter + '（明るさ順）'],
          ['見かけの等級', fmtMag(s.mag) + ' 等'],
          ['色', s.col.name],
          ['天球座標', '経度 ' + ll.lon.toFixed(1) + '° ／ 緯度 ' + latText(ll.lat)]
        ],
        note: '星座創作用に、明るさ順で仮に付けた符号。星座ができたら、α・β…はその星座の中でいちばん明るい星から付け直す想定。星の配置と等級は、星座を作るための仮の星空として生成したもの（開くたびに同じ空になるよう固定してある）。'
      };
      bodies[id] = { view:'sky', data:data, obj:mesh, radius:scale * 0.42 };
      // 星そのものは小さいので、タップ判定用に大きめの見えない球を重ねる
      var hit = new THREE.Mesh(new THREE.SphereGeometry(17, 8, 6),
        new THREE.MeshBasicMaterial({ visible:false }));
      grp.add(hit);
      pickables.push({ mesh:hit, view:'sky', id:id });
      SKY_LIST_IDS.push(id);
    });

    // 近傍の星系：実際の方向に、距離から割り出した明るさで置く
    NEARBY.forEach(function(s, i){
      var dir = new THREE.Vector3(s.x, s.z, s.y).normalize();
      var mag = 5 * Math.log10(s.d) - 3.4;
      var scale = 15.5 - mag * 2.4;
      var tint = starTints[i % starTints.length];
      var grp = new THREE.Group();
      grp.position.copy(dir).multiplyScalar(SKY_R);
      celestial.add(grp);
      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(scale * 0.30, 16, 12),
        new THREE.MeshBasicMaterial({ color: tint })
      );
      grp.add(mesh);
      grp.add(glowSprite(dotTex, tint, scale, 0.85));
      var lb = makeLabel('星系' + s.n + '<small>' + s.d.toFixed(2) + ' ly</small>', s.nearest ? 'nearest' : '');
      lb.position.set(0, scale * 0.72, 0);
      grp.add(lb);
      var ll = lonLatOf(dir);
      var id = 'sky-sys' + s.n;
      var data = {
        id: id, name: '星系 ' + s.n, kind: '近傍恒星系', listSub: s.d.toFixed(2) + ' ly ・ ' + fmtMag(mag) + ' 等',
        sub: s.nearest ? 'Nóshih に最も近い星系 ― 夜空での姿' : '近傍恒星系 ― 夜空での姿',
        rows: [
          ['見かけの等級', fmtMag(mag) + ' 等（仮）'],
          ['Nóshih からの距離', s.d.toFixed(2) + ' 光年'],
          ['天球座標', '経度 ' + ll.lon.toFixed(1) + '° ／ 緯度 ' + latText(ll.lat)]
        ],
        note: 'プルフカの空に実際に見えるはずの近くの恒星。スペクトル型がまだ決まっていないため、明るさは距離から割り出した仮の値。星座の目印や、星にまつわる物語の材料に。'
      };
      bodies[id] = { view:'sky', data:data, obj:mesh, radius:scale * 0.42 };
      var hit2 = new THREE.Mesh(new THREE.SphereGeometry(17, 8, 6),
        new THREE.MeshBasicMaterial({ visible:false }));
      grp.add(hit2);
      pickables.push({ mesh:hit2, view:'sky', id:id });
    });

    // 惑星と月：惑星系ビューでの現在の公転位置から、黄道上の位置を割り出して置く
    var SKY_PLANET_MAG = { p1:-0.3, p2:-4.3, p4:-0.9, p6:-2.4, p7:0.5, p8:5.5 };
    var skyPlanetObjs = {};
    PLANETS.forEach(function(p){
      if (p.belt || p.plufka) return;
      var grp = new THREE.Group();
      celestial.add(grp);
      var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.9, 16, 12),
        new THREE.MeshBasicMaterial({ color: p.color })
      );
      grp.add(mesh);
      grp.add(glowSprite(dotTex, p.color, 13, 0.8));
      var lb = makeLabel(p.name + '<small>惑星</small>', '');
      lb.position.set(0, 9, 0);
      grp.add(lb);
      var id = 'sky-' + p.id;
      var data = {
        id: id, name: p.name, kind: '惑星（夜空での姿）', listSub: fmtMag(SKY_PLANET_MAG[p.id]) + ' 等（目安） ・ 惑星',
        sub: 'プルフカの空に見える惑星 ― 黄道の近くを動く',
        rows: [
          ['見かけの等級', fmtMag(SKY_PLANET_MAG[p.id]) + ' 等（目安）'],
          ['軌道半径', fmt(p.au, p.au < 1 ? 3 : 2) + ' AU'],
          ['公転周期', periodText(p.au)]
        ],
        note: 'プルフカの空では明るい星のように見えるが、星々に対して少しずつ位置を変える「迷い星」。位置は惑星系ビューでの現在の公転位置から割り出して表示している。動くので、星座には含めない方がよい。'
      };
      bodies[id] = { view:'sky', data:data, obj:mesh, radius:5.2 };
      var hitP = new THREE.Mesh(new THREE.SphereGeometry(15, 8, 6),
        new THREE.MeshBasicMaterial({ visible:false }));
      grp.add(hitP);
      pickables.push({ mesh:hitP, view:'sky', id:id });
      skyPlanetObjs[p.id] = grp;
    });

    var skyMoonGrp = new THREE.Group();
    celestial.add(skyMoonGrp);
    var skyMoon = new THREE.Mesh(
      new THREE.SphereGeometry(3.6, 24, 18),
      new THREE.MeshBasicMaterial({ color:0xe9edf4 })
    );
    skyMoonGrp.add(skyMoon);
    skyMoonGrp.add(glowSprite(glowTex, 0xdfe8ff, 17, 0.5));
    var moonLb = makeLabel('Mísih<small>月</small>', '');
    moonLb.position.set(0, 6.5, 0);
    skyMoonGrp.add(moonLb);
    bodies['sky-misih'] = { view:'sky', obj:skyMoon, radius:3.6, data: {
      id:'sky-misih', name:'Mísih（ミーシヒ）', kind:'衛星（夜空での姿）', listSub:'プルフカの月',
      sub:'プルフカの月 ― 夜空での姿',
      rows: MOON.rows,
      note: MOON.note + ' 夜空ビューでは、惑星系ビューでの現在の公転位置をもとに位置を表示している。月も星々に対して動くので、星座には含めない。'
    }};
    var skyMoonHit = new THREE.Mesh(new THREE.SphereGeometry(14, 8, 6),
      new THREE.MeshBasicMaterial({ visible:false }));
    skyMoonGrp.add(skyMoonHit);
    pickables.push({ mesh:skyMoonHit, view:'sky', id:'sky-misih' });

    // 惑星・月の黄道上の位置を、惑星系ビューの現在の公転角から計算する
    function layoutSkyPlanets(){
      var eps = 0.41; // 黄道の傾き ≒ 地軸の傾き 23.5°
      Object.keys(skyPlanetObjs).forEach(function(pid){
        var rec = bodies[pid];
        if (!rec || !rec.pivot) return;
        var lam = -rec.pivot.rotation.y;
        var dir = new THREE.Vector3(
          Math.cos(lam),
          Math.sin(lam) * Math.sin(eps),
          Math.sin(lam) * Math.cos(eps)
        );
        skyPlanetObjs[pid].position.copy(dir).multiplyScalar(SKY_R - 30);
      });
      var pl = bodies['plufka'], mi = bodies['misih'];
      if (pl && pl.pivot && mi && mi.moonPivot){
        var lamM = -pl.pivot.rotation.y - mi.moonPivot.rotation.y + 0.3;
        var dirM = new THREE.Vector3(
          Math.cos(lamM),
          Math.sin(lamM) * Math.sin(eps) + 0.06,
          Math.sin(lamM) * Math.cos(eps)
        ).normalize();
        skyMoonGrp.position.copy(dirM).multiplyScalar(SKY_R - 30);
      }
    }
    /* ================= UI / インタラクション ================= */
    var CAM = {
      system: { pos: new THREE.Vector3(22, 33, 68), target: new THREE.Vector3(0, 0, 0) },
      nearby: { pos: new THREE.Vector3(20, 24, 46), target: new THREE.Vector3(0, 0, 0) }
    };
    function camPos(v){
      var narrow = camera.aspect < 0.75, mid = camera.aspect < 1.1;
      var f = v === 'nearby'
        ? (narrow ? 2.35 : (mid ? 1.5 : 1))
        : (narrow ? 1.6 : (mid ? 1.28 : 1));
      return CAM[v].pos.clone().multiplyScalar(f);
    }
    var view = 'system';
    var selectedId = 'plufka';
    var follow = false;
    var playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var daysPerSec = 12;
    var showLabels = true, showOrbits = true;

    var infoEl = document.getElementById('info');
    var infoKind = document.getElementById('info-kind');
    var infoName = document.getElementById('info-name');
    var infoSub = document.getElementById('info-sub');
    var infoData = document.getElementById('info-data');
    var infoNote = document.getElementById('info-note');
    var captionEl = document.getElementById('caption');
    var listEl = document.getElementById('body-list');
    var listTitle = document.getElementById('body-panel-title');

    var CAPTIONS = {
      system: '<b>惑星系</b> ― Nóshih の周りを第1〜第7惑星が回る。プルフカは第3惑星。第5〜第7惑星では大型衛星も公転している。' +
        '<div class="legend"><span><i class="swatch band"></i>ハビタブルゾーン 0.689–0.992 AU</span>' +
        '<span><i class="swatch dash"></i>フロストライン 3.504 AU</span>' +
        '<span><i class="swatch"></i>軌道</span></div>',
      nearby: '<b>近傍恒星</b> ― 10光年以内にある10の星系。最寄りは星系4の 3.91 ly。',
      sky: '<b>プルフカの夜空</b> ― 星座創作用の固定星空。明るい星24個に α〜ω の仮符号を付けた。惑星と月は動くので星座には含めない。上のコンパスが今の方位、バーが空の回転（1周分）を示す。'
    };

    // 選択リング（ビルボード）
    var selRing = new THREE.Sprite(new THREE.SpriteMaterial({ map:ringTex, color:0xffffff, transparent:true, opacity:0.95, depthWrite:false }));
    selRing.visible = false;
    scene.add(selRing);

    function worldPosOf(rec){
      var v = new THREE.Vector3();
      rec.obj.getWorldPosition(v);
      return v;
    }

    function select(id, focus){
      var rec = bodies[id];
      if (!rec) return;
      selectedId = id;
      var d = rec.data;
      infoKind.textContent = d.kind;
      infoName.textContent = d.name;
      infoSub.textContent = d.sub || '';
      infoData.innerHTML = '';
      d.rows.forEach(function(r){
        var dt = document.createElement('dt'); dt.textContent = r[0];
        var dd = document.createElement('dd'); dd.textContent = r[1];
        infoData.appendChild(dt); infoData.appendChild(dd);
      });
      infoNote.textContent = d.note || '';
      infoEl.classList.toggle('plufka-info', id === 'plufka');
      Array.prototype.forEach.call(listEl.children, function(ch){
        ch.setAttribute('aria-pressed', ch.getAttribute('data-id') === id ? 'true' : 'false');
      });
      // 近傍ビューでは選択した星系への線を強調
      Object.keys(bodies).forEach(function(k){
        var b = bodies[k];
        if (b.line) b.line.material.opacity = (k === id) ? 0.95 : (b.data && b.data.id === 'sys4' ? 0.5 : 0.14);
      });
      if (focus) focusOn(rec);
      else follow = false;
    }

    function focusOn(rec){
      if (view === 'sky'){
        // 夜空ビューではカメラは地表に固定し、その天体の方向を向く
        follow = false;
        var dir = worldPosOf(rec).sub(camera.position).normalize();
        controls.target.copy(camera.position).add(dir);
        return;
      }
      follow = true;
      var p = worldPosOf(rec);
      controls.target.copy(p);
      var dir = camera.position.clone().sub(p);
      var len = Math.max(dir.length(), rec.radius * 9 + 4);
      dir.normalize().multiplyScalar(Math.min(len, rec.radius * 9 + 6));
      // 遠すぎる場合は寄せる
      if (camera.position.distanceTo(p) > rec.radius * 10 + 8){
        camera.position.copy(p).add(dir);
      }
    }

    function buildList(){
      listEl.innerHTML = '';
      var ids = view === 'system'
        ? ['noshih','p1','p2','plufka','misih','p4','belt','p6','p7','p8']
        : view === 'nearby'
        ? ['noshih-near','sys4','sys9','sys3','sys6','sys2','sys7','sys5','sys8','sys10','sys1']
        : SKY_LIST_IDS;
      listTitle.textContent = view === 'system' ? '天体リスト（惑星系）' : view === 'nearby' ? '星系リスト（近傍）' : '天体リスト（夜空）';
      ids.forEach(function(id){
        var rec = bodies[id]; if (!rec) return;
        var b = document.createElement('button');
        b.className = 'chip' + (id === 'plufka' ? ' hot' : '');
        b.setAttribute('data-id', id);
        b.setAttribute('aria-pressed', id === selectedId ? 'true' : 'false');
        var small = '';
        if (view === 'system'){
          if (id === 'noshih') small = '恒星 ・ 0 AU';
          else if (id === 'misih') small = 'プルフカの月';
          else if (rec.au) small = fmt(rec.au, rec.au < 1 ? 3 : 2) + ' AU';
        } else if (view === 'nearby') {
          small = id === 'noshih-near' ? 'プルフカ系 ・ 原点' : (rec.data.rows[0][1]);
        } else {
          small = rec.data.listSub || '';
        }
        b.innerHTML = '';
        b.appendChild(document.createTextNode(rec.data.name));
        var sm = document.createElement('small'); sm.textContent = small;
        b.appendChild(sm);
        b.addEventListener('click', function(){ select(id, true); });
        listEl.appendChild(b);
      });
    }

    // 夜空ビューの初期視方向：地平線より上にある一番明るい星の方向を向く
    function aimSkyCamera(){
      camera.position.set(0, 0, 0);
      for (var gi = 0; gi < 24; gi++){
        var grec = bodies['sky-g' + gi];
        if (!grec) continue;
        var gp = worldPosOf(grec);
        if (gp.y > 80){
          controls.target.copy(gp.normalize());
          return;
        }
      }
      controls.target.set(0, 0.35, -1);
    }

    function setView(v){
      view = v;
      document.getElementById('view-system').setAttribute('aria-pressed', v === 'system' ? 'true' : 'false');
      document.getElementById('view-nearby').setAttribute('aria-pressed', v === 'nearby' ? 'true' : 'false');
      document.getElementById('view-sky').setAttribute('aria-pressed', v === 'sky' ? 'true' : 'false');
      systemGroup.visible = v === 'system';
      nearbyGroup.visible = v === 'nearby';
      skyGroup.visible = v === 'sky';
      document.getElementById('sky-hud').hidden = v !== 'sky';
      ambientStars.visible = v !== 'sky';
      captionEl.innerHTML = CAPTIONS[v];
      follow = false;
      if (v === 'sky'){
        layoutSkyPlanets();
        controls.enablePan = false;
        controls.minDistance = 0.2;
        controls.maxDistance = 2.5;
        aimSkyCamera();
        select('sky-g0', false);
      } else {
        controls.enablePan = true;
        controls.minDistance = 4;
        controls.maxDistance = v === 'system' ? 700 : 400;
        camera.position.copy(camPos(v));
        controls.target.copy(CAM[v].target);
        select(v === 'system' ? 'plufka' : 'sys4', false);
      }
      buildList();
    }
    document.getElementById('view-system').addEventListener('click', function(){ setView('system'); });
    document.getElementById('view-nearby').addEventListener('click', function(){ setView('nearby'); });
    document.getElementById('view-sky').addEventListener('click', function(){ setView('sky'); });

    // 再生 / 速度
    var playBtn = document.getElementById('play-btn');
    var playLabel = document.getElementById('play-label');
    var playIcon = document.getElementById('play-icon');
    function syncPlay(){
      playBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      playLabel.textContent = playing ? '一時停止' : '再生';
      playIcon.innerHTML = playing
        ? '<rect x="2.5" y="2" width="4" height="12" rx="1"/><rect x="9.5" y="2" width="4" height="12" rx="1"/>'
        : '<path d="M4 2.2v11.6c0 .9 1 1.5 1.8 1L14 9a1.15 1.15 0 0 0 0-2L5.8 1.2C5 .7 4 1.3 4 2.2z"/>';
    }
    playBtn.addEventListener('click', function(){ playing = !playing; syncPlay(); });
    var speedInput = document.getElementById('speed');
    var speedOut = document.getElementById('speed-out');
    speedInput.addEventListener('input', function(){
      daysPerSec = parseFloat(speedInput.value);
      speedOut.textContent = daysPerSec + ' 日/秒';
    });

    // 情報パネルの表示 / 非表示
    var infoVisible = true;
    var infoBtn = document.getElementById('info-btn');
    var infoCloseBtn = document.getElementById('info-close');
    function setInfoVisible(v){
      infoVisible = v;
      infoEl.classList.toggle('is-hidden', !v);
      infoEl.setAttribute('aria-hidden', v ? 'false' : 'true');
      if (infoCloseBtn) infoCloseBtn.tabIndex = v ? 0 : -1;
      var focusBtn = document.getElementById('focus-btn');
      if (focusBtn) focusBtn.tabIndex = v ? 0 : -1;
      infoBtn.setAttribute('aria-pressed', v ? 'true' : 'false');
      infoBtn.textContent = v ? '情報を隠す' : '情報を表示';
    }
    infoBtn.addEventListener('click', function(){ setInfoVisible(!infoVisible); });
    infoCloseBtn.addEventListener('click', function(){ setInfoVisible(false); infoBtn.focus(); });

    // トグル類
    var labelsBtn = document.getElementById('labels-btn');
    labelsBtn.addEventListener('click', function(){
      showLabels = !showLabels;
      labelsBtn.setAttribute('aria-pressed', showLabels ? 'true' : 'false');
      document.getElementById('labels').style.display = showLabels ? '' : 'none';
    });
    var orbitsBtn = document.getElementById('orbits-btn');
    function syncOrbits(){
      orbitsBtn.setAttribute('aria-pressed', showOrbits ? 'true' : 'false');
      orbitLines.forEach(function(l){ l.visible = showOrbits; });
      hzGroup.visible = showOrbits;
      frostLabel.visible = showOrbits;
    }
    orbitsBtn.addEventListener('click', function(){ showOrbits = !showOrbits; syncOrbits(); });
    document.getElementById('reset-btn').addEventListener('click', function(){
      follow = false;
      if (view === 'sky'){
        aimSkyCamera();
        return;
      }
      camera.position.copy(camPos(view));
      controls.target.copy(CAM[view].target);
    });
    document.getElementById('focus-btn').addEventListener('click', function(){
      var rec = bodies[selectedId]; if (rec) focusOn(rec);
    });
    document.getElementById('sky-north-btn').addEventListener('click', function(){
      if (view !== 'sky') return;
      camera.position.set(0, 0, 0);
      controls.target.set(0, 0.18, -1);
    });

    // クリックで選択（ドラッグと区別）
    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();
    var downX = 0, downY = 0, downT = 0;
    renderer.domElement.addEventListener('pointerdown', function(e){ downX = e.clientX; downY = e.clientY; downT = performance.now(); });
    renderer.domElement.addEventListener('pointerup', function(e){
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6 || performance.now() - downT > 500) return;
      var rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      var meshes = pickables.filter(function(p){ return p.view === view; }).map(function(p){ return p.mesh; });
      var hits = raycaster.intersectObjects(meshes, false);
      if (hits.length){
        var hit = pickables.filter(function(p){ return p.mesh === hits[0].object; })[0];
        if (hit) select(hit.id, false);
      }
    });

    /* ================= サイズ調整 ================= */
    function resize(){
      var w = window.innerWidth, h = window.innerHeight;
      // 解像度は最大でも約830万画素までに抑える。大きな画面×高DPRの
      // フルスクリーン描画は GPU メモリを圧迫し、コンテキスト喪失や
      // WebView 自体のクラッシュの原因になるため。
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      while (dpr > 1 && w * h * dpr * dpr > 8388608) dpr -= 0.25;
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    /* ================= アニメーション ================= */
    var clock = new THREE.Clock();
    var elapsed = 0;
    function animate(){
      // 2Dフォールバックへ切り替えたあとは3D側のループを完全に止める
      if (window.__halted) return;
      requestAnimationFrame(animate);
      try {
        var dt = Math.min(clock.getDelta(), 0.1);
        elapsed += dt;
        if (playing){
          var days = dt * daysPerSec;
          Object.keys(bodies).forEach(function(k){
            var b = bodies[k];
            if (b.pivot && b.au){
              b.pivot.rotation.y += (Math.PI * 2) * (days / periodDays(b.au));
            }
            if (b.moonPivot){
              b.moonPivot.rotation.y += (Math.PI * 2) * (days / 27.705);
            }
          });
          largeMoonPivots.forEach(function(m){
            m.pivot.rotation.y += (Math.PI * 2) * (days / m.period);
          });
          // 夜空の日周運動（圧縮表示：約110秒で1回転、速度スライダーに連動）
          celestial.rotation.y -= dt * (Math.PI * 2 / 110) * (daysPerSec / 12);
          if (beltPoints) beltPoints.rotation.y += dt * 0.004;
          starMesh.rotation.y += dt * 0.01;
        }
        // 恒星のグローとプルフカのハローを穏やかに脈動
        var pulse = 1 + Math.sin(elapsed * 1.4) * 0.03;
        starGlow.scale.setScalar(17 * pulse);
        var pl = bodies['plufka'];
        if (pl && pl.halo) pl.halo.material.opacity = 0.65 + Math.sin(elapsed * 2.0) * 0.2;

        // 選択リングを追随
        var rec = bodies[selectedId];
        if (rec && rec.view === view){
          selRing.visible = true;
          var p = worldPosOf(rec);
          selRing.position.copy(p);
          var s = rec.belt ? 3.6 : rec.radius * 3.1;
          selRing.scale.setScalar(s);
          selRing.material.color.set(selectedId === 'plufka' ? 0x7fe3d0 : (view === 'nearby' || selectedId === 'noshih' || selectedId === 'noshih-near' ? 0xffb36b : 0x8fb7ff));
          if (follow){
            var delta = p.clone().sub(controls.target);
            controls.target.copy(p);
            camera.position.add(delta);
          }
        } else {
          selRing.visible = false;
        }

        controls.update();
        if (view === 'sky' && window.__skyHud){
          var lookDir = controls.target.clone().sub(camera.position);
          var lookLen = lookDir.length() || 1;
          lookDir.divideScalar(lookLen);
          var azDeg = (Math.atan2(lookDir.x, -lookDir.z) * 180 / Math.PI + 360) % 360;
          var altDeg = Math.asin(Math.max(-1, Math.min(1, lookDir.y))) * 180 / Math.PI;
          window.__skyHud.update(azDeg, altDeg, -celestial.rotation.y);
        }
        // コンテキスト喪失中は WebGL 描画もラベル描画も止める（無駄な負荷が
        // 復元を妨げないようにするため）
        if (!contextLost){
          renderer.render(scene, camera);
          labelRenderer.render(scene, camera);
        }
        if (!window.__bootOk){
          window.__bootOk = true;
          // 起動前のエラーで案内が出ていても、描画が始まったら取り下げる
          if (!window.__halted && !contextLost) fatalBox.classList.remove('is-shown');
        }
      } catch (err) {
        if (window.__errShown !== err.message){
          window.__errShown = err.message;
          errBox.style.display = 'block';
          errBox.textContent = '描画中に問題が発生しました: ' + err.message;
        }
      }
    }

    syncPlay();
    syncOrbits();
    setInfoVisible(true);
    setView('system');
    animate();
    };
