export default {
  // 是否为对象
  isObject(value) {
    return Object.prototype.toString.call(value).toLowerCase() === '[object object]';
  },
  // 是否为空
  isNull(value) {
    return Object.prototype.toString.call(value).toLowerCase() === '[object null]';
  },
  isArray(value) {
    return Object.prototype.toString.call(value).toLowerCase() === '[object array]';
  },
  htmlEncodeDom: function(str) {
    var ele = document.createElement('span');
    ele.appendChild(document.createTextNode(str));
    return ele.innerHTML;
  },
  htmlDecodeDom: function(str) {
    var ele = document.createElement('span');
    ele.innerHTML = str;
    return ele.textContent;
  },
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
  },
  getQueryStringByString: function(name, search) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = search.substr(1).match(reg);
    if(r != null) return decodeURI(r[2]);
    return null;
  },
  physicalFileDownload: function(fileUrl) {
    var elemIF = document.createElement("iframe");
    elemIF.src = decodeURI(encodeURI(fileUrl)); //因为会有中文的文件
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
  },
  //给金额添加千分符
  formatCurrency: function (num) {
    if (num) {
      num = num.toString().replace(/\$|,/g, '');
      if ('' == num || isNaN(num)) { return 'Not a Number ! '; }
      var sign = num.indexOf("-") >= 0 ? '-' : '';
      var cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : '';
      cents = cents.length > 1 ? cents : '';
      if (sign == '') {
          num = num.indexOf(".") > 0 ? num.substring(0, (num.indexOf("."))) : num;
      }
      else {
          num = num.indexOf(".") > 0 ? num.substring(1, (num.indexOf("."))) : num.substring(1);
      }
      if ('' == cents) { if (num.length > 1 && '0' == num.substr(0, 1)) { return 'Not a Number ! '; } }
      else { if (num.length > 1 && '0' == num.substr(0, 1)) { return 'Not a Number ! '; } }
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++) {
          num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
      }
      return (sign + num + cents);
    }
    else { return '0'; }
  },
  //浮点数乘法运算
  floatMul: function(arg1, arg2) {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch(e) {
      //console.log(e);
    }
    try {
      m += s2.split(".")[1].length;
    } catch(e) {
      //console.log(e);
    }
    return(
      Number(s1.replace(".", "")) *
            Number(s2.replace(".", "")) /
            Math.pow(10, m)
    );
  },
  //浮点数相减
  floatSub: function(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch(e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch(e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  //浮点数相除
  floatDiv: function(arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1,
      r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch(e) {
      t1 = 0;
      //console.log(e);
    }
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch(e) {
      t2 = 0;
      //console.log(e);
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return this.floatMul(r1 / r2, Math.pow(10, t2 - t1));
  },
  //浮点数加法运算
  floatAdd: function(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch(e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch(e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return(arg1 * m + arg2 * m) / m;
  },
  // 金额千分位，保留两位小数
  numUnit: function (num){
    let money = num !== null && num != 'ND'?Number(num).toFixed(2).toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$&,"):num
    return money;
  }
};
