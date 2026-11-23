'use strict';
    /* 夜空HUD（方位コンパスと空の回転ゲージ）の共通ヘルパー。3D版と2D版の両方から使う。 */
    window.__skyHud = (function(){
      var tape = document.getElementById('compass-tape');
      var dirEl = document.getElementById('sky-dir');
      var altEl = document.getElementById('sky-alt');
      var turnEl = document.getElementById('sky-turn-label');
      var pctEl = document.getElementById('sky-prog-pct');
      var fillEl = document.getElementById('sky-prog-fill');
      var wrapEl = document.getElementById('compass');
      var PPD = 2;
      var NAMES = { 0:'北', 45:'北東', 90:'東', 135:'南東', 180:'南', 225:'南西', 270:'西', 315:'北西' };
      var DIRS16 = ['北','北北東','北東','東北東','東','東南東','南東','南南東','南','南南西','南西','西南西','西','西北西','北西','北北西'];
      if (tape && !tape.children.length){
        for (var k = 0; k < 3; k++){
          for (var a = 0; a < 360; a += 15){
            var sp = document.createElement('span');
            var major = a % 45 === 0;
            sp.className = 'ctick' + (major ? ' major' : '');
            sp.style.left = ((k * 360 + a) * PPD) + 'px';
            sp.textContent = major ? NAMES[a] : '·';
            tape.appendChild(sp);
          }
        }
      }
      function update(azDeg, altDeg, totalRot){
        var az = ((azDeg % 360) + 360) % 360;
        if (dirEl) dirEl.textContent = DIRS16[Math.round(az / 22.5) % 16] + ' ・ 方位 ' + Math.round(az) + '°';
        if (altEl) altEl.textContent = altDeg === null ? '天頂が中心の星図' : '高度 ' + Math.round(altDeg) + '°';
        if (tape && wrapEl){
          var cx = wrapEl.clientWidth / 2;
          tape.style.transform = 'translateX(' + (cx - (360 + az) * PPD) + 'px)';
        }
        var twoPi = Math.PI * 2;
        var frac = (((totalRot % twoPi) + twoPi) % twoPi) / twoPi;
        var done = Math.max(0, Math.floor(totalRot / twoPi));
        if (fillEl) fillEl.style.width = (frac * 100).toFixed(1) + '%';
        if (pctEl) pctEl.textContent = Math.round(frac * 100) + '%';
        if (turnEl) turnEl.textContent = '空の回転 ' + done + '周完了（あと ' + Math.round((1 - frac) * 360) + '°で1周）';
      }
      return { update: update };
    })();
