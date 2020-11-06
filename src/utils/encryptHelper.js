const NodeRSA = require('node-rsa');

const pubkey = '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALeu8Z0punQqy1K6iUCYC2BsLvqJ2OGBdJo06B6oN4qlMjzZ2TQMoyYFNsDElLeTaNjnD65yVTTxm4FrhbP6pd0CAwEAAQ==-----END PUBLIC KEY-----';
// const pubkey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjAMflsWyhhm0wzpwDft52VA71uf0ma7/IM2AKRz7CEaAmQgsIK3xtf/teNU0IYkNU2/H2kQbaoiDFNyOEZE57ymD0IP9rljoTxUbG8HmCLmsw5Fmmh1RUMkq9BxSJMdosqdJwZE1B16XIJGSK+QcCP/1Wf4pQxLy+REAtsNj1rQIDAQAB-----END PUBLIC KEY-----';
export default {

  Encrypt:function(plainText){
    const key = new NodeRSA(pubkey);
    key.setOptions({encryptionScheme: 'pkcs1'})
    return key.encrypt(plainText, 'base64');
  },
  // Encrypt:function(plainText){
  //   var publicKey = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALeu8Z0punQqy1K6iUCYC2BsLvqJ2OGBdJo06B6oN4qlMjzZ2TQMoyYFNsDElLeTaNjnD65yVTTxm4FrhbP6pd0CAwEAAQ==";
  //   var encrypt = new JSEncrypt();
  //   encrypt.setPublicKey(publicKey);
  //   return encrypt.encrypt(plainText);
  // },

  EncryptForGetRequest(plainText){
    let ciphertext = this.Encrypt(plainText);
    return ciphertext.replace(/#/g,"%23")
      .replace(/%/g,"%25")
      .replace(/&/g,"%26")
      .replace(/\+/g,"%2B")
      .replace(/\//g,"%2F")
      .replace(/\\/g,"%5C")
      .replace(/=/g,"%3D")
      .replace(/\?/g,"%3F")
      .replace(/\./g,"%2E");
  }
}
