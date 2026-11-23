'use strict';
    /* ================= 2Dフォールバック表示 =================
       WebGL2 が使えず 3D が起動できなかった端末向け。
       window.__fallback2D が立っているときだけ起動し、Canvas 2D で
       惑星系・近傍恒星・夜空の3ビューと、情報パネル／天体リスト／
       再生・速度・ラベル・軌道の操作をそのまま使えるようにする。
       3Dが使える環境では即座に終了し、3D側の動作には一切触れない。 */
    var fallbackStarted = false;
    var fbAlive = false;
    var fbCanvas = null;
    var fbHandlers = [];
    /* 2D側のUIハンドラ登録ヘルパー。2D表示が有効な間だけ処理し、
       再起動時に同じ要素へ二重登録しない（古い登録は外してから付け直す）。
       これがないと、3D再試行のあとに2Dへ戻ったとき、再生やラベルの
       ボタンが二重に切り替わって効かなくなる。 */
    function fbOn(el, type, fn){
      for (var i = 0; i < fbHandlers.length; i++){
        if (fbHandlers[i].el === el && fbHandlers[i].type === type){
          el.removeEventListener(type, fbHandlers[i].wrap);
          fbHandlers.splice(i, 1);
          break;
        }
      }
      var wrap = function(e){ if (fbAlive) fn(e); };
      el.addEventListener(type, wrap);
      fbHandlers.push({ el: el, type: type, wrap: wrap });
    }
    /* 2D表示を片付ける。「3Dで再試行」から呼ばれ、描画ループの停止・
       キャンバスの撤去・ラベル層とヒントの復帰までを行い、3D起動を
       その場でやり直せる状態にする。 */
    window.__teardownFallback = function(){
      fbAlive = false;
      fallbackStarted = false;
      if (fbCanvas && fbCanvas.parentNode) fbCanvas.parentNode.removeChild(fbCanvas);
      fbCanvas = null;
      var ll = document.getElementById('labels');
      if (ll) ll.style.display = '';
      var he = document.getElementById('hint');
      if (he) he.textContent = 'ドラッグで回転 ／ ピンチで拡大縮小 ／ タップで詳細';
    };
    function startFallback2D(){
      if (fallbackStarted) return;
      fallbackStarted = true;
      fbAlive = true;
      var fatalEl = document.getElementById('fatal');
      if (fatalEl) fatalEl.classList.remove('is-shown');
      var labelsLayer = document.getElementById('labels');
      if (labelsLayer) labelsLayer.style.display = 'none';
      var hintEl = document.getElementById('hint');
      if (hintEl) hintEl.textContent = 'ドラッグで回転 ／ スクロールで拡大縮小 ／ 惑星・衛星をタップで詳細（2D表示）';

      var wrap = document.getElementById('scene-wrap');
      var canvas = document.createElement('canvas');
      canvas.id = 'fallback-canvas';
      canvas.setAttribute('aria-label', 'プルフカ星系の2Dビュー');
      wrap.appendChild(canvas);
      fbCanvas = canvas;
      var ctx = canvas.getContext('2d');
      if (!ctx){
        window.__showFatal('この端末・ブラウザでは表示用の描画機能が使えないため、星系を表示できませんでした。');
        return;
      }

      /* ---------- 小物 ---------- */
      function fmt2(n, d){ return n.toFixed(d === undefined ? 3 : d); }
      function cssColor(n){ return '#' + ('000000' + n.toString(16)).slice(-6); }
      function mulberry32(seed){
        return function(){
          seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
          var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
      }
      function fmtMag(m){ return (m < 0 ? '−' : '') + Math.abs(m).toFixed(1); }
      function latText(lat){ return (lat >= 0 ? '+' : '−') + Math.abs(lat).toFixed(1) + '°'; }

      /* ---------- 天体データ（3D版と同じ設定値から組み立てる） ---------- */
      var bodies = {};
      bodies['noshih'] = { view:'system', data:STAR };
      PLANETS.forEach(function(p){
        bodies[p.id] = { view:'system', data:{
          id:p.id, name:p.name, kind:p.kind, sub:p.sub,
          rows: p.rowsExtra.concat([
            ['軌道半径', fmt2(p.au, p.au < 1 ? 3 : 2) + ' AU'],
            ['公転周期', p.period || periodText(p.au)]
          ]),
          note:p.note
        }, planet:p };
      });
      bodies['misih'] = { view:'system', data:MOON };
      bodies['noshih-near'] = { view:'nearby', data:STAR };
      NEARBY.forEach(function(s){
        bodies['sys' + s.n] = { view:'nearby', data:{
          id:'sys' + s.n, name:'星系 ' + s.n, kind:'近傍恒星系',
          sub: s.nearest ? 'Nóshih に最も近い星系' : '名称・スペクトル型は未決定',
          rows:[['Nóshih からの距離', s.d.toFixed(2) + ' 光年'],
                ['座標 (x, y, z)', s.x.toFixed(2) + ', ' + s.y.toFixed(2) + ', ' + s.z.toFixed(2) + ' ly']],
          note: s.nearest
            ? 'プルフカ系に最も近い星系で、3.91光年先にある。将来の星座や航海の目印の候補。'
            : '10光年以内にある星系のひとつ。プルフカの空では恒星として見えるが、名称とスペクトル型の割り振りはまだ決まっていない。'
        }, nearby:s };
      });
      // 大型衛星（3D版と同じ表示用スペック）
      var LARGE_MOONS = {
        p6: [
          { roman:'I',   r:0.34, dist:3.5, period:38,  color:0xd9c9a8, phase:0.4 },
          { roman:'II',  r:0.29, dist:4.6, period:58,  color:0xb9c7d6, phase:2.2 },
          { roman:'III', r:0.24, dist:5.8, period:88,  color:0xc4b096, phase:4.1 },
          { roman:'IV',  r:0.20, dist:7.1, period:132, color:0x9fb4c8, phase:5.5 }
        ],
        p7: [
          { roman:'I',   r:0.30, dist:4.4, period:42,  color:0xe3d7b8, phase:1.1 },
          { roman:'II',  r:0.26, dist:5.4, period:64,  color:0xc9d2dc, phase:3.0 },
          { roman:'III', r:0.22, dist:6.6, period:96,  color:0xb8a888, phase:0.2 },
          { roman:'IV',  r:0.19, dist:7.9, period:142, color:0xaec6d4, phase:4.8 },
          { roman:'V',   r:0.16, dist:9.3, period:198, color:0xd0c4ae, phase:2.7 }
        ],
        p8: [
          { roman:'I',   r:0.22, dist:2.1, period:46,  color:0xcfe0e2, phase:0.9 },
          { roman:'II',  r:0.20, dist:2.8, period:72,  color:0xb9c9ce, phase:2.6 },
          { roman:'III', r:0.17, dist:3.6, period:108, color:0xd8d2c2, phase:4.4 },
          { roman:'IV',  r:0.15, dist:4.5, period:156, color:0xa8bcc4, phase:5.9 },
          { roman:'V',   r:0.13, dist:5.5, period:218, color:0xcac0ae, phase:1.8 }
        ]
      };
      Object.keys(LARGE_MOONS).forEach(function(pid){
        var p = null;
        PLANETS.forEach(function(q){ if (q.id === pid) p = q; });
        LARGE_MOONS[pid].forEach(function(s, idx){
          var mid = pid + '-m' + (idx + 1);
          bodies[mid] = { view:'system', moonOf:pid, moonSpec:s, data:{
            id:mid, name:p.name + ' 衛星' + s.roman, kind:'衛星（大型）',
            sub:'名称未定 ― ' + p.name + 'の大型衛星',
            rows:[
              ['分類', '大型衛星（名称未定）'],
              ['母星', p.name],
              ['公転周期', '約 ' + s.period + ' 日（表示用）'],
              ['軌道', '母星の半径の約 ' + (s.dist / p.size).toFixed(1) + ' 倍（表示上の距離）']
            ],
            note: p.name + 'の衛星 ' + (pid === 'p6' ? '68' : pid === 'p7' ? '80' : '24') + ' 個のうち、大型のものだけを表示している。名称・質量・正確な公転周期はまだ決まっていないため、周期と軌道は表示用に設定した値。'
          }};
        });
      });

      /* ---------- 夜空の星（3D版と同じシード・同じ生成手順で再現する） ---------- */
      var GREEK = ['α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω'];
      var STAR_COLS = [
        { c:0xcfe0ff, w:0.10, name:'青白' }, { c:0xffffff, w:0.30, name:'白' },
        { c:0xfff3d6, w:0.24, name:'淡い黄' }, { c:0xffe9b8, w:0.18, name:'黄' },
        { c:0xffd9a0, w:0.11, name:'橙' }, { c:0xffab7a, w:0.07, name:'赤みのある橙' }
      ];
      function pickStarCol(r){
        var acc = 0;
        for (var i = 0; i < STAR_COLS.length; i++){ acc += STAR_COLS[i].w; if (r <= acc) return STAR_COLS[i]; }
        return STAR_COLS[STAR_COLS.length - 1];
      }
      var rng = mulberry32(20261123);
      var galLen = Math.sqrt(0.35*0.35 + 0.75*0.75 + 0.56*0.56);
      var galN = [0.35/galLen, 0.75/galLen, -0.56/galLen];
      var skyStars = [];
      while (skyStars.length < 980){
        var vx = rng()*2-1, vy = rng()*2-1, vz = rng()*2-1;
        var ls = vx*vx + vy*vy + vz*vz;
        if (ls > 1 || ls < 0.01) continue;
        var il = 1 / Math.sqrt(ls); vx *= il; vy *= il; vz *= il;
        if (rng() < 0.45){
          var dot = vx*galN[0] + vy*galN[1] + vz*galN[2];
          var f = -dot * (0.55 + rng() * 0.35);
          vx += galN[0]*f; vy += galN[1]*f; vz += galN[2]*f;
          var l2 = Math.sqrt(vx*vx + vy*vy + vz*vz); vx /= l2; vy /= l2; vz /= l2;
        }
        var mag = -0.8 + 7.3 * Math.pow(rng(), 0.25);
        skyStars.push({ dir:[vx, vy, vz], mag:mag, col:pickStarCol(rng()) });
      }
      skyStars.sort(function(a, b){ return a.mag - b.mag; });
      function lonLatOf(dir){
        var lon = Math.atan2(dir[2], dir[0]) * 180 / Math.PI;
        if (lon < 0) lon += 360;
        var lat = Math.asin(Math.max(-1, Math.min(1, dir[1]))) * 180 / Math.PI;
        return { lon:lon, lat:lat };
      }
      skyStars.slice(0, 24).forEach(function(s, idx){
        var letter = GREEK[idx];
        var ll = lonLatOf(s.dir);
        var id = 'sky-g' + idx;
        bodies[id] = { view:'sky', skyStar:s, data:{
          id:id, name:letter + ' 星（仮符号）', kind:'恒星', listSub: fmtMag(s.mag) + ' 等 ・ ' + s.col.name,
          sub:'プルフカの夜空で ' + (idx + 1) + ' 番目に明るい星',
          rows:[
            ['仮符号', letter + '（明るさ順）'],
            ['見かけの等級', fmtMag(s.mag) + ' 等'],
            ['色', s.col.name],
            ['天球座標', '経度 ' + ll.lon.toFixed(1) + '° ／ 緯度 ' + latText(ll.lat)]
          ],
          note:'星座創作用に、明るさ順で仮に付けた符号。星座ができたら、α・β…はその星座の中でいちばん明るい星から付け直す想定。星の配置と等級は、星座を作るための仮の星空として生成したもの（開くたびに同じ空になるよう固定してある）。'
        }};
      });
      var starTints = [0xfff3e0, 0xdfe9ff, 0xffe3c2, 0xffffff, 0xffd9b0, 0xe8f1ff, 0xfff6ea, 0xd9e6ff, 0xffe9d2, 0xffffff];
      NEARBY.forEach(function(s, i){
        var v = [s.x, s.z, s.y];
        var vl = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
        var dir = [v[0]/vl, v[1]/vl, v[2]/vl];
        var mag = 5 * Math.log10(s.d) - 3.4;
        var ll = lonLatOf(dir);
        var id = 'sky-sys' + s.n;
        bodies[id] = { view:'sky', skyDir:dir, skyMag:mag, tint:starTints[i % starTints.length], data:{
          id:id, name:'星系 ' + s.n, kind:'近傍恒星系', listSub: s.d.toFixed(2) + ' ly ・ ' + fmtMag(mag) + ' 等',
          sub: s.nearest ? 'Nóshih に最も近い星系 ― 夜空での姿' : '近傍恒星系 ― 夜空での姿',
          rows:[
            ['見かけの等級', fmtMag(mag) + ' 等（仮）'],
            ['Nóshih からの距離', s.d.toFixed(2) + ' 光年'],
            ['天球座標', '経度 ' + ll.lon.toFixed(1) + '° ／ 緯度 ' + latText(ll.lat)]
          ],
          note:'プルフカの空に実際に見えるはずの近くの恒星。スペクトル型がまだ決まっていないため、明るさは距離から割り出した仮の値。星座の目印や、星にまつわる物語の材料に。'
        }};
      });
      var SKY_PLANET_MAG = { p1:-0.3, p2:-4.3, p4:-0.9, p6:-2.4, p7:0.5, p8:5.5 };
      PLANETS.forEach(function(p){
        if (p.belt || p.plufka) return;
        var id = 'sky-' + p.id;
        bodies[id] = { view:'sky', skyPlanet:p, data:{
          id:id, name:p.name, kind:'惑星（夜空での姿）', listSub: fmtMag(SKY_PLANET_MAG[p.id]) + ' 等（目安） ・ 惑星',
          sub:'プルフカの空に見える惑星 ― 黄道の近くを動く',
          rows:[
            ['見かけの等級', fmtMag(SKY_PLANET_MAG[p.id]) + ' 等（目安）'],
            ['軌道半径', fmt2(p.au, p.au < 1 ? 3 : 2) + ' AU'],
            ['公転周期', periodText(p.au)]
          ],
          note:'プルフカの空では明るい星のように見えるが、星々に対して少しずつ位置を変える「迷い星」。位置は惑星系ビューでの現在の公転位置から割り出して表示している。動くので、星座には含めない方がよい。'
        }};
      });
      bodies['sky-misih'] = { view:'sky', skyMoon:true, data:{
        id:'sky-misih', name:'Mísih（ミーシヒ）', kind:'衛星（夜空での姿）', listSub:'プルフカの月',
        sub:'プルフカの月 ― 夜空での姿', rows: MOON.rows,
        note: MOON.note + ' 夜空ビューでは、惑星系ビューでの現在の公転位置をもとに位置を表示している。月も星々に対して動くので、星座には含めない。'
      }};
      var SKY_LIST_IDS = ['sky-misih', 'sky-p2', 'sky-p6', 'sky-p4', 'sky-p1', 'sky-p7', 'sky-p8',
        'sky-sys4', 'sky-sys9', 'sky-sys3', 'sky-sys6', 'sky-sys7', 'sky-sys2', 'sky-sys5', 'sky-sys8', 'sky-sys10', 'sky-sys1'];
      for (var gi = 0; gi < 24; gi++) SKY_LIST_IDS.push('sky-g' + gi);

      /* ---------- 状態とUI ---------- */
      var CAPTIONS = {
        system: '<b>惑星系（2D）</b> ― Nóshih の周りを第1〜第7惑星が回る。プルフカは第3惑星。第5〜第7惑星では大型衛星も公転している。' +
          '<div class="legend"><span><i class="swatch band"></i>ハビタブルゾーン 0.689–0.992 AU</span>' +
          '<span><i class="swatch dash"></i>フロストライン 3.504 AU</span>' +
          '<span><i class="swatch"></i>軌道</span></div>',
        nearby: '<b>近傍恒星（2D）</b> ― 10光年以内にある10の星系。最寄りは星系4の 3.91 ly。',
        sky: '<b>プルフカの夜空（2D星図）</b> ― 天頂中心の固定星空。明るい星24個に α〜ω の仮符号を付けた。惑星と月は星座には含めない。上のコンパスが星図の上の方位、バーが空の回転（1周分）を示す。'
      };
      var view = 'system';
      var selectedId = 'plufka';
      var followId = null;
      var playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var daysPerSec = 12;
      var showLabels = true, showOrbits = true, infoVisible = true;
      var simDays = 0, rot = 0, skyRot = 0, skySpin = 0, zoom = 1;
      var hits = [];
      var W = 0, H = 0;

      var infoEl = document.getElementById('info');
      var infoKind = document.getElementById('info-kind');
      var infoName = document.getElementById('info-name');
      var infoSub = document.getElementById('info-sub');
      var infoData = document.getElementById('info-data');
      var infoNote = document.getElementById('info-note');
      var captionEl = document.getElementById('caption');
      var listEl = document.getElementById('body-list');
      var listTitle = document.getElementById('body-panel-title');

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
        if (focus) focusOn(id);
      }
      function focusOn(id){
        if (view === 'sky'){
          followId = null;
          var az = skyAzOf(id);
          if (az !== null) skyRot = -az - skySpin;
          return;
        }
        followId = id;
        if (id !== 'noshih' && id !== 'noshih-near' && zoom < 1.5) zoom = 1.5;
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
            else if (rec.planet) small = fmt2(rec.planet.au, rec.planet.au < 1 ? 3 : 2) + ' AU';
          } else if (view === 'nearby'){
            small = id === 'noshih-near' ? 'プルフカ系 ・ 原点' : rec.data.rows[0][1];
          } else {
            small = rec.data.listSub || '';
          }
          b.appendChild(document.createTextNode(rec.data.name));
          var sm = document.createElement('small'); sm.textContent = small;
          b.appendChild(sm);
          b.addEventListener('click', function(){ if (fbAlive) select(id, true); });
          listEl.appendChild(b);
        });
      }
      function setView(v){
        view = v;
        followId = null; zoom = 1; rot = 0;
        document.getElementById('view-system').setAttribute('aria-pressed', v === 'system' ? 'true' : 'false');
        document.getElementById('view-nearby').setAttribute('aria-pressed', v === 'nearby' ? 'true' : 'false');
        document.getElementById('view-sky').setAttribute('aria-pressed', v === 'sky' ? 'true' : 'false');
        captionEl.innerHTML = CAPTIONS[v];
        document.getElementById('sky-hud').hidden = v !== 'sky';
        buildList();
        select(v === 'system' ? 'plufka' : v === 'nearby' ? 'sys4' : 'sky-g0', false);
        buildList();
      }
      fbOn(document.getElementById('view-system'), 'click', function(){ setView('system'); });
      fbOn(document.getElementById('view-nearby'), 'click', function(){ setView('nearby'); });
      fbOn(document.getElementById('view-sky'), 'click', function(){ setView('sky'); });

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
      fbOn(playBtn, 'click', function(){ playing = !playing; syncPlay(); });
      var speedInput = document.getElementById('speed');
      var speedOut = document.getElementById('speed-out');
      fbOn(speedInput, 'input', function(){
        daysPerSec = parseFloat(speedInput.value);
        speedOut.textContent = daysPerSec + ' 日/秒';
      });
      var infoBtn = document.getElementById('info-btn');
      var infoCloseBtn = document.getElementById('info-close');
      function setInfoVisible(v){
        infoVisible = v;
        infoEl.classList.toggle('is-hidden', !v);
        infoEl.setAttribute('aria-hidden', v ? 'false' : 'true');
        if (infoCloseBtn) infoCloseBtn.tabIndex = v ? 0 : -1;
        var fb = document.getElementById('focus-btn');
        if (fb) fb.tabIndex = v ? 0 : -1;
        infoBtn.setAttribute('aria-pressed', v ? 'true' : 'false');
        infoBtn.textContent = v ? '情報を隠す' : '情報を表示';
      }
      fbOn(infoBtn, 'click', function(){ setInfoVisible(!infoVisible); });
      fbOn(infoCloseBtn, 'click', function(){ setInfoVisible(false); infoBtn.focus(); });
      var labelsBtn = document.getElementById('labels-btn');
      fbOn(labelsBtn, 'click', function(){
        showLabels = !showLabels;
        labelsBtn.setAttribute('aria-pressed', showLabels ? 'true' : 'false');
      });
      var orbitsBtn = document.getElementById('orbits-btn');
      fbOn(orbitsBtn, 'click', function(){
        showOrbits = !showOrbits;
        orbitsBtn.setAttribute('aria-pressed', showOrbits ? 'true' : 'false');
      });
      fbOn(document.getElementById('reset-btn'), 'click', function(){
        followId = null; zoom = 1; rot = 0; skyRot = 0;
      });
      fbOn(document.getElementById('focus-btn'), 'click', function(){ focusOn(selectedId); });
      fbOn(document.getElementById('sky-north-btn'), 'click', function(){
        if (view === 'sky') skyRot = -skySpin;
      });

      /* ---------- 位置計算 ---------- */
      function auR(au){ return 13 * Math.sqrt(au); }
      function planetAngle(p){ return p.angle + Math.PI * 2 * (simDays / periodDays(p.au)); }
      function moonAngle(){ return Math.PI * 2 * (simDays / 27.705); }
      function planetPos(p, scale, cx, cy){
        var a = planetAngle(p) + rot;
        var d = auR(p.au) * scale;
        return { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, r: Math.max(2.6, p.size * 4.6) };
      }
      function skyDirOf(id){
        var rec = bodies[id];
        if (!rec) return null;
        if (rec.skyStar) return rec.skyStar.dir;
        if (rec.skyDir) return rec.skyDir;
        var eps = 0.41;
        if (rec.skyPlanet){
          var lam = -planetAngle(rec.skyPlanet);
          return [Math.cos(lam), Math.sin(lam) * Math.sin(eps), Math.sin(lam) * Math.cos(eps)];
        }
        if (rec.skyMoon){
          var pl = null;
          PLANETS.forEach(function(q){ if (q.plufka) pl = q; });
          var lamM = -planetAngle(pl) - moonAngle() + 0.3;
          var d = [Math.cos(lamM), Math.sin(lamM) * Math.sin(eps) + 0.06, Math.sin(lamM) * Math.cos(eps)];
          var l = Math.sqrt(d[0]*d[0] + d[1]*d[1] + d[2]*d[2]);
          return [d[0]/l, d[1]/l, d[2]/l];
        }
        return null;
      }
      function skyAzOf(id){
        var dir = skyDirOf(id);
        if (!dir) return null;
        return Math.atan2(dir[2], dir[0]);
      }

      /* ---------- 描画 ---------- */
      var bgRng = mulberry32(777);
      var bgStars = [];
      for (var bi = 0; bi < 260; bi++) bgStars.push({ x:bgRng(), y:bgRng(), r:0.4 + bgRng() * 1.1, a:0.25 + bgRng() * 0.55 });
      var beltRng = mulberry32(4242);
      var beltDots = [];
      for (var bj = 0; bj < 420; bj++) beltDots.push({ a:beltRng() * Math.PI * 2, off:(beltRng() - 0.5), dy:(beltRng() - 0.5) });

      function drawLabel(x, y, main, sub, color){
        if (!showLabels) return;
        ctx.font = '600 11px "Zen Kaku Gothic New", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = color || '#dbe6fa';
        ctx.shadowColor = 'rgba(0,0,0,.9)'; ctx.shadowBlur = 4;
        ctx.fillText(main, x, y);
        if (sub){
          ctx.font = '400 9.5px "Zen Kaku Gothic New", sans-serif';
          ctx.fillStyle = '#9dabc6';
          ctx.fillText(sub, x, y + 12);
        }
        ctx.shadowBlur = 0;
      }
      function drawSelRing(x, y, r, color){
        ctx.beginPath();
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = color; ctx.lineWidth = 1.4;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      function drawSystem(){
        var cx = W / 2, cy = H / 2;
        var scale = (Math.min(W, H) / 2 - 26) / auR(19.54) * zoom;
        var pos = {};
        PLANETS.forEach(function(p){ if (!p.belt) pos[p.id] = planetPos(p, scale, cx, cy); });
        var beltC = { x: cx + Math.cos(rot) * auR(2.74) * scale, y: cy + Math.sin(rot) * auR(2.74) * scale };
        // 追尾中は対象が中心に来るよう全体をずらす
        var fx = 0, fy = 0;
        if (followId && followId !== 'noshih'){
          var fp = followId === 'belt' ? beltC : followId === 'misih' ? null : pos[followId];
          if (followId === 'misih' && pos['plufka']){
            var ma = moonAngle();
            fp = { x: pos['plufka'].x + Math.cos(ma) * 13, y: pos['plufka'].y + Math.sin(ma) * 13 };
          }
          if (!fp && bodies[followId] && bodies[followId].moonOf){
            var mp = pos[bodies[followId].moonOf];
            var ms = bodies[followId].moonSpec;
            var pp = null;
            PLANETS.forEach(function(q){ if (q.id === bodies[followId].moonOf) pp = q; });
            if (mp && pp){
              var mang = ms.phase + Math.PI * 2 * (simDays / ms.period);
              var mr = mp.r * (ms.dist / pp.size);
              fp = { x: mp.x + Math.cos(mang) * mr, y: mp.y + Math.sin(mang) * mr };
            }
          }
          if (fp){ fx = cx - fp.x; fy = cy - fp.y; }
        }
        cx += fx; cy += fy;
        PLANETS.forEach(function(p){ if (!p.belt) pos[p.id] = planetPos(p, scale, cx, cy); });
        beltC = { x: cx + Math.cos(rot) * auR(2.74) * scale, y: cy + Math.sin(rot) * auR(2.74) * scale };

        // ハビタブルゾーン
        if (showOrbits){
          ctx.beginPath();
          ctx.arc(cx, cy, auR(HZ_OUT) * scale, 0, Math.PI * 2);
          ctx.arc(cx, cy, auR(HZ_IN) * scale, 0, Math.PI * 2, true);
          ctx.fillStyle = 'rgba(87,217,163,.10)';
          ctx.fill();
          ctx.beginPath(); ctx.arc(cx, cy, auR(HZ_IN) * scale, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(87,217,163,.4)'; ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath(); ctx.arc(cx, cy, auR(HZ_OUT) * scale, 0, Math.PI * 2); ctx.stroke();
          drawLabel(cx - auR(HZ_OUT) * scale * 0.72, cy - auR(HZ_OUT) * scale * 0.72 - 4, 'ハビタブルゾーン', '', 'rgba(160,220,195,.8)');
          // フロストライン
          ctx.beginPath();
          ctx.setLineDash([5, 4]);
          ctx.arc(cx, cy, auR(FROST_AU) * scale, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(159,216,255,.55)'; ctx.stroke();
          ctx.setLineDash([]);
          drawLabel(cx + auR(FROST_AU) * scale * 0.72, cy + auR(FROST_AU) * scale * 0.72 + 12, 'フロストライン 3.504 AU', '', 'rgba(170,200,235,.75)');
        }
        // 軌道
        if (showOrbits){
          PLANETS.forEach(function(p){
            ctx.beginPath();
            ctx.arc(cx, cy, auR(p.au) * scale, 0, Math.PI * 2);
            ctx.strokeStyle = p.plufka ? 'rgba(127,227,208,.55)' : 'rgba(143,183,255,.30)';
            ctx.lineWidth = 1; ctx.stroke();
          });
        }
        // 小惑星帯
        ctx.fillStyle = 'rgba(201,182,148,.8)';
        beltDots.forEach(function(d){
          var a = d.a + simDays * 0.002 + rot;
          var rr = (auR(2.74) + d.off * 3.2) * scale;
          ctx.fillRect(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr + d.dy * 2, 1.6, 1.6);
        });
        hits.push({ id:'belt', x:beltC.x, y:beltC.y, r:16 });
        if (selectedId === 'belt') drawSelRing(beltC.x, beltC.y, 13, '#8fb7ff');
        drawLabel(beltC.x, beltC.y - 14, '小惑星帯', '2.74 AU');
        // 恒星
        var sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
        sg.addColorStop(0, 'rgba(255,230,190,1)');
        sg.addColorStop(0.35, 'rgba(255,179,107,.75)');
        sg.addColorStop(1, 'rgba(255,143,61,0)');
        ctx.fillStyle = sg;
        ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffc98c';
        ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2); ctx.fill();
        hits.push({ id:'noshih', x:cx, y:cy, r:16 });
        if (selectedId === 'noshih') drawSelRing(cx, cy, 15, '#ffb36b');
        drawLabel(cx, cy - 32, 'Nóshih', '恒星 ・ G9.5V', '#ffb36b');
        // 惑星・月・大型衛星
        PLANETS.forEach(function(p){
          if (p.belt) return;
          var q = pos[p.id];
          if (p.ring){
            ctx.beginPath();
            ctx.ellipse(q.x, q.y, q.r * 2.1, q.r * 0.85, 0.42, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(230,220,194,.55)'; ctx.lineWidth = 2.4; ctx.stroke();
          }
          ctx.fillStyle = cssColor(p.color);
          ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.fill();
          if (p.plufka){
            ctx.fillStyle = 'rgba(238,244,251,.85)';
            ctx.beginPath(); ctx.arc(q.x - q.r * 0.25, q.y - q.r * 0.3, q.r * 0.42, 0, Math.PI * 2); ctx.fill();
          }
          hits.push({ id:p.id, x:q.x, y:q.y, r:Math.max(q.r + 3, 13) });
          if (selectedId === p.id) drawSelRing(q.x, q.y, q.r + 6, p.plufka ? '#7fe3d0' : '#8fb7ff');
          drawLabel(q.x, q.y - q.r - 8, p.name, fmt2(p.au, p.au < 1 ? 3 : 2) + ' AU', p.plufka ? '#7fe3d0' : '#dbe6fa');
          if (p.plufka){
            var ma2 = moonAngle();
            var mx = q.x + Math.cos(ma2) * 13, my = q.y + Math.sin(ma2) * 13;
            ctx.fillStyle = '#d8dce2';
            ctx.beginPath(); ctx.arc(mx, my, 2.6, 0, Math.PI * 2); ctx.fill();
            hits.push({ id:'misih', x:mx, y:my, r:12 });
            if (selectedId === 'misih') drawSelRing(mx, my, 8, '#8fb7ff');
            drawLabel(mx, my - 10, 'Mísih', '');
          }
          var specs = LARGE_MOONS[p.id];
          if (specs){
            specs.forEach(function(s, idx){
              var mang2 = s.phase + Math.PI * 2 * (simDays / s.period);
              var mr2 = q.r * (s.dist / p.size);
              if (showOrbits){
                ctx.beginPath(); ctx.arc(q.x, q.y, mr2, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(207,224,255,.28)'; ctx.lineWidth = 1; ctx.stroke();
              }
              var mmx = q.x + Math.cos(mang2) * mr2, mmy = q.y + Math.sin(mang2) * mr2;
              var mrad = Math.max(1.8, s.r * 5.2);
              ctx.fillStyle = cssColor(s.color);
              ctx.beginPath(); ctx.arc(mmx, mmy, mrad, 0, Math.PI * 2); ctx.fill();
              var mid = p.id + '-m' + (idx + 1);
              hits.push({ id:mid, x:mmx, y:mmy, r:Math.max(mrad + 3, 11) });
              if (selectedId === mid) drawSelRing(mmx, mmy, mrad + 5, '#8fb7ff');
              drawLabel(mmx, mmy - mrad - 5, '衛星 ' + s.roman, '');
            });
          }
        });
      }
      function drawNearby(){
        var cx = W / 2, cy = H / 2;
        var scale = (Math.min(W, H) / 2 - 30) / 10.6 * zoom;
        var fx = 0, fy = 0;
        function proj(s){
          var xr = s.x * Math.cos(rot) - s.y * Math.sin(rot);
          var yr = s.x * Math.sin(rot) + s.y * Math.cos(rot);
          return { x: cx + fx + xr * scale, y: cy + fy + yr * scale };
        }
        if (followId && bodies[followId] && bodies[followId].nearby){
          var fp = proj(bodies[followId].nearby);
          fx = cx - fp.x; fy = cy - fp.y;
        }
        [5, 10].forEach(function(r){
          ctx.beginPath(); ctx.arc(cx + fx, cy + fy, r * scale, 0, Math.PI * 2);
          ctx.strokeStyle = r === 10 ? 'rgba(143,183,255,.32)' : 'rgba(143,183,255,.18)';
          ctx.lineWidth = 1; ctx.stroke();
          drawLabel(cx + fx + r * scale * 0.72, cy + fy - r * scale * 0.72 - 4, r + ' ly', '', 'rgba(170,200,235,.7)');
        });
        NEARBY.forEach(function(s){
          var q = proj(s);
          ctx.beginPath();
          ctx.moveTo(cx + fx, cy + fy); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = s.nearest ? 'rgba(143,183,255,.5)' : 'rgba(143,183,255,.15)';
          ctx.stroke();
        });
        var ng = ctx.createRadialGradient(cx + fx, cy + fy, 0, cx + fx, cy + fy, 20);
        ng.addColorStop(0, 'rgba(255,230,190,1)');
        ng.addColorStop(0.4, 'rgba(255,179,107,.7)');
        ng.addColorStop(1, 'rgba(255,143,61,0)');
        ctx.fillStyle = ng;
        ctx.beginPath(); ctx.arc(cx + fx, cy + fy, 20, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffc98c';
        ctx.beginPath(); ctx.arc(cx + fx, cy + fy, 7, 0, Math.PI * 2); ctx.fill();
        hits.push({ id:'noshih-near', x:cx + fx, y:cy + fy, r:15 });
        if (selectedId === 'noshih-near') drawSelRing(cx + fx, cy + fy, 13, '#ffb36b');
        drawLabel(cx + fx, cy + fy - 26, 'Nóshih', 'プルフカ系 ・ 原点', '#ffb36b');
        NEARBY.forEach(function(s, i){
          var q = proj(s);
          ctx.fillStyle = cssColor(starTints[i % starTints.length]);
          ctx.beginPath(); ctx.arc(q.x, q.y, 4.2, 0, Math.PI * 2); ctx.fill();
          var id = 'sys' + s.n;
          hits.push({ id:id, x:q.x, y:q.y, r:13 });
          if (selectedId === id) drawSelRing(q.x, q.y, 10, s.nearest ? '#ffd9a0' : '#8fb7ff');
          drawLabel(q.x, q.y - 12, '星系' + s.n, s.d.toFixed(2) + ' ly', s.nearest ? '#ffd9a0' : '#dbe6fa');
        });
      }
      function skyProject(dir, cx, cy, R){
        var alt = Math.asin(Math.max(-1, Math.min(1, dir[1])));
        if (alt < -0.03) return null;
        var az = Math.atan2(dir[2], dir[0]) + skyRot + skySpin;
        var r = (1 - (alt / (Math.PI / 2))) * R;
        if (r < 0) r = 0;
        return { x: cx + r * Math.sin(az), y: cy - r * Math.cos(az), alt: alt };
      }
      function drawSky(){
        var cx = W / 2, cy = H / 2;
        var R = (Math.min(W, H) / 2 - 34) * zoom;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(68,100,140,.65)'; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, R / 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(68,100,140,.25)'; ctx.stroke();
        drawLabel(cx, cy - R - 8, '', '');
        ctx.font = '600 11px "Zen Kaku Gothic New", sans-serif';
        ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(160,185,225,.85)';
        ctx.fillText('天頂', cx, cy + 4);
        var cards = [['北', 0], ['東', Math.PI / 2], ['南', Math.PI], ['西', -Math.PI / 2]];
        cards.forEach(function(c){
          var a = c[1] + skyRot + skySpin;
          ctx.fillText(c[0], cx + (R + 15) * Math.sin(a), cy - (R + 15) * Math.cos(a) + 4);
        });
        if (showLabels){
          ctx.font = '400 10px "Zen Kaku Gothic New", sans-serif';
          ctx.fillStyle = 'rgba(140,165,205,.7)';
          ctx.fillText('外周＝地平線', cx, cy + R + 22);
        }
        skyStars.forEach(function(s, idx){
          var q = skyProject(s.dir, cx, cy, R);
          if (!q) return;
          var rad = Math.max(0.6, 3.1 - s.mag * 0.42);
          ctx.globalAlpha = Math.max(0.3, Math.min(1, 1.15 - s.mag * 0.11));
          ctx.fillStyle = cssColor(s.col.c);
          ctx.beginPath(); ctx.arc(q.x, q.y, rad, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
          if (idx < 24){
            var id = 'sky-g' + idx;
            hits.push({ id:id, x:q.x, y:q.y, r:13 });
            if (selectedId === id) drawSelRing(q.x, q.y, 10, '#ffe9c4');
            drawLabel(q.x, q.y - rad - 6, GREEK[idx], fmtMag(s.mag) + ' 等', '#ffe9c4');
          }
        });
        NEARBY.forEach(function(s, i){
          var rec = bodies['sky-sys' + s.n];
          var q = skyProject(rec.skyDir, cx, cy, R);
          if (!q) return;
          ctx.fillStyle = cssColor(rec.tint);
          ctx.beginPath(); ctx.arc(q.x, q.y, 3.4, 0, Math.PI * 2); ctx.fill();
          var id = 'sky-sys' + s.n;
          hits.push({ id:id, x:q.x, y:q.y, r:12 });
          if (selectedId === id) drawSelRing(q.x, q.y, 9, s.nearest ? '#ffd9a0' : '#8fb7ff');
          drawLabel(q.x, q.y - 11, '星系' + s.n, s.d.toFixed(2) + ' ly', s.nearest ? '#ffd9a0' : '#dbe6fa');
        });
        PLANETS.forEach(function(p){
          if (p.belt || p.plufka) return;
          var dir = skyDirOf('sky-' + p.id);
          var q = skyProject(dir, cx, cy, R);
          if (!q) return;
          ctx.fillStyle = cssColor(p.color);
          ctx.beginPath(); ctx.arc(q.x, q.y, 3.2, 0, Math.PI * 2); ctx.fill();
          var id = 'sky-' + p.id;
          hits.push({ id:id, x:q.x, y:q.y, r:12 });
          if (selectedId === id) drawSelRing(q.x, q.y, 9, '#8fb7ff');
          drawLabel(q.x, q.y - 11, p.name, '惑星');
        });
        var mdir = skyDirOf('sky-misih');
        var mq = skyProject(mdir, cx, cy, R);
        if (mq){
          ctx.fillStyle = '#e9edf4';
          ctx.beginPath(); ctx.arc(mq.x, mq.y, 5, 0, Math.PI * 2); ctx.fill();
          hits.push({ id:'sky-misih', x:mq.x, y:mq.y, r:13 });
          if (selectedId === 'sky-misih') drawSelRing(mq.x, mq.y, 11, '#8fb7ff');
          drawLabel(mq.x, mq.y - 13, 'Mísih', '月');
        }
      }
      function draw(){
        ctx.fillStyle = '#04060d';
        ctx.fillRect(0, 0, W, H);
        if (view !== 'sky'){
          bgStars.forEach(function(s){
            ctx.globalAlpha = s.a;
            ctx.fillStyle = '#dfe8fa';
            ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2); ctx.fill();
          });
          ctx.globalAlpha = 1;
        }
        hits = [];
        if (view === 'system') drawSystem();
        else if (view === 'nearby') drawNearby();
        else drawSky();
      }

      /* ---------- 入力 ---------- */
      var downX = 0, downY = 0, downT = 0, dragging = false, lastX = 0, lastY = 0;
      canvas.addEventListener('pointerdown', function(e){
        downX = lastX = e.clientX; downY = lastY = e.clientY; downT = performance.now(); dragging = true;
        canvas.setPointerCapture(e.pointerId);
      });
      canvas.addEventListener('pointermove', function(e){
        if (!dragging) return;
        var dx = e.clientX - lastX;
        lastX = e.clientX; lastY = e.clientY;
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6){
          followId = null;
          if (view === 'sky') skyRot += dx * 0.005;
          else rot += dx * 0.005;
        }
      });
      canvas.addEventListener('pointerup', function(e){
        dragging = false;
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6 || performance.now() - downT > 600) return;
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left, y = e.clientY - rect.top;
        var best = null, bestD = 1e9;
        hits.forEach(function(h){
          var d = Math.hypot(x - h.x, y - h.y);
          if (d <= h.r + 4 && d < bestD){ best = h; bestD = d; }
        });
        if (best) select(best.id, false);
      });
      canvas.addEventListener('wheel', function(e){
        e.preventDefault();
        zoom = Math.max(0.45, Math.min(4, zoom * (e.deltaY < 0 ? 1.12 : 0.89)));
      }, { passive:false });

      function resize(){
        W = window.innerWidth; H = window.innerHeight;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      fbOn(window, 'resize', resize);
      resize();

      var lastNow = performance.now();
      function loop(now){
        if (!fbAlive) return;
        requestAnimationFrame(loop);
        var dt = Math.min((now - lastNow) / 1000, 0.1);
        lastNow = now;
        if (playing){
          simDays += dt * daysPerSec;
          skySpin -= dt * (Math.PI * 2 / 110) * (daysPerSec / 12);
        }
        draw();
        if (view === 'sky' && window.__skyHud){
          var azTop = (-(skyRot + skySpin) * 180 / Math.PI + 360) % 360;
          window.__skyHud.update(azTop, null, -skySpin);
        }
      }
      syncPlay();
      setInfoVisible(true);
      setView('system');
      requestAnimationFrame(loop);
    }
    // 起動判定が同期的に終わった場合はここで即起動する。WebGLの回復待ちの
    // 結果として後から有効化された場合は、__activateFallback 経由で呼ばれる。
    window.__startFallback2D = startFallback2D;
    if (window.__fallback2D) startFallback2D();
