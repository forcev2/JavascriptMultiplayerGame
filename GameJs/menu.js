function Button(x, y, width, height, text, old_color, pressed_color, over_color, id){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.color = old_color;
	this.old_color = old_color;
	this.pressed_color = pressed_color;
	this.over_color = over_color;
	this.id = id;
}

var buttons = [];
var inMenu = true;
buttons.push(new Button(100, canvas.height - 120, 200, 60, "Options", 'red','green', 'black', 1));
buttons.push(new Button(canvas.width - 300, canvas.height - 120, 200, 60, "Start", 'yellow','green', 'black', 2));
buttons.push(new Button(200,100,200,200,"",'#00BB00','#005A00','#005A00',0));

buttons.push(new Button(500,175,50,50,"Green",'grey','grey','grey',0));


buttons.push(new Button(500,115,50,50,"Red",'grey','grey','grey',0));


buttons.push(new Button(500,235,50,50,"Blue",'grey','grey','grey',0));

var menuIdRefresh;

function closeMenu(){
	clearInterval(menuIdRefresh);
}
function hideSliders(){
	document.getElementById('red').style.display = 'none';
	document.getElementById('green').style.display = 'none';
	document.getElementById('blue').style.display = 'none';
}

function parseToHex(val){
	var vall = parseInt(val);
	console.log("before :", typeof vall);
	var str_val = vall.toString(16);
	if(str_val.length == 1)
		str_val = "0" + str_val;

	console.log("after :", typeof str_val);
	return str_val;
}

function getUserColor(){
	var red = document.getElementById('red').value;
	var green = document.getElementById('green').value;
	var blue  = document.getElementById('blue').value;
	var new_color = "#" + parseToHex(red) + parseToHex(green) + parseToHex(blue); 
	buttons[2].old_color = new_color;
	player.color = new_color;
	console.log(buttons[2].old_color);

}

function menu(){
	inMenu = true;
	var buttons_press = new Array(buttons.length).fill(0); 
	var buttons_linger = 10;

	menuIdRefresh = setInterval(function(){
		ctx.fillStyle = 'grey';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		getUserColor();
		for(x = 0; x < buttons.length; x++){
			ctx.fillStyle = buttons[x].color;
			ctx.fillRect(buttons[x].x, buttons[x].y, buttons[x].width, buttons[x].height);
			ctx.font = buttons[x].height - 20 + "px Arial";
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom"; 
			ctx.fillText(buttons[x].text, buttons[x].x + (buttons[x].width/2), buttons[x].y + (buttons[x].height - 5));
			if(buttons[x].color != buttons[x].old_color){
				if(buttons_press[x] <= buttons_linger){
					buttons_press[x]++;
				}
				else{
					buttons_press[x] = 0;
					buttons[x].color = buttons[x].old_color;
				}
			}
		}
	},10);
	
}


