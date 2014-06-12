/**
 * @author Administrator
 */
function init(){
	// var stage = document.getElementById("container");
	//创建我机
	var f16 = new myPlane();
	f16.class = "myPlane";
	f16.position = {x:"45%",y:460};
	f16.show();	
	f16.move();
	setInterval(function(){
		f16.fire();
	},100);
document.onclick = function(){
	f16.fire();
}
	//创建敌机
	setInterval(function(){
		var npc = new npcPlane();
		npc.class = "npc";
		npc.show();
		npc.autoMove();
		//npc.fire();
	},500);
	
	//npc.fire();
	stageBg();
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
	//爆炸
	function bang(obj1){
		var x = obj1.offsetLeft,
			y = obj1.offsetTop,
			timer = null,
			bangObj = null;
			
		bangObj = document.createElement("span");
		bangObj.style.left = x+"px";
		bangObj.style.top = y+"px";
		bangObj.className = "plane01";	
		document.getElementById("container").appendChild(bangObj);	
		timer = window.setTimeout(function(){
			document.getElementById("container").removeChild(bangObj);
		},240);	
	}
	//记分板
	var fen = 0;
	function scores(v){
		document.getElementById("score").innerHTML = "得分：" + v;
	}
	//场景
	function stageBg(){
		var stage = document.getElementById("container");
		var y=0;
		setInterval(function(){
			y++;
			stage.style.backgroundPositionY = y + "px";
		},30);
	};
