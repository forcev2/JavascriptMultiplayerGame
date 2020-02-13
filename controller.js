var controller = {
	"jump": 119,
	"jump2": 32,
	"left": 65,
	"right": 68
};
var move = {
	"j":false,
	"l":false,
	"r":false,
	"grounded": false,
	"inJump":false,
	"jumping":0,
	"jum_hight":30,
	"move_down":true
};

function pluseHexa(hexa){
	console.log("Hexa : " + hexa);
	var dec = parseInt(hexa,16);
	console.log("Dec : " + dec);
	if(dec + 5 <= 254)
		dec += 5;
	var hex_after = dec.toString(16);
	if(hex_after.length == 1)
		hex_after = "0" + hex_after;
	console.log("Hexa after : " + hex_after);

	return hex_after;
};

function minusHexa(hexa){
	var dec = parseInt(hexa,16);
	if(dec - 5 >= 0)
		dec -= 5;
	var hex_after = dec.toString(16);
	if(hex_after.length == 1)
		hex_after = "0" + hex_after;

	return hex_after;
};

var lastDownTarget;
window.onload = function() {
    inGame = document.getElementById('canvas');

    document.addEventListener('mousedown', function(event) {
		if(lastDownTarget != event.target){
			lastDownTarget = event.target;
		}
		else{
			var mouse = getMousePosition(event);
			if(inMenu){
				//console.log( buttons[0].y,  buttons[0].x +  buttons[0].width, mouse.x);
				for(i = 0; i < buttons.length; i++){
					if((mouse.x > buttons[i].x && mouse.x < buttons[i].x + buttons[i].width)
						&& (mouse.y > buttons[i].y && mouse.y < buttons[i].y + buttons[i].height)){
						buttons[i].color = buttons[i].pressed_color;
						//console.log(mouse.x + " " + mouse.y);
						if(buttons[i].id > 30){
							var dod_i = buttons[i].id - 30;
							if(dod_i > 0 && dod_i <= 6){
								var color_player = buttons[2].color;
								var red = color_player.substring(1,3);
								var green = color_player.substring(3,5);
								var blue  = color_player.substring(5,7);
								switch(dod_i){
									case 1:
										red = pluseHexa(red);
										break;
									case 2:
										red = minusHexa(red);
										break;	
									case 3:
										green = pluseHexa(green);
										break;
									case 4:
										green = minusHexa(green);
										break;
									case 5:
										blue = pluseHexa(blue);
										break;
									case 6:
										blue = minusHexa(blue);
										break;
									default:
										break;
								}
/*
								color_player = "#" + red + green + blue;
								console.log(player.color );
								player.color = red + green + blue;
								console.log(player.color );
								buttons[2].old_color = color_player;
*/
							}
						}
						else if(buttons[i].id = 2){
							inMenu = false;
							gameStarted = true;
							player.color = buttons[2].old_color.substring(1,7);
							hideSliders();
							closeMenu();
							init();
						}

						

					}else{
						buttons[i].color = buttons[i].old_color;
					}
				}
			}
			else if(gameStarted){
				var angle = getAngle(player.x + (player.width/2), player.y + (player.height/2), mouse.x, mouse.y);
				var request_shoot = "Shoots=" + player.number + "&" + player.x + "&" + player.y + "&" + angle;
				makeCorsRequest(request_shoot);
			}
		}
        //alert('mousedown');
    }, false);

    document.addEventListener('keydown', function(event) {
        if(lastDownTarget == canvas) {
            keyDownf(event);
        }
	}, false);
	
	document.addEventListener('mouseover', function(event){
		var mouse = getMousePosition(event);
		//console.log(mouse);
		for(i = 0 ;i < buttons.length; i++){
			if((mouse.x > buttons[i].x && mouse.x < buttons[i].x + buttons[i].width)
				&& (mouse.y > buttons[i].y && mouse.y < buttons[i].y + buttons[i].height)){
				
				buttons[i].color = buttons[i].over_color;
				//console.log(mouse.x + " " + mouse.y);
			}else{
				buttons[i].color = buttons[i].old_color;
			}
		}
	}, false);
	
	document.addEventListener('keyup', function(event) {
        if(lastDownTarget == canvas) {
            keyUpf(event);
        }
    }, false);
}

function getMousePosition(event){
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	
	return {
		x,
		y
	}
}

//when button goes down
function keyDownf(event){
	event = event || window.event;
	var x = event.keyCode;
	
	
	//console.log("down: "+ x);
	if(x == controller.left){
		move.l = true;
	}
	if(x == controller.right){
		move.r = true;
	}	
	if(x == controller.jump || x == controller.jump2){
		move.j = true;
	}
}

//false when there is collision
function checkCollision(saved_x,saved_y){
	//console.log(mapObjects);
	
	for(i = 0; i < mapObjects.length;i++){
		//console.log(i);
		if(!(mapObjects[i].x >= saved_x + player.width 
			|| mapObjects[i].y >= saved_y + player.height 
			|| mapObjects[i].x + mapObjects[i].width <= saved_x 
			|| mapObjects[i].y + mapObjects[i].height <= saved_y))
			return false;
	}
	
	return true;
}

function checkGrounded(saved_x,saved_y){
	for(i = 0; i < mapObjects.length;i++){
		//console.log(i);
		if(!(mapObjects[i].x >= saved_x + player.width 
			|| mapObjects[i].y >= saved_y + player.height 
			|| mapObjects[i].x + mapObjects[i].width <= saved_x 
			|| mapObjects[i].y + mapObjects[i].height <= saved_y
			))
			return false;
	}
	
	return true;
}

//when button goes up
function keyUpf(event){
	event = event || window.event;
	var x = event.keyCode;
	
	//console.log("up: "+ x);
	if(x == controller.left){
		move.l = false;
	}
	if(x == controller.right){
		move.r = false;
	}	
	if(x == controller.jump || x == controller.jump2){
		move.j = false;
	}
}

function playerMove(){
	var saved_x = player.x;
	var saved_y = player.y;
	
	if(move.r){
		saved_x += 2;
	}
	else if(move.l){
		saved_x -= 2;
	}
	
	if(move.move_down){
		
		saved_y += 2;
		if(checkGrounded(saved_x,saved_y)){
			move.grounded = false;
		}
		else{		
			saved_y -= 2;
			move.grounded = true;
		}
	}
	
	
	if(move.j){
		if(move.grounded){
			move.inJump = true;
			move.move_down = false;
		}
	}
	
	if(move.inJump == 1){
		//console.log(move.jumping +"  "+ move.jum_hight);
		move.jumping += 1;
		saved_y -= 3;
		//.log(saved_y);
		if(move.jumping >= move.jum_hight){
			move.jumping = 0;
			move.inJump = false;
			move.move_down = true;
		}
	}
	
	if(checkCollision(saved_x, saved_y)){
		player.x = saved_x;
		player.y = saved_y;
	}
	else{
		move.jumping = 0;
		move.inJump = false
		move.move_down = true;
		//console.log("collision");
	}
}