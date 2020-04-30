//搜索输入关键字举例配置
var searchKeywordSample = ["快递包装袋","塑料袋","快递盒子","核桃壳","镜子","烟盒","外卖塑料盒","电池"];

//阿里云垃圾分类接口身份认证需要的AppCode
var APPCODE = '5942591bb99a4bb8b0a9477a5a532b8c';

//垃圾分类请求携带的city(城市)参数
var garbageClassificationCity = "北京";

//智能图像垃圾分类请求
var garbageClassificationByImgRequest = "https://recover.market.alicloudapi.com/recover";

//垃圾分类_关键字请求
var garbageClassificationByKeywordRequest = "https://recover2.market.alicloudapi.com/recover_word";

//语音识别 speech websocket 接口
var speechWebsocketRequest = "wss://speech.xor-live.io/aquadaas/rest/speech/wsstream";

//语义理解 接口
var speechSemanticRequest = "https://speech.xor-live.io/aquadaas/rest/speech/semantic";
//语义理解 接口的Siteid 指定垃圾分类app (根据张骅邮件，目前支持的取值为“changning”或“gehua”支持)
var speechSemanticRequest_Siteid = "changning";