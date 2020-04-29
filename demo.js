alert("111")
define(['js/utils/common.js',
        'js/utils/IdentifyingPhotos/index.js',
        'js/utils/IdentifyingSound/index.js',
      ], function(CommonApi, IdentifyingPhotos, IdentifyingSound){	
  var indexPage = function(){};
  indexPage.prototype = {
    init: function(containerId){
      var jq=jQuery;
      jq("#"+containerId+"").append(`
        <div style="border:1px red sold;width:100%;height:300px">
          页面2
          <button id='test'>上传图片</button>
          <img id='testImg' src=''/>
          <div id='log'></div>

          <button id="btnRecord">开始录制</button>
          
          <div id='log_'></div>
          <div id='audioContainer'></div>
        </div>
      `);

      var logFlag = true;

      // 图片识别例子
      var obj = Object.create(IdentifyingPhotos);
      obj.bindInputOnChangeEvent('#test', function(file){
        //获取用户选择的照片
        console.log(file);
        obj.getZipedImg(file, function(url){
          //获取压缩后的图片地址
          console.log(url);
          $('#testImg').attr('src', url);
          obj.uploadImg(url, function(data){
            console.log(data);
            //  识别图片接口返回识别结果
            $('#log').html(JSON.stringify(data));
          }, function(jqXHR, textStatus){
            // 请求失败结果
            console.log(jqXHR, textStatus);
          });
        });
      });

      // 声音识别例子
      var obj1 = Object.create(IdentifyingSound);
      if(obj1.isSupportRecord()){
        // 该浏览器环境理论上是支持录音的
        
        // 获取设备的录音权限，如果是第一次，浏览器会弹框跟用户确认
        obj1.getUserMedia(function(stream){
          log('成功获取到录音权限');


          var btnRecord = document.querySelector('button#btnRecord');
          btnRecord.onclick = function(){
            if(btnRecord.textContent === '开始录制'){
              //开始录音
              obj1.startRecord(stream);
              btnRecord.textContent = '停止录制';
            }else{
              //停止录音
              obj1.stopRecord(function(result){
			    alert("按下录音键，停止录制了")
                obj1.getResultByUploadSound(result, function(data){
				  alert("getResultByUploadSound");
				  alert(JSON.stringify(data.data));
                  log(JSON.stringify(data.data));
                }, function(error){
                  log(error);                  
                });
              });
              btnRecord.textContent = '开始录制';
            }
          }

        }, function(){
          log('未能获取到录音权限');
        });
      }else{
        log('设备不支持');
      }



      


      //页面输出
      window.onerror = function(msg, url, link){
        log('报错信息', msg, {classList:['red'], focus:true});
        log('报错行数', link, {classList:['red'], focus:true});
      };      
      function log(key, value, options) {
        var log_ = document.getElementById('log_');
        options = options || {};
        var classList = options.classList || [];
        var keyHtml = '<span style="font-weight: bolder">' + (key || '') + '</span>';
        var outHtml = '<span class="' + classList.join(' ') + '">' + (value || '') + '</span>';
        if(options.focus){
          log_.innerHTML += keyHtml + ": " + outHtml + '<br>';
          return;
        }
        if(logFlag){
          log_.innerHTML += keyHtml + ": " + outHtml + '<br>';
          return;
        }
      }
      window.log = log;

    }
  };
  return indexPage
})