define(['js/utils/common.js'], function(CommonApi){	
	var indexPage = function(){};
	indexPage.prototype = {
		initPara: function(){
			this.CommonApiObj = new CommonApi();
			this.timeoutEventContinue=true;
		},
		init: function(containerId){
			this.initPara();
			var self=this;
			var jq=jQuery;
			var html="<div id=\"index_page_content_body\" style=\"width:6.9em;margin:0.29em;auto\">"
			html+="<div id=\"index_page_banner\" class=\"page_banner\"></div>";
			html+="<div style=\"width:100%;height:auto\"><div class=\"page_content_container\" style=\"margin-top:0.3em\">";
			html+="<div id=\"index_page_search_input_container\" class=\"page_input_container\"><img src=\"img/seach_icon.png\"><div class=\"page_input\"><div>请输入正确名称（包括材质）</div></div></div>"
			if(typeof searchKeywordSample!="undefined"){  
				html+="<div class=\"page_input_container\" style=\"border:0;height:auto\">"	
				var noteHtml="";
				var noteList=searchKeywordSample;
				for(var i = 0; i < noteList.length; i++) {  
					var marginLeft=(i==0?"":"style=\"margin-left:0.23em\"")
					noteHtml+=("<div "+marginLeft+" class=\"page_tab\"><div>"+noteList[i]+"</div></div>")
				};
				html+=noteHtml
				html+="</div>";
			};
			html+="</div>";
			html+="<div class=\"page_input_container\" style=\"border:0;height:auto;margin-top:0.34em\">"	
			html+="<div class=\"page_big_button\"><div><div style=\"font-size:0.36em\">语音搜索</div></div></div>";
			html+="<div class=\"page_big_button\" style=\"float:right;background-image:url(img/video.png)\"><div><div style=\"font-size:0.36em\">拍照时别</div></div></div>";
			html+="</div>";
			html+="</div></div>";
			html+="</div>";
			jq("#"+containerId+"").append(html);
			this.getBannerImages();
			var entryList=[{
				img:"recycle.png",
				bg:"#489cf9",
				title:"可回收物",
				content:"可回收物包括塑料瓶、食品罐头、玻璃瓶、易拉罐、报纸、旧书包、牛奶盒、旧玩具、旧衣物等。"
			},{
				img:"other.png",
				bg:"#9e7b0f",
				title:"其他垃圾",
				content:"其他垃圾包括贝壳、发胶、一次性筷子、核桃、海绵、旧镜子、烟蒂、卫生纸、陶瓷碗、湿垃圾袋等。"
			},{
				img:"harm.png",
				bg:"#e01616",
				title:"有害垃圾",
				content:"可有害垃圾包括电池、油漆、过期的胶囊药品、含汞温度计、过期药品、油漆桶、荧光灯、杀虫剂等。"
			},{
				img:"kitchen.png",
				bg:"#33bc1c",
				title:"厨余垃圾",
				content:"厨余垃圾包括菜叶、橙皮、葱、饼干、蕃茄酱、蛋壳、西瓜皮、马铃薯、鱼骨、甘蔗、玉米等。"
			}];

			var html="<div style=\"width:100%;height:auto\">";
			for(var i = 0; i < entryList.length; i++) {  
				var marginTop=((i==0)?0.33:0.23);
				html+="<div class=\"page_big_entry\" style=\"background-color:"+entryList[i].bg+";width:100%;height:2.19em;margin-top:"+marginTop+"em\">";
				html+="<img src=\"img/"+entryList[i].img+"\">";
				html+="<div class=\"page_big_entry_title\"><div style=\"font-size:0.36em\">"+entryList[i].title+"</div></div>"
				html+="<div class=\"page_big_entry_content\"><div style=\"font-size:0.27em\">"+entryList[i].content+"</div></div>"
				html+="</div>";
			};
			html+"</div>";
		    jq("#index_page_content_body").append(html);
			document.getElementById("index_page_search_input_container").onclick=function(){
				 self.leaveCurrentPage('js/search.js');
			}
		},
		leaveCurrentPage:function(path){
			this.timeoutEventContinue=false;
			this.CommonApiObj.togglePage(path);
		},
		createSlideContainer:function(containerObj,picList){
			var containerId=containerObj.id;
			var width=(picList.length + 1) * (containerObj.offsetWidth) + "px";
			containerObj.innerHTML = "<div id=\"" + containerId + "_son\" style=\"overflow:hidden;position:relative;height:100%;width:100%\"><div id=\"" + containerId + "_son_picContainer\" style=\"margin-left:0;overflow:hidden;height:100%;width:"+width+"\"></div></div>"
			var displayHeight = "2.35em";
			var displayWidth = "6.9em";
			var container = document.getElementById("" + containerId + "_son_picContainer");
			for(var i = 0; i < picList.length; i++){
				var newDiv = document.createElement("div");
				newDiv.setAttribute("data-src",picList[i].src);
				//visibility:hidden; 一开始隐藏，当图片大小位置确定，再显示
				newDiv.style.cssText="visibility:hidden;float:left;background-repeat:no-repeat;height:"+displayHeight+";width:"+displayWidth+";"+picList[i].style+"";
				newDiv.style.backgroundImage="url("+picList[i].src+")";
				container.appendChild(newDiv);
			};
			var firstImg=picList[0];
			var newDiv = document.createElement("div");
			newDiv.setAttribute("data-src",picList[0].src);
			newDiv.style.cssText="visibility:hidden;float:left;background-repeat:no-repeat;height:"+displayHeight+";width:"+displayWidth+";"+firstImg.style+"";
			newDiv.style.backgroundImage="url("+firstImg.src+")";
			container.appendChild(newDiv);
		},
		waitAllBannerImgOnload:function(containerId){
			var self=this;
			var imgW=690;
			var imgH=235;
			var bannerImgList=this.bannerImgList;
			for(var i = 0; i < bannerImgList.length; i++) {
				var img = document.createElement("img");
				img.src = bannerImgList[i].src;
				img.setAttribute("data-src",bannerImgList[i].src);
				img.onload = function () {
					var originalImageHeight=this.height;
					var originalImageWidth=this.width;
					var style="";
					var className="";
					if( (originalImageWidth/originalImageHeight)<(imgW/imgH) ){//比容器窄
						className="banner_horizontal_center";
					}
					else if ( (originalImageWidth/originalImageHeight)>(imgW/imgH) )
					{
						className="banner_vertical_center";
					}
					else{
						className="banner_bg_all_size";
					}
					var imgDivList=document.getElementById(""+containerId+"_son_picContainer").children;
					for(var j = 0; j < imgDivList.length; j++) {
						if(imgDivList[j].getAttribute("data-src")==this.getAttribute("data-src")){
							imgDivList[j].className=className;
							imgDivList[j].style.visibility="visible"
						}
					};
					
					self.loadedBannerImgCount+=1;
				};
				img.οnerrοr = function () {
					self.loadedBannerImgCount+=1;
					this.onerror=null;
				};
			};
			var bannerImgList=self.bannerImgList;
				if(self.bannerImgList.length>1){				
					//self.createBannerBottom(document.getElementById(containerId),self.bannerImgList.length);
				};
				if(self.bannerImgList.length>1){
					setTimeout(function () {
						if(self.timeoutEventContinue){
							self.triggerBannerMove(document.getElementById(containerId));
						}
					}, self.slideInterval*1000);
				};
			//loadedBannerImgCount
		
		},
		oneImgMove:function(slideContainer,picLen){
			if(this.bannerMoveContinue){
				var self=this;
				var parentNode=slideContainer.parentNode;
				setTimeout(function () {
					if(self.timeoutEventContinue){
						var bannerMove=40;
						self.imgMoveDistance=self.imgMoveDistance+bannerMove;//记录移动距离
						var imgMoveDistanceImg=(parseInt(slideContainer.style.marginLeft)-bannerMove);//实际移动距离
						slideContainer.style.marginLeft=(imgMoveDistanceImg+"px");
						if(Math.abs(self.imgMoveDistance)>(parentNode.offsetWidth-1)){//一张图滚动完
							self.currentDisplayImg=self.currentDisplayImg+1;
							if(Math.abs(self.imgMoveDistance)>parentNode.offsetWidth){//移过头了
								var diverse=(Math.abs(self.imgMoveDistance)-parentNode.offsetWidth);
								var marginLeftNew=(parseInt(slideContainer.style.marginLeft)+diverse);
								slideContainer.style.marginLeft=(marginLeftNew+"px");
								self.imgMoveDistance=parentNode.offsetWidth
							};
							if(self.currentDisplayImg==(picLen+1)){//滚到最后一张图
								slideContainer.style.marginLeft=0;
								self.currentDisplayImg=1;
							};
							self.moveNewRound(slideContainer,picLen);
						}
						else{
							self.oneImgMove(slideContainer,picLen);
						}
					}
				}, 25);
			}
		},
		moveNewRound:function(slideContainer,picLen){
			var self=this;
			self.imgMoveDistance=0;
			if(this.bannerMoveContinue){
				setTimeout(function () {
					if(self.timeoutEventContinue){
						self.oneImgMove(slideContainer,picLen);
					}
				}, self.slideInterval*1000);
			};
		},
		triggerBannerMove:function(container){
			if(this.bannerImgList.length>1){
				this.bannerMoveContinue=true;
				this.oneImgMove(container.children[0].children[0],this.bannerImgList.length);
			}
		},
		getBannerImages:function(){
			 var self=this;
			 this.slideInterval=2;//默认2秒
			 this.bannerMoveContinue=false;
			 this.curBannerImgIndex=1;
			 this.imgMoveDistance=0;//一张图片移动多少距离
			 this.currentDisplayImg=1;
			 this.bannerImgList=[
				{
					src:"img/post1.png",
					style:""
				},{
					src:"img/post2.png",
					style:""
				}
			];
			if(this.bannerImgList.length>0){
				this.createSlideContainer(document.getElementById("index_page_banner"),this.bannerImgList);
				this.waitAllBannerImgOnload("index_page_banner");
			};
		}
	};
	return indexPage
})