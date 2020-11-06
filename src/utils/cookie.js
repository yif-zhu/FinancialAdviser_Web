/* Cookie 操作 */
export default {
  // cookie 设置、获取、删除及更多参数的统一封装
  cookie (name, value, options) {
    if (typeof value != 'undefined') {
      options = options || {};
      if (value === null) {
        value = '';
        options.expires = -1;
      }
      let expires = '';
      if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
        let date;
        if (typeof options.expires == 'number') {
          date = new Date();
          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else {
          date = options.expires;
        }
        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
      }
      let path = options.path ? '; path=' + (options.path) : '';
      let domain = options.domain ? '; domain=' + (options.domain) : '';
      let secure = options.secure ? '; secure' : '';
      document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
      let cookieValue = null;
      if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  },
  // cookie 设置
  set(name, value, options) {
    this.cookie(name, value, options);
  },
  // cookie 读取
  get(name) {
    return this.cookie(name);
  },
  // cookie 删除
  delete(name, options) {
    this.cookie(name, null, Object.assign({ expires: -1 }, options));
  }
};