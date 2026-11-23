'use strict';
    /* ================= 3D 起動ドライバ =================
       まず一度そのまま起動を試みる。レンダラー生成だけが失敗した場合
       （'__glretry__'）は、「3D表示を準備しています」を出しながら、間隔を
       広げつつ最大5回まで生成からやり直す（合計で約8.6秒の猶予）。分割
       ビューの作り直しや WebView の復帰直後の一時的な失敗は、この間に
       回復する。すべて失敗した場合だけ 2D フォールバックに切り替える。
       再読み込みや URL ハッシュのカウンタは使わない。
       2D表示中の「3Dで再試行」からもこのドライバをもう一度呼ぶ。
       再読み込みに頼らないため、スナップショット復元で2D状態のまま
       戻ってきたページでも、その場で3D起動をやり直せる。 */
    var bootRunning = false;
    window.__runBootDriver = function(){
      if (bootRunning) return;
      if (window.__halted || window.__fallback2D) return;
      if (typeof window.__boot3D !== 'function'){ window.__activateFallback(); return; }
      bootRunning = true;
      var delays = [700, 1100, 1600, 2200, 3000];
      var attempt = 0;
      var waitBox = document.getElementById('gl-wait');
      function tryBoot(){
        attempt++;
        try {
          window.__boot3D();
          bootRunning = false;
          if (waitBox) waitBox.classList.remove('is-shown');
        } catch (e) {
          if (e && e.message === '__glretry__' && attempt <= delays.length){
            if (waitBox) waitBox.classList.add('is-shown');
            setTimeout(tryBoot, delays[attempt - 1]);
          } else if (e && e.message === '__glretry__'){
            bootRunning = false;
            if (waitBox) waitBox.classList.remove('is-shown');
            window.__activateFallback();
          } else {
            bootRunning = false;
            if (waitBox) waitBox.classList.remove('is-shown');
            throw e;
          }
        }
      }
      tryBoot();
    };
    window.__runBootDriver();
