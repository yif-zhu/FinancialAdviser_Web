// windows 与 linux 平台下路径互转，path 值建议传windows系统下的路径
export default function transformSeparator(path) {
  let platform = process.env.VUE_APP_Platform;
  if('win' === platform) {
    if(path.indexOf('/') > -1) {
      return path.replace(/\//g, '\\');
    }
  }else{
    // 去掉盘符
    let driveLetter = path.indexOf(':');
    if(driveLetter > -1) {
      path = path.substring(driveLetter + 1);
    }
    if(path.indexOf('\\') > -1) {
      return path.replace(/\\+/g, '/');
    }
  }
  return path;
}
