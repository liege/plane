var game = {
	myPlane:null,
	allPlane:[],
	allBullet:[],
	planeSpeed:[4,3,2,1],
	planeDensity:[20,200,600,1500],
	interval:1000/24,
	scores:0,
	gameTime:0,
	num:0,
	stageBgY:0,
	gameSet:null,
	stage:null
};
game.initMyPlane = function(){
	this.myPlane = new myPlane();
	this.myPlane.class = "myPlane";
	this.myPlane.position = {x:"45%",y:460};
	this.myPlane.show();	
	this.myPlane.move();
};
//运行游戏，一切运动皆依赖此函数
game.run = function(){
	var _this = this;
	_this.num++;
	_this.stage = document.getElementById("container");
	//我机开火,push子弹		
	
	//
	if(_this.num%3==0){
		_this.myPlane.fire();
		_this.allBullet.push(_this.myPlane.bullets);
	// console.log(zidan.bullet)
	}
	
	//获取、遍历所有子弹对象
	var allBulletLen = _this.allBullet.length;
	for(var i=0;i<allBulletLen;i++){
		//判断子弹销毁或飞出界面
		if( _this.allBullet[i].bullet.offsetTop<0){
			_this.allBullet[i].die();			
		}		
		if(_this.allBullet[i].outside){
			_this.allBullet.splice(i,1);
			allBulletLen--;
		}
	}	
	//创建敌机
	if(_this.num%_this.planeDensity[0] == 0){	
		var npc = new npcPlane();
		npc.class = "npc1";
		npc.armor = npc.score = 1;
		npc.speed = _this.planeSpeed[0];
		npc.show();
		npc.appear();
		_this.allPlane.push(npc);
	}
	if(_this.num%_this.planeDensity[1] == 0){
		var npc = new npcPlane();
		npc.class = "npc2";	
		npc.armor = npc.score = 10;
		npc.speed = _this.planeSpeed[1];	
		npc.show();
		npc.appear();		
		_this.allPlane.push(npc);
	}
	if(_this.num%_this.planeDensity[2] == 0){
		var npc = new npcPlane();
		npc.class = "npc3";		
		npc.armor = npc.score = 20;
		npc.speed = _this.planeSpeed[2];	
		npc.show();
		npc.appear();
		_this.allPlane.push(npc);		
	}
	if(_this.num%_this.planeDensity[3] == 0){
		var npc = new npcPlane();
		npc.class = "npc4";		
		npc.armor = npc.score = 30;
		npc.speed = _this.planeSpeed[3];	
		npc.show();
		npc.appear();
		_this.allPlane.push(npc);
		_this.num = 0;		
	}	

	//获取、遍历所有飞机对象
	var len = _this.allPlane.length;
	for(var i=0;i<len;i++){
		//判断飞机销毁或飞出界面
		if( _this.allPlane[i].plane.offsetTop>_this.stage.offsetHeight){
			_this.allPlane[i].die();
		}	
		//从数组清理出界活销毁的飞机	
		if(_this.allPlane[i].outside){
			_this.allPlane.splice(i,1);
			len--;
		}
		//我机敌机碰撞
		if(getCollision(_this.myPlane.plane,_this.allPlane[i].plane)){
			_this.over();
		}
	}
	for(var i=0;i<_this.allPlane.length;i++){
		_this.allPlane[i].plane.style.top = _this.allPlane[i].plane.offsetTop + _this.allPlane[i].speed + "px";
	}
	for(var j=0;j<_this.allBullet.length;j++){
		_this.allBullet[j].bullet.style.top = _this.allBullet[j].bullet.offsetTop - _this.allBullet[j].speed + "px";
		for(var i=0;i<_this.allPlane.length;i++){
			//子弹敌机相撞
			if(getCollision(_this.allBullet[j].bullet,_this.allPlane[i].plane)){
				//子弹销毁
				_this.allBullet[j].die();
				//飞机护甲减少
				_this.allPlane[i].armor--;
				if(_this.allPlane[i].armor<=0){
					//得分
					_this.scores += _this.allPlane[i].score;
					//飞机爆炸
					_this.allPlane[i].bang();						
				}				
				return;
			}
		}
	}		
	//记分板
	document.getElementById("score").innerHTML = "得分：" + _this.scores*100;
	//背景运动
	_this.stageBgY++;
	_this.stage.style.backgroundPositionY = _this.stageBgY + "px";
	//游戏进度
	if(_this.scores>20 && _this.scores<40){
		_this.planeSpeed = [5,4,3,2];
		_this.planeDensity = [15,200,600,1500];
	}
	if(_this.scores>40 && _this.scores<80){
		_this.planeSpeed = [6,5,4,3];
		_this.planeDensity = [15,100,400,2000];
	}
	if(_this.scores>80 && _this.scores<100){
		_this.planeSpeed = [7,6,5,4];
		_this.planeDensity = [10,200,500,1500];
	}
	if(_this.scores>150){
		_this.planeSpeed = [10,8,6,5];
		_this.planeDensity = [10,150,300,1000];
	}
};
game.begin = function(){
	var _this =this;
	_this.initMyPlane();
	_this.gameSet = window.setInterval(function(){
		_this.run();
	},_this.interval);	
};
game.pause = function(){
	var _this = this;
	_this.myPlane.move(true);
	//为何这里没法删除时间处理程序？
	_this.myPlane.stage.onmousemove = null;
	window.clearInterval(_this.gameSet);
	_this.myPlane.plane.style.display = "none";
};
game.over = function(){
	this.pause();
	var info = document.getElementById("info"),
		endScroe = document.getElementById("endScroe");
	info.style.display = "block";
	endScroe.innerHTML = this.scores*100;
};
onload = function(){
	var begin = document.getElementById("begin"),
		begin_btn = document.getElementById("begin_btn"),
		pause = document.getElementById("pause"),
		pause_btn = document.getElementById("pause_btn"),
		again_btn = document.getElementById("again_btn"),
		stage = document.getElementById("container");
	begin_btn.onclick = function(e){
		var E = e||event;
		begin.style.display = "none";
		game.begin();
		E.stopPropagation();
		E.cancelBubble = true;
	};
	stage.onclick = function(){
		pause.style.display = "block";
		game.pause();
	};
	pause_btn.onclick = function(e){
		var E = e||event;	
		game.begin();
		pause.style.display = "none";
		E.stopPropagation();
		E.cancelBubble = true;		
	};
	again_btn.onclick = function(){
		window.location.reload();
	};
	
	
};

	//碰撞检测
	function getCollision(obj1,obj2){
		var l1 = obj1.offsetLeft;
		var r1 = obj1.offsetLeft + obj1.offsetWidth;
		var t1 = obj1.offsetTop;
		var b1 = obj1.offsetTop+ obj1.offsetHeight;
		var l2 = obj2.offsetLeft;
		var r2 = obj2.offsetLeft + obj2.offsetWidth;
		var t2 = obj2.offsetTop;
		var b2 = obj2.offsetTop+ obj2.offsetHeight;				
		if(r1<l2 || l1>r2 || t1>b2 || b1<t2){
			return false;
		}else{
			return true;
		}
	}
