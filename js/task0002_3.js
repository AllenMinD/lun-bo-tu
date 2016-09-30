/*
焦点轮播图实现：
（5个事件 - 前箭头事件，后箭头事件，小按钮事件，鼠标划过事件，鼠标划出事件；
4个函数 - 切换图片函数，小按钮变橙色函数，自动播放函数，停止自动播放函数）

1.css布局
2.箭头切换功能	（两个onclick事件）
3.无线循环滚动	（图片列表中图片的摆放是5123451）
4.下方小按钮切换图片 （循环遍历按钮，找到一个按钮是onclick是就调用【切换图片函数】【小按钮变橙色】函数
5.动画	（jQuery动画）
6.自动播放 （setInterval定时器）
*/

window.onload = function()
{
	var container = document.getElementById("container");
	var imgList = document.getElementById("img_list");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	var index = 1;// 下面小按钮的索引
	var timer = null;//定时器初始化
	
	//把小按钮变成橙色的函数
	function showButton()
	{
		for (var i=0;i<buttons.length;i++)
		{
			if (buttons[i].className == "on") 
			{
				buttons[i].className = "";
				break;
			}
		}
		buttons[index-1].className = "on";
	}
	
	
	//切换图片的函数******
	function changePic(distance)
	{
		//imgList.style.left的值是 数字+"px"，parseInt可以将其变成纯数字
		var newDis = parseInt(imgList.style.left) + distance + "px";
			
		//判断图片是否“越界”
		if (parseInt(newDis) > -600)
			newDis = -3000 + "px";	
		else if (parseInt(newDis)  < -3000)
			newDis = -600 + "px";		
		
		//$(selector).animate({params},speed,callback);
		$("#img_list").animate({left:newDis},500);	//使用jQuery动画完成图片切换的特效
	}


	//自动播放函数
	function play()
	{
		timer = setInterval(function(){
			next.onclick();
		}, 3000);
	}
	
	//停止自动播放函数
	function stop()
	{
		clearInterval(timer);
	}



	
	//按后退箭头触发事件
	prev.onclick = function()
	{
		if (index == 1)	index = 5;
		else index -= 1;
		showButton();
		changePic(600);
	}
	
	//按前进箭头触发事件
	next.onclick = function()
	{
		if (index == 5) index = 1;		
		else index += 1;
		showButton();
		changePic(-600);
	}
	
	//下方小按钮触发事件
	for (var j=0;j<buttons.length;j++)
	{
		buttons[j].onclick = function()
		{
			if (this.className == "on") return;		//如果当前已经显示了这张图片的话，就不用执行下面函数了，再做也是无用功
			var btnIndex = parseInt(this.getAttribute("index"));//getAttribute方法可以获取自定义属性
			var distance = -600 * (btnIndex - index);//计算偏移量
			changePic(distance);					//切换图片
			index  = btnIndex;					   //更新当前的index
			showButton();						  //把小按钮变成橙色
		}
	}
	
	container.onmouseover = stop;//当鼠标移到图片上时，停止自动播放
	container.onmouseout = play;//当鼠标移出图片上时，启动自动播放
	
	play();//一开始进入页面时，默认情况是自动播放的
	
}