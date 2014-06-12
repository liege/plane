/**
 * @author Administrator
 */
//子弹类
function Bullet(){
	//子弹对象，速度，威力，方向，起点坐标，定时器
	this.bullet = null;
	this.interval = 20;
	this.speed = 20;
	this.power = 1;
	this.direction = null;
	this.startPos = {x:0,y:0};
	this.timer = null;
}
//子弹飞行
Bullet.prototype.fly = function(){
	var _this = this;
	//子弹销毁
	var die = function(){
		document.getElementById("container").removeChild(_this.bullet);
		window.clearInterval(_this.timer);
	};
	this.bullet = document.createElement("i");
	document.getElementById("container").appendChild(this.bullet);
	this.bullet.style.left = this.startPos.x + "px";
	this.bullet.style.top = this.startPos.y + "px";
	this.timer = window.setInterval(function(){
		if(_this.direction=="up"){
			
		_this.bullet.style.top = _this.bullet.offsetTop - _this.speed + "px";
		}
		//判断子弹销毁或飞出界面
		if( _this.bullet.offsetTop<0){
			die();
		}
		//获取、遍历所有飞机对象
		var allPlane = document.getElementsByTagName("p");
		var allBullet = document.getElementsByTagName("i");
		for(var j=0;j<allBullet.length;j++){
			for(var i=0;i<allPlane.length;i++){
				// console.log(allBullet[j]+"-"+allPlane[i]);
				if(getCollision(allBullet[j],allPlane[i])){
					allPlane[i].armor--;
					if(allPlane[i].armor<=0){
						//得分
						fen++;
						//爆炸
						bang(allPlane[i]);
						//被击中的飞机销毁
						allPlane[i].die();
						//子弹销毁
						die();
						scores(fen);						
					}
					
					return;
				}
			}
		}		
	},this.interval); 
	
};
