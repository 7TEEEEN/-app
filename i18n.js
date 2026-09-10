/* ============ Haven · 多语言（en / zh-Hans / zh-Hant） ============ */
/* 说明：界面原文为简体中文，运行时按所选语言替换：
   - zh-Hans：直接使用原文
   - zh-Hant：用 OpenCC(cn→tw) 转成繁体
   - en：查下面的词典（支持按 「·」「/」 等分隔符逐段翻译），查不到保留原文 */
(function () {
  const EN = {
    /* 城市 */
    '香港': 'Hong Kong', '台北': 'Taipei', '上海': 'Shanghai', '广州': 'Guangzhou',
    '成都': 'Chengdu', '北京': 'Beijing', '深圳': 'Shenzhen', '杭州': 'Hangzhou', '澳门': 'Macau',
    /* 场景 */
    '餐厅': 'Restaurant', '咖啡馆': 'Cafe', '博物馆展馆': 'Museum & Gallery', '老街街道': 'Old Street',
    '公园': 'Park', '商圈': 'Shopping area', '废墟老建筑': 'Ruins & Old Buildings',
    /* 风格 */
    '复古艺术': 'Retro art', '法式温柔': 'French soft', '港风': 'HK style', '清冷高级': 'Cool & classy',
    '日系': 'Japanese', '暗黑氛围感': 'Dark mood', '落日氛围感': 'Sunset mood', '工业风': 'Industrial',
    '胶片感': 'Film look', '街拍': 'Street snap',
    /* 常见片区 */
    '尖沙咀': 'Tsim Sha Tsui', '尖东': 'Tsim Sha Tsui East', '中环': 'Central', '上环': 'Sheung Wan',
    '湾仔': 'Wan Chai', '铜锣湾': 'Causeway Bay', '旺角': 'Mong Kok', '油麻地': 'Yau Ma Tei',
    '深水埗': 'Sham Shui Po', '观塘': 'Kwun Tong', '西贡': 'Sai Kung', '赤柱': 'Stanley',
    '浅水湾': 'Repulse Bay', '山顶': 'The Peak', '九龙城': 'Kowloon City', '北角': 'North Point',
    '金钟': 'Admiralty', '沙田': 'Sha Tin', '元朗': 'Yuen Long', '大埔': 'Tai Po', '大澳': 'Tai O',
    '南丫岛': 'Lamma Island', '长洲': 'Cheung Chau', '信义': 'Xinyi', '大安': "Da'an",
    '中山': 'Zhongshan', '松山': 'Songshan', '万华': 'Wanhua', '北投': 'Beitou', '士林': 'Shilin',
    '淡水': 'Tamsui', '西门町': 'Ximending', '大稻埕': 'Dadaocheng', '武康路': 'Wukang Road',
    '外滩': 'The Bund', '沙面': 'Shamian Island', '太古里': 'Taikoo Li', '西湖': 'West Lake',
    /* 全局 / Tab */
    '首页': 'Home', '地图': 'Map', '上传': 'Upload', '搜索': 'Search', '我的': 'Me',
    '返回': 'Back', '关闭': 'Close', '分享': 'Share', '收藏': 'Save', '已收藏': 'Saved',
    '前往': 'Go', '编辑': 'Edit', '删除': 'Delete', '查看': 'View', '取消编辑': 'Cancel',
    '编辑投稿': 'Edit post', '上传打卡点': 'New spot', '提交审核': 'Submit for review', '保存修改': 'Save changes',
    '免费': 'Free', '室内': 'Indoor', '室外': 'Outdoor', '必填': 'Required',
    '至少选 1 个': 'Pick at least 1', '2-9 张': '2-9 photos', '最多选 6 个风格标签': 'Up to 6 style tags',
    '风格': 'Style', '场景': 'Scene', '拍照风格': 'Photo style', '场景类型': 'Scene type',
    '主题颜色': 'Theme', '浅色': 'Light', '深色': 'Dark', '跟随系统': 'System', '语言': 'Language',
    /* 首页 / 搜索 */
    '还没有匹配的打卡点，换个风格或场景试试': 'No spots yet — tap + to add your first one',
    '还没有打卡点，点右上角 + 上传第一个吧': 'No spots yet — tap + in the corner to add the first one',
    '地点名 / 风格 / 场景': 'Place / style / scene',
    '没有找到匹配的打卡点，换个关键词或筛选条件试试': 'No matches — try another keyword or filter',
    /* 地图 */
    '地图 · 附近打卡点': 'Map · Nearby spots',
    '定位': 'Locate', '重新定位': 'Relocate', '定位中…': 'Locating…',
    '正在定位，查看附近打卡点…': 'Locating and loading nearby spots…',
    '放大地图可看到打卡点的照片与名称，缩小则显示圆点。': 'Zoom in to see photos and names; zoom out for simple dots.',
    '附近打卡点': 'Nearby spots', '该分类附近暂无打卡点': 'No spots in this category nearby',
    '展开更多': 'Show more', '收起': 'Show less',
    '地图组件加载失败（需联网），已为你展示附近列表': 'Map failed to load (needs internet). Showing the nearby list instead.',
    '定位失败，可手动缩放地图查看全部点位': 'Location failed — zoom the map to browse all spots',
    '定位失败，已展示全部点位': 'Location failed — showing all spots',
    '定位失败，可打开系统地图导航前往': 'Location failed — open the system map to navigate',
    '加载中…': 'Loading…', '我在这里': 'You are here',
    /* 详情页 */
    '详情页': 'Spot detail', '出片风格': 'Photo styles', '在这里能拍出什么': 'What you can shoot here',
    '拍照小 Tips': 'Shooting tips', '实拍图集': 'Photo gallery', '用户投稿样片': 'Community photos',
    '相关打卡点': 'Related spots', '投稿用户暂未填写出片亮点。': 'No highlights written yet.',
    '投稿用户暂未填写 Tips。': 'No tips written yet.', '投稿用户暂未填写避坑提示。': 'No warnings yet.',
    '匿名用户': 'Anonymous', '匿': 'A', '投稿': 'posted', '匿名用户 投稿': 'Anonymous posted',
    '这个打卡点不存在或已下架': 'This spot does not exist or has been removed',
    '上一张': 'Previous', '下一张': 'Next',
    /* 上传 / 编辑 */
    '当前城市': 'Current city', '进入页面会自动定位，也可以手动选择下方城市。': 'We detect your city automatically; you can also pick one below.',
    '你拍到的地方': 'The place you shot', '详细地址（可选）': 'Address (optional)',
    '输入餐厅 / 街道 / 地标名称，例如：海港城餐厅': 'Type a restaurant / street / landmark',
    '可选：街道 / 门牌 / 地标，输入也会搜索真实地点': 'Optional: street / number / landmark (searchable too)',
    '在名称或地址里输入地点，会列出真实匹配结果，点选后坐标更准。': 'Type a place or address; pick a real match for accurate coordinates.',
    '正在查找真实地点…': 'Searching real places…',
    '联网地点搜索暂不可用：可先手动填地址，提交后会按地区名称尽力定位。': 'Online place search unavailable — fill the address manually and we will still try to locate by area.',
    '没有找到完全匹配的地点：试试更具体的名称，或加城市名（例如：海港城 香港、浅水湾 香港）。': 'No exact match — try a more specific name or add the city.',
    '已选择真实地点：': 'Selected: ', '已记录坐标：': 'Coordinates saved: ',
    '已选真实位置：': 'Selected: ', '当前已记录坐标；如需改位置，重新输入名称并从真实地点中选一个。': 'Coordinates saved. To change them, search again and pick a real place.',
    '不选会根据地点名称自动判断': 'We guess it from the name if you skip this',
    '出片风格': 'Photo styles', '实拍照片': 'Photos',
    '照片会自动压缩后保存在本地浏览器，方便演示。': 'Photos are compressed and kept in this browser (demo).',
    '这里适合拍什么照片': 'What photos to shoot here', '拍照小技巧 / 最佳时间 / 避坑': 'Tips / best time / warnings',
    '消费 / 门票提示（可选）': 'Price / ticket notes (optional)', '填入示例': 'Fill example',
    '像发小红书一样上传': 'Post it like on social media',
    '到了地方会自动定位城市。你只需要输入“尖沙咀的海边餐厅”，系统会自动识别区域和场景。': 'Your city is detected for you — just type the place name and we recognise the area and scene.',
    '提交后先进入“待审核”，审核通过才会公开到首页。演示版可在 我的 → 审核台 模拟审核。': 'Posts go to review first and appear on Home once approved. In this demo, review them in Me → Review desk.',
    '修改这条投稿': 'Edit this post',
    '可以重新上传照片、修改地点与拍照信息；保存后会重新进入审核。': 'Re-upload photos and edit the place and notes; saving sends it back for review.',
    '保存后状态会变成“审核中”，通过后更新公开展示。演示版可在 我的 → 审核台 模拟审核。': 'Saving sends the post back to review. In this demo, review it in Me → Review desk.',
    /* 我的 */
    '我的收藏': 'Saved spots', '我的投稿': 'My posts', '浏览记录': 'History', '清空记录': 'Clear history',
    '清除本地数据': 'Clear local data', '审核台（演示）': 'Review desk (demo)', '我的兴趣主题': 'My interests',
    '选择你喜欢的拍照风格与场景，可随时点击修改。': 'Pick the styles and scenes you like — change them anytime.',
    '昵称': 'Nickname', '头像': 'Avatar', '点击更换头像': 'Tap to change your avatar',
    'Haven · 网页原型演示': 'Haven · web prototype',
    '数据保存在本地浏览器，示例配图在线加载、离线自动切换为占位图。': 'Data stays in this browser; photos load online and fall back to placeholders offline.',
    '先选几个感兴趣的主题': 'Pick a few interests',
    '告诉 Haven 你喜欢哪种氛围，之后会优先推荐对味的机位。': 'Tell Haven your vibe and we will prioritise matching spots.',
    '开始探索': 'Start exploring', '已保存，欢迎加入 Haven': 'Saved — welcome to Haven',
    /* 收藏 / 记录 */
    '还没有收藏的打卡点': 'No saved spots yet',
    '去首页逛逛，看到喜欢的点“收藏”': 'Browse Home and tap Save on spots you like',
    '暂无浏览记录，去首页逛逛吧': 'No history yet — go explore Home',
    /* 我的投稿 / 审核台 */
    '投稿需审核通过后才会公开；点“编辑”可以重新上传照片、修改地点和拍照信息。若被拒绝或下架，这里会显示管理员的原因说明。': 'Posts go public after review. Tap Edit to change photos or details. If a post is rejected or removed, the reason appears here.',
    '还没有投稿': 'No posts yet', '去上传一个你发现的宝藏地点吧': 'Upload a hidden spot you found',
    '审核中': 'In review', '已上线': 'Live', '已拒绝': 'Rejected', '已下架（违规）': 'Removed',
    '管理员视角：通过后公开上线；拒绝 / 下架时可填写原因，上传者会在“我的投稿”看到提示说明。': 'Admin view: approve to publish; when rejecting or removing you can leave a reason the author sees in My posts.',
    '待审核': 'Pending', '已处理': 'Handled', '通过': 'Approve', '拒绝': 'Reject',
    '下架（违规）': 'Remove', '恢复上线': 'Restore', '已填原因：': 'Reason: ',
    '找不到这条投稿，可能已被删除': 'Post not found — it may have been deleted', '找不到这条投稿': 'Post not found',
    '确定删除这条投稿吗？': 'Delete this post?',
    '将清除收藏、记录、投稿等本地数据并恢复示例，确定吗？': 'This clears saved spots, history and posts from this browser. Continue?',
    /* 路线 */
    '驾车': 'Drive', '步行': 'Walk', '公共交通': 'Transit', '正在规划': 'Planning ',
    '路线已绘出': 'route drawn', '直线约': 'approx. straight-line ', '分钟以内': 'under a minute',
    '分钟': 'min', '小时': 'h', '公里': 'km', '米': 'm',
    '你就在目的地附近': 'You are almost there', '步行到达即可': 'just walk over',
    '公共交通需要实时班次数据，应用内暂不绘制线路，请点上方在系统地图中规划并开始导航。': 'Transit needs live schedules — open the system map above to plan and navigate.',
    '需要公交 / 地铁 / 实时路况？在系统地图应用内切换即可。': 'Need bus / metro / live traffic? Switch inside the system map.',
    '无法获取你的位置（未授权）。可点击下方直接打开系统地图，由系统定位并规划完整路线。': 'Location unavailable (not authorised). Open the system map below to navigate.',
    '路线服务暂时不可用（需联网），你可以在地图上查看位置，或直接用系统地图导航前往。': 'Routing service unavailable (needs internet). You can still view the spot or navigate with the system map.',
    'Google 地图导航': 'Google Maps', 'Apple 地图导航': 'Apple Maps', '关闭路线': 'Close route',
    '开启定位': 'Enable location',
    '开启定位后，这里会显示驾车 / 步行 / 公共交通的路线与预计用时。': 'Enable location to see driving / walking / transit routes and times here.',
    /* 提示 */
    '已收藏，方便下次去拍': 'Saved for your next shoot', '已取消收藏': 'Removed from saved',
    '已提交，等待审核': 'Submitted — pending review', '已保存修改，等待重新审核': 'Saved — back to review',
    '请先填写“你拍到的地方”': 'Please fill in the place you shot', '请选择或定位城市': 'Please pick or detect a city',
    '请至少选择 1 个出片风格': 'Pick at least 1 photo style', '请至少上传 2 张实拍照片': 'Upload at least 2 photos',
    '请填写“这里适合拍什么照片”': 'Please fill in what photos to shoot here',
    '昵称已保存': 'Nickname saved', '头像已更新': 'Avatar updated',
    '默认跟随系统语言；不是简体中文 / 繁体中文时自动使用英文。': 'Follows your system language by default; any other language falls back to English.',
    '当前显示：': 'Currently showing: ', '已跟随系统语言': 'Following system language',
    '语言已切换': 'Language switched',
    '驾车路线已绘出': 'Drive route drawn', '步行路线已绘出': 'Walk route drawn',
    '公共交通路线已绘出': 'Transit route drawn',
    '已填入示例，再上传 2-9 张照片即可提交': 'Example filled — add 2-9 photos to submit',
    '当前浏览器不支持定位': 'This browser cannot access location',
    '当前浏览器不支持定位，请手动选择城市': 'This browser cannot access location — pick a city manually',
    '已手动选择城市': 'City selected', '可修改': ' (editable)',
    '已恢复上线': 'Restored', '已通过，公开上线': 'Approved and published',
    '已拒绝，原因已告知上传者': 'Rejected — the author was notified',
    '已下架并通知上传者': 'Removed — the author was notified',
    '填写拒绝原因（将展示给上传者）': 'Reason for rejection (shown to the author)',
    '填写下架原因（违规说明，将展示给上传者）': 'Reason for removal (shown to the author)',
    '内容未通过审核': 'Content did not pass review', '内容涉嫌违规，已下架': 'Content broke the rules and was removed',
    '分享文案已复制': 'Share text copied', '当前环境不支持分享': 'Sharing is not supported here',
    '图片处理失败，请换一张试试': 'Image failed — try another one', '图片读取失败': 'Could not read the image',
    '本地存储空间不足，请删除部分照片': 'Local storage is full — delete some photos',
    '已切换到浅色': 'Light theme on', '已切换到深色': 'Dark theme on', '已跟随系统外观': 'Following system appearance',
    '已识别：': 'Detected: ', '照片': 'Photos', '样片': 'photo'
    , 'Haven · 氛围感拍照打卡': 'Haven · mood photo spots'
    , '氛围感拍照打卡': 'mood photo spots'
    , '发布打卡点': 'New spot', '搜索机位': 'Search spots', '真实地图定位': 'Live map'
    , '这一类还没有机位，试试其它分类': 'No spots here yet — try another category'
    , '管理员密码': 'Admin password'
    , '审核台只有管理员能操作。输入密码解锁（首次默认 8888，进去后可以修改）。': 'Only the admin can use the review desk. Enter the password to unlock (default 8888; you can change it inside).'
    , '请输入管理员密码': 'Enter admin password', '解锁': 'Unlock', '密码不对': 'Wrong password'
    , '已解锁审核台': 'Review desk unlocked', '修改管理员密码': 'Change admin password'
    , '请输入当前管理员密码': 'Enter the current admin password', '设置新的管理员密码': 'Set a new admin password'
    , '密码不能为空': 'Password cannot be empty', '管理员密码已更新': 'Admin password updated'
    , '正在上传云端…': 'Uploading to cloud…', '正在保存到云端…': 'Saving to cloud…'
    , '已连接云端 · ': 'Connected · ', '云端连接失败，先使用本地缓存': 'Cloud connection failed — using local cache'
    , '已把 ': 'Synced ', ' 条本地投稿同步到云端': ' local posts to the cloud'
    , '已连接云端，投稿对所有人可见': 'Connected — posts are visible to everyone'
    , '云端连接中…（暂时显示本地缓存）': 'Connecting to cloud… (showing local cache)'
    , '本地模式（数据只在这台设备上）': 'Local mode (data stays on this device)'
    , '已存在本地，云端上传失败，稍后会自动重试': 'Saved locally; cloud upload failed and will retry later'
    , '已存在本地，云端保存失败，稍后会自动重试': 'Saved locally; cloud save failed and will retry later'
    , '开放时间（可选）': 'Opening hours (optional)'
    , '例如：09:00-18:00 / 全天开放 / 周二闭馆': 'e.g. 09:00-18:00 / open all day / closed on Tuesdays'
    , '待补充': 'TBD'
    , '第一张是封面。长按照片可拖动调整顺序，也可以点左下角「设为封面」把某张设为首图。': 'The first photo is the cover. Press and hold a photo to drag it into a new order, or tap Set as cover.'
    , '设为封面': 'Set as cover', '封面': 'Cover', '已设为封面': 'Set as cover'
    , '顺序已更新': 'Order updated', '拖动到想放的位置，松手完成排序': 'Drag to where you want it, then release'
    , '照片会自动压缩后保存在本地浏览器，方便演示。': 'Photos are compressed and uploaded to the cloud.'
  };

  /* 动态文本：命中则按正则替换 */
  const PATTERNS = [
    [/^已定位：(.+)$/, 'Located: $1'],
    [/^已定位到 (.+)，可修改$/, 'Located in $1 (editable)'],
    [/^已定位，附近 (.+) 个打卡点$/, 'Located — $1 spots nearby'],
    [/^1km内 (.+) 个 · 最近$/, '$1 within 1 km · nearest'],
    [/^(.+) 个 · 最近（1km内暂无）$/, '$1 · nearest (none within 1 km)'],
    [/^(.+) 个 · 最近$/, '$1 · nearest'],
    [/^(.+) 个打卡点$/, '$1 spots'],
    [/^待审核 · (.+)$/, 'Pending · $1'],
    [/^已上线 · (.+)$/, 'Live · $1'],
    [/^已处理 · (.+)$/, 'Handled · $1'],
    [/^已识别：(.+)$/, 'Detected: $1'],
    [/^已记录坐标：(.+)$/, 'Coordinates saved: $1'],
    [/^已选择真实地点：(.+)$/, 'Selected: $1'],
    [/^已选真实位置：(.+)$/, 'Selected: $1'],
    [/^直线约 (.+) · 精确线路与班次以系统地图为准$/, 'Approx. $1 straight-line · exact routes and schedules come from the system map'],
    [/^(.+) · (.+) 路线已绘出$/, '$1 · $2 route drawn'],
    [/^正在规划(.+)$/, 'Planning $1'],
    [/^(.+) 分钟以内$/, 'Under a minute'],
    [/^(.+) 分钟$/, '$1 min'],
    [/^(.+) 小时 (.+) 分钟$/, '$1 h $2 min'],
    [/^(.+) 小时$/, '$1 h'],
    [/^(.+) 公里$/, '$1 km'],
    [/^(.+) 米$/, '$1 m'],
    [/^投稿：(.+)$/, 'by $1'],
    [/^(.+) 投稿$/, '$1 posted'],
    [/^(.+)（(.+)）$/, '$1 ($2)']
  ];

  const SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };
  let converter = null;
  let attempted = false;

  function toTraditional(text) {
    try {
      if (!attempted) {
        attempted = true;
        if (window.OpenCC) converter = window.OpenCC.Converter({ from: 'cn', to: 'tw' });
      }
      if (converter) return converter(text);
    } catch (e) { /* 转换库不可用时保留原文 */ }
    return text;
  }

  function lookup(core) {
    if (EN[core]) return EN[core];
    for (let i = 0; i < PATTERNS.length; i++) {
      if (PATTERNS[i][0].test(core)) return core.replace(PATTERNS[i][0], PATTERNS[i][1]);
    }
    return null;
  }

  function toEnglish(text) {
    const head = (text.match(/^\s*/) || [''])[0];
    const tail = (text.match(/\s*$/) || [''])[0];
    const core = text.trim();
    if (!core || core.length > 80) return text;
    const hit = lookup(core);
    if (hit !== null) return head + hit + tail;
    const tokens = core.split(/(\s*[·•|/,，、]\s*|\s+)/);
    if (tokens.length > 1) {
      let changed = false;
      const out = tokens.map((tok) => {
        const key = tok.trim();
        const t = key ? lookup(key) : null;
        if (t !== null) { changed = true; return tok.replace(key, t); }
        return tok;
      }).join('');
      if (changed && out !== core) return head + out + tail;
    }
    return text;
  }

  function convert(text, lang) {
    if (!text || !/[\u4e00-\u9fff]/.test(text)) return text;
    if (lang === 'zh-Hant') return toTraditional(text);
    if (lang === 'en') return toEnglish(text);
    return text;
  }

  function handleTextNode(node, lang) {
    const parent = node.parentElement;
    if (!parent || SKIP_TAGS[parent.tagName]) return;
    if (parent.closest('.mat, .avatar, .code')) return;
    const raw = node.nodeValue;
    if (!raw || !/[\u4e00-\u9fff]/.test(raw)) return;
    const st = node.__i18n || (node.__i18n = { src: raw, out: raw });
    if (raw !== st.out) { st.src = raw; st.out = raw; }
    const next = convert(st.src, lang);
    if (next !== raw) { node.nodeValue = next; st.out = next; }
  }

  const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  function handleAttrs(el, lang) {
    if (!el.getAttribute) return;
    for (let i = 0; i < ATTRS.length; i++) {
      const name = ATTRS[i];
      const raw = el.getAttribute(name);
      if (!raw || !/[\u4e00-\u9fff]/.test(raw)) continue;
      const store = el.__i18nAttr || (el.__i18nAttr = {});
      if (store[name] === undefined || store.out !== raw) {
        store[name] = raw;
      }
      const next = convert(store[name], lang);
      if (next !== raw) el.setAttribute(name, next);
      store.out = next;
    }
  }

  function walk(root, lang) {
    if (!root) return;
    if (root.nodeType === 3) { handleTextNode(root, lang); return; }
    if (root.nodeType !== 1) return;
    handleAttrs(root, lang);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    let n = walker.nextNode();
    while (n) {
      if (n.nodeType === 3) handleTextNode(n, lang);
      else handleAttrs(n, lang);
      n = walker.nextNode();
    }
  }

  function apply(lang) {
    const target = lang === 'zh-Hant' ? 'zh-Hant' : (lang === 'en' ? 'en' : 'zh-Hans');
    if (document.documentElement) document.documentElement.setAttribute('lang', target);
    walk(document.body, target);
    if (document.title) {
      const t = document.title;
      const next = convert(t, target);
      if (next !== t) document.title = next;
    }
  }

  window.HavenI18n = { apply: apply, convert: convert, dict: EN, patterns: PATTERNS, toTraditional: toTraditional };
})();
