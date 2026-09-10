/* ============ Haven · 核心逻辑 ============ */

const LS = {
  spots: 'vibe2_spots',
  favs: 'vibe2_favs',
  hist: 'vibe2_hist',
  prof: 'vibe2_prof',
  ver: 'vibe2_ver',
  dev: 'haven_device',
  admin: 'haven_admin_code'
};
const DATA_VER = 3;

const STYLE_TAGS = ['复古艺术', '法式温柔', '港风', '清冷高级', '日系', '暗黑氛围感', '落日氛围感', '工业风', '胶片感', '街拍'];
const SCENE_TYPES = ['餐厅', '咖啡馆', '博物馆展馆', '老街街道', '公园', '商圈', '废墟老建筑'];
const CITIES = ['香港', '台北', '上海', '广州', '成都', '北京', '深圳', '杭州', '澳门'];
const SUGGESTIONS = ['复古博物馆', '尖沙咀', '落日氛围感', '法式咖啡馆', '老街街道', '免费'];
const CITY_COORDS = {
  '香港': [22.3193, 114.1694], '台北': [25.033, 121.5654], '上海': [31.2304, 121.4737],
  '广州': [23.1291, 113.2644], '成都': [30.5728, 104.0668], '北京': [39.9042, 116.4074],
  '深圳': [22.5431, 114.0579], '杭州': [30.2741, 120.1551], '澳门': [22.1987, 113.5439]
};

/* 常用片区 / 地标坐标：用于把用户输入的地点名解析成真实位置（本地演示用） */
const PLACE_COORDS = {
  '浅水湾': [22.2365, 114.1972], '深水湾': [22.2440, 114.1880], '赤柱': [22.2198, 114.2138],
  '石澳': [22.2350, 114.2490], '大浪湾': [22.2510, 114.2480], '西贡': [22.3819, 114.2733],
  '尖沙咀': [22.2970, 114.1680], '尖东': [22.2950, 114.1770], '铜锣湾': [22.2805, 114.1840],
  '湾仔': [22.2760, 114.1740], '金钟': [22.2780, 114.1660], '中环': [22.2810, 114.1570],
  '上环': [22.2860, 114.1510], '西环': [22.2870, 114.1350], '坚尼地城': [22.2850, 114.1280],
  '深水埗': [22.3300, 114.1620], '旺角': [22.3180, 114.1680], '油麻地': [22.3120, 114.1710],
  '佐敦': [22.3050, 114.1700], '九龙城': [22.3280, 114.1920], '观塘': [22.3110, 114.2260],
  '鲗鱼涌': [22.2860, 114.2120], '北角': [22.2910, 114.1960], '大坑': [22.2760, 114.1910],
  '跑马地': [22.2690, 114.1860], '山顶': [22.2710, 114.1490], '大潭': [22.2530, 114.2130],
  '沙田': [22.3810, 114.1900], '大埔': [22.4450, 114.1700], '元朗': [22.4440, 114.0220],
  '屯门': [22.3910, 113.9760], '大澳': [22.2540, 113.8630], '东涌': [22.2880, 113.9420],
  '长洲': [22.2080, 114.0280], '南丫岛': [22.2000, 114.1300],
  '路环': [22.1150, 113.5520], '官也街': [22.1550, 113.5560], '大三巴': [22.1980, 113.5410],
  '西门町': [25.0430, 121.5050], '大稻埕': [25.0550, 121.5100], '淡水': [25.1820, 121.4165],
  '北投': [25.1330, 121.5000], '士林': [25.0910, 121.5250], '中山': [25.0520, 121.5210],
  '松山': [25.0460, 121.5610], '信义': [25.0330, 121.5650], '大安': [25.0260, 121.5430],
  '东区': [25.0410, 121.5560], '万华': [25.0330, 121.4990], '中正': [25.0311, 121.5110],
  '武康路': [31.2100, 121.4370], '安福路': [31.2100, 121.4440], '愚园路': [31.2220, 121.4350],
  '巨鹿路': [31.2180, 121.4560], '永康路': [31.2100, 121.4670], '淮海路': [31.2210, 121.4580],
  '外滩': [31.2405, 121.4875], '田子坊': [31.2100, 121.4650], '新天地': [31.2210, 121.4770],
  '静安': [31.2240, 121.4550], '徐汇': [31.1900, 121.4370], '法租界': [31.2100, 121.4500],
  '沙面': [23.1072, 113.2400], '永庆坊': [23.1180, 113.2410], '东山口': [23.1200, 113.2950],
  '北京路': [23.1250, 113.2710], '越秀': [23.1291, 113.2640], '天河': [23.1290, 113.3610],
  '春熙路': [30.6530, 104.0810], '太古里': [30.6520, 104.0830], '东郊记忆': [30.6700, 104.1300],
  '宽窄巷子': [30.6700, 104.0550], '玉林': [30.6290, 104.0610], '镗钯街': [30.6550, 104.0840],
  '三里屯': [39.9360, 116.4550], '南锣鼓巷': [39.9380, 116.4030], '五道营': [39.9490, 116.4100],
  '798': [39.9850, 116.4960], '什刹海': [39.9400, 116.3830], '鼓楼': [39.9400, 116.3930],
  '前门': [39.8990, 116.3980], '东交民巷': [39.9040, 116.4170], '杨梅竹斜街': [39.8940, 116.3890],
  '华侨城': [22.5390, 113.9800], '南山': [22.5220, 113.9300], '蛇口': [22.4850, 113.9170],
  '海上世界': [22.4860, 113.9170], '福田': [22.5410, 114.0550], '罗湖': [22.5430, 114.1180],
  '盐田': [22.5800, 114.2700], '大鹏': [22.5950, 114.4740], '科技园': [22.5405, 113.9340],
  '西湖': [30.2550, 120.1200], '湖滨': [30.2590, 120.1650], '小河直街': [30.3000, 120.1410],
  '天目里': [30.2880, 120.0960], '拱墅': [30.3190, 120.1410], '良渚': [30.3780, 120.0200]
};
function resolvePlaceCoords(inputs) {
  const text = (Array.isArray(inputs) ? inputs : [inputs]).filter(Boolean).join(' ');
  const keys = Object.keys(PLACE_COORDS).sort((a, b) => b.length - a.length);
  for (const k of keys) if (text.includes(k)) return PLACE_COORDS[k];
  return null;
}

/* 地区关键词 -> 城市，用于从“尖沙咀的某餐厅”这类输入推断城市 */
const DISTRICT_CITY = {
  '尖沙咀': '香港', '铜锣湾': '香港', '中环': '香港', '上环': '香港', '西环': '香港', '深水埗': '香港',
  '旺角': '香港', '油麻地': '香港', '湾仔': '香港', '金钟': '香港', '观塘': '香港', '鲗鱼涌': '香港',
  '北角': '香港', '大坑': '香港', '赤柱': '香港', '西贡': '香港', '元朗': '香港', '尖东': '香港',
  '大稻埕': '台北', '西门町': '台北', '信义': '台北', '东区': '台北', '中山': '台北', '松山': '台北',
  '淡水': '台北', '北投': '台北', '士林': '台北', '大安': '台北', '万华': '台北', '中正': '台北', '内湖': '台北',
  '武康路': '上海', '外滩': '上海', '淮海路': '上海', '徐汇': '上海', '静安': '上海', '田子坊': '上海',
  '新天地': '上海', '安福路': '上海', '愚园路': '上海', '巨鹿路': '上海', '永康路': '上海', '法租界': '上海',
  '东山口': '广州', '沙面': '广州', '永庆坊': '广州', '北京路': '广州', '天河': '广州', '越秀': '广州', '荔湾': '广州',
  '春熙路': '成都', '太古里': '成都', '东郊记忆': '成都', '宽窄巷子': '成都', '玉林': '成都', '望平街': '成都',
  '镗钯街': '成都', '猛追湾': '成都', '奎星楼': '成都', '锦江': '成都', '青羊': '成都',
  '三里屯': '北京', '南锣鼓巷': '北京', '五道营': '北京', '798': '北京', '什刹海': '北京', '鼓楼': '北京',
  '景山': '北京', '前门': '北京', '东交民巷': '北京', '杨梅竹斜街': '北京', '国子监': '北京',
  '华侨城': '深圳', '南山': '深圳', '蛇口': '深圳', '海上世界': '深圳', '福田': '深圳', '罗湖': '深圳',
  '盐田': '深圳', '大鹏': '深圳', '科技园': '深圳',
  '西湖': '杭州', '湖滨': '杭州', '小河直街': '杭州', '天目里': '杭州', '拱墅': '杭州', '滨江': '杭州', '良渚': '杭州',
  '官也街': '澳门', '路环': '澳门', '大三巴': '澳门', '氹仔': '澳门', '恋爱巷': '澳门', '妈阁': '澳门'
};

const SCENE_EMOJI = { '餐厅': '🍽️', '咖啡馆': '☕', '博物馆展馆': '🏛️', '老街街道': '🛤️', '公园': '🌳', '商圈': '🛍️', '废墟老建筑': '🏚️' };
const SCENE_PALETTE = {
  '餐厅': ['#B0805C', '#4A3F45'], '咖啡馆': ['#A9715B', '#6F8F7B'], '博物馆展馆': ['#6E5A4A', '#2F2A2E'],
  '老街街道': ['#5F6A72', '#C9B79C'], '公园': ['#7D9B76', '#C7D8B8'], '商圈': ['#2E3A5C', '#7B8AA8'],
  '废墟老建筑': ['#6D4C41', '#263238']
};

/* 示例配图：在线加载真实图，离线自动切换为渐变占位图 */
/* 示例数据已清空：应用只展示真实内容（自己上传、审核通过后公开） */
const starterSpots = [];
const moreSpots = [];
/* ---------- 工具函数 ---------- */
function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function oneLine(value, len) {
  const s = String(value || '').replace(/\n/g, ' ');
  return s.length > (len || 52) ? s.slice(0, (len || 52)) + '…' : s;
}
function fmtTime(t) {
  const d = new Date(t);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getMonth() + 1}月${d.getDate()}日 ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function uid() {
  return 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

/* 离线可用：真实图加载失败时自动切换为渐变占位图 */
function placeholder(spot, i) {
  const [c1, c2] = spot.palette || ['#9AA5B1', '#4B5563'];
  const emoji = spot.emoji || '📷';
  const name = esc(spot.name).slice(0, 16);
  const a = ((i || 0) * 37) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><defs><linearGradient id="g" gradientTransform="rotate(${a} .5 .5)"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="800" height="1000" fill="url(#g)"/><circle cx="${200 + (i || 0) * 70}" cy="${180 + (i || 0) * 40}" r="220" fill="rgba(255,255,255,.09)"/><circle cx="640" cy="${760 - (i || 0) * 50}" r="260" fill="rgba(0,0,0,.10)"/><text x="400" y="470" font-size="190" text-anchor="middle">${emoji}</text><text x="400" y="880" font-size="44" fill="rgba(255,255,255,.9)" text-anchor="middle" font-family="sans-serif">${name}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
function imgSrc(spot, i) {
  const imgs = spot.images || [];
  const src = imgs[i];
  if (typeof src === 'string' && (src.startsWith('data:') || src.startsWith('http'))) return src;
  return placeholder(spot, i);
}
function imgTag(spot, i, cls, alt) {
  const real = typeof (spot.images || [])[i] === 'string' && (spot.images[i] || '').startsWith('http');
  const src = imgSrc(spot, i);
  return `<img class="${cls || ''}" alt="${esc(alt || spot.name)}" src="${src}"${real ? ` onerror="this.onerror=null;this.src='${placeholder(spot, i)}'"` : ''} loading="lazy">`;
}

/* ---------- 存储 ---------- */
function loadLS(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch (e) { return def; }
}
function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { toast('本地存储空间不足，请删除部分照片'); return false; }
}
function profile() {
  return Object.assign({
    nickname: '氛围捕手',
    bio: '喜欢探店、人像和城市散步',
    avatar: '',
    interests: [],
    theme: 'system',
    lang: 'auto',
    onboarded: false
  }, loadLS(LS.prof, {}));
}
/* ---------- 语言（跟随系统 / 简 / 繁 / 英） ---------- */
function profileLang() {
  const set = profile().lang || 'auto';
  if (set === 'en' || set === 'zh-Hans' || set === 'zh-Hant') return set;
  const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
  for (let i = 0; i < list.length; i++) {
    const l = String(list[i] || '').toLowerCase();
    if (l.indexOf('zh') === 0) {
      if (/hant|tw|hk|mo/.test(l)) return 'zh-Hant';
      return 'zh-Hans';
    }
    if (l.indexOf('en') === 0) return 'en';
  }
  return 'en';
}
function langLabel(v) {
  if (v === 'en') return 'English';
  if (v === 'zh-Hant') return '繁體中文';
  if (v === 'zh-Hans') return '简体中文';
  return '跟随系统 / System';
}
function applyLang() {
  if (!window.HavenI18n) return;
  try { window.HavenI18n.apply(profileLang()); } catch (e) { /* 忽略 */ }
}
let langTimer = null;
function scheduleLang() {
  clearTimeout(langTimer);
  langTimer = setTimeout(applyLang, 60);
}
function setLang(v) {
  const p = profile();
  p.lang = v;
  saveLS(LS.prof, p);
  render();
  toast(v === 'auto' ? '已跟随系统语言' : '语言已切换');
}

let spots = loadLS(LS.spots, null);
if (!spots || loadLS(LS.ver, 0) !== DATA_VER) {
  const mine = (spots || []).filter((s) => s.mine);
  spots = [...starterSpots, ...moreSpots, ...mine];
  saveLS(LS.spots, spots);
  saveLS(LS.ver, DATA_VER);
}
let favs = new Set(loadLS(LS.favs, []));
let history = loadLS(LS.hist, []);
function approvedSpots() { return spots.filter((s) => s.status === 'approved'); }
function persistSpots() { saveLS(LS.spots, spots); }
function persistFavs() { saveLS(LS.favs, [...favs]); }

/* ---------- 云端（Supabase） ---------- */
const CLOUD = (window.HavenData && window.HavenData.enabled) ? window.HavenData : null;
function deviceId() {
  let d = loadLS(LS.dev, null);
  if (!d) {
    d = 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    saveLS(LS.dev, d);
  }
  return d;
}
function adminCode() { return loadLS(LS.admin, '8888'); }
function cloudWrite(promise, okMsg, failMsg) {
  if (!promise || !promise.then) return;
  promise.then(() => { if (okMsg) toast(okMsg); })
    .catch((e) => toast((failMsg || '云端同步失败') + '：' + String((e && e.message) || e).slice(0, 60)));
}
async function uploadImages(images, spotId) {
  if (!CLOUD) return images;
  const out = [];
  for (let i = 0; i < images.length; i++) {
    const src = images[i];
    if (typeof src === 'string' && src.startsWith('data:')) {
      try {
        out.push(await CLOUD.uploadPhoto(src, spotId + '-' + Date.now() + '-' + i + '.jpg'));
        continue;
      } catch (e) { /* 上传失败则保留原图，稍后可重试 */ }
    }
    out.push(src);
  }
  return out;
}
async function loadCloudSpots(showToast) {
  if (!CLOUD) return false;
  try {
    const rows = await CLOUD.list();
    const me = deviceId();
    spots = rows.map((s) => { s.mine = s.deviceId === me; return s; });
    saveLS(LS.spots, spots);
    saveLS(LS.ver, DATA_VER);
    state.cloud.ready = true;
    state.cloud.error = '';
    render();
    if (showToast) toast('已连接云端 · ' + spots.length + ' 个打卡点');
    return true;
  } catch (e) {
    state.cloud.ready = false;
    state.cloud.error = String((e && e.message) || e);
    if (showToast) toast('云端连接失败，先使用本地缓存');
    return false;
  }
}
/* 把之前存在本机、还没上传过的投稿同步到云端 */
async function syncLocalToCloud() {
  if (!CLOUD || state.cloud.syncing) return;
  const cached = loadLS(LS.spots, []) || [];
  const cloudIds = new Set(spots.map((s) => s.id));
  const pending = cached.filter((s) => s.mine && !cloudIds.has(s.id));
  if (!pending.length) return;
  const me = deviceId();
  state.cloud.syncing = true;
  let done = 0;
  for (let i = 0; i < pending.length; i++) {
    const s = pending[i];
    try {
      s.deviceId = s.deviceId || me;
      s.mine = true;
      if (s.status !== 'pending' && s.status !== 'approved') s.status = 'pending';
      s.images = await uploadImages(s.images || [], s.id);
      await CLOUD.insert(s);
      done++;
    } catch (e) { /* 单条失败不影响其它 */ }
  }
  state.cloud.syncing = false;
  if (done) {
    toast('已把 ' + done + ' 条本地投稿同步到云端');
    await loadCloudSpots(false);
  }
}

/* ---------- 状态与路由 ---------- */
const state = {
  style: null,
  scene: null,
  exploreCap: null,
  exploreId: null,
  explorePop: false,
  mapLive: false,
  mapScene: null,
  mapStyle: null,
  mapExpand: false,
  mapFocus: null,
  routeProfile: 'driving',
  cloud: { ready: false, syncing: false, error: '' },
  adminOk: false,
  q: '',
  city: '',
  free: false,
  indoor: '',
  upload: freshUpload(),
  editingId: null,
  detail: null,
  prev: '',
  now: ''
};

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}
function switchTab(tab) {
  go('#/' + tab);
}
function goBack() {
  go(state.prev || '#/home');
}
function render(opts) {
  const sy = window.scrollY;
  const hash = location.hash || '#/home';
  const m = hash.match(/^#\/spot\/(.+)$/);
  const mEdit = hash.match(/^#\/edit\/(.+)$/);
  const path = m ? 'spot' : mEdit ? 'edit' : (hash.slice(2).split('/')[0] || 'home');
  const param = m ? decodeURIComponent(m[1]) : mEdit ? decodeURIComponent(mEdit[1]) : null;
  document.body.classList.toggle('hide-tab', path === 'spot');
  const v = document.getElementById('view');
  if (path === 'home') renderHome(v);
  else if (path === 'search') renderSearch(v);
  else if (path === 'map') renderMap(v);
  else if (path === 'edit') renderEdit(v, param);
  else if (path === 'spot') renderDetail(v, param);
  else if (path === 'upload') renderUpload(v);
  else if (path === 'favorites') renderFavorites(v);
  else if (path === 'records') renderRecords(v);
  else if (path === 'profile') renderProfile(v);
  else if (path === 'myuploads') renderMyUploads(v);
  else if (path === 'admin') renderAdmin(v);
  else renderHome(v);
  enableChipScroll();
  v.classList.remove('view-anim');
  void v.offsetWidth;
  v.classList.add('view-anim');
  updateTabs(path);
  applyLang();
  if (opts && opts.keepScroll) requestAnimationFrame(() => window.scrollTo(0, sy));
}
function updateTabs(path) {
  document.querySelectorAll('.tab-item').forEach((b) => b.classList.toggle('on', b.dataset.tab === path));
}
window.addEventListener('hashchange', () => {
  state.prev = state.now;
  state.now = location.hash || '#/home';
  render();
});
state.now = location.hash || '#/home';

/* ---------- 首页 ---------- */
function homeList() {
  return approvedSpots();
}
function chipBtn(type, val) {
  const on = state[type] === val;
  return `<button class="chip ${on ? 'on' : ''}" onclick="toggleChip('${type}','${val}')">${val}</button>`;
}
function toggleChip(type, val) {
  state[type] = state[type] === val ? null : val;
  render();
}
/* ---------- 探索地图首页 ---------- */
const EXPLORE_CAPS = [
  { label: 'Cafés', scenes: ['咖啡馆', '餐厅'] },
  { label: 'Galleries', scenes: ['博物馆展馆'] },
  { label: 'Bookstore', scenes: ['商圈'] },
  { label: 'Viewpoint Spot', scenes: ['老街街道', '公园', '废墟老建筑'] }
];
const EXPLORE_SLOTS = [
  [90, 140], [260, 320], [120, 440], [300, 420], [200, 520],
  [340, 540], [80, 640], [260, 660], [360, 700]
];
function explorePool() {
  let list = approvedSpots();
  const cap = state.exploreCap && EXPLORE_CAPS.find((c) => c.label === state.exploreCap);
  if (cap) list = list.filter((s) => cap.scenes.includes(s.sceneType));
  return list;
}
function selectSpot(id) { state.exploreId = id; state.explorePop = true; render(); }
function closePop() { state.explorePop = false; render(); }
function toggleCap(label) {
  state.exploreCap = state.exploreCap === label ? null : label;
  state.exploreId = null; state.explorePop = false;
  render();
}
function renderMapExplore(v) {
  const pool = explorePool();
  const activeId = state.exploreId && pool.some((s) => s.id === state.exploreId) ? state.exploreId : (pool[0] ? pool[0].id : null);
  const popSpot = state.explorePop && activeId ? spots.find((s) => s.id === activeId) : null;
  const dots = pool.slice(0, EXPLORE_SLOTS.length).map((s, i) => {
    const [x, y] = EXPLORE_SLOTS[i];
    const active = s.id === activeId;
    const body = active
      ? '<circle class="pulse-ring" cx="0" cy="0" r="22" fill="#D4B886" opacity="0.25"/><path d="M0 -30 C-12 -30 -22 -20 -22 -8 C-22 6 0 26 0 26 C0 26 22 6 22 -8 C22 -20 12 -30 0 -30 Z" fill="#D4B886"/><circle cx="0" cy="-10" r="6" fill="#F7F8FA"/>'
      : '<path d="M0 -26 C-10 -26 -18 -18 -18 -8 C-18 4 0 22 0 22 C0 22 18 4 18 -8 C18 -18 10 -26 0 -26 Z" fill="#88909B"/><circle cx="0" cy="-10" r="5" fill="#F7F8FA"/>';
    return `<g transform="translate(${x}, ${y})" class="map-pin-g" onclick="selectSpot('${s.id}')" role="button" aria-label="${esc(s.name)}">${body}</g>`;
  }).join('');
  v.innerHTML = `
    <div class="explore">
      <svg class="map-svg" viewBox="0 0 400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="#D8DCE2" opacity="0.55"/>
          </pattern>
        </defs>
        <rect x="0" y="520" width="400" height="380" fill="url(#dots)"/>
        <path d="M0 780 Q90 740 180 760 T400 720" stroke="#D8DCE2" stroke-width="1" fill="none" opacity="0.7"/>
        <path d="M0 820 Q110 790 220 810 T400 780" stroke="#D8DCE2" stroke-width="1" fill="none" opacity="0.6"/>
        <path d="M0 860 Q100 840 200 855 T400 830" stroke="#D8DCE2" stroke-width="1" fill="none" opacity="0.5"/>
        <path d="M-20 180 Q70 160 140 200 T260 230 T420 210" stroke="#C9CFD7" stroke-width="1.4" fill="none"/>
        <path d="M400 340 Q300 320 220 360 T120 430 T-20 410" stroke="#C9CFD7" stroke-width="1.4" fill="none"/>
        <path d="M180 -20 Q210 90 170 180 T140 340 T180 500" stroke="#D8DCE2" stroke-width="1.2" fill="none"/>
        <path d="M80 600 Q140 560 210 590 T320 610" stroke="#D8DCE2" stroke-width="1.2" fill="none"/>
        <path d="M40 420 Q100 440 160 430" stroke="#D8DCE2" stroke-width="0.8" fill="none"/>
        <path d="M260 440 Q320 460 380 450" stroke="#D8DCE2" stroke-width="0.8" fill="none"/>
        <path d="M340 120 Q360 180 340 240" stroke="#D8DCE2" stroke-width="0.8" fill="none"/>
        <path d="M60 260 Q120 280 180 270" stroke="#D8DCE2" stroke-width="0.8" fill="none"/>
        <path d="M220 640 Q260 680 240 720" stroke="#D8DCE2" stroke-width="0.8" fill="none"/>
        <path d="M420 500 Q360 540 300 530 T200 550" stroke="#D8DCE2" stroke-width="0.7" fill="none"/>
        <path d="M420 560 Q350 590 280 580 T180 600" stroke="#D8DCE2" stroke-width="0.7" fill="none"/>
        <g transform="translate(140, 100)">
          <circle cx="0" cy="0" r="18" stroke="#D8DCE2" stroke-width="1.4" fill="none"/>
          <circle cx="0" cy="0" r="10" stroke="#D8DCE2" stroke-width="1" fill="none"/>
          <circle cx="0" cy="0" r="3" fill="#D8DCE2"/>
        </g>
        <g transform="translate(340, 80)">
          <circle cx="0" cy="0" r="20" stroke="#D8DCE2" stroke-width="1.4" fill="none"/>
          <circle cx="0" cy="0" r="12" stroke="#D8DCE2" stroke-width="1" fill="none"/>
          <circle cx="0" cy="0" r="3.5" fill="#D8DCE2"/>
        </g>
        ${dots}
      </svg>

      <header class="explore-head">
        <h1 class="explore-title">地图</h1>
        <div class="head-actions">
          <button class="round-add explore-add" onclick="openLiveMap()" aria-label="真实地图定位">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="17" y2="12"/><line x1="7" y1="12" x2="2" y2="12"/><line x1="12" y1="2" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="22"/></svg>
          </button>
          <button class="round-add explore-add" onclick="go('#/upload')" aria-label="发布打卡点">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/></svg>
          </button>
        </div>
      </header>

      ${pool.length ? `
        <div class="cap-dock scrollbar-hide">
          <div class="caps">
            ${EXPLORE_CAPS.map((c) => `<button class="cap ${state.exploreCap === c.label ? 'on' : ''}" onclick="toggleCap('${c.label}')">${c.label}</button>`).join('')}
          </div>
        </div>` : ''}

      ${popSpot ? `
        <div class="explore-pop">
          <button class="pop-close" onclick="closePop()" aria-label="关闭">×</button>
          <div class="pop-main" onclick="go('#/spot/${popSpot.id}')">
            ${imgTag(popSpot, 0, 'pop-img', '')}
            <div class="pop-text">
              <h3>${esc(popSpot.name)}</h3>
              <p>${esc(popSpot.sceneType)} · ${esc(popSpot.city)}${popSpot.area ? ' · ' + esc(popSpot.area) : ''}</p>
              <div class="pop-acts">
                <span class="pop-tags">${esc((popSpot.styleTags || []).slice(0, 2).join(' · '))}</span>
                <span class="pop-go">查看 ›</span>
              </div>
            </div>
          </div>
        </div>` : (pool.length ? '' : '<div class="explore-empty">这一类还没有机位，试试其它分类</div>')}

      <button class="search-pill" onclick="go('#/search')">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#B0B4BC" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
        <span>Search vibe spots</span>
      </button>
    </div>`;
}
function openLiveMap() { state.mapLive = true; state.explorePop = false; render(); }
function exitLiveMap() { state.mapLive = false; render(); }
function renderHome(v) {
  const list = homeList();
  v.innerHTML = `
    <div class="page home-page">
      <header class="home-head">
        <h1 class="home-title" onclick="go('#/search')" title="搜索机位">Search vibe spots</h1>
        <button class="round-add" onclick="go('#/upload')" aria-label="发布打卡点">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/></svg>
        </button>
      </header>
      ${list.length ? `<div class="feed">${list.map((s) => cardHTML(s, false)).join('')}</div>` : emptyHTML('还没有打卡点，点右上角 + 上传第一个吧')}
    </div>`;
}
function hcardHTML(spot) {
  const fav = favs.has(spot.id);
  return `<article class="hcard" onclick="go('#/spot/${spot.id}')">
    ${imgTag(spot, 0, 'hcard-img', '')}
    <button class="fav-btn ${fav ? 'on' : ''}" onclick="event.stopPropagation();toggleFav('${spot.id}')">${fav ? '<span class="mat fav-heart">favorite</span>' : '<span class="mat fav-heart">favorite_border</span>'}</button>
    <div class="hcard-body">
      <h3>${esc(spot.name)}</h3>
      <div class="hcard-tags">${esc(spot.sceneType)} · ${esc(spot.city)}${spot.area ? ' · ' + esc(spot.area) : ''}</div>
    </div>
  </article>`;
}
function cardHTML(spot, showFav) {
  const fav = favs.has(spot.id);
  return `<article class="tile" onclick="go('#/spot/${spot.id}')">
    <div class="tile-img">
      ${imgTag(spot, 0, '', '')}
      ${showFav !== false ? `<button class="fav-btn ${fav ? 'on' : ''}" onclick="event.stopPropagation();toggleFav('${spot.id}')">${fav ? '<span class="mat fav-heart">favorite</span>' : '<span class="mat fav-heart">favorite_border</span>'}</button>` : ''}
    </div>
    <div class="tile-txt">
      <h3>${esc(spot.name)}</h3>
      <p>${esc(spot.sceneType)} · ${esc(spot.city)}</p>
    </div>
  </article>`;
}
function masonryHTML(list, showFav) {
  const cols = [[], []];
  list.forEach((s, i) => cols[i % 2].push(cardHTML(s, showFav)));
  return `<div class="masonry"><div class="mcol">${cols[0].join('')}</div><div class="mcol">${cols[1].join('')}</div></div>`;
}
function emptyHTML(text) {
  return `<div class="empty"><div class="e"><span class="mat">photo_camera</span></div><p>${esc(text)}</p></div>`;
}
function pageShell(title, body) {
  return `<header class="sub-top"><button class="icon-btn" onclick="goBack()" aria-label="返回"><span class="mat">arrow_back</span></button><h2>${esc(title)}</h2><span class="spacer"></span></header><div class="page">${body}</div>`;
}
/* ---------- 搜索 ---------- */
function renderSearch(v) {
  v.innerHTML = `
    <header class="sub-top">
      <h2>搜索</h2>
      <span class="spacer"></span>
    </header>
    <div class="page">
      <div class="searchbox search-tabbox">
        <span class="mat">search</span>
        <input id="q" value="${esc(state.q)}" placeholder="地点名 / 风格 / 场景" oninput="onQuery(this.value)" />
      </div>
      <div class="chips search-tags scroll-hide" id="searchTagRow">${searchTagChips()}</div>
      <div class="filter-row scroll-hide">
        <button class="chip" id="fFree" onclick="toggleFree()">免费</button>
        <button class="chip" id="fIndoor" onclick="setIndoor('indoor')">室内</button>
        <button class="chip" id="fOutdoor" onclick="setIndoor('outdoor')">室外</button>
      </div>
      <div class="count" id="count"></div>
      <div id="results"></div>
    </div>`;
  renderFilterChips();
  updateSearch();
}
function searchTagChips() {
  return STYLE_TAGS.map((t) => `<button class="chip ${state.style === t ? 'on' : ''}" onclick="toggleSearchChip('style','${t}')">${t}</button>`).join('')
    + SCENE_TYPES.map((t) => `<button class="chip ${state.scene === t ? 'on' : ''}" onclick="toggleSearchChip('scene','${t}')">${t}</button>`).join('');
}
function toggleSearchChip(kind, val) {
  state[kind] = state[kind] === val ? null : val;
  const row = document.getElementById('searchTagRow');
  if (row) row.innerHTML = searchTagChips();
  updateSearch();
}
function enableChipScroll() {
  document.querySelectorAll('.chips').forEach((el) => {
    if (el._hs) return;
    el._hs = true;
    const canScroll = () => el.scrollWidth > el.clientWidth + 2;
    el.addEventListener('wheel', (e) => {
      if (canScroll() && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    }, { passive: false });
    let down = false, sx = 0, sl = 0, moved = false;
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = el.scrollLeft;
    });
    el.addEventListener('pointermove', (e) => {
      if (!down || e.pointerType !== 'mouse') return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = sl - dx;
    });
    const endDrag = () => { down = false; };
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointerleave', endDrag);
    el.addEventListener('click', (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
  });
}
function searchList() {
  const q = (state.q || '').trim().toLowerCase();
  return approvedSpots().filter((s) => {
    const text = [s.name, s.city, s.area, s.address, s.sceneType, ...s.styleTags, s.photoDesc].join(' ').toLowerCase();
    if (q && !text.includes(q)) return false;
    if (state.style && !s.styleTags.includes(state.style)) return false;
    if (state.scene && s.sceneType !== state.scene) return false;
    if (state.free && !(s.price || '').includes('免费')) return false;
    if (state.indoor === 'indoor' && !s.indoor) return false;
    if (state.indoor === 'outdoor' && s.indoor) return false;
    return true;
  });
}
function updateSearch() {
  const el = document.getElementById('results');
  if (!el) return;
  const list = searchList();
  const c = document.getElementById('count');
  if (c) c.textContent = `找到 ${list.length} 个打卡点`;
  el.innerHTML = list.length ? masonryHTML(list, false) : emptyHTML('没有找到匹配的打卡点，换个关键词或筛选条件试试');
}
function onQuery(value) { state.q = value; updateSearch(); }
function setQuery(value) { state.q = value; render(); }
function onCity(value) { state.city = value; renderFilterChips(); updateSearch(); }
function toggleFree() { state.free = !state.free; renderFilterChips(); updateSearch(); }
function setIndoor(value) { state.indoor = state.indoor === value ? '' : value; renderFilterChips(); updateSearch(); }
function renderFilterChips() {
  const f = document.getElementById('fFree'); if (f) f.classList.toggle('on', state.free);
  const i = document.getElementById('fIndoor'); if (i) i.classList.toggle('on', state.indoor === 'indoor');
  const o = document.getElementById('fOutdoor'); if (o) o.classList.toggle('on', state.indoor === 'outdoor');
}

/* ---------- 详情页 ---------- */
function renderDetail(v, id) {
  const spot = spots.find((s) => s.id === id);
  if (!spot) { v.innerHTML = pageShell('地点详情', emptyHTML('这个打卡点不存在或已下架')); return; }
  addHistory(id);
  state.detail = { id: spot.id, index: 0, count: (spot.images || []).length || 1 };
  const fav = favs.has(spot.id);
  const related = approvedSpots().filter((s) => s.id !== spot.id && (s.city === spot.city || s.styleTags.some((t) => spot.styleTags.includes(t)))).slice(0, 3);
  const lines = String(spot.photoDesc || '').split('\n').filter(Boolean);
  const tipLines = String(spot.tips || '').split('\n').filter(Boolean);
  v.innerHTML = `
    <div class="detail">
      <div class="carousel">
        <div class="carousel-track" id="carouselTrack">
          ${spot.images.map((_, i) => `<div class="slide">${imgTag(spot, i, 'carousel-img', spot.name + ' ' + (i + 1))}</div>`).join('')}
        </div>
        <button class="carousel-nav left" onclick="carousel(-1)" aria-label="上一张">‹</button>
        <button class="carousel-nav right" onclick="carousel(1)" aria-label="下一张">›</button>
        <div class="dots">${spot.images.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div>
        <div class="carousel-top">
          <button class="icon-btn" onclick="goBack()" aria-label="返回"><span class="mat">arrow_back</span></button>
          <div class="row">
            <button class="icon-btn" onclick="shareSpot('${spot.id}')" aria-label="分享"><span class="mat">share</span></button>
            <button class="icon-btn ${fav ? 'fav' : ''}" onclick="toggleFav('${spot.id}')" aria-label="收藏">${fav ? '<span class="mat fav-heart">favorite</span>' : '<span class="mat fav-heart">favorite_border</span>'}</button>
          </div>
        </div>
      </div>
      <div class="detail-body">
        <h1>${esc(spot.name)}</h1>
        <p class="meta-line">${esc(spot.city)}${spot.area ? ' · ' + esc(spot.area) : ''} · ${esc(spot.sceneType)} · ${spot.indoor ? '室内' : '室外'}</p>
        <div class="facts">
          <div><b><span class="mat">location_on</span></b><span>${esc(spot.address)}</span></div>
          <div><b><span class="mat">schedule</span></b><span>${esc(spot.openTime)}</span></div>
          <div><b><span class="mat">payments</span></b><span>${esc(spot.price)}</span></div>
        </div>
        <section class="block">
          <h3><span class="mat">palette</span> 出片风格</h3>
          <div class="tags-wrap">${spot.styleTags.map((t) => `<span class="tag gold">${esc(t)}</span>`).join('')}</div>
        </section>
        <section class="block">
          <h3><span class="mat">auto_awesome</span> 在这里能拍出什么</h3>
          <div class="lines">${lines.map((l) => `<p>${esc(l)}</p>`).join('') || '<p>投稿用户暂未填写出片亮点。</p>'}</div>
        </section>
        <section class="block">
          <h3><span class="mat">lightbulb</span> 拍照小 Tips</h3>
          <ul class="tips">${tipLines.map((l) => `<li>${esc(l)}</li>`).join('') || '<li>投稿用户暂未填写 Tips。</li>'}</ul>
        </section>
        <section class="block">
          <h3><span class="mat">photo_library</span> 实拍图集<em>用户投稿样片</em></h3>
          <div class="gallery">${spot.images.map((_, i) => `<div onclick="jumpImg(${i})">${imgTag(spot, i, '', `${spot.name} 样片${i + 1}`)}</div>`).join('')}</div>
        </section>
        <div class="uploader"><span class="avatar">${esc((spot.uploadUser || '匿')[0])}</span><span>${esc(spot.uploadUser || '匿名用户')} 投稿</span></div>
        ${related.length ? `<section class="block"><h3>相关打卡点</h3><div class="masonry">${related.map(cardHTML).join('')}</div></section>` : ''}
      </div>
      <div class="action-bar">
        <button class="btn-fav ${fav ? 'on' : ''}" onclick="toggleFav('${spot.id}')">${fav ? '<span class="mat fav-heart">favorite</span> 已收藏' : '<span class="mat fav-heart">favorite_border</span> 收藏'}</button>
        <button class="btn-go" onclick="goToMapForSpot('${spot.id}')"><span class="mat">near_me</span> 前往</button>
        <button class="btn-share" onclick="shareSpot('${spot.id}')">分享</button>
      </div>
    </div>`;
  const track = document.getElementById('carouselTrack');
  if (track) {
    track.addEventListener('scroll', syncCarousel, { passive: true });
    enableTrackDrag(track);
  }
}
function carousel(delta) {
  const t = document.getElementById('carouselTrack');
  const d = state.detail;
  if (!t || !d) return;
  const next = (d.index + delta + d.count) % d.count;
  goCarousel(next);
}
function goCarousel(i) {
  const t = document.getElementById('carouselTrack');
  const d = state.detail;
  if (!t || !d) return;
  d.index = i;
  t.scrollTo({ left: i * t.clientWidth, behavior: 'smooth' });
  document.querySelectorAll('.dots i').forEach((dot, i) => dot.classList.toggle('on', i === d.index));
}
function syncCarousel() {
  const t = document.getElementById('carouselTrack');
  const d = state.detail;
  if (!t || !d || !t.clientWidth) return;
  const i = Math.round(t.scrollLeft / t.clientWidth);
  if (i !== d.index) {
    d.index = i;
    document.querySelectorAll('.dots i').forEach((dot, j) => dot.classList.toggle('on', j === i));
  }
}
function enableTrackDrag(track) {
  if (!track || track._drag) return;
  track._drag = true;
  let down = false, sx = 0, sl = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; sx = e.clientX; sl = track.scrollLeft;
  });
  track.addEventListener('pointermove', (e) => {
    if (!down || e.pointerType !== 'mouse') return;
    track.scrollLeft = sl - (e.clientX - sx);
  });
  const end = () => { down = false; };
  track.addEventListener('pointerup', end);
  track.addEventListener('pointerleave', end);
}
function jumpImg(i) {
  const d = state.detail;
  if (!d) return;
  goCarousel(i);
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 80);
}
function shareSpot(id) {
  const spot = spots.find((s) => s.id === id);
  if (!spot) return;
  const text = `发现一个氛围感拍照地：${spot.name}（${spot.city}），适合拍${spot.styleTags.slice(0, 3).join('、')}。`;
  const url = location.href.split('#')[0] + '#/spot/' + id;
  if (navigator.share) navigator.share({ title: 'Haven', text, url }).catch(() => {});
  else if (navigator.clipboard) navigator.clipboard.writeText(`${text} ${url}`).then(() => toast('分享文案已复制'));
  else toast('当前环境不支持分享');
}
function goToMapForSpot(id) {
  state.mapFocus = id;
  state.mapStyle = null;
  state.mapScene = null;
  state.mapExpand = false;
  go('#/map');
}

/* ---------- 收藏 / 记录 ---------- */
function toggleFav(id) {
  const on = favs.has(id);
  if (on) favs.delete(id); else favs.add(id);
  persistFavs();
  toast(on ? '已取消收藏' : '已收藏，方便下次去拍');
  render({ keepScroll: true });
}
function addHistory(id) {
  history = [{ id, t: Date.now() }, ...history.filter((h) => h.id !== id)].slice(0, 100);
  saveLS(LS.hist, history);
}
function clearHistory() {
  history = [];
  saveLS(LS.hist, history);
  render();
}
function renderFavorites(v) {
  const list = [...favs].map((id) => spots.find((s) => s.id === id)).filter(Boolean);
  v.innerHTML = pageShell('我的收藏', list.length ? masonryHTML(list) : emptyHTML('还没有收藏的打卡点\n去首页逛逛，看到喜欢的点“收藏”'));
}
function renderRecords(v) {
  const list = history.map((h) => spots.find((s) => s.id === h.id)).filter(Boolean);
  v.innerHTML = pageShell('浏览记录', `
    ${history.length ? '<div style="margin-bottom:10px;text-align:right"><button class="mini-btn" onclick="clearHistory()">清空记录</button></div>' : ''}
    ${list.length ? `<div class="list">${list.map((s, i) => `
      <button class="list-item" onclick="go('#/spot/${s.id}')">
        ${imgTag(s, 0, 'thumb', '')}
        <div style="flex:1;min-width:0">
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.city)} · ${esc(s.sceneType)}</p>
          <em>${fmtTime(history[i].t)}</em>
        </div>
      </button>`).join('')}</div>` : emptyHTML('暂无浏览记录，去首页逛逛吧')}`);
}
/* ---------- 上传 / 编辑 ---------- */
function freshUpload() {
  return {
    name: '', address: '', city: '', area: '', scene: '', lat: null, lng: null, scenePicked: false,
    indoor: true, spaceTouched: false, styles: [], images: [], desc: '', tips: '', price: '', cityPicked: false,
    placePicked: false, placeLabel: '', gpsLat: null, gpsLng: null
  };
}
function uploadFromSpot(s) {
  return {
    name: s.name || '',
    address: s.address || '',
    city: s.city || '',
    area: s.area || '',
    scene: s.sceneType || '',
    lat: typeof s.lat === 'number' ? s.lat : null,
    lng: typeof s.lng === 'number' ? s.lng : null,
    scenePicked: true,
    indoor: s.indoor !== false,
    spaceTouched: true,
    styles: (s.styleTags || []).slice(0, 6),
    images: (s.images || []).slice(),
    desc: s.photoDesc || '',
    tips: s.tips && s.tips.indexOf('暂未填写') < 0 ? s.tips : '',
    price: s.price && s.price !== '待补充' ? s.price : '',
    cityPicked: true,
    placePicked: typeof s.lat === 'number' && typeof s.lng === 'number',
    placeLabel: [s.name, s.area, s.city].filter(Boolean).join(' · '),
    gpsLat: null,
    gpsLng: null
  };
}
function uploadFormHTML(u, isEdit) {
  const geoHintText = !isEdit && u.placeLabel
    ? '✓ 已选真实位置：' + esc(u.placeLabel)
    : (isEdit && u.placePicked
      ? '当前已记录坐标；如需改位置，重新输入名称并从真实地点中选一个。'
      : '在名称或地址里输入地点，会列出真实匹配结果，点选后坐标更准。');
  return `
    <div class="page">
      <div class="notice"><b>${isEdit ? '修改这条投稿' : '像发小红书一样上传'}</b><p>${isEdit ? '可以重新上传照片、修改地点与拍照信息；保存后会重新进入审核。' : '到了地方会自动定位城市。你只需要输入“尖沙咀的海边餐厅”，系统会自动识别区域和场景。'}</p></div>
      <div class="block">
        <h3><span class="mat">location_city</span> 当前城市</h3>
        <div class="city-row">
          <div class="city-chip" id="cityChip">${u.city ? esc(u.city) : '定位中…'}</div>
          <button class="mini-btn" onclick="requestCurrentCity()"><span class="mat">my_location</span> 重新定位</button>
        </div>
        <p class="hint" id="locHint">进入页面会自动定位，也可以手动选择下方城市。</p>
        <div class="chips scroll-hide" id="cityQuick">${CITIES.map((c) => `<button class="chip ${u.city === c ? 'on' : ''}" onclick="pickCity('${c}')">${c}</button>`).join('')}</div>
      </div>
      <div class="block">
        <h3><span class="mat">add_location_alt</span> 你拍到的地方<i class="req">必填</i></h3>
        <input id="uName" class="field" value="${esc(u.name)}" placeholder="输入餐厅 / 街道 / 地标名称，例如：海港城餐厅" oninput="onPlaceText(this.value)" autocomplete="off" />
        <p class="hint" id="detectHint"></p>
        <div id="geoWrap"></div>
        <label class="field-label">详细地址（可选）</label>
        <input id="uAddress" class="field" value="${esc(u.address)}" placeholder="可选：街道 / 门牌 / 地标，输入也会搜索真实地点" oninput="onAddrText(this.value)" autocomplete="off" />
        <p class="hint" id="geoHint">${geoHintText}</p>
        ${isEdit ? '' : '<div style="margin-top:10px;text-align:right"><button class="mini-btn" onclick="fillDemo()">填入示例</button></div>'}
      </div>
      <div class="block">
        <h3><span class="mat">category</span> 场景类型</h3>
        <div class="chips wrap" id="scenePick">${SCENE_TYPES.map((t) => `<button class="chip ${u.scene === t ? 'on' : ''}" onclick="pickScene('${t}')">${t}</button>`).join('')}</div>
        <p class="hint">不选会根据地点名称自动判断</p>
        <div class="seg" id="spaceSeg">
          <button class="${!u.indoor ? 'on' : ''}" onclick="pickSpace(false)">室外</button>
          <button class="${u.indoor ? 'on' : ''}" onclick="pickSpace(true)">室内</button>
        </div>
      </div>
      <div class="block">
        <h3><span class="mat">palette</span> 出片风格<i class="req">至少选 1 个</i></h3>
        <div class="chips wrap" id="stylePick">${STYLE_TAGS.map((t) => `<button class="chip ${u.styles.includes(t) ? 'on' : ''}" onclick="pickStyle('${t}')">${t}</button>`).join('')}</div>
      </div>
      <div class="block">
        <h3><span class="mat">photo_library</span> 实拍照片<i class="req">2-9 张</i></h3>
        <div class="up-grid" id="upGrid"></div>
        <p class="hint">照片会自动压缩后保存在本地浏览器，方便演示。</p>
      </div>
      <div class="block">
        <h3><span class="mat">auto_awesome</span> 这里适合拍什么照片<i class="req">必填</i></h3>
        <textarea id="uDesc" class="field ta" rows="4" placeholder="例如：窗边座位适合拍侧脸，门口霓虹适合港风夜景，海边栏杆适合日落背影…" oninput="state.upload.desc=this.value">${esc(u.desc)}</textarea>
        <h3 style="margin-top:16px"><span class="mat">lightbulb</span> 拍照小技巧 / 最佳时间 / 避坑</h3>
        <textarea id="uTips" class="field ta" rows="3" placeholder="例如：下午4-5点光线最好，部分区域禁止闪光灯，周末人多…" oninput="state.upload.tips=this.value">${esc(u.tips)}</textarea>
        <h3 style="margin-top:16px"><span class="mat">payments</span> 消费 / 门票提示（可选）</h3>
        <input id="uPrice" class="field" value="${esc(u.price)}" placeholder="例如：免费 / 门票80元 / 人均120元" oninput="state.upload.price=this.value" />
      </div>
      <button class="primary-btn" onclick="${isEdit ? 'saveEdit()' : 'submitSpot()'}">${isEdit ? '保存修改' : '提交审核'}</button>
      <p class="audit-note">${isEdit ? '保存后状态会变成“审核中”，通过后更新公开展示。演示版可在 我的 → 审核台 模拟审核。' : '提交后先进入“待审核”，审核通过才会公开到首页。演示版可在 我的 → 审核台 模拟审核。'}</p>
    </div>`;
}
function renderUpload(v) {
  if (state.editingId) { state.editingId = null; state.upload = freshUpload(); }
  const u = state.upload;
  v.innerHTML = `
    <header class="sub-top">
      <button class="icon-btn" onclick="goBack()" aria-label="返回"><span class="mat">arrow_back</span></button>
      <h2>上传打卡点</h2>
      <span class="spacer"></span>
    </header>
    ${uploadFormHTML(u, false)}`;
  afterUploadRender(u);
}
function renderEdit(v, id) {
  const s = spots.find((x) => x.id === id);
  if (!s || !s.mine) {
    v.innerHTML = pageShell('编辑投稿', emptyHTML('找不到这条投稿，可能已被删除'));
    return;
  }
  if (state.editingId !== id) { state.editingId = id; state.upload = uploadFromSpot(s); }
  const u = state.upload;
  v.innerHTML = `
    <header class="sub-top">
      <button class="icon-btn" onclick="cancelEdit()" aria-label="取消编辑"><span class="mat">close</span></button>
      <h2>编辑投稿</h2>
      <span class="spacer"></span>
    </header>
    ${uploadFormHTML(u, true)}`;
  afterUploadRender(u);
}
function afterUploadRender(u) {
  renderUpGrid();
  detectText(u.name);
  if (!state.geoDone) requestCurrentCity();
}
function startEdit(id) {
  const s = spots.find((x) => x.id === id);
  if (!s) { toast('找不到这条投稿'); return; }
  state.editingId = id;
  state.upload = uploadFromSpot(s);
  go('#/edit/' + id);
}
function cancelEdit() {
  state.editingId = null;
  state.upload = freshUpload();
  goBack();
}
function validateUpload(u) {
  if (!u.name.trim()) return '请先填写“你拍到的地方”';
  if (!u.city) return '请选择或定位城市';
  if (!u.scene) u.scene = inferSceneType(u.name);
  if (!u.styles.length) return '请至少选择 1 个出片风格';
  if (u.images.length < 2) return '请至少上传 2 张实拍照片';
  if (!u.desc.trim()) return '请填写“这里适合拍什么照片”';
  return null;
}
async function saveEdit() {
  const u = state.upload;
  const s = spots.find((x) => x.id === state.editingId);
  if (!s) { toast('找不到这条投稿'); return; }
  const err = validateUpload(u);
  if (err) return toast(err);
  if (state.submitting) return;
  const place = resolvePlaceCoords([u.name, u.address, u.area]) || CITY_COORDS[u.city] || null;
  const coords = (u.placePicked && typeof u.lat === 'number') ? [u.lat, u.lng] : place;
  s.name = u.name.trim();
  s.city = u.city;
  s.area = u.area || '';
  s.address = u.address.trim() || s.name;
  s.sceneType = u.scene;
  s.styleTags = u.styles.slice(0, 6);
  s.price = u.price.trim() || '待补充';
  s.indoor = u.indoor;
  s.palette = SCENE_PALETTE[u.scene] || s.palette;
  s.emoji = SCENE_EMOJI[u.scene] || s.emoji;
  s.photoDesc = u.desc.trim();
  s.tips = u.tips.trim() || '投稿用户暂未填写避坑提示。';
  s.images = u.images.slice(0, 9);
  s.lat = coords ? coords[0] : (typeof u.gpsLat === 'number' ? u.gpsLat : s.lat);
  s.lng = coords ? coords[1] : (typeof u.gpsLng === 'number' ? u.gpsLng : s.lng);
  s.status = 'pending';
  s.notice = '';
  s.updatedAt = Date.now();
  s.deviceId = s.deviceId || deviceId();
  persistSpots();
  state.editingId = null;
  state.upload = freshUpload();
  state.submitting = true;
  if (CLOUD) {
    toast('正在保存到云端…');
    try {
      s.images = await uploadImages(s.images, s.id);
      await CLOUD.update(s);
      toast('已保存修改，等待重新审核');
    } catch (e) {
      toast('已存在本地，云端保存失败，稍后会自动重试');
    }
  } else {
    toast('已保存修改，等待重新审核');
  }
  state.submitting = false;
  persistSpots();
  go('#/myuploads');
}
function renderUpGrid() {
  const g = document.getElementById('upGrid');
  if (!g) return;
  const u = state.upload;
  g.innerHTML = u.images.map((src, i) => `
    <div class="up-item"><img src="${src}" alt="上传照片${i + 1}"><button onclick="removeImg(${i})" aria-label="删除">×</button></div>`).join('')
    + (u.images.length < 9 ? `<label class="up-add"><input type="file" accept="image/*" multiple hidden onchange="onFiles(this.files)"><span>+</span></label>` : '');
}
function onFiles(files) {
  const need = 9 - state.upload.images.length;
  [...files].slice(0, need).forEach((file) => {
    compress(file).then((src) => { state.upload.images.push(src); renderUpGrid(); }).catch(() => toast('图片处理失败，请换一张试试'));
  });
}
function compress(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const MAX = 900;
        if (width > MAX) { height = Math.round((height * MAX) / width); width = MAX; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.68));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function removeImg(i) {
  state.upload.images.splice(i, 1);
  renderUpGrid();
}
function pickCity(c) {
  state.upload.city = c;
  state.upload.cityPicked = true;
  document.querySelectorAll('#cityQuick .chip').forEach((b) => b.classList.toggle('on', b.textContent === c));
  const chip = document.getElementById('cityChip');
  if (chip) chip.textContent = c;
  const hint = document.getElementById('locHint');
  if (hint) hint.textContent = '已手动选择城市';
}
function pickScene(t) {
  const u = state.upload;
  u.scene = u.scene === t ? null : t;
  u.scenePicked = true;
  if (u.scene && !u.spaceTouched) u.indoor = inferSpace(u.scene);
  renderSceneChips();
  renderSpaceSeg();
}
function renderSceneChips() {
  document.querySelectorAll('#scenePick .chip').forEach((b) => b.classList.toggle('on', b.textContent === state.upload.scene));
}
function pickSpace(indoor) {
  state.upload.indoor = indoor;
  state.upload.spaceTouched = true;
  renderSpaceSeg();
}
function renderSpaceSeg() {
  const seg = document.getElementById('spaceSeg');
  if (!seg) return;
  const btns = seg.querySelectorAll('button');
  if (btns[0]) btns[0].classList.toggle('on', !state.upload.indoor);
  if (btns[1]) btns[1].classList.toggle('on', state.upload.indoor);
}
function pickStyle(t) {
  const a = state.upload.styles;
  const i = a.indexOf(t);
  if (i >= 0) a.splice(i, 1);
  else if (a.length < 6) a.push(t);
  else { toast('最多选 6 个风格标签'); return; }
  document.querySelectorAll('#stylePick .chip').forEach((b) => b.classList.toggle('on', a.includes(b.textContent)));
}
function onPlaceText(value) {
  state.upload.name = value;
  detectText(value);
  scheduleGeoSearch(value);
}
function onAddrText(value) {
  state.upload.address = value;
  scheduleGeoSearch(value);
}
function detectText(text) {
  const hint = document.getElementById('detectHint');
  if (!hint) return;
  const det = detect(text);
  if (!det || (!det.city && !det.area && !det.scene)) { hint.textContent = ''; return; }
  const parts = [];
  if (det.city) parts.push(det.city);
  if (det.area) parts.push(det.area);
  if (det.scene) parts.push(det.scene);
  hint.textContent = '已识别：' + parts.join(' · ');
  if (det.city && !state.upload.cityPicked) { state.upload.city = det.city; updateCityUI(); }
  if (det.scene && !state.upload.scenePicked) {
    state.upload.scene = det.scene;
    if (!state.upload.spaceTouched) state.upload.indoor = inferSpace(det.scene);
    renderSceneChips();
    renderSpaceSeg();
  }
}
/* ---------- 真实地点搜索（MapTiler Geocoding） ---------- */
let geoSeq = 0;
let geoResults = [];
let geoDeb = null;
function scheduleGeoSearch(value) {
  clearTimeout(geoDeb);
  const box = document.getElementById('geoWrap');
  if (!box) return;
  if (state.upload.placePicked) {
    state.upload.placePicked = false;
    state.upload.placeLabel = '';
    state.upload.lat = null;
    state.upload.lng = null;
    const hint = document.getElementById('geoHint');
    if (hint) hint.textContent = '输入名称或地址后会自动列出真实匹配的地点，点选后坐标更准。';
  }
  const text = (value || '').trim();
  if (text.length < 2) {
    geoResults = [];
    box.innerHTML = '';
    return;
  }
  box.innerHTML = `<div class="geo-tip"><span class="mat">manage_search</span>正在查找真实地点…</div>`;
  geoDeb = setTimeout(() => runGeoSearch(text, ++geoSeq), 480);
}
function geoBias() {
  const u = state.upload;
  if (typeof u.gpsLat === 'number' && typeof u.gpsLng === 'number') return { lat: u.gpsLat, lng: u.gpsLng };
  const c = CITY_COORDS[u.city];
  if (c) return { lat: c[0], lng: c[1] };
  return null;
}
function toTraditional(text) {
  try {
    if (!state._cn2t && window.OpenCC) state._cn2t = window.OpenCC.Converter({ from: 'cn', to: 'tw' });
    if (state._cn2t) return state._cn2t(text);
  } catch (e) { /* 转换库不可用时用原文 */ }
  return text;
}
function geoUrlFor(text, bias) {
  let url = 'https://api.maptiler.com/geocoding/' + encodeURIComponent(text)
    + '.json?key=' + MAPTILER_KEY + '&language=zh&limit=6&types=poi,address,place,locality,neighbourhood,municipal_district,county,region,country,road';
  if (bias) url += '&proximity=' + bias.lng.toFixed(5) + ',' + bias.lat.toFixed(5);
  return url;
}
function geoFetch(text, bias) {
  return fetch(geoUrlFor(text, bias)).then((res) => {
    if (!res.ok) throw new Error('geo http ' + res.status);
    return res.json();
  }).then((data) => ((data && data.features) || []).map(geoInfo).filter(Boolean));
}
function geoDistText(km) {
  if (typeof km !== 'number') return '';
  return km < 1 ? Math.round(km * 1000) + 'm' : km.toFixed(1) + 'km';
}
async function runGeoSearch(text, seq) {
  const box = document.getElementById('geoWrap');
  if (!box) return;
  const variants = [];
  [text, toTraditional(text)].forEach((v) => {
    const t = (v || '').trim();
    if (t && !variants.includes(t)) variants.push(t);
  });
  const bias = geoBias();
  const settled = await Promise.allSettled(variants.map((v) => geoFetch(v, bias)));
  if (seq !== geoSeq) return;
  const okSets = settled.filter((s) => s.status === 'fulfilled').map((s) => s.value);
  if (!okSets.length) {
    box.innerHTML = `<div class="geo-tip"><span class="mat">location_off</span>联网地点搜索暂不可用：可先手动填地址，提交后会按地区名称尽力定位。</div>`;
    return;
  }
  const seen = new Set();
  let merged = [].concat(...okSets).filter((g) => {
    const k = g.name + '|' + g.center[0].toFixed(3) + ',' + g.center[1].toFixed(3);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  if (bias) {
    merged.forEach((g) => { g.km = straightKm(bias, { lat: g.center[1], lng: g.center[0] }); });
    merged.sort((a, b) => a.km - b.km);
  }
  const list = merged.slice(0, 6);
  if (!list.length) {
    box.innerHTML = `<div class="geo-tip"><span class="mat">search_off</span>没有找到完全匹配的地点：试试更具体的名称，或加城市名（例如：海港城 香港、浅水湾 香港）。</div>`;
    return;
  }
  geoResults = list;
  box.innerHTML = list.map((g, i) => `
    <button class="geo-item" onclick="pickGeoResult(${i})">
      <span class="mat geo-pin">place</span>
      <span class="geo-main"><b>${esc(g.name)}</b><em>${esc(g.sub)}${g.km !== undefined ? ' · ' + geoDistText(g.km) : ''}</em></span>
      <span class="mat geo-arrow">arrow_forward_ios</span>
    </button>`).join('');
}
function geoInfo(f) {
  if (!f || !f.center) return null;
  const ctx = (f.context || []).map((o) => o.text_zh || o.text || '').filter(Boolean);
  const full = String(f.place_name_zh || f.place_name || '');
  const segs = full.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
  const name = f.text_zh || f.text || segs[0] || '该地点';
  const city = ctx.map((t) => normalizeCityName(t)).find((n) => CITIES.includes(n))
    || estimateCity(f.center[1], f.center[0]);
  let area = '';
  if (segs.length > 1 && segs[1] !== city) area = segs[1];
  else if (segs.length > 2) area = segs[2];
  const subParts = [];
  if (area) subParts.push(area);
  if (city) subParts.push(city);
  if (ctx.length) {
    const rest = ctx.slice(0, 4).filter((t) => !subParts.includes(t)).join(' · ');
    if (rest) subParts.push(rest);
  }
  return {
    name,
    city,
    area,
    address: full || name,
    center: [f.center[0], f.center[1]],
    sub: subParts.join(' · ') || '真实位置'
  };
}
function pickGeoResult(i) {
  const g = geoResults[i];
  if (!g) return;
  clearTimeout(geoDeb);
  geoSeq++;
  const u = state.upload;
  u.placePicked = true;
  u.placeLabel = g.name + ' · ' + (g.area ? g.area + ' · ' : '') + g.city;
  u.lat = g.center[1];
  u.lng = g.center[0];
  u.city = g.city;
  u.area = g.area || u.area;
  u.cityPicked = true;
  if (!u.name.trim()) u.name = g.name;
  u.address = g.address || u.address;
  geoResults = [];
  const box = document.getElementById('geoWrap');
  if (box) box.innerHTML = `<div class="geo-tip ok"><span class="mat">check_circle</span>已选择真实地点：${esc(g.name)}（${esc(g.area || g.city)}）</div>`;
  const hint = document.getElementById('geoHint');
  if (hint) hint.textContent = '✓ 已记录坐标：' + u.lat.toFixed(5) + ', ' + u.lng.toFixed(5) + '（地图会定位到这里）';
  const name = document.getElementById('uName');
  if (name && !name.value.trim()) name.value = g.name;
  const addr = document.getElementById('uAddress');
  if (addr) addr.value = u.address;
  updateCityUI();
  detectText(u.name);
}
function updateCityUI() {
  const chip = document.getElementById('cityChip');
  if (chip) chip.textContent = state.upload.city || '请选择城市';
  document.querySelectorAll('#cityQuick .chip').forEach((b) => b.classList.toggle('on', b.textContent === state.upload.city));
}
function fillDemo() {
  const u = state.upload;
  u.placePicked = false;
  u.placeLabel = '';
  u.name = '尖沙咀海港城窗景餐厅';
  u.address = '尖沙咀广东道5号海港城';
  u.desc = '靠窗座位能拍维港晚霞侧脸\n餐桌甜品适合探店特写\n门口连廊可补港风街拍';
  u.tips = '预约窗边座，下午5点后光线最稳\n周末人多建议错峰';
  u.price = '人均180港币';
  const name = document.getElementById('uName'); if (name) name.value = u.name;
  const addr = document.getElementById('uAddress'); if (addr) addr.value = u.address;
  const desc = document.getElementById('uDesc'); if (desc) desc.value = u.desc;
  const tips = document.getElementById('uTips'); if (tips) tips.value = u.tips;
  const price = document.getElementById('uPrice'); if (price) price.value = u.price;
  if (!u.cityPicked) u.city = '香港';
  updateCityUI();
  detectText(u.name);
  toast('已填入示例，再上传 2-9 张照片即可提交');
}
async function submitSpot() {
  const u = state.upload;
  const name = u.name.trim();
  const err = validateUpload(u);
  if (err) return toast(err);
  if (state.submitting) return;
  const place = resolvePlaceCoords([name, u.address, u.area]) || CITY_COORDS[u.city] || null;
  const coords = (u.placePicked && typeof u.lat === 'number') ? [u.lat, u.lng] : place;
  const spot = {
    id: uid(),
    name,
    city: u.city,
    area: u.area || '',
    address: u.address.trim() || name,
    sceneType: u.scene,
    styleTags: u.styles.slice(0, 6),
    price: u.price.trim() || '待补充',
    openTime: '待补充',
    indoor: u.indoor,
    lat: coords ? coords[0] : (typeof u.gpsLat === 'number' ? u.gpsLat : null),
    lng: coords ? coords[1] : (typeof u.gpsLng === 'number' ? u.gpsLng : null),
    palette: SCENE_PALETTE[u.scene] || ['#9AA5B1', '#4B5563'],
    emoji: SCENE_EMOJI[u.scene] || '📷',
    photoDesc: u.desc.trim(),
    tips: u.tips.trim() || '投稿用户暂未填写避坑提示。',
    images: u.images.slice(0, 9),
    uploadUser: profile().nickname || '我',
    deviceId: deviceId(),
    mine: true,
    status: 'pending',
    createdAt: Date.now()
  };
  spots.unshift(spot);
  persistSpots();
  state.editingId = null;
  state.upload = freshUpload();
  state.submitting = true;
  if (CLOUD) {
    toast('正在上传云端…');
    try {
      spot.images = await uploadImages(spot.images, spot.id);
      const saved = await CLOUD.insert(spot);
      if (saved) Object.assign(spot, saved, { mine: true });
      toast('已提交，等待审核');
    } catch (e) {
      toast('已存在本地，云端上传失败，稍后会自动重试');
    }
  } else {
    toast('已提交，等待审核');
  }
  state.submitting = false;
  persistSpots();
  go('#/myuploads');
}
/* ---------- 地图 · 附近打卡点 ---------- */
const SPOT_COORDS = {
  'hk-tst-harbour-restaurant': [22.2950, 114.1684], 'taipei-retro-museum': [25.0311, 121.5110],
  'shanghai-window-cafe': [31.2074, 121.4390], 'guangzhou-shamian': [23.1072, 113.2400],
  'chengdu-bookstore': [30.6500, 104.0750], 'shenzhen-rooftop': [22.5405, 113.9340],
  'hangzhou-greenhouse': [30.2550, 120.1200], 'hk-tai-kwun': [22.2818, 114.1537],
  'hk-tst-waterfront': [22.2939, 114.1696], 'hk-man-mo': [22.2858, 114.1496],
  'hk-stone-slab': [22.2835, 114.1540], 'taipei-songshan': [25.0460, 121.5610],
  'taipei-tamsui': [25.1820, 121.4165], 'shanghai-wukang': [31.2100, 121.4370],
  'shanghai-bund-source': [31.2405, 121.4875], 'guangzhou-dongshankou': [23.1200, 113.2950],
  'chengdu-dongjiao': [30.6700, 104.1300], 'beijing-yangmeizhu': [39.8940, 116.3890]
};
const MAPTILER_KEY = '0yyVy9ifmnGNQGuV5vx0';
const MAPTILER_MAP = '01a080fc-5070-7ddb-954a-97b840867d92';
let mapObj = null;
let mapPinMarkers = [];
let mapUserMarker = null;
let mapFocusPin = null;
let mapUserPos = null;

function coordsOf(spot) {
  if (SPOT_COORDS[spot.id]) return SPOT_COORDS[spot.id];
  if (typeof spot.lat === 'number' && typeof spot.lng === 'number') return [spot.lat, spot.lng];
  return CITY_COORDS[spot.city] || null;
}
function distanceKm(user, spot) {
  const c = coordsOf(spot);
  if (!user || !c) return Infinity;
  const R = 6371;
  const dLat = ((c[0] - user.lat) * Math.PI) / 180;
  const dLng = ((c[1] - user.lng) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((user.lat * Math.PI) / 180) * Math.cos((c[0] * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
function distText(user, spot) {
  const d = distanceKm(user, spot);
  if (!isFinite(d)) return '';
  return d < 1 ? Math.round(d * 1000) + 'm' : d.toFixed(1) + 'km';
}
function renderMap(v) {
  mapObj = null; mapPinMarkers = []; mapUserMarker = null; mapFocusPin = null;
  routePending = null;
  v.innerHTML = `
    <header class="sub-top">
      <h2>地图 · 附近打卡点</h2>
      <span class="spacer"></span>
      <button class="mini-btn" id="mapLocate" onclick="locateMap()"><span class="mat">my_location</span> 定位</button>
    </header>
    <div class="map-filter"><div class="chips search-tags scroll-hide" id="mapSceneRow">${mapFilterChips()}</div></div>
    <div class="map-wrap" id="mapWrap">
      <div class="map-loading" id="mapLoading">${mapUserPos ? '加载中…' : '正在定位，查看附近打卡点…'}</div>
      <div id="routeSheet" class="route-sheet hidden"></div>
    </div>
    <div class="page map-page">
      <p class="hint" style="margin:0 2px 10px">放大地图可看到打卡点的照片与名称，缩小则显示圆点。</p>
      <div class="nearby-head"><h3>附近打卡点</h3><span class="hint" id="nearbyCount"></span></div>
      <div class="nearby-list" id="nearbyList"></div>
    </div>`;
  renderNearbyList();
  if (window.maplibregl) initMap();
  else { const w = document.getElementById('mapLoading'); if (w) w.innerHTML = '地图组件加载失败（需联网），已为你展示附近列表'; }
  if (navigator.geolocation && !mapUserPos) locateMap();
  else if (mapUserPos) { centerOnUser(true); plotMarkers(); }
}
function mapPool() {
  return approvedSpots().filter((s) =>
    coordsOf(s) &&
    (!state.mapStyle || s.styleTags.includes(state.mapStyle)) &&
    (!state.mapScene || s.sceneType === state.mapScene)
  );
}
function mapFilterChips() {
  return STYLE_TAGS.map((t) => `<button class="chip ${state.mapStyle === t ? 'on' : ''}" onclick="mapFilter('style','${t}')">${t}</button>`).join('')
    + SCENE_TYPES.map((t) => `<button class="chip ${state.mapScene === t ? 'on' : ''}" onclick="mapFilter('scene','${t}')">${t}</button>`).join('');
}
function mapFilter(kind, val) {
  const key = kind === 'style' ? 'mapStyle' : 'mapScene';
  state[key] = state[key] === val ? null : val;
  state.mapExpand = false;
  const row = document.getElementById('mapSceneRow');
  if (row) row.innerHTML = mapFilterChips();
  plotMarkers();
  renderNearbyList();
}
function initMap() {
  const el = document.getElementById('mapWrap');
  if (!el || !window.maplibregl) return;
  mapObj = new maplibregl.Map({
    container: el,
    style: 'https://api.maptiler.com/maps/' + MAPTILER_MAP + '/style.json?key=' + MAPTILER_KEY,
    center: mapUserPos ? [mapUserPos.lng, mapUserPos.lat] : [114.1694, 22.3193],
    zoom: mapUserPos ? 13.5 : 11,
    attributionControl: { compact: true },
    dragRotate: false,
    pitchWithRotate: false
  });
  mapObj.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
  const w = document.getElementById('mapLoading');
  if (w) w.style.display = 'none';
  mapObj.on('zoom', refreshMarkerZoom);
  mapObj.on('load', () => {
    plotMarkers();
    if (state.mapFocus) focusSpotOnMap(state.mapFocus);
    else if (mapUserPos) centerOnUser(true);
    refreshMarkerZoom();
  });
}
function centerOnUser(silent) {
  if (!mapObj || !mapUserPos) return;
  const lngLat = [mapUserPos.lng, mapUserPos.lat];
  if (mapUserMarker) mapUserMarker.setLngLat(lngLat);
  else {
    const el = document.createElement('div');
    el.className = 'map-user-dot';
    el.innerHTML = '<div class="pin-wrap"><div class="pin-card simple"><span class="pin-name">我在这里</span></div></div>';
    mapUserMarker = new maplibregl.Marker({ element: el }).setLngLat(lngLat).addTo(mapObj);
  }
  if (silent) mapObj.jumpTo({ center: lngLat, zoom: 13.5 });
  else mapObj.flyTo({ center: lngLat, zoom: 13.5, duration: 1100 });
}
function visibleMarkers() {
  const all = mapPool();
  if (!mapUserPos) return all;
  return all.filter((s) => distanceKm(mapUserPos, s) < 30);
}
function plotMarkers() {
  if (!mapObj || !window.maplibregl) return;
  mapPinMarkers.forEach((m) => m.remove());
  mapPinMarkers = [];
  visibleMarkers().forEach((spot) => {
    const c = coordsOf(spot);
    if (!c) return;
    const pin = document.createElement('div');
    pin.className = 'map-pin';
    pin.title = spot.name;
    pin.innerHTML = pinCardHTML(spot);
    pin.addEventListener('click', () => go('#/spot/' + spot.id));
    mapPinMarkers.push(new maplibregl.Marker({ element: pin }).setLngLat([c[1], c[0]]).addTo(mapObj));
  });
  refreshMarkerZoom();
}
function pinCardHTML(spot) {
  const first = (spot.images || [])[0];
  const real = typeof first === 'string' && first.startsWith('http');
  const thumb = real
    ? `<img class="pin-thumb" data-src="${first}" data-fallback="${placeholder(spot, 0)}" alt="" loading="lazy">`
    : `<img class="pin-thumb" src="${imgSrc(spot, 0)}" alt="" loading="lazy">`;
  return `<div class="pin-wrap"><div class="pin-card">${thumb}<span class="pin-name">${esc(spot.name)}</span></div></div>`;
}
function hydratePinImages() {
  const wrap = document.getElementById('mapWrap');
  if (!wrap || !wrap.querySelectorAll) return;
  wrap.querySelectorAll('.pin-thumb[data-src]').forEach((img) => {
    const src = img.getAttribute('data-src');
    if (!src || img.getAttribute('src')) return;
    img.addEventListener('error', () => {
      const fb = img.getAttribute('data-fallback');
      if (fb) img.setAttribute('src', fb);
    }, { once: true });
    img.setAttribute('src', src);
  });
}
function refreshMarkerZoom() {
  const wrap = document.getElementById('mapWrap');
  if (!wrap || !mapObj || !mapObj.getZoom) return;
  const detail = mapObj.getZoom() >= 14;
  wrap.classList.toggle('map-zoom-detail', detail);
  if (detail) hydratePinImages();
}
function focusSpotOnMap(id) {
  if (!mapObj || !window.maplibregl) return;
  const s = spots.find((x) => x.id === id);
  if (!s) return;
  const c = coordsOf(s);
  if (!c) return;
  if (mapFocusPin) mapFocusPin.remove();
  const el = document.createElement('div');
  el.className = 'map-focus-pin';
  el.innerHTML = pinCardHTML(s);
  mapFocusPin = new maplibregl.Marker({ element: el }).setLngLat([c[1], c[0]]).addTo(mapObj);
  mapObj.flyTo({ center: [c[1], c[0]], zoom: 14, duration: 900 });
  toast('已定位：' + s.name);
  planRoute(id, state.routeProfile);
}

/* ---------- 路线规划（驾车 / 步行 / 公共交通） ---------- */
const ROUTE_PROFILES = [
  { key: 'driving', label: '驾车', icon: 'directions_car' },
  { key: 'walking', label: '步行', icon: 'directions_walk' },
  { key: 'transit', label: '公共交通', icon: 'directions_transit' }
];
let routeToken = 0;
let routePending = null;

function fmtDur(sec) {
  const m = Math.round(sec / 60);
  if (m < 1) return '1 分钟以内';
  if (m < 60) return m + ' 分钟';
  const h = Math.floor(m / 60), mm = m % 60;
  return mm ? h + ' 小时 ' + mm + ' 分钟' : h + ' 小时';
}
function fmtDist(m) {
  return m < 1000 ? Math.round(m) + ' 米' : (m / 1000).toFixed(m < 10000 ? 1 : 0) + ' 公里';
}
function routeProfileMeta(key) {
  return ROUTE_PROFILES.find((p) => p.key === key) || ROUTE_PROFILES[0];
}
function routeSheetHtml(spot, profile, body) {
  const modes = ROUTE_PROFILES.map((p) =>
    `<button class="route-mode ${p.key === profile ? 'on' : ''}" onclick="setRouteProfile('${p.key}')"><span class="mat">${p.icon}</span>${p.label}</button>`
  ).join('');
  return `
    <div class="route-head">
      <span class="mat">alt_route</span>
      <div class="route-title">前往 <b>${esc(spot.name)}</b></div>
      <button class="route-close" onclick="closeRoute()" aria-label="关闭路线"><span class="mat">close</span></button>
    </div>
    <div class="route-modes">${modes}</div>
    <div class="route-body">${body}</div>`;
}
function navLinkHtml(profile, from, dest) {
  const destStr = dest.lat.toFixed(6) + ',' + dest.lng.toFixed(6);
  const dirflg = profile === 'walking' ? 'w' : profile === 'transit' ? 'r' : 'd';
  const tmode = profile === 'walking' ? 'walking' : profile === 'transit' ? 'transit' : 'driving';
  let google = 'https://www.google.com/maps/dir/?api=1&travelmode=' + tmode;
  if (from) google += '&origin=' + from.lat.toFixed(6) + ',' + from.lng.toFixed(6);
  google += '&destination=' + destStr;
  let apple = 'https://maps.apple.com/?dirflg=' + dirflg + '&daddr=' + destStr;
  if (from) apple += '&saddr=' + from.lat.toFixed(6) + ',' + from.lng.toFixed(6);
  return `<div class="route-open-row">
    <a class="route-open" href="${google}" target="_blank" rel="noopener"><span class="mat">directions</span>Google 地图导航</a>
    <a class="route-open" href="${apple}" target="_blank" rel="noopener"><span class="mat">near_me</span>Apple 地图导航</a>
  </div>`;
}
function routeLoadingHtml(meta) {
  return `<div class="route-status"><span class="mat">sync</span>正在规划${meta.label}路线…</div>`;
}
function routeDoneHtml(meta, distM, durSec, from, dest) {
  return `<div class="route-summary">
    <span class="mat">schedule</span>
    <div><b>${fmtDur(durSec)}</b><em>${fmtDist(distM)} · ${meta.label}路线已绘出</em></div>
  </div>${navLinkHtml(meta.key, from, dest)}
  <p class="route-note">需要公交 / 地铁 / 实时路况？在系统地图应用内切换即可。</p>`;
}
function routeFailHtml(meta, dest) {
  return `<div class="route-tip">
    <p><span class="mat">error_outline</span>路线服务暂时不可用（需联网），你可以在地图上查看位置，或直接用系统地图导航前往。</p>
    ${navLinkHtml(meta.key, null, dest)}
  </div>`;
}
function routeNoLocHtml(meta, dest) {
  return `<div class="route-tip">
    <p><span class="mat">gps_fixed</span>开启定位后，这里会显示驾车 / 步行 / 公共交通的路线与预计用时。</p>
    <button class="route-locate" onclick="locateMap()"><span class="mat">my_location</span> 开启定位</button>
    ${navLinkHtml(meta.key, null, dest)}
  </div>`;
}
function routeLocDeniedHtml(meta, dest) {
  return `<div class="route-tip">
    <p><span class="mat">gps_off</span>无法获取你的位置（未授权）。可点击下方直接打开系统地图，由系统定位并规划完整路线。</p>
    ${navLinkHtml(meta.key, null, dest)}
  </div>`;
}
function routeArrivedHtml(dest) {
  return `<div class="route-summary">
    <span class="mat">celebration</span>
    <div><b>你就在目的地附近</b><em>${dest.lat.toFixed(4)}, ${dest.lng.toFixed(4)} · 步行到达即可</em></div>
  </div>${navLinkHtml('walking', null, dest)}`;
}
function straightKm(a, b) {
  if (!a || !b) return 0;
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function routeTransitHtml(meta, from, dest) {
  const straight = fmtDist(straightKm(from, dest) * 1000);
  return `<div class="route-summary">
    <span class="mat">directions_transit</span>
    <div><b>公共交通</b><em>直线约 ${straight} · 精确线路与班次以系统地图为准</em></div>
  </div>${navLinkHtml('transit', from, dest)}
  <p class="route-note">公共交通需要实时班次数据，应用内暂不绘制线路，请点上方在系统地图中规划并开始导航。</p>`;
}
function routeBoundsOf(coords, from, dest) {
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  [from, dest].forEach((p) => {
    if (!p) return;
    minLng = Math.min(minLng, p.lng); maxLng = Math.max(maxLng, p.lng);
    minLat = Math.min(minLat, p.lat); maxLat = Math.max(maxLat, p.lat);
  });
  coords.forEach((p) => {
    minLng = Math.min(minLng, p[0]); maxLng = Math.max(maxLng, p[0]);
    minLat = Math.min(minLat, p[1]); maxLat = Math.max(maxLat, p[1]);
  });
  return [[minLng, minLat], [maxLng, maxLat]];
}
function ensureRouteLayers() {
  if (!mapObj) return false;
  try {
    if (!mapObj.getSource('route-line-src')) {
      mapObj.addSource('route-line-src', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [] } }
      });
      mapObj.addLayer({
        id: 'route-casing', type: 'line', source: 'route-line-src',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#ffffff', 'line-width': 7, 'line-opacity': 0.92 }
      });
      mapObj.addLayer({
        id: 'route-line', type: 'line', source: 'route-line-src',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#D4B886', 'line-width': 4.5, 'line-opacity': 0.96 }
      });
    }
    return true;
  } catch (e) { return false; }
}
function clearRouteLayer() {
  if (!mapObj) return;
  try {
    if (mapObj.getLayer('route-line')) mapObj.removeLayer('route-line');
    if (mapObj.getLayer('route-casing')) mapObj.removeLayer('route-casing');
    if (mapObj.getSource('route-line-src')) mapObj.removeSource('route-line-src');
  } catch (e) { /* 忽略 */ }
}
function setRouteProfile(key) {
  if (state.routeProfile === key) return;
  state.routeProfile = key;
  if (state.mapFocus) planRoute(state.mapFocus, key);
}
function closeRoute() {
  state.mapFocus = null;
  routePending = null;
  clearRouteLayer();
  const sheet = document.getElementById('routeSheet');
  if (sheet) { sheet.classList.add('hidden'); sheet.innerHTML = ''; }
  if (mapFocusPin) { mapFocusPin.remove(); mapFocusPin = null; }
  if (mapObj && mapUserPos) centerOnUser(false);
}
function planRoute(id, profile) {
  if (!id) return;
  const spot = spots.find((s) => s.id === id);
  const sheet = document.getElementById('routeSheet');
  if (!spot || !sheet) return;
  const c = coordsOf(spot);
  if (!c) return;
  const meta = routeProfileMeta(profile);
  state.routeProfile = meta.key;
  if (routePending && routePending.id === id && routePending.profile === meta.key) return;
  const dest = { lat: c[0], lng: c[1] };
  sheet.classList.remove('hidden');
  if (!mapUserPos) {
    sheet.innerHTML = routeSheetHtml(spot, meta.key, routeNoLocHtml(meta, dest));
    return;
  }
  const from = { lat: mapUserPos.lat, lng: mapUserPos.lng };
  if (distanceKm(mapUserPos, spot) < 0.05) {
    sheet.innerHTML = routeSheetHtml(spot, meta.key, routeArrivedHtml(dest));
    return;
  }
  if (meta.key === 'transit') {
    if (mapObj) clearRouteLayer();
    sheet.innerHTML = routeSheetHtml(spot, meta.key, routeTransitHtml(meta, from, dest));
    return;
  }
  sheet.innerHTML = routeSheetHtml(spot, meta.key, routeLoadingHtml(meta));
  const token = ++routeToken;
  if (!mapObj || !mapObj.isStyleLoaded()) {
    if (mapObj) {
      routePending = { id, profile: meta.key };
      mapObj.once('load', () => {
        if (routePending && routePending.id === id && routePending.profile === meta.key) routePending = null;
        if (token === routeToken && state.mapFocus === id) planRoute(id, meta.key);
      });
    }
    return;
  }
  routePending = null;
  clearRouteLayer();
  const url = 'https://router.project-osrm.org/route/v1/' + meta.key + '/'
    + from.lng + ',' + from.lat + ';' + dest.lng + ',' + dest.lat
    + '?overview=full&geometries=geojson&steps=false';
  fetch(url)
    .then((r) => { if (!r.ok) throw new Error('route http ' + r.status); return r.json(); })
    .then((json) => {
      if (token !== routeToken || state.mapFocus !== id) return;
      const rt = json && json.routes && json.routes[0];
      if (!rt || !rt.geometry || !rt.geometry.coordinates || rt.geometry.coordinates.length < 2) throw new Error('empty route');
      const coords = rt.geometry.coordinates;
      if (ensureRouteLayers()) {
        mapObj.getSource('route-line-src').setData({
          type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords }
        });
        mapObj.fitBounds(routeBoundsOf(coords, from, dest), { padding: { top: 62, bottom: 86, left: 56, right: 56 }, duration: 1000, maxZoom: 15.5 });
      }
      sheet.innerHTML = routeSheetHtml(spot, meta.key, routeDoneHtml(meta, rt.distance, rt.duration, from, dest));
    })
    .catch(() => {
      if (token !== routeToken || state.mapFocus !== id) return;
      sheet.innerHTML = routeSheetHtml(spot, meta.key, routeFailHtml(meta, dest));
    });
}
function locateMap() {
  if (!navigator.geolocation) { toast('当前浏览器不支持定位'); return; }
  const btn = document.getElementById('mapLocate');
  if (btn) btn.textContent = '定位中…';
  navigator.geolocation.getCurrentPosition((pos) => {
    mapUserPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    if (btn) btn.innerHTML = '<span class="mat">my_location</span> 重新定位';
    if (mapObj) { centerOnUser(false); plotMarkers(); }
    renderNearbyList();
    if (state.mapFocus) planRoute(state.mapFocus, state.routeProfile);
    toast(`已定位，附近 ${visibleMarkers().length} 个打卡点`);
  }, () => {
    if (btn) btn.innerHTML = '<span class="mat">my_location</span> 定位';
    const w = document.getElementById('mapLoading');
    const sheet = document.getElementById('routeSheet');
    const routeActive = !!(sheet && state.mapFocus && !sheet.classList.contains('hidden'));
    if (w && !routeActive) { w.style.display = 'flex'; w.innerHTML = '定位失败，可手动缩放地图查看全部点位'; }
    else if (routeActive) {
      const spot = spots.find((s) => s.id === state.mapFocus);
      const c = spot && coordsOf(spot);
      const meta = routeProfileMeta(state.routeProfile);
      if (spot && c) sheet.innerHTML = routeSheetHtml(spot, meta.key, routeLocDeniedHtml(meta, { lat: c[0], lng: c[1] }));
    }
    if (mapObj) plotMarkers();
    toast(routeActive ? '定位失败，可打开系统地图导航前往' : '定位失败，已展示全部点位');
  }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 });
}
function renderNearbyList() {
  const el = document.getElementById('nearbyList');
  if (!el) return;
  let list = mapPool();
  if (mapUserPos) list.sort((a, b) => distanceKm(mapUserPos, a) - distanceKm(mapUserPos, b));
  const within = mapUserPos ? list.filter((s) => distanceKm(mapUserPos, s) < 1) : null;
  const hasNear = !!(within && within.length);
  const display = hasNear ? within : list;
  const shown = state.mapExpand ? display.slice(0, 10) : display.slice(0, 5);
  const c = document.getElementById('nearbyCount');
  if (c) {
    c.textContent = mapUserPos
      ? (hasNear ? `1km内 ${within.length} 个 · 最近` : `${list.length} 个 · 最近（1km内暂无）`)
      : `${list.length} 个打卡点`;
  }
  if (!display.length) {
    el.innerHTML = '<p class="hint" style="text-align:center;padding:22px 0">该分类附近暂无打卡点</p>';
    return;
  }
  el.innerHTML = shown.map((s) => {
    const dist = mapUserPos ? distText(mapUserPos, s) : '';
    return `<button class="near-row" onclick="go('#/spot/${s.id}')">
      ${imgTag(s, 0, 'near-thumb', '')}
      <div class="near-info">
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.city)}${s.area ? ' · ' + esc(s.area) : ''} · ${esc(s.sceneType)}${dist ? ' · ' + dist : ''}</p>
      </div>
    </button>`;
  }).join('') + (display.length > shown.length ? `<button class="more-btn" onclick="toggleMapExpand()">${state.mapExpand ? '收起 ‹' : '展开更多 ›'}</button>` : '');
}
function toggleMapExpand() {
  state.mapExpand = !state.mapExpand;
  renderNearbyList();
}
/* ---------- 城市定位与推断 ---------- */
function requestCurrentCity() {
  const hint = document.getElementById('locHint');
  const chip = document.getElementById('cityChip');
  if (!navigator.geolocation) { if (hint) hint.textContent = '当前浏览器不支持定位，请手动选择城市'; return; }
  if (chip) chip.textContent = '定位中…';
  if (hint) hint.textContent = '正在定位当前城市…';
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    state.upload.gpsLat = latitude;
    state.upload.gpsLng = longitude;
    const city = await reverseGeocode(latitude, longitude);
    state.geoDone = true;
    applyLocatedCity(city);
  }, () => {
    state.geoDone = true;
    if (hint) hint.textContent = '定位失败（未授权或离线），可手动选择城市';
  }, { enableHighAccuracy: false, timeout: 6000, maximumAge: 600000 });
}
function applyLocatedCity(city) {
  if (!state.upload.cityPicked) {
    state.upload.city = city;
    updateCityUI();
  }
  const hint = document.getElementById('locHint');
  if (hint) hint.textContent = `已定位到 ${city}，可修改`;
}
async function reverseGeocode(lat, lng) {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=zh`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision;
      if (city) return normalizeCityName(city);
    }
  } catch (e) { /* 离线时走坐标估算 */ }
  return estimateCity(lat, lng);
}
function estimateCity(lat, lng) {
  const candidates = [
    { city: '香港', lat: 22.3193, lng: 114.1694 },
    { city: '台北', lat: 25.033, lng: 121.5654 },
    { city: '上海', lat: 31.2304, lng: 121.4737 },
    { city: '广州', lat: 23.1291, lng: 113.2644 },
    { city: '深圳', lat: 22.5431, lng: 114.0579 },
    { city: '杭州', lat: 30.2741, lng: 120.1551 },
    { city: '成都', lat: 30.5728, lng: 104.0668 },
    { city: '北京', lat: 39.9042, lng: 116.4074 },
    { city: '澳门', lat: 22.1987, lng: 113.5439 }
  ];
  const nearest = candidates
    .map((item) => ({ ...item, score: Math.abs(lat - item.lat) + Math.abs(lng - item.lng) }))
    .sort((a, b) => a.score - b.score)[0];
  return nearest && nearest.score < 4 ? nearest.city : '香港';
}
function normalizeCityName(city) {
  if (/Hong Kong|香港/i.test(city)) return '香港';
  if (/Taipei|台北/i.test(city)) return '台北';
  if (/Shanghai|上海/i.test(city)) return '上海';
  if (/Guangzhou|广州|廣州/i.test(city)) return '广州';
  if (/Shenzhen|深圳/i.test(city)) return '深圳';
  if (/Hangzhou|杭州/i.test(city)) return '杭州';
  if (/Chengdu|成都/i.test(city)) return '成都';
  if (/Beijing|北京/i.test(city)) return '北京';
  if (/Macau|Macao|澳门/i.test(city)) return '澳门';
  return String(city).replace(/市$/, '');
}
function detect(text) {
  if (!text) return null;
  const cityDirect = CITIES.find((c) => text.includes(c)) || null;
  let area = null, city = null;
  for (const [k, val] of Object.entries(DISTRICT_CITY)) {
    if (text.includes(k)) { area = k; city = val; break; }
  }
  return { city: city || cityDirect, area, scene: inferSceneType(text) };
}
function inferSceneType(text) {
  if (/餐厅|餐廳|饭店|飯店|茶餐厅|茶餐廳|bistro|restaurant/i.test(text)) return '餐厅';
  if (/咖啡|cafe|coffee|下午茶/i.test(text)) return '咖啡馆';
  if (/博物馆|博物館|美术馆|美術館|展馆|展館|展览|展覽|艺术馆|藝術館/.test(text)) return '博物馆展馆';
  if (/街|路|巷|老城|老街|骑楼|騎樓|胡同/.test(text)) return '老街街道';
  if (/公园|公園|花园|花園|植物园|植物園|湿地|海滨|码头|碼頭/.test(text)) return '公园';
  if (/商场|商場|商圈|广场|廣場|mall|天台|书店|書店/i.test(text)) return '商圈';
  if (/废墟|廢墟|旧楼|舊樓|老建筑|老建築|工厂|工廠|厂房|廠房/.test(text)) return '废墟老建筑';
  return '老街街道';
}
function inferSpace(sceneType) {
  return ['老街街道', '公园', '废墟老建筑'].includes(sceneType) ? false : true;
}

/* ---------- 我的 / 投稿 / 审核台 ---------- */
function renderProfile(v) {
  const p = profile();
  const mine = spots.filter((s) => s.mine);
  const pending = spots.filter((s) => s.mine && s.status === 'pending');
  v.innerHTML = `
    <header class="sub-top"><h2>我的</h2><span class="spacer"></span></header>
    <div class="page">
      <div class="profile-card">
        <label class="avatar-edit-wrap" title="点击更换头像">
          ${p.avatar ? `<img class="avatar-img" src="${p.avatar}" alt="头像" />` : `<div class="avatar big">${esc(p.nickname[0] || '我')}</div>`}
          <span class="avatar-pen">✎</span>
          <input type="file" accept="image/*" hidden onchange="onAvatar(this)" />
        </label>
        <div class="p-info">
          <input class="nick" value="${esc(p.nickname)}" onchange="setNick(this.value)" aria-label="昵称" />
          <p>${esc(p.bio)}</p>
        </div>
      </div>
      <div class="block pref-card">
        <h3><span class="mat">favorite</span> 我的兴趣主题</h3>
        <p class="hint">选择你喜欢的拍照风格与场景，可随时点击修改。</p>
        <div class="ob-label">风格</div>
        <div class="chips wrap pref-chips">${interestChipsHTML(p, 'style')}</div>
        <div class="ob-label">场景</div>
        <div class="chips wrap pref-chips">${interestChipsHTML(p, 'scene')}</div>
      </div>
      <div class="block">
        <h3><span class="mat">palette</span> 主题颜色</h3>
        <div class="theme-seg">
          <button class="${(p.theme || 'system') === 'light' ? 'on' : ''}" onclick="setTheme('light')">浅色</button>
          <button class="${(p.theme || 'system') === 'dark' ? 'on' : ''}" onclick="setTheme('dark')">深色</button>
          <button class="${(p.theme || 'system') === 'system' ? 'on' : ''}" onclick="setTheme('system')">跟随系统</button>
        </div>
      </div>
      <div class="block">
        <h3><span class="mat">translate</span> 语言</h3>
        <p class="hint">默认跟随系统语言；不是简体中文 / 繁体中文时自动使用英文。</p>
        <div class="chips wrap">
          <button class="chip ${(p.lang || 'auto') === 'auto' ? 'on' : ''}" onclick="setLang('auto')">跟随系统</button>
          <button class="chip ${p.lang === 'zh-Hans' ? 'on' : ''}" onclick="setLang('zh-Hans')">简体中文</button>
          <button class="chip ${p.lang === 'zh-Hant' ? 'on' : ''}" onclick="setLang('zh-Hant')">繁體中文</button>
          <button class="chip ${p.lang === 'en' ? 'on' : ''}" onclick="setLang('en')">English</button>
        </div>
        <p class="hint">当前显示：${langLabel(profileLang())}</p>
      </div>
      <div class="menu">
        <button class="menu-item" onclick="go('#/favorites')"><span><span class="mat">favorite</span> 我的收藏</span><i>›</i></button>
        <button class="menu-item" onclick="go('#/myuploads')"><span><span class="mat">upload</span> 我的投稿</span><i>›</i></button>
        <button class="menu-item" onclick="go('#/records')"><span><span class="mat">history</span> 浏览记录</span><i>›</i></button>
        <button class="menu-item" onclick="go('#/admin')"><span><span class="mat">shield</span> 审核台（演示）${pending.length ? `<span class="badge">${pending.length}</span>` : ''}</span><i>›</i></button>
        <button class="menu-item" onclick="resetDemo()"><span><span class="mat">cleaning_services</span> 清除本地数据</span><i>›</i></button>
      </div>
      <p class="about">Haven · 网页原型演示<br>${CLOUD ? (state.cloud.ready ? '已连接云端，投稿对所有人可见' : '云端连接中…（暂时显示本地缓存）') : '本地模式（数据只在这台设备上）'}</p>
    </div>`;
}
function setNick(value) {
  const p = profile();
  p.nickname = (value || '').trim() || '氛围捕手';
  saveLS(LS.prof, p);
  toast('昵称已保存');
}
function interestChipsHTML(p, kind) {
  const list = kind === 'style' ? STYLE_TAGS : SCENE_TYPES;
  return list.map((t) => `<button class="chip ${p.interests.includes(t) ? 'on' : ''}" onclick="toggleInterest('${t}')">${t}</button>`).join('');
}
function toggleInterest(val) {
  const p = profile();
  const i = p.interests.indexOf(val);
  if (i >= 0) p.interests.splice(i, 1);
  else p.interests.push(val);
  p.onboarded = true;
  saveLS(LS.prof, p);
  render({ keepScroll: true });
}
function themeMode() { return profile().theme || 'system'; }
function applyTheme() {
  const dark = themeMode() === 'dark' ||
    (themeMode() === 'system' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#0f1115' : '#F7F8FA');
}
function setTheme(mode) {
  const p = profile();
  p.theme = mode;
  saveLS(LS.prof, p);
  applyTheme();
  render({ keepScroll: true });
  toast(mode === 'dark' ? '已切换到深色' : mode === 'light' ? '已切换到浅色' : '已跟随系统外观');
}
function showOnboardingIfNeeded() {
  const p = profile();
  if (p.onboarded) return;
  const root = document.getElementById('onboard');
  if (!root) return;
  const picks = new Set(p.interests);
  const chipRow = (list) => list.map((t) => `<button class="chip ${picks.has(t) ? 'on' : ''}" data-v="${esc(t)}">${t}</button>`).join('');
  root.innerHTML = `
    <div class="onboard-mask"></div>
    <div class="onboard-panel">
      <h2>先选几个感兴趣的主题</h2>
      <p class="hint">告诉 Haven 你喜欢哪种氛围，之后会优先推荐对味的机位。</p>
      <div class="onboard-scroll">
        <div class="ob-label">拍照风格</div>
        <div class="chips wrap ob-chips">${chipRow(STYLE_TAGS)}</div>
        <div class="ob-label">场景类型</div>
        <div class="chips wrap ob-chips">${chipRow(SCENE_TYPES)}</div>
      </div>
      <button class="primary-btn" onclick="finishOnboarding()">开始探索</button>
    </div>`;
  root.classList.remove('hidden');
  root.querySelectorAll('.ob-chips .chip').forEach((b) => {
    b.addEventListener('click', () => {
      const v = b.dataset.v;
      if (picks.has(v)) picks.delete(v); else picks.add(v);
      b.classList.toggle('on', picks.has(v));
    });
  });
}
function finishOnboarding() {
  const root = document.getElementById('onboard');
  const p = profile();
  p.interests = root ? [...root.querySelectorAll('.ob-chips .chip.on')].map((b) => b.dataset.v) : [];
  p.onboarded = true;
  saveLS(LS.prof, p);
  if (root) { root.classList.add('hidden'); root.innerHTML = ''; }
  toast('已保存，欢迎加入 Haven');
  if ((location.hash || '').indexOf('profile') >= 0) render();
}
function onAvatar(input) {
  const file = input && input.files && input.files[0];
  if (!file) return;
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    const size = 160;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    const min = Math.min(img.width, img.height);
    ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, size, size);
    const p = profile();
    p.avatar = canvas.toDataURL('image/jpeg', 0.82);
    saveLS(LS.prof, p);
    URL.revokeObjectURL(url);
    toast('头像已更新');
    render();
  };
  img.onerror = () => { URL.revokeObjectURL(url); toast('图片读取失败'); };
  img.src = url;
}
function renderMyUploads(v) {
  const mine = spots.filter((s) => s.mine);
  v.innerHTML = pageShell('我的投稿', mine.length ? `
    <p class="hint" style="margin-bottom:12px">投稿需审核通过后才会公开；点“编辑”可以重新上传照片、修改地点和拍照信息。若被拒绝或下架，这里会显示管理员的原因说明。</p>
    <div class="list">${mine.map((s) => `
      <div class="list-item static">
        ${imgTag(s, 0, 'thumb', '')}
        <div style="flex:1;min-width:0">
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.city)} · ${esc(s.sceneType)} · ${esc(s.styleTags.join(' / '))}</p>
          <span class="status ${s.status}">${statusText(s)}</span>
          ${s.notice ? `<p class="admin-note">${esc(s.notice)}</p>` : ''}
          <div class="row-actions">
            ${s.status === 'approved' ? `<button class="mini-btn" onclick="go('#/spot/${s.id}')">查看</button>` : ''}
            <button class="mini-btn" onclick="startEdit('${s.id}')"><span class="mat">edit</span> 编辑</button>
            <button class="mini-btn danger" onclick="deleteSpot('${s.id}')">删除</button>
          </div>
        </div>
      </div>`).join('')}</div>` : emptyHTML('还没有投稿\n去上传一个你发现的宝藏地点吧'));
}
function statusText(s) {
  return s.status === 'approved' ? '已上线' : s.status === 'pending' ? '审核中' : s.status === 'removed' ? '已下架（违规）' : '已拒绝';
}
function renderAdmin(v) {
  if (!state.adminOk) {
    v.innerHTML = pageShell('审核台', `
      <div class="block">
        <h3><span class="mat">lock</span> 管理员密码</h3>
        <p class="hint">审核台只有管理员能操作。输入密码解锁（首次默认 8888，进去后可以修改）。</p>
        <input id="adminCodeInput" class="field" type="password" placeholder="请输入管理员密码" onkeydown="if(event.key==='Enter')adminUnlock(this.value)" />
        <button class="primary-btn" style="margin-top:12px" onclick="adminUnlock(document.getElementById('adminCodeInput').value)">解锁</button>
      </div>`);
    return;
  }
  const pending = spots.filter((s) => s.status === 'pending');
  const live = spots.filter((s) => s.status === 'approved');
  const handled = spots.filter((s) => s.status === 'removed' || s.status === 'rejected');
  v.innerHTML = pageShell('审核台（演示）', `
    <p class="hint" style="margin-bottom:8px">管理员视角：通过后公开上线；拒绝 / 下架时可填写原因，上传者会在“我的投稿”看到提示说明。</p>
    <div style="margin-bottom:12px;text-align:right"><button class="mini-btn" onclick="changeAdminCode()">修改管理员密码</button></div>
    ${pending.length ? `<h3 class="admin-sec">待审核 · ${pending.length}</h3>${pending.map(adminCard).join('')}` : ''}
    ${live.length ? `<h3 class="admin-sec">已上线 · ${live.length}</h3>${live.map(adminCard).join('')}` : ''}
    ${handled.length ? `<h3 class="admin-sec">已处理 · ${handled.length}</h3>${handled.map(adminCard).join('')}` : ''}
  `);
}
function adminUnlock(value) {
  if (String(value || '') === adminCode()) {
    state.adminOk = true;
    render();
    toast('已解锁审核台');
  } else {
    toast('密码不对');
  }
}
function changeAdminCode() {
  const now = prompt('请输入当前管理员密码');
  if (now === null) return;
  if (String(now) !== adminCode()) return toast('密码不对');
  const next = prompt('设置新的管理员密码');
  if (next === null) return;
  if (!String(next).trim()) return toast('密码不能为空');
  saveLS(LS.admin, String(next).trim());
  toast('管理员密码已更新');
}
function adminCard(s) {
  const actions =
    s.status === 'pending'
      ? `<button class="mini-btn ok" onclick="approveSpot('${s.id}')">通过</button>
         <button class="mini-btn danger" onclick="rejectSpot('${s.id}')">拒绝</button>`
      : s.status === 'approved'
        ? `<button class="mini-btn danger" onclick="removeSpot('${s.id}')">下架（违规）</button>`
        : `<button class="mini-btn ok" onclick="restoreSpot('${s.id}')">恢复上线</button>
           <button class="mini-btn danger" onclick="deleteSpot('${s.id}')">删除</button>`;
  return `
    <div class="audit">
      ${imgTag(s, 0, 'thumb', '')}
      <div style="flex:1;min-width:0">
        <h3>${esc(s.name)}</h3>
        <p style="font-size:12px;color:var(--hint);margin-top:3px">${esc(s.city)}${s.area ? ' · ' + esc(s.area) : ''} · ${esc(s.sceneType)} · 投稿：${esc(s.uploadUser || '匿名')}</p>
        <p class="audit-desc">${esc(oneLine(s.photoDesc))}</p>
        ${s.notice ? `<p class="admin-note">已填原因：${esc(s.notice)}</p>` : ''}
        <div class="row-actions">${actions}</div>
      </div>
    </div>`;
}
function deleteSpot(id) {
  if (!confirm('确定删除这条投稿吗？')) return;
  spots = spots.filter((s) => s.id !== id);
  persistSpots();
  if (CLOUD) cloudWrite(CLOUD.remove(id), null, '云端删除失败');
  render();
}
function approveSpot(id) {
  const s = spots.find((x) => x.id === id);
  if (!s) return;
  s.status = 'approved';
  s.notice = '';
  persistSpots();
  if (CLOUD) cloudWrite(CLOUD.update(s), null, '云端更新失败');
  toast('已通过，公开上线');
  render();
}
function rejectSpot(id) {
  const s = spots.find((x) => x.id === id);
  if (!s) return;
  const reason = prompt('填写拒绝原因（将展示给上传者）');
  if (reason === null) return;
  s.status = 'rejected';
  s.notice = reason.trim() || '内容未通过审核';
  persistSpots();
  if (CLOUD) cloudWrite(CLOUD.update(s), null, '云端更新失败');
  toast('已拒绝，原因已告知上传者');
  render();
}
function removeSpot(id) {
  const s = spots.find((x) => x.id === id);
  if (!s) return;
  const reason = prompt('填写下架原因（违规说明，将展示给上传者）');
  if (reason === null) return;
  s.status = 'removed';
  s.notice = reason.trim() || '内容涉嫌违规，已下架';
  persistSpots();
  if (CLOUD) cloudWrite(CLOUD.update(s), null, '云端更新失败');
  toast('已下架并通知上传者');
  render();
}
function restoreSpot(id) {
  const s = spots.find((x) => x.id === id);
  if (!s) return;
  s.status = 'approved';
  s.notice = '';
  persistSpots();
  if (CLOUD) cloudWrite(CLOUD.update(s), null, '云端更新失败');
  toast('已恢复上线');
  render();
}
function resetDemo() {
  if (!confirm('将清除收藏、记录、投稿等本地数据并恢复示例，确定吗？')) return;
  [LS.spots, LS.favs, LS.hist, LS.prof, LS.ver].forEach((k) => localStorage.removeItem(k));
  location.reload();
}

/* ---------- 启动 ---------- */
applyTheme();
render();
showOnboardingIfNeeded();
loadCloudSpots(false).then((ok) => { if (ok) syncLocalToCloud(); });
if (window.MutationObserver) {
  new MutationObserver(scheduleLang).observe(document.body, { childList: true, subtree: true, characterData: true });
}
if (typeof window.matchMedia === 'function') {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = () => { if (themeMode() === 'system') applyTheme(); };
  if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onSystemChange);
  else if (typeof mq.addListener === 'function') mq.addListener(onSystemChange);
}













