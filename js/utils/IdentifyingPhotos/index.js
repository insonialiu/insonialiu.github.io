define(['js/utils/IdentifyingPhotos/html2canvas.min.js'], function(html2canvas){
  var AllowImgFileSize = 2100000; // 图片限制大小

  var $input = $('<input type="file" accept="image/*" style="display: none;">');
  $('body').append($input);

  var $ImageDiv = $('<div style="max-width:600px;max-height:600px;position:absolute;left:-600px;"></div>');
  $('body').append($ImageDiv);

  var IdentifyingPhotos = {
    bindInputOnChangeEvent: function(container, selectFileCallback){
      var that = this;
      $(container).click(function(){
        $input.click();
      });
      $input.change(function(){
        var file = this.files[0];
        selectFileCallback && selectFileCallback(file);
      });
    },
    getZipedImg: function(file, getZipImgSrcCallback){
      var size = file.size;
      var needZip = false;
      if(size > AllowImgFileSize){
        needZip = true;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if(!needZip){
          getZipImgSrcCallback && getZipImgSrcCallback(reader.result);
          //that.uploadImg(reader.result, that.successCallback, that.failedCallback);
        } else {
          // 需要压缩
          var image = new Image()     
          image.src = reader.result;    
          image.onload = function() {    

            var domElement = $ImageDiv[0];
            var canvasContent = domElement;//需要截图的包裹的（原生的）DOM对象
  
            var cwidth = canvasContent.offsetWidth;//获取dom宽度
            var cheight = canvasContent.offsetHeight;//获取dom高度
  
            var canvas = document.createElement('canvas');//创建一个canvas节点
            var scale = 1 //定义任意放大倍数，支持小数
            canvas.width = cwidth*scale;//定义canvas宽度*缩放
            canvas.height = cheight*scale;//定义canvas高度*缩放
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            
            var opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: cwidth, //dom 原始宽度
                height: cheight,
                useCORS: true // 【重要】开启跨域配置,
            }
            
            html2canvas(canvasContent,opts).then(function(canvas){
                var context = canvas.getContext('2d');
                context.mozImageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;
  
                var newurl=canvas.toDataURL("jpg/jpeg", 1.0);

                getZipImgSrcCallback && getZipImgSrcCallback(newurl);
                //that.uploadImg(newurl, that.successCallback, that.failedCallback);
            });
          }
          var $image = $(image);
          $ImageDiv.html("")
          $ImageDiv.append($image);
          $ImageDiv.find('img').css({"max-height": 600,"max-width": 600,display:'block'});
        }            
      }

    },
    uploadImg: function(imgData, successCallback, failedCallback){
      var imgPostData = imgData.substring(imgData.indexOf(",") + 1);
      API.searchByImg(encodeURIComponent(imgPostData), successCallback, failedCallback);
    }
  }
  
  var API = {
    searchByImg: function (imgPostData, successCallback, failedCallback) {
      var data = {
        img: imgPostData//'aHR0cHM6Ly9pbWcxNC4zNjBidXlpbWcuY29tL24wL2pmcy90NjQyMS8zMS8xNzk1Nzc5NS8xODAzNTUvYzU0ZjEyZGEvNTkzN2Q2ZGJOYTAxNTI0MjQuanBn'
      };
      var url = garbageClassificationByImgRequest + '?';      
      if(typeof garbageClassificationCity !== 'undefined'){
        url += "city=" + garbageClassificationCity;
      }
      var Authorization = "";
      if(typeof APPCODE !== 'undefined'){
        Authorization = 'APPCODE ' + APPCODE;
      }
      $.ajax({
        type: 'POST',
        async: true,
        url: url,
        headers: {
          'Authorization': Authorization,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': 'application/json'
        },
        dataType: 'json',
        data: data,
      }).done(function (data, status, xhr) {
        successCallback && successCallback(data);
      }).fail(function (jqXHR, textStatus) {
        failedCallback && failedCallback(jqXHR, textStatus);
      });
    },
  };


  return IdentifyingPhotos;
});