'use strict';
    var errBox = document.getElementById('err');
    var fatalBox = document.getElementById('fatal');
    var fatalMsg = document.getElementById('fatal-msg');
    document.getElementById('fatal-reload').addEventListener('click', function(){ location.reload(); });
    // アプリ内ブラウザでは再読み込みが効かないことがあるため、再読み込みに
    // 頼らない逃げ道として、その場で2D表示へ切り替えるボタンも用意する。
    document.getElementById('fatal-2d').addEventListener('click', function(){
      if (typeof window.__activateFallback === 'function') window.__activateFallback();
    });
    window.__bootOk = false;
    window.__halted = false;
    function showFatal(text){
      // 起動できない状態では、画面下の小さな帯ではなく中央の案内に出す。
      // 下部の帯だけだと気づかれず「真っ暗で何も押せない」ままになるため。
      fatalMsg.textContent = text;
      fatalBox.classList.add('is-shown');
    }
    window.__showFatal = showFatal;
    // WebGL（three.js r186 は WebGL2 専用）が使えない端末では、致命画面で
    // 全面停止させず、Canvas 2D のフォールバック表示に切り替える。
    // フォールバック本体は末尾のスクリプトが window.__fallback2D を見て起動する。
    window.__fallback2D = false;
    window.__activateFallback = function(){
      window.__fallback2D = true;
      window.__halted = true;
      var w = document.getElementById('gl-wait');
      if (w) w.classList.remove('is-shown');
      fatalBox.classList.remove('is-shown');
      var n = document.getElementById('fallback-notice');
      if (n) n.hidden = false;
      var pill = document.getElementById('fallback-pill');
      if (pill) pill.hidden = true;
      var r = document.getElementById('fallback-retry');
      if (r && !r.__wired){
        r.__wired = true;
        r.addEventListener('click', function(){ window.__retry3D(); });
      }
      var c = document.getElementById('fallback-close');
      if (c && !c.__wired){
        c.__wired = true;
        c.addEventListener('click', function(){
          // 案内は閉じられるようにする。閉じたあとも、小さなピルから
          // いつでも3D再試行に戻れる。
          if (n) n.hidden = true;
          if (pill) pill.hidden = false;
        });
      }
      if (pill && !pill.__wired){
        pill.__wired = true;
        pill.addEventListener('click', function(){ window.__retry3D(); });
      }
      // 起動判定のタイミングによってはフォールバック本体が既に読み込み済みの
      // ことがある。その場合はここから直接起動する（未読み込みなら末尾の
      // スクリプトが __fallback2D を見て自動で起動する）。
      if (typeof window.__startFallback2D === 'function') window.__startFallback2D();
    };
    /* 2D表示から3D表示への再試行。再読み込みはアプリ内ブラウザでは
       効かないことがあるうえ、スナップショット復元されたページでは
       2D表示の状態がそのまま戻ってしまうため、再読み込みには頼らない。
       2Dフォールバックをその場で片付けてから起動ドライバをもう一度
       走らせ、3Dの生成からやり直す。 */
    window.__retry3D = function(){
      var n = document.getElementById('fallback-notice');
      if (n) n.hidden = true;
      var pill = document.getElementById('fallback-pill');
      if (pill) pill.hidden = true;
      if (typeof window.__teardownFallback === 'function') window.__teardownFallback();
      window.__fallback2D = false;
      window.__halted = false;
      if (typeof window.__runBootDriver === 'function' && typeof window.__boot3D === 'function'){
        window.__runBootDriver();
      } else {
        // 3D用プログラム自体が読み込めていない場合は、再読み込みでしか直らない
        location.reload();
      }
    };
    /* ---------- WebGL の起動判定について ----------
       以前は起動前に使い捨てキャンバスで WebGL2 を事前確認し、失敗したら
       再読み込みで回復を待つ仕組みにしていたが、それ自体が不具合の原因に
       なっていた。分割ビュー（split view）で WebView が作り直される過渡期
       など、端末は WebGL2 対応でもページ解析中の一瞬だけ取得に失敗する
       ことがあり、その一回の失敗で全体を止めてしまううえ、再読み込み
       回数の上限（URLハッシュ内のカウンタ）を使い切ると 2D 表示に固定
       され、再読み込みしてもハッシュが残って二度と 3D に戻れなかった。
       そのため事前確認は廃止した。WebGL が使えるかどうかは、実際の
       レンダラー生成そのもので判定する（3D起動ブロック側）。生成に失敗
       した場合はページを再読み込みせず、その場で時間をおいて数回だけ
       生成し直し、それでも作れない場合だけ 2D フォールバックに入る。
       旧バージョンが URL に残した回復用カウンタは、念のため掃除する。 */
    if (/glretry=/.test(location.hash || '')){
      try { history.replaceState(null, '', location.pathname + location.search); } catch (eH) {}
    }
    window.addEventListener('error', function(e){
      var msg = e.message || '';
      if (msg === '__halted__' || msg === '__glretry__') return;
      // 詳細が取得できない不透明なエラー（"Script error."）は、表示側シェルや
      // 別オリジンのスクリプトなど、このページ以外から届くことが多く、
      // このページの失敗とは限らないため、致命扱いしない。
      // 本当に致命的な失敗（three.js の読み込み失敗・WebGL不可）は
      // それぞれ明示的に検出して案内する。
      var opaque = !msg || msg === 'Script error.' || msg === 'Script error';
      if (opaque) return;
      // 描画が始まって以降のエラーは animate 側で拾うので、ここでは壊さない。
      if (window.__bootOk) return;
      showFatal('表示中に問題が発生しました: ' + msg);
    });
    window.addEventListener('unhandledrejection', function(e){
      var r = e.reason;
      var msg = r && r.message ? r.message : (typeof r === 'string' ? r : '');
      if (msg === '__halted__' || msg === '__glretry__') return;
      // 理由のない rejection は出所が特定できないため致命扱いしない。
      if (!msg) return;
      if (window.__bootOk) return;
      showFatal('表示中に問題が発生しました: ' + msg);
    });
