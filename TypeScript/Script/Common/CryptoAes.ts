import CryptoJS = require("./CryptoJS");
const {ccclass, property} = cc._decorator;

const key = CryptoJS.enc.Utf8.parse('d2ba0a0acd99b1a8d1ded721d86d128d');
const iv = CryptoJS.enc.Utf8.parse('632323c6ee97597f');

@ccclass
export default class CryptoAes extends cc.Component {
    

    public static aesEncrypt(data){
        let encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }

    public static aesDecrypt(data){
        return CryptoJS.AES.decrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
            // padding:CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8)
    }


}
