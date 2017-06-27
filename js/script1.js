var menu = document.getElementById('menu');
var context = menu.getContext('2d');
context.strokeStyle = "#BFBFBF";
context.fillStyle = "#EDB77B";
   var logo = new Image();
    logo.src = "images/chess.jpg";
    logo.onload = function(){
        //添加图片  
    context.drawImage(logo, 0, 0, 450, 350);
        //drawChessBoard(); 

}
/* 
var drawChessBoard = function(){//为了使图片在棋盘下
    for(var i=0;i<15;i++){//画棋盘
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,435);
        context.stroke();//描边方法

        context.moveTo(15,15+i*30);
        context.lineTo(435,15+i*30);
        context.stroke();


    }

}*/

    /*
    function showWord() {
        //设置字体样式
        context.font = "30px Courier New";
        //设置字体填充颜色
        context.fillStyle = "blue";
        //从坐标点(50,50)开始绘制文字
        context.fillText("人机大战---五子棋", '80', 100);
    }
    
    function start(){

    }*/