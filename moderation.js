/* ============ Haven · 内容审核（文字 + 图片） ============ */
/* 文字：命中联系方式 / 敏感词 → 转人工审核
   图片：本地跑 NSFW 模型（tfjs + nsfwjs，模型放在 ./model/nsfw/）→ 命中转人工审核
   模型是懒加载的：只有真正要检查图片时才下载，失败就自动跳过，不影响上传 */
(function () {
  const MODEL_DIR = './model/nsfw/';
  const MODEL_URL = './model/nsfw/model.json';
  const TF_URL = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.21.0/dist/tf.min.js';
  const NSFW_URL = 'https://cdn.jsdelivr.net/npm/nsfwjs@2.4.2/dist/nsfwjs.min.js';

  /* ---------- 文字规则 ---------- */
  const CONTACT_RULES = [
    [/(?:^|\D)(?:\+?86[\s-]?)?1[3-9]\d[\s-]?\d{4}[\s-]?\d{4}(?!\d)/, '手机号'],
    [/(?:\+?852[\s-]?)[2-9]\d{3}[\s-]?\d{4}(?!\d)/, '香港电话'],
    [/(?:電話|电话|手機|手机|whatsapp|wechat|tel|phone|致電|致电|call)\s*[:：]?\s*[2-9]\d{3}[\s-]?\d{4}(?!\d)/i, '香港电话'],
    [/(?:^|\D)0\d{2,3}[-\s]?\d{7,8}(?!\d)/, '座机号'],
    [/[\w.+-]+@[\w-]+\.[A-Za-z]{2,}/, '邮箱'],
    [/(https?:\/\/|www\.)\S+/i, '链接'],
    [/(加我|加个微信|私信我|联系我|扫码|扫我|加V|加v)/, '招揽联系'],
    [/(微信|wechat|weixin|wx|v信|薇信)\s*[:：号]?\s*[A-Za-z0-9_-]{5,}/i, '微信号'],
    [/(qq|QQ)\s*[:：号]?\s*\d{5,}/, 'QQ号']
  ];
  const BANNED_WORDS = [
    '代购', '微商', '私聊', '下单', '优惠券', '免费领', '福利群', '贷款', '博彩', '赌场',
    '彩票', '色情', '涉黄', '约炮', '一夜情', '枪支', '毒品', '办证', '发票', '刷单',
    '兼职日结', '加微信', '微信号', '引流', '广告位', '推广合作', '出售账号'
  ];

  function screenText(input) {
    const text = Array.isArray(input) ? input.filter(Boolean).join('\n') : String(input || '');
    if (!text) return [];
    const hits = [];
    CONTACT_RULES.forEach((rule) => {
      if (rule[0].test(text)) hits.push(rule[1]);
    });
    BANNED_WORDS.forEach((w) => {
      if (text.indexOf(w) >= 0) hits.push(w);
    });
    return [...new Set(hits)];
  }

  /* ---------- 图片规则 ---------- */
  let nsfwModel = null;
  let nsfwTried = false;

  function injectScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error('load fail ' + src));
      document.head.appendChild(s);
    });
  }

  async function loadModel() {
    if (nsfwTried) return nsfwModel;
    nsfwTried = true;
    try {
      if (!window.tf) await injectScript(TF_URL);
      if (!window.nsfwjs) await injectScript(NSFW_URL);
      if (!window.nsfwjs) throw new Error('nsfwjs missing');
      try {
        nsfwModel = await window.nsfwjs.load(MODEL_DIR);
      } catch (e1) {
        nsfwModel = await window.nsfwjs.load(MODEL_URL);
      }
    } catch (e) {
      nsfwModel = null;
    }
    return nsfwModel;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('image load fail'));
      img.src = src;
    });
  }

  function checkable(src) {
    return typeof src === 'string' && (src.startsWith('data:') || src.startsWith(location.origin) || src.startsWith('./'));
  }

  /* 返回命中说明数组，例如 ['Porn 91%']；模型不可用时返回 [] */
  async function checkImages(images) {
    const list = (images || []).filter(checkable).slice(0, 6);
    if (!list.length) return [];
    const model = await loadModel();
    if (!model) return [];
    const flags = [];
    for (let i = 0; i < list.length; i++) {
      try {
        const img = await loadImage(list[i]);
        const preds = await model.classify(img);
        const bad = preds.filter((p) => (
          (p.className === 'Porn' && p.probability > 0.6) ||
          (p.className === 'Hentai' && p.probability > 0.6) ||
          (p.className === 'Sexy' && p.probability > 0.85)
        ));
        if (bad.length) {
          flags.push('第' + (i + 1) + '张疑似' + bad.map((b) => b.className + ' ' + Math.round(b.probability * 100) + '%').join('/'));
        }
      } catch (e) { /* 单张失败跳过 */ }
    }
    return flags;
  }

  window.HavenModeration = {
    screenText: screenText,
    checkImages: checkImages,
    loadModel: loadModel,
    get modelReady() { return !!nsfwModel; }
  };
})();
