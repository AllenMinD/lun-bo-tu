/*
�����ֲ�ͼʵ�֣�
��5���¼� - ǰ��ͷ�¼������ͷ�¼���С��ť�¼�����껮���¼�����껮���¼���
4������ - �л�ͼƬ������С��ť���ɫ�������Զ����ź�����ֹͣ�Զ����ź�����

1.css����
2.��ͷ�л�����	������onclick�¼���
3.����ѭ������	��ͼƬ�б���ͼƬ�İڷ���5123451��
4.�·�С��ť�л�ͼƬ ��ѭ��������ť���ҵ�һ����ť��onclick�Ǿ͵��á��л�ͼƬ��������С��ť���ɫ������
5.����	��jQuery������
6.�Զ����� ��setInterval��ʱ����
*/

window.onload = function()
{
	var container = document.getElementById("container");
	var imgList = document.getElementById("img_list");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	var index = 1;// ����С��ť������
	var timer = null;//��ʱ����ʼ��
	
	//��С��ť��ɳ�ɫ�ĺ���
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
	
	
	//�л�ͼƬ�ĺ���******
	function changePic(distance)
	{
		//imgList.style.left��ֵ�� ����+"px"��parseInt���Խ����ɴ�����
		var newDis = parseInt(imgList.style.left) + distance + "px";
			
		//�ж�ͼƬ�Ƿ�Խ�硱
		if (parseInt(newDis) > -600)
			newDis = -3000 + "px";	
		else if (parseInt(newDis)  < -3000)
			newDis = -600 + "px";		
		
		//$(selector).animate({params},speed,callback);
		$("#img_list").animate({left:newDis},500);	//ʹ��jQuery�������ͼƬ�л�����Ч
	}


	//�Զ����ź���
	function play()
	{
		timer = setInterval(function(){
			next.onclick();
		}, 3000);
	}
	
	//ֹͣ�Զ����ź���
	function stop()
	{
		clearInterval(timer);
	}



	
	//�����˼�ͷ�����¼�
	prev.onclick = function()
	{
		if (index == 1)	index = 5;
		else index -= 1;
		showButton();
		changePic(600);
	}
	
	//��ǰ����ͷ�����¼�
	next.onclick = function()
	{
		if (index == 5) index = 1;		
		else index += 1;
		showButton();
		changePic(-600);
	}
	
	//�·�С��ť�����¼�
	for (var j=0;j<buttons.length;j++)
	{
		buttons[j].onclick = function()
		{
			if (this.className == "on") return;		//�����ǰ�Ѿ���ʾ������ͼƬ�Ļ����Ͳ���ִ�����溯���ˣ�����Ҳ�����ù�
			var btnIndex = parseInt(this.getAttribute("index"));//getAttribute�������Ի�ȡ�Զ�������
			var distance = -600 * (btnIndex - index);//����ƫ����
			changePic(distance);					//�л�ͼƬ
			index  = btnIndex;					   //���µ�ǰ��index
			showButton();						  //��С��ť��ɳ�ɫ
		}
	}
	
	container.onmouseover = stop;//������Ƶ�ͼƬ��ʱ��ֹͣ�Զ�����
	container.onmouseout = play;//������Ƴ�ͼƬ��ʱ�������Զ�����
	
	play();//һ��ʼ����ҳ��ʱ��Ĭ��������Զ����ŵ�
	
}