const myCookie = {
  /**
   * 获取cookie
   */
  get: function (name) {
    let cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;
    if (~cookieStart) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (!~cookieEnd) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return JSON.parse(cookieValue);
  },
  /**
   * 设置cookie
   */
  set: function (name, value, expires, path, domain, secure) {
    let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(JSON.stringify(value));
    const tempExpires = new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0));
    expires = expires || tempExpires;
    expires instanceof Date && (cookie += '; expires=' + expires.toGMTString());
    path && (cookie += '; path=' + path);
    domain && (cookie += '; domain=' + domain);
    secure && (cookie += '; secure');
    document.cookie = cookie;
  },
  /**
   * 删除cookie
   * javascript里，没有提供直接删除cookie的api，只有通过将过期时间，
   * 设置成过去的某个时间，让cookie过期，来删除。
   */
  del: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  }
}

const changeParam = (sourceURL, name, value) =>{
  var url = sourceURL || window.location.href;
  var newUrl = "";
  var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
  var tmp = name + "=" + value;
  if (url.match(reg) != null) {
    newUrl = url.replace(eval(reg), tmp);
  } else {
    if (url.match("[\?]")) {
      newUrl = url + "&" + tmp;
    } else {
      newUrl = url + "?" + tmp;
    }
  }
  return newUrl;
}

export {
  myCookie,
  changeParam
};
