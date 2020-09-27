// import Button_manager from "../mananer/Button_manager";
export default class http_request {

    public static url_ad = 'https://ad.geyian.ink/';
    public static url_login = 'https://tjqh.youdongxi.cn/';
    public static url_gamelevel = 'https://img.youdongxi.cn/';
    public static url_buy = "https://tj.geyian.ink/";

    private static _instance:http_request = null;
    public static getInstance():http_request{
        if(!http_request._instance){
            http_request._instance = new http_request();
        }
        return http_request._instance;
    }
    private constructor(){}

    public postRequest(url:string, _data:any, _callback?: (params:any) => void){
        // Button_manager.getInstance().setIsClick(false);
        console.log('postRequest --->',url);
        let http = new XMLHttpRequest();
        http.addEventListener("error", this.onRequestError);
        http.open("POST", url, true); //初始化请求
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // httpRequest.setRequestHeader("Content-type","application/json");
        let str = '';
        for (let a in _data) {
            str += a + "=" + encodeURIComponent(_data[a]) + '&';
        }
        str = str.substr(0, str.length-1);
        http.send(str); //JSON.stringify(_data)
        http.onreadystatechange = ()=>{
            let state = http.readyState; //返回服务器的状态
            let status = http.status;
            if(state == 4 && status == 200){
                let response:string = http.responseText; //返回的信息是一个字符串
                let data = JSON.parse(response); //解析字符串
                // Button_manager.getInstance().setIsClick(true);
                _callback && _callback(data);
            }
        };
    }

    public get(url, _data, _callback) {
        // Button_manager.getInstance().setIsClick(false);
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 10 * 1000;
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && (this.status >= 200 && this.status < 300)) {
                let respone = xhr.responseText;
                if (!respone) console.log("httperror", respone);
                let resp = JSON.parse(respone);
                _callback(resp);
                // Button_manager.getInstance().setIsClick(true);
            }
        };
        let str = '';
        for (let a in _data) {
            str += a + "=" + _data[a] + '&';
        }
        str = str.substr(0, str.length-1);
        xhr.send(str);
    }

    private objFunc:object = {};
    public setRequestErrorFunc(cb:Function,target){
        this.objFunc['error'] = {'cb':cb,'target':target};
    }

    private onRequestError(){
        //请求失败
        if(this.objFunc['error']){
            let obj = this.objFunc['error'];
            obj['cb'].call(obj['target'],"游戏维护中");
        }
    }
}




