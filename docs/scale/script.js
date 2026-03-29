// --- グローバル変数 ---
let dictionary = {};
const idToKey = {};
let searchResults = [];
let currentPage = 1;
const itemsPerPage = 18;
let audioCtx = null;

// 次元(Dimension)ごとのスタイル定義
const dimensionStyles = {
    "2D": "dim-2d",
    "3D": "dim-3d",
    "4D": "dim-4d",
    "5D": "dim-5d"
};

// --- 初期化処理 ---
document.addEventListener('DOMContentLoaded', () => {
    // ページ遷移・戻るボタンの制御
    const params = new URLSearchParams(location.search);
    if (params.has('id')) {
        document.body.classList.add('detail-view');
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.style.display = 'none';
        const back = document.createElement('div');
        back.className = 'back-to-top';
        document.body.insertBefore(back, document.body.firstChild);
    }

    // イベントリスナーの登録
    document.getElementById("searchBox")?.addEventListener("input", performSearch);
    document.getElementById("searchMode")?.addEventListener("change", performSearch);
    document.getElementById("prevPage")?.addEventListener("click", () => changePage(-1));
    document.getElementById("nextPage")?.addEventListener("click", () => changePage(1));

    loadDictionary();
});

// --- データ読み込み ---
async function loadDictionary() {
    try {
        const response = await fetch('scales.json');
        dictionary = await response.json();
        
        // 検索用の事前処理
        for (const [key, val] of Object.entries(dictionary)) {
            idToKey[String(val.id)] = key;
            val._normKey = normalizeForSearch(key);
            val._normJp = normalizeForSearch(val.jpname);
            val._normAliases = val.aliases ? val.aliases.map(a => normalizeForSearch(a)).join(' ') : "";
        }

        const countSpan = document.getElementById('word-count');
        if (countSpan) countSpan.textContent = Object.keys(dictionary).length;

        // URLパラメータがある場合、即座に詳細を表示
        const params = new URLSearchParams(location.search);
        const initialId = params.get("id");
        if (initialId && idToKey[initialId]) {
            showDetails(idToKey[initialId]);
        } else {
            // パラメータがない場合は全件表示などの初期状態
            searchResults = Object.keys(dictionary);
            renderPage();
        }

    } catch (e) {
        console.error("読み込みエラー:", e);
    }
}

// --- 検索・表示ロジック ---
function normalizeForSearch(input) {
    if (!input) return "";
    let s = String(input).normalize('NFKC').toLowerCase();
    return Array.from(s).map(ch => {
        const cp = ch.codePointAt(0);
        return (cp >= 0x30A1 && cp <= 0x30F6) ? String.fromCodePoint(cp - 0x60) : ch;
    }).join('');
}

// --- 検索実行関数 (周波数比・音程検索対応版) ---
function performSearch() {
    const searchBox = document.getElementById("searchBox");
    const searchMode = document.getElementById("searchMode");
    const placeholder = document.getElementById("placeholder");
    
    if (!searchBox) return;
    
    // 入力値を正規化（全角数字を半角にするなどの処理）
    const query = normalizeForSearch(searchBox.value);
    const mode = searchMode ? searchMode.value : "partial";

    // クエリが空ならリセット
    if (!query) {
        searchResults = [];
        if (placeholder) placeholder.style.display = "block";
        renderPage();
        return;
    }

    if (placeholder) placeholder.style.display = "none";

    // 検索フィルタリング
    searchResults = Object.keys(dictionary).filter(key => {
        const d = dictionary[key];
        
        // 1. 基本情報（名称・別名）の判定
        const matchKey = d._normKey.includes(query);
        const matchJp = d._normJp ? d._normJp.includes(query) : false;
        const matchAlias = d._normAliases ? d._normAliases.includes(query) : false;

        // 2. 周波数比・構成音の判定 (notes や deta の配列内を検索)
        // 配列を文字列に結合して、入力された比率が含まれているかチェック
        const notesStr = d.notes ? d.notes.join(" ") : "";
        const detaStr = d.deta ? d.deta.join(" ") : "";
        const matchRatio = notesStr.includes(query) || detaStr.includes(query);

        if (mode === "exact") {
            return d._normKey === query || d._normJp === query || d.notes.includes(query);
        } else if (mode === "prefix") {
            return d._normKey.startsWith(query) || (d._normJp && d._normJp.startsWith(query));
        } else {
            // 部分一致：名前、別名、または周波数比のいずれかがヒットすればOK
            return matchKey || matchJp || matchAlias || matchRatio;
        }
    });

    currentPage = 1;
    renderPage();
}

// --- データ読み込み時の事前計算 (修正版) ---
async function loadDictionary() {
    try {
        // ここは実際のファイルパスに合わせてください
        const response = await fetch('scales.json'); 
        dictionary = await response.json();
        
        for (const [key, val] of Object.entries(dictionary)) {
            idToKey[String(val.id)] = key;
            // 検索用の正規化データを保存
            val._normKey = normalizeForSearch(key);
            val._normJp = val.jpname ? normalizeForSearch(val.jpname) : "";
            // aliases が配列であることを確認して結合
            val._normAliases = (val.aliases && Array.isArray(val.aliases)) 
                               ? val.aliases.map(a => normalizeForSearch(a)).join(' ') 
                               : "";
        }

        const countSpan = document.getElementById('word-count');
        if (countSpan) countSpan.textContent = Object.keys(dictionary).length;

        // URLパラメータによる初期表示
        const initialId = new URLSearchParams(location.search).get("id");
        if (initialId && idToKey[initialId]) {
            showDetails(idToKey[initialId]);
        }
    } catch (e) {
        console.error("辞書の読み込みに失敗しました:", e);
    }
}

function renderPage() {
    const list = document.getElementById("wordList");
    if (!list) return;
    list.innerHTML = "";

    // 表示する範囲を決定（ページネーションがある場合）
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = searchResults.slice(start, end);

    pageItems.forEach(key => {
        const data = dictionary[key];
        const li = document.createElement("li");
        
        // 次元（3Dなど）を小文字にして 'dim-3d' のようなクラス名を作成
        const dimClass = `dim-${data.dimension.toLowerCase()}`;
        li.className = `search-item ${dimClass}`;
        
        li.innerHTML = `
            <div class="res-key">${key}</div>
            <div class="res-jp">${data.jpname}</div>
            <div class="res-dim">${data.dimension}</div>
        `;
        
        li.onclick = () => showDetails(key);
        list.appendChild(li);
    });

    updatePagination();
}

function changePage(dir) {
    currentPage += dir;
    renderPage();
}

function updatePagination() {
    const totalPages = Math.ceil(searchResults.length / itemsPerPage) || 1;
    const info = document.getElementById("pageInfo");
    if (info) info.textContent = `${currentPage} / ${totalPages}`;
    
    document.getElementById("prevPage").disabled = (currentPage <= 1);
    document.getElementById("nextPage").disabled = (currentPage >= totalPages);
}

// --- 詳細表示とスケール切り替え ---
function loadScale(key) {
    showDetails(key);
    const id = dictionary[key].id;
    const newUrl = `${location.pathname}?id=${id}`;
    history.pushState({key: key}, "", newUrl);
}

function getMaxLimit(notes) {
    let maxPrime = 3;
    notes.forEach(note => {
        const exp = getPrimeExponents(note);
        if (exp.w !== 0) maxPrime = 11;
        else if (exp.z !== 0 && maxPrime < 7) maxPrime = 7;
        else if (exp.y !== 0 && maxPrime < 5) maxPrime = 5;
    });
    return maxPrime;
}

// showDetails
function showDetails(key) {
    const data = dictionary[key];
    if (!data) return;

    // --- URLを更新する処理を追加 ---
    // 第2引数はタイトル（空でOK）、第3引数が新しいURL
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?id=${data.id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    // 詳細画面のクラス付与（サイドバーを隠すなど）
    document.body.classList.add('detail-view');
    const details = document.getElementById("details");
    
    // 次元の文字列(3D)をクラス名用の形式(dim-3d)に変換
    const dimClass = `dim-${data.dimension.toLowerCase()}`;
    
    const limit = getMaxLimit(data.notes);
    const relatedHtml = (data.related && Array.isArray(data.related)) 
        ? data.related.map(relId => {
            const targetKey = idToKey[String(relId)]; // IDからスケール名(キー)を取得
            if (targetKey) {
                // クリック時に showDetails を再実行するリンクを生成
                return `<a href="javascript:void(0)" class="related-link" onclick="showDetails('${targetKey}')">${targetKey}</a>`;
            }
            return ""; // IDが見つからない場合は表示しない
        }).filter(html => html !== "").join(", ") 
        : "";

    const notesHtml = data.notes.map(n => 
        `<button class="note-btn" onclick="playNote('${n}')">${n}</button>`
    ).join("");

    details.innerHTML = `
        <div class="detail-container">
            <div class="scale-header">
                <h2 class="${dimClass}">${key} <small>(${data.jpname})</small></h2>
                <button class="play-all" onclick="playScale('${key}')">全音再生 🎵</button>
            </div>
            <table class="detailTable">
                <tr><th>次元</th><td>${data.dimension}</td></tr>
                ${data.aliases && data.aliases.length > 0 ? `<tr><th>別名</th><td>${data.aliases.join(", ")}</td></tr>` : ""}
                <tr><th>構成音</th><td>${notesHtml}</td></tr>
                <tr><th>比率データ</th><td>${data.deta.join(" , ")}</td></tr>
                ${relatedHtml ? `<tr><th>関連</th><td>${relatedHtml}</td></tr>` : ""}
            </table>
            <div class="lattice-section">
                <h3>${limit}-limit Lattice Graph</h3>
                ${renderLatticeSVG(data.notes)}
            </div>
        </div>
    `;
}

// --- オーディオ・音律解析ロジック ---
function getAudioContext() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function parseRatio(ratioStr) {
    let num, den;
    const s = ratioStr.trim();
    if (s.startsWith('/')) { num = 1; den = Number(s.substring(1)); }
    else if (s.includes('/')) { [num, den] = s.split('/').map(Number); }
    else { num = Number(s); den = 1; }
    let ratio = num / den;
    if (ratio <= 0) return 1;
    while (ratio < 1) ratio *= 2;
    while (ratio > 2) ratio /= 2;
    return ratio;
}

window.playNote = function(ratioStr) {
    const ctx = getAudioContext();
    const waveform = document.getElementById('waveformSelect')?.value || 'triangle';
    const baseFreq = parseFloat(document.getElementById('baseFreqInput')?.value) || 440;
    const freq = baseFreq * parseRatio(ratioStr);
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = waveform;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // ディケイ（音量減衰）の削除と調整
    const duration = 0.2; // 音が鳴っている時間（秒）
    const release = 0.02; // ブツ切りノイズ防止用の極小フェードアウト
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    // 1.5秒の長い減衰を消し、一定時間後に一気に落とす
    gain.gain.setValueAtTime(0.2, ctx.currentTime + duration);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration + release);
    
    osc.connect(gain).connect(ctx.destination);
    
    osc.start();
    // 停止時間も短く変更
    osc.stop(ctx.currentTime + duration + release);
};

window.playScale = function(key) {
    const data = dictionary[key];
    if (!data || !data.deta) return;

    // 再生速度の向上
    const speed = 200; 

    data.deta.forEach((ratio, i) => {
        setTimeout(() => playNote(ratio), i * speed);
    });
};

// 格子グラフ生成ロジック
function getPrimeExponents(ratioStr) {
    let num, den;
    const s = ratioStr.trim();
    if (s === "1" || s === "1/1") return { x: 0, y: 0, z: 0, w: 0 };
    if (s.startsWith('/')) { num = 1; den = Number(s.substring(1)); }
    else if (s.includes('/')) { [num, den] = s.split('/').map(Number); }
    else { num = Number(s); den = 1; }

    const countExp = (n, p) => {
        let count = 0;
        let temp = Math.abs(n);
        while (temp > 0 && temp % p === 0) { count++; temp /= p; }
        return count;
    };

    return {
        x: countExp(num, 3) - countExp(den, 3), // 3-limit
        y: countExp(num, 5) - countExp(den, 5), // 5-limit
        z: countExp(num, 7) - countExp(den, 7), // 7-limit
        w: countExp(num, 11) - countExp(den, 11) // 11-limit
    };
}

function renderLatticeSVG(notes) {
    const unit = 45;
    const zOff = 30; 
    const wOff = 30;
    const limit = getMaxLimit(notes);

    // 1. 実在するノードの解析
    const realNodes = notes.map(n => ({
        note: n,
        coord: getPrimeExponents(n),
        isVirtual: false
    }));

    // 2. 格子の範囲（境界）を計算して補完用のノードを作成
    const getBounds = (key) => ({
        min: Math.min(...realNodes.map(n => n.coord[key])),
        max: Math.max(...realNodes.map(n => n.coord[key]))
    });
    const bounds = { x: getBounds('x'), y: getBounds('y'), z: getBounds('z'), w: getBounds('w') };

    const allNodesMap = new Map();
    // 補完ループ（範囲内をすべて埋める）
    for (let x = bounds.x.min; x <= bounds.x.max; x++) {
        for (let y = bounds.y.min; y <= bounds.y.max; y++) {
            for (let z = bounds.z.min; z <= bounds.z.max; z++) {
                for (let w = bounds.w.min; w <= bounds.w.max; w++) {
                    const key = `${x},${y},${z},${w}`;
                    allNodesMap.set(key, { note: "", isVirtual: true, coord: { x, y, z, w } });
                }
            }
        }
    }
    // 実在するノードで上書き
    realNodes.forEach(n => {
        const key = `${n.coord.x},${n.coord.y},${n.coord.z},${n.coord.w}`;
        allNodesMap.set(key, n);
    });

    // 3. 投影計算
    const project = (c) => ({
        px: (c.x * unit) + (c.z * zOff) + (c.w * wOff),
        py: (-c.y * unit) - (c.z * zOff * 0.5) - (c.w * wOff * 0.8)
    });

    const nodesArr = Array.from(allNodesMap.values()).map(n => ({ ...n, ...project(n.coord) }));
    
    // 描画範囲計算
    const pxs = nodesArr.map(n => n.px), pys = nodesArr.map(n => n.py);
    const minX = Math.min(...pxs) - 40, maxX = Math.max(...pxs) + 40;
    const minY = Math.min(...pys) - 40, maxY = Math.max(...pys) + 40;

    let svg = `<div class="lattice-graph-container">
                <div class="lattice-label-small">${limit}-limit Lattice (Diagonal=7,11)</div>
                <svg viewBox="${minX} ${minY} ${maxX - minX} ${maxY - minY}" class="lattice-svg">`;

    // 4. エッジ（線）の描画
    svg += '<g class="lattice-edges">';
    for (let i = 0; i < nodesArr.length; i++) {
        for (let j = i + 1; j < nodesArr.length; j++) {
            const a = nodesArr[i].coord, b = nodesArr[j].coord;
            const dx = Math.abs(a.x - b.x), dy = Math.abs(a.y - b.y), dz = Math.abs(a.z - b.z), dw = Math.abs(a.w - b.w);

            if (dx + dy + dz + dw === 1) {
                const isV = nodesArr[i].isVirtual || nodesArr[j].isVirtual;
                let typeClass = dx === 1 ? "edge-3" : dy === 1 ? "edge-5" : dz === 1 ? "edge-7" : "edge-11";
                
                svg += `<line x1="${nodesArr[i].px}" y1="${nodesArr[i].py}" 
                              x2="${nodesArr[j].px}" y2="${nodesArr[j].py}" 
                              class="lattice-edge ${typeClass} ${isV ? 'edge-virtual' : ''}" />`;
            }
        }
    }
    svg += '</g>';

    // 5. ノード（円とラベル）の描画
    nodesArr.forEach(n => {
        const isRoot = (n.coord.x === 0 && n.coord.y === 0 && n.coord.z === 0 && n.coord.w === 0);
        const nodeClass = n.isVirtual ? 'virtual-node' : (isRoot ? 'root-node' : 'real-node');
        
        svg += `<circle cx="${n.px}" cy="${n.py}" r="${n.isVirtual ? 2 : 8}" class="lattice-node ${nodeClass}" />`;
        if (!n.isVirtual) {
            svg += `<text x="${n.px}" y="${n.py}" dy=".35em" class="lattice-label">${n.note}</text>`;
        }
    });

    return svg + `</svg></div>`;
}

window.onpopstate = function(event) {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    
    if (id && idToKey[id]) {
        showDetails(idToKey[id]);
    } else {
        // IDがない場合は一覧画面に戻す
        document.body.classList.remove('detail-view');
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.style.display = 'block';
        const details = document.getElementById("details");
        if (details) details.innerHTML = "";
        renderPage();
    }
};
