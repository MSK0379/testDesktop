
if(confirm("是否进入五子棋")){//确定返回：true  取消返回：false
var me=true;//黑白子的定义
var over= false;//判断是否继续下子的标志位
var chessBoard = [];//给落子的棋子定义数组
//赢法数组三维数组，包含所有的情况
var wins=[];
//定义赢法统计数组
var myWin = [];
var computerWin = [];

for(var i=0; i<15;i++){//初始化棋盘
	chessBoard[i] = [];
	for(var j=0; j<15; j++){
		chessBoard[i][j] = 0;
	}
}

for(var i=0; i<15; i++){//初始化三维数组
	wins[i]=[];
	for(var j=0; j<15; j++){
		wins[i][j]=[];
	}
}
var count = 0;
for(var i=0; i<15; i++){//所有横线的赢法
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
for(var i=0; i<15; i++){//所有竖线的赢法
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
for(var i=0; i<11; i++){//所有反斜线的赢法
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
for(var i=0; i<11; i++){//所有斜线的赢法
	for(var j=14; j>3; j--){
		for(var k=0; k<5; k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
//alert(count);//打印总共的赢法
//console.log(count);//打印到控制台

for(var i=0; i<count; i++){//初始化赢法统计数组
	myWin[i]=0;
	computerWin[i]=0;
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

	var logo = new Image();
	logo.src = "images/logo.png";
logo.onload = function(){
		//添加图片	
		context.drawImage(logo, 0, 0, 450, 450);
		drawChessBoard(); 

}

var drawChessBoard = function(){//为了使图片在棋盘下
	for(var i=0;i<15;i++){//画棋盘
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();//描边方法

		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();

	}
}
var oneStep = function(i,j,me){//i,j代表位置坐标，me 代表黑白棋
	//画棋子
	context.beginPath();//开始一个路径（识别问题）
	context.arc(15 + i*30 , 15 + j*30 , 13 , 0,2*Math.PI);//画扇形
	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30-2, 13,15 + i*30 + 2, 15 + j*30-2, 0);//返回一个渐变的对象
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	context.fillStyle=gradient;
	context.fill();//填充路径内

}
chess.onclick = function(e){//落子的函数
	if(over){
		return;
	}
	if(!me){//如果不是我放下棋直接返回
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);//计算落子的索引

	if(chessBoard[i][j]== 0){
		oneStep(i,j,me);
		//if(me){//因为上方定义了不是我方的话return，所以不需要该判断了
			chessBoard[i][j] = 1;//黑子为1
		//}else{
		//	chessBoard[i][j] = 2;//白子为2
		//}
		//me = !me;//移到程序如果未结束	
		for(var k=0;k<count; k++){
		if(wins[i][j][k]){
			myWin[k]++;//用户可能赢得条件
			computerWin[k] = 6;//同时把电脑这种赢法定义个异常数字，因为不可能实现
			console.log(myWin[k]);
			if(myWin[k] == 5){
				window.alert("你赢了");
				over=true;
			}
		}
	}
		if(!over){
			me = !me;
			computerAI();//实现计算机AI的函数
		}
	}

}
var computerAI = function(){
	var myScore = [];
	var computerScore = [];
	var max=0;//保存最高的分值
	var u=0,v=0;//保存最高分的坐标
	for(var i=0;i<15; i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15; j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	for(var i=0;i<15; i++){
		for(var j=0; j<15; j++){
			if(chessBoard[i][j] == 0){
				for(var k=0;k<count; k++){
					if(wins[i][j][k]){
						if(myWin[k]==1){
							myScore[i][j]+=200;
						}else if(myWin[k]==2){
							myScore[i][j]+=400;
						}else if(myWin[k]==3){
							myScore[i][j]+=2000;
						}else if(myWin[k]==4){
							myScore[i][j]+=10000;
						}
						if(computerWin[k]==1){
							computerScore[i][j]+=220;
						}else if(computerWin[k]==2){
							computerScore[i][j]+=420;
						}else if(computerWin[k]==3){
							computerScore[i][j]+=2200;
						}else if(computerWin[k]==4){
							computerScore[i][j]+=20000;
						}
					}
				}
				if(myScore[i][j]>max){
					max = myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}
				if(computerScore[i][j]>max){
					max = computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v] = 2;
	for(var k=0;k<count; k++){
		if(wins[u][v][k]){
			computerWin[k]++;//用户可能赢得条件
			myWin[k] = 6;//同时把电脑这种赢法定义个异常数字，因为不可能实现
			if(computerWin[k] == 5){
				window.alert("电脑赢了");
				over=true;
			}
		}
	}
	if(!over){
		me = !me;
	}
}
}