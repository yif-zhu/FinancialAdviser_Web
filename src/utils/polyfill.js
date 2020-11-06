Date.prototype.Format = function (format) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  let week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(format)) {
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return format;
};
Date.prototype.Diff = function (interval, objDate) {
  //若参数不足或 objDate 不是日期类型則回传 undefined
  if (arguments.length < 2 || objDate.constructor != Date) { return undefined; }
  switch (interval) {
    //计算秒差
    case 's': return parseInt((objDate - this) / 1000);
    //计算分差
    case 'n': return parseInt((objDate - this) / 60000);
    //计算時差
    case 'h': return parseInt((objDate - this) / 3600000);
    //计算日差
    case 'd': return parseInt((objDate - this) / 86400000);
    //计算周差
    case 'w': return parseInt((objDate - this) / (86400000 * 7));
    //计算月差
    case 'm': return (objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
    //计算年差
    case 'y': return objDate.getFullYear() - this.getFullYear();
    //输入有误
    default: return undefined;
  }
};

// 不建议使用（可使用ES6模板字符串语法替代）
String.prototype.Format = function () {
  let args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
      ;
  });
};
// 时间格式转换 将后台返回的日期格式如 /new Date(xxx)/ 转换成 年-月-日
String.prototype.S2Date = function (format = 'yyyy-MM-dd') {
  // windows 平台下返回的日期格式与linux存在差异，这里仅处理windows平台下的日期
  let isWin = process.env.VUE_APP_Platform === 'win';
  return isWin ? new Date(parseInt(this.replace(/[^\d]/g, ''))).Format(format) : new Date(this).Format(format);
};

Array.prototype.Remove = function (val) {
  let index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
