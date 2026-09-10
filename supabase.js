/* ============ Haven · Supabase 云端数据层 ============ */
/* 直接用 REST 接口访问（不需要引入额外 SDK）：
   - 数据表：public.spots
   - 图片桶：photos（公开读）
   说明：这里的 key 是 publishable / anon key，设计上就是给前端用的，
   安全由 Supabase 的行级安全策略（RLS）保证。 */
(function () {
  const CFG = {
    url: 'https://iookfvtevixmdtjubpwn.supabase.co',
    key: 'sb_publishable_ORVuGPfdXlkDlq2FXyAC7A_fWF0q3dR',
    table: 'spots',
    bucket: 'photos'
  };
  const COLS = 'id,name,city,area,address,scene_type,style_tags,price,open_time,indoor,lat,lng,palette,emoji,photo_desc,tips,images,upload_user,device_id,status,notice,created_at';

  function headers(extra) {
    return Object.assign({
      apikey: CFG.key,
      Authorization: 'Bearer ' + CFG.key,
      'Content-Type': 'application/json'
    }, extra || {});
  }

  function request(path, opts) {
    return fetch(CFG.url + path, Object.assign({ headers: headers() }, opts || {})).then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error('HTTP ' + res.status + ' ' + String(text || '').slice(0, 180));
        });
      }
      if (res.status === 204) return null;
      const ct = res.headers.get('content-type') || '';
      return ct.indexOf('json') >= 0 ? res.json() : res.text();
    });
  }

  function toRow(s) {
    return {
      id: s.id,
      name: s.name || '',
      city: s.city || '',
      area: s.area || '',
      address: s.address || '',
      scene_type: s.sceneType || '',
      style_tags: s.styleTags || [],
      price: s.price || '',
      open_time: s.openTime || '',
      indoor: s.indoor !== false,
      lat: typeof s.lat === 'number' ? s.lat : null,
      lng: typeof s.lng === 'number' ? s.lng : null,
      palette: s.palette || [],
      emoji: s.emoji || '',
      photo_desc: s.photoDesc || '',
      tips: s.tips || '',
      images: s.images || [],
      upload_user: s.uploadUser || '',
      device_id: s.deviceId || '',
      status: s.status || 'pending',
      notice: s.notice || ''
    };
  }

  function fromRow(r) {
    return {
      id: r.id,
      name: r.name || '',
      city: r.city || '',
      area: r.area || '',
      address: r.address || '',
      sceneType: r.scene_type || '',
      styleTags: r.style_tags || [],
      price: r.price || '',
      openTime: r.open_time || '',
      indoor: r.indoor !== false,
      lat: typeof r.lat === 'number' ? r.lat : null,
      lng: typeof r.lng === 'number' ? r.lng : null,
      palette: r.palette || [],
      emoji: r.emoji || '',
      photoDesc: r.photo_desc || '',
      tips: r.tips || '',
      images: r.images || [],
      uploadUser: r.upload_user || '',
      deviceId: r.device_id || '',
      status: r.status || 'pending',
      notice: r.notice || '',
      createdAt: r.created_at ? Date.parse(r.created_at) : Date.now()
    };
  }

  function list() {
    return request('/rest/v1/' + CFG.table + '?select=' + COLS + '&order=created_at.desc')
      .then((rows) => (rows || []).map(fromRow));
  }

  function insert(spot) {
    return request('/rest/v1/' + CFG.table, {
      method: 'POST',
      headers: headers({ Prefer: 'return=representation' }),
      body: JSON.stringify(toRow(spot))
    }).then((rows) => (rows && rows[0] ? fromRow(rows[0]) : null));
  }

  function update(spot) {
    return request('/rest/v1/' + CFG.table + '?id=eq.' + encodeURIComponent(spot.id), {
      method: 'PATCH',
      headers: headers({ Prefer: 'return=minimal' }),
      body: JSON.stringify(toRow(spot))
    });
  }

  function remove(id) {
    return request('/rest/v1/' + CFG.table + '?id=eq.' + encodeURIComponent(id), { method: 'DELETE' });
  }

  function publicUrl(path) {
    return CFG.url + '/storage/v1/object/public/' + CFG.bucket + '/' + path;
  }

  /* 把 dataURL 图片上传到 Storage，返回公开链接 */
  function uploadPhoto(dataUrl, path) {
    return fetch(dataUrl)
      .then((r) => r.blob())
      .then((blob) => fetch(CFG.url + '/storage/v1/object/' + CFG.bucket + '/' + path, {
        method: 'POST',
        headers: {
          apikey: CFG.key,
          Authorization: 'Bearer ' + CFG.key,
          'Content-Type': blob.type || 'image/jpeg',
          'cache-control': '3600',
          'x-upsert': 'true'
        },
        body: blob
      }))
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error('Storage ' + res.status + ' ' + String(text || '').slice(0, 180));
          });
        }
        return publicUrl(path);
      });
  }

  window.HavenData = {
    enabled: !!(CFG.url && CFG.key),
    url: CFG.url,
    list: list,
    insert: insert,
    update: update,
    remove: remove,
    uploadPhoto: uploadPhoto,
    publicUrl: publicUrl,
    toRow: toRow,
    fromRow: fromRow
  };
})();
