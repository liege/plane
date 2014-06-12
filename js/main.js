/**
 * @author liege
 * date:2014-6-10 18:10:42
 */
//飞机类
function Plane(){
	this.plane = null;
	this.life = true;
	this.armor = 1;
	this.position = {x:0,y:0};
	this.class = null; 
	this.direction = "up";
	this.bullets = null;
}
//显示飞机
Plane.prototype.show = function(){
	this.plane = document.createElement("p");
	this.plane.score = 0;
	this.plane.className = this.class;
	document.getElementById("container").appendChild(this.plane);
};

//我机
function myPlane(){}
myPlane.prototype = new Plane();
//飞机开火
myPlane.prototype.fire = function(){
	var _this = this;
	_this.position = {
		x:_this.plane.offsetLeft + _this.plane.offsetWidth/2,
		y:_this.plane.offsetTop - 20
	};
	//实例化子弹
	var b = new Bullet();
	_this.bullets = b;
	//子弹方向等于飞机方向
	_this.bullets.direction = _this.direction; 
	//子弹初始坐标等于飞机position值
	_this.bullets.startPos = _this.position;		
	//子弹飞行
	_this.bullets.fly();	

};
//飞机跟随鼠标移动
myPlane.prototype.move = function(){
	var _this = this,
	stage = document.getElementById("container");
	stage.onmouseover = function(e){
		stage.onmousemove = function(e){
			var E = e||event;
			_this.position.x = E.clientX- stage.offsetLeft - _this.plane.offsetWidth/2;
			_this.position.y = E.clientY- stage.offsetTop - _this.plane.offsetHeight/2;
			_this.plane.style.left = _this.position.x + "px";
			_this.plane.style.top = _this.position.y + "px";		
			document.getElementById("t").value = _this.plane.offsetLeft;
			if(_this.plane.offsetLeft>stage.offsetWidth-_this.plane.offsetWidth){
				_this.plane.style.left = stage.offsetWidth-_this.plane.offsetWidth + "px";
			}
			if(_this.plane.offsetLeft<0){
				_this.plane.style.left = 0;
			}
			if(_this.plane.offsetTop<0){
				_this.plane.style.top = 0;
			}
			if(_this.plane.offsetTop>stage.offsetHeight-_this.plane.offsetHeight){
				_this.plane.style.top = stage.offsetHeight-_this.plane.offsetHeight + "px";
			}
		};
		stage.onmouseout = function(){
			stage.onmousemove = null;
		};
	};
};
//敌机
function npcPlane(){}
npcPlane.prototype = new Plane();
npcPlane.prototype.direction = "down";
npcPlane.prototype.timer = null;
npcPlane.prototype.speed = 2;
npcPlane.prototype.interval = 30;
npcPlane.prototype.autoMove = function(){
	var _this = this;
	_this.position.x = Math.random()*(document.getElementById("container").offsetWidth-_this.plane.offsetWidth);
	_this.plane.style.left = _this.position.x + "px";		
	_this.plane.style.top = _this.position.y + "px";	
	_this.plane.armor = _this.armor;
	_this.plane.die = function(){
		die();
	};
	//飞机销毁
	var die = function(){
		document.getElementById("container").removeChild(_this.plane);
		window.clearInterval(_this.timer);
	};	
	this.timer = window.setInterval(function(){
		_this.plane.style.top = _this.plane.offsetTop + _this.speed + "px";
		//判断飞机销毁或飞出界面
		if( _this.plane.offsetTop>document.getElementById("container").offsetHeight){
			die();
		}		
	},_this.interval);
};

