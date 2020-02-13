var bullets = [];

const bulletSize = 10;
const bulletVelocity = 6;

function getAngle(x,y,mx,my){
	var dx = mx - x;
	var dy = my - y;
	//console.log(dx +"   "+ dy);
	var angle = Math.atan2(dy,dx);
	
	return angle;
}

function Bullet(x, y, angle, id){
	this.x = x;
	this.y = y;
	this.xVelocity = bulletVelocity * Math.cos(angle);
	this.yVelocity = bulletVelocity * Math.sin(angle);
	this.id = id;
	//console.log("created bullet : x="+ this.x +" y="+ this.y +" vx:"+ this.xVelocity + "    vy:"+ this.yVelocity);
}

function bulletCollided(bullet){	
	//console.log(bullets[0]);
	//console.log(objects[0]);
	for(j = 0; j < objects.length; j++){
		if((Math.round(bullet.x) >= objects[j].x && Math.round(bullet.x) <= objects[j].x + player.width) && 
			(Math.round(bullet.y) >= objects[j].y && Math.round(bullet.y) <= objects[j].y + player.height)){
				if(objects[j].number == bullet.id){
					
				}
				else{
					return true;
				}
		}
	}
	if((Math.round(bullet.x) <= 0 || Math.round(bullet.x) >= canvas.width) || 
			(Math.round(bullet.y) <= 0 || Math.round(bullet.y) >= canvas.height)){
			
			console.log("poza mape")
			return true;
	}
	return false;
}

function bulletUpdate(){
	for(i = 0; i < bullets.length; i++){
		bullets[i].x += bullets[i].xVelocity;
		bullets[i].y += bullets[i].yVelocity;
		if(bulletCollided(bullets[i])){
			console.log("colided");
			bullets.splice(i,1);
			i--;
		}
	}
}

function spawnBullet(request_b){
	if(request_b.startsWith("|bullet=")){
		request_b = request_b.substring(8); 
		console.log(request_b);
		var b = request_b.split('&');
		if(b.length == 4)
			bullets.push(new Bullet(parseInt(b[1]) + (player.width/2),parseInt(b[2]) + (player.height/2),parseFloat(b[3]),b[0]));
	}
}