define([], function(CommonApi, IdentifyingPhotos, IdentifyingSound){	
  var indexPage = function(){};
  indexPage.prototype = {
    init: function(containerId, type){
      var jq=jQuery;
      var src = '';
      switch (type){
        case '可回收物':
          src = './img/rubbish_type/1.jpg';
          break;
        case '其他垃圾':
          src = './img/rubbish_type/3.jpg';
          break;
        case '有害垃圾':
          src = './img/rubbish_type/2.jpg';
          break;
        case '厨余垃圾':
          src = './img/rubbish_type/4.jpg';
          break;
      }
      jq("#"+containerId+"").append(`
        <div class="rubbish_type_container">
          <div class="rubbish_type_content">
              <img src='` + src + `'>
          </div>
        </div>
      `);
    }
  };
  return indexPage
})