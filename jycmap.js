// 百度地图API功能	
map = new BMap.Map("allmap",{enableMapClick:false});				//构造底图时，关闭底图可点功能
map.centerAndZoom(new BMap.Point(117.172,35.11), 13);         		//初始地图中心点			
map.enableScrollWheelZoom();            							//启用滚轮放大缩小

/*加载1-5万标注点*/	
function getSaleData(yearsale,yearsale2){
	//map.clearOverlays();    										//清除之前加载的所有标注
	var ajax = new $ax(Feng.ctxPath + "/jycmap/list/"+10000+'/'+'50000', function(data){			
		//大数据量采用海量点显示		
		if (document.createElement('canvas').getContext) {  		//判断当前浏览器是否支持绘制海量点
	        var points = [];  										//添加海量点数据	        
	        for (var i = 0; i < data.length; i++) {
	          points.push(new BMap.Point(data[i].lon, data[i].lat));	        	       
	        }	        
	        /*海量点属性配置*/	                
	        var options = {
	    	      size: BMAP_POINT_SIZE_NORMAL,						//设置海量点大小，详见baiduMap api文档
	    	      shape: BMAP_POINT_SHAPE_CIRCLE,					//设置海量点显示形状
	    	      color: '#ED8B2C'									//设置5万海量点颜色黄色	            
	    	 }	        	     	        	        
	        var pointCollection = new BMap.PointCollection(points, options);  	//初始化PointCollection	        
	        //给海量点添加监听事件
	        pointCollection.addEventListener('click', function (e) {
	        	//alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  		//监听点击事件，点击某一点可获取该点的经纬度
	        	var address = '';  			//地址
	        	var clientCode = "";		//客户编码
	        	var clientName = "";		//客户名称
	        	var lat = "";				//经纬度
	        	var lon = "";				//经纬度
	        	var salesman = "";			//所属业务员
	        	var yearsale = "";			//本年销售
	        	var img = "";				//图片
	        	//循环查出值  
	            for (var i = 0; i < data.length; i++) {
	            	//points.push(new BMap.Point(data[i].lon, data[i].lat));	 
	            	/*获取点击经纬度下的标注内容，此处只拿对应点击经纬度的标注数据，防止加载所有标注内容导致页面卡死*/
	            	if(data[i].lon==e.point.lng&&data[i].lat==e.point.lat){			//经度==点击的,维度
	            		address = data[i].address;
	            		clientCode = data[i].clientCode;
	            		clientName = data[i].clientName;
	            		lat = data[i].lat;
	            		lon = data[i].lon;
	            		salesman = data[i].salesman;
	            		yearsale = data[i].yearsale;
	            		var img = data[i].img;
	            		if(img == null || undefined){
	            			img = "/static/img/noimg.jpg"     						//无图，设置默认图
	            		}	            		
	            		var imgs = img.split("|");            						//多张图片截取第一张	
	            		break;														//防止加载的数据只显示默认第一条，跳出点击经纬度
	            	}	            		            		            	
	            }
	            /*标注弹窗内容*/
	            var contents =
        			//"<style type='text/css'>.imgSet{background-image:url(\""+imgs[0]+"\");}</style>"+		//暂时注释
        			"<div class='infobox'>"+
        			//"<div class='imgSet'></div>"+						//由于现在后台门面图片不多，暂时注释图片
        			"<p>客户编码："+data[i].clientCode+"</p>" +
        			"<p>客户名称："+data[i].clientName+"</p>" + 
        			"<p>地址："+data[i].address+"</p>" + 			
        			"<p>所属业务员："+data[i].salesman+"</p>" + 
        			"<div class='saletxt'>本年销量："+data[i].yearsale+"</div>" + 			
        			"</div>";            	            	 
	            var point = new BMap.Point(e.point.lng, e.point.lat);
	            /*配置弹出海量点标注详情*/
	            var opts = {
	    				width : 260,     	 		//信息窗口宽度
	    				//height: 260,     	 		//信息窗口高度,加图片显示的高度
	    				height: 160,     	 		//信息窗口高度
	    				//title : "信息窗口",     		//信息窗口标题
	    				enableMessage:false	   		//设置允许信息窗发送短息
	    		};	            
	            var infowindow = new BMap.InfoWindow(contents,opts);      	//标准弹窗
	            map.openInfoWindow(infowindow, point);	            
	        });
	        map.addOverlay(pointCollection);  								//添加Overlay
	        
	    } else {
	        alert('请在chrome、safari、IE8+以上浏览器查看本示例');
	    }											
},function(data){
   Feng.error("获取数据失败!");
});
ajax.start();				
}


/*加载5-10万标注点*/	
function getSaleData2(yearsale,yearsale2){
	//map.clearOverlays();    										//清除之前加载的所有标注
	var ajax = new $ax(Feng.ctxPath + "/jycmap/list/"+50000+'/'+'100000', function(data){			
		//大数据量采用海量点显示		
		if (document.createElement('canvas').getContext) {  		//判断当前浏览器是否支持绘制海量点
	        var points = [];  										//添加海量点数据	        
	        for (var i = 0; i < data.length; i++) {
	          points.push(new BMap.Point(data[i].lon, data[i].lat));	        	       
	        }	        	        
	        /*海量点属性配置*/
	        var options = {
	    	      size: BMAP_POINT_SIZE_NORMAL,						//设置海量点大小，详见baiduMap api文档
	    	      shape: BMAP_POINT_SHAPE_CIRCLE,					//设置海量点显示形状
	    	      color: '#83AFEA'									//设置20万海量点颜色蓝色	            
	    	}	        	        
	        var pointCollection = new BMap.PointCollection(points, options);  	//初始化PointCollection	        
	        //给海量点添加监听事件
	        pointCollection.addEventListener('click', function (e) {
	        	//alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  		//监听点击事件，点击某一点可获取该点的经纬度
	        	var address = '';  			//地址
	        	var clientCode = "";		//客户编码
	        	var clientName = "";		//客户名称
	        	var lat = "";				//经纬度
	        	var lon = "";				//经纬度
	        	var salesman = "";			//所属业务员
	        	var yearsale = "";			//本年销售
	        	var img = "";				//图片
	        	//循环查出值  
	            for (var i = 0; i < data.length; i++) {
	            	//points.push(new BMap.Point(data[i].lon, data[i].lat));	 
	            	/*获取点击经纬度下的标注内容，此处只拿对应点击经纬度的标注数据，防止加载所有标注内容导致页面卡死*/
	            	if(data[i].lon==e.point.lng&&data[i].lat==e.point.lat){			//经度==点击的,维度
	            		address = data[i].address;
	            		clientCode = data[i].clientCode;
	            		clientName = data[i].clientName;
	            		lat = data[i].lat;
	            		lon = data[i].lon;
	            		salesman = data[i].salesman;
	            		yearsale = data[i].yearsale;
	            		var img = data[i].img;
	            		if(img == null || undefined){
	            			img = "/static/img/noimg.jpg"     						//null,underfined 设置默认图
	            		}	            		
	            		var imgs = img.split("|");            						//多张图片截取第一张	
	            		break;														//防止加载的数据只显示默认第一条，跳出点击经纬度
	            	}	            		            		            	
	            }
	            /*标注弹窗内容*/
	            var contents =
        			//"<style type='text/css'>.imgSet{background-image:url(\""+imgs[0]+"\");}</style>"+		//暂时注释
        			"<div class='infobox'>"+
        			//"<div class='imgSet'></div>"+						//由于现在后台门面图片不多，暂时注释图片
        			"<p>客户编码："+data[i].clientCode+"</p>" +
        			"<p>客户名称："+data[i].clientName+"</p>" + 
        			"<p>地址："+data[i].address+"</p>" + 			
        			"<p>所属业务员："+data[i].salesman+"</p>" + 
        			"<div class='saletxt'>本年销量："+data[i].yearsale+"</div>" + 			
        			"</div>";            	            	 
	            var point = new BMap.Point(e.point.lng, e.point.lat);
	            /*配置弹出海量点标注详情*/
	            var opts = {
	    				width : 260,     	 		//信息窗口宽度
	    				//height: 260,     	 		//信息窗口高度,加图片显示的高度
	    				height: 160,     	 		//信息窗口高度
	    				//title : "信息窗口",     		//信息窗口标题
	    				enableMessage:false	   		//设置允许信息窗发送短息
	    		};            
	            var infowindow = new BMap.InfoWindow(contents,opts);      //标准弹窗
	            map.openInfoWindow(infowindow, point);	            
	        });
	        map.addOverlay(pointCollection);  		// 添加Overlay
	        
	    } else {
	        alert('请在chrome、safari、IE8+以上浏览器查看本示例');
	    }											
},function(data){
   Feng.error("获取数据失败!");
});
ajax.start();				
}


/*加载5-10万标注点*/	
function getSaleData3(yearsale,yearsale2){
	//map.clearOverlays();    										//清除之前加载的所有标注
	var ajax = new $ax(Feng.ctxPath + "/jycmap/list/"+100000+'/'+'-1', function(data){			
		//大数据量采用海量点显示		
		if (document.createElement('canvas').getContext) {  		//判断当前浏览器是否支持绘制海量点
	        var points = [];  										//添加海量点数据	        
	        for (var i = 0; i < data.length; i++) {
	          points.push(new BMap.Point(data[i].lon, data[i].lat));	        	       
	        }
	        /*海量点属性配置*/	        	        	        	        
	        var options = {
	    	      size: BMAP_POINT_SIZE_NORMAL,						//设置海量点大小，详见baiduMap api文档
	    	      shape: BMAP_POINT_SHAPE_CIRCLE,					//设置海量点显示形状
	    	      color: '#F78E89'									//设置全部海量点颜色粉红色	            
	    	}
	        
	        
	        var pointCollection = new BMap.PointCollection(points, options);  	//初始化PointCollection	        
	        //给海量点添加监听事件
	        pointCollection.addEventListener('click', function (e) {
	        	//alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  		//监听点击事件，点击某一点可获取该点的经纬度
	        	var address = '';  			//地址
	        	var clientCode = "";		//客户编码
	        	var clientName = "";		//客户名称
	        	var lat = "";				//经纬度
	        	var lon = "";				//经纬度
	        	var salesman = "";			//所属业务员
	        	var yearsale = "";			//本年销售
	        	var img = "";				//图片
	        	//循环查出值  
	            for (var i = 0; i < data.length; i++) {
	            	//points.push(new BMap.Point(data[i].lon, data[i].lat));	 
	            	/*获取点击经纬度下的标注内容，此处只拿对应点击经纬度的标注数据，防止加载所有标注内容导致页面卡死*/
	            	if(data[i].lon==e.point.lng&&data[i].lat==e.point.lat){			//经度==点击的,维度
	            		address = data[i].address;
	            		clientCode = data[i].clientCode;
	            		clientName = data[i].clientName;
	            		lat = data[i].lat;
	            		lon = data[i].lon;
	            		salesman = data[i].salesman;
	            		yearsale = data[i].yearsale;
	            		var img = data[i].img;
	            		if(img == null || undefined){
	            			img = "/static/img/noimg.jpg"     						//null,underfined 设置默认图
	            		}	            		
	            		var imgs = img.split("|");            						//多张图片截取第一张	
	            		break;														//防止加载的数据只显示默认第一条，跳出点击经纬度
	            	}	            		            		            	
	            }
	            /*标注弹窗内容*/
	            var contents =
        			//"<style type='text/css'>.imgSet{background-image:url(\""+imgs[0]+"\");}</style>"+		//暂时注释
        			"<div class='infobox'>"+
        			//"<div class='imgSet'></div>"+						//由于现在后台门面图片不多，暂时注释图片
        			"<p>客户编码："+data[i].clientCode+"</p>" +
        			"<p>客户名称："+data[i].clientName+"</p>" + 
        			"<p>地址："+data[i].address+"</p>" + 			
        			"<p>所属业务员："+data[i].salesman+"</p>" + 
        			"<div class='saletxt'>本年销量："+data[i].yearsale+"</div>" + 			
        			"</div>";            	            	 
	            var point = new BMap.Point(e.point.lng, e.point.lat);
	            /*配置弹出海量点标注详情*/
	            var opts = {
	    				width : 260,     	 		//信息窗口宽度
	    				//height: 260,     	 		//信息窗口高度,加图片显示的高度
	    				height: 160,     	 		//信息窗口高度
	    				//title : "信息窗口",     		//信息窗口标题
	    				enableMessage:false	   		//设置允许信息窗发送短息
	    		};	            
	            var infowindow = new BMap.InfoWindow(contents,opts);      //标准弹窗
	            map.openInfoWindow(infowindow, point);	            
	        });
	        map.addOverlay(pointCollection);  		// 添加Overlay
	        
	    } else {
	        alert('请在chrome、safari、IE8+以上浏览器查看本示例');
	    }											
},function(data){
   Feng.error("获取数据失败!");
});
ajax.start();				
}

	
/*选中年销量1-5万以上*/
$("#checks").on("click",function(){
	if($('#checks').is(':checked')) {								//true  加载		
		getSaleData(10000,50000);									//加载1-5万选择框数据						
	}else{															//false 清空
		map.clearOverlays();       									//清除所有覆盖物(*海量点,不能使用removeOverlay()清除)	
		if($('#checks2').is(':checked')) {							//if 5-10万 true
			getSaleData2(50000,100000); 							//加载5-10万选择框数据	
		}
		if($('#checks3').is(':checked')) {							//if 10以上 true
			getSaleData3(100000,-1); 								//加载10万以上选择框数据			
		}
	}
});
	
/*选中年销量5-10万以上*/
$("#checks2").on("click",function(){
	if($('#checks2').is(':checked')) {								//true  加载
		getSaleData2(50000,100000); 								//加载5-10万选择框数据	
	}else{															//false 清空
		map.clearOverlays();       									//清除所有覆盖物	
		if($('#checks').is(':checked')) {							//if 1-5万 true
			getSaleData(10000,50000);								//加载1-5万选择框数据
		}
		if($('#checks3').is(':checked')) {							//if 10以上 true
			getSaleData3(100000,-1); 								//加载10万以上选择框数据			
		}
	}
});	
	
/*10万以上*/
$("#checks3").on("click",function(){
	if($('#checks3').is(':checked')) {		
		getSaleData3(100000,-1); 									//加载5-10万选择框数据			
	}else{
		map.clearOverlays();       									//清除所有覆盖物
		if($('#checks').is(':checked')) {							//if 1-5万 true
			getSaleData(10000,50000);								//加载1-5万选择框数据
		}
		if($('#checks2').is(':checked')) {							//if 5-10万 true
			getSaleData2(50000,100000); 							//加载5-10万选择框数据	
		}
	}
});	
	
