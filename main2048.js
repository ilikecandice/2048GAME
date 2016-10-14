var board = new Array();
var score = 0;

$(document).ready(function(){
  newgame();

});
function newgame(){
  //初始化棋盘格
  init();
  //随机生成数字
  generateOneNumber();
  generateOneNumber();
}

function init(){
  //棋盘方格的位置
  for(var i =0; i< 4; i++){
    for(var j= 0; j< 4; j++){
      var gridCell = $("#grid-cell-"+i+"-"+j);
      gridCell.css("top",getPosTop(i,j));
      gridCell.css("left",getPosLeft(i,j));
    }
  }

  for(var i = 0; i< 4; i++){
    board[i] = new Array();
    for(var j=0;j<4;j++){
      board[i][j] = 0;
    }
   }

   updataBoardView(board);


}
function updataBoardView(board){
    $(".number-cell").remove();
    for(var i = 0; i<4; i++){

      for(var j=0;j<4;j++){
        $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
        var theNumberCell = $("#number-cell-"+i+"-"+j);
         if(board[i][j] === 0){
          theNumberCell.css(
          {
            "width":"0px",
            "height":"0px",
            "top":getPosTop(i,j)+50,
            "left":getPosLeft(i,j) + 50
          }
            );

         }else{
           theNumberCell.css(
          {
            "width":"100px",
            "height":"100px",
            "top":getPosTop(i,j),
            "left":getPosLeft(i,j),
            "background-color":getNumberBackgroundColor(board[i][j]),
            "color":getNumberColor(board[i][j])
          }
            ).text(board[i][j]);

         }
      }
    }
   };
function generateOneNumber(){
  //判断能否生成数字。棋盘格满了就不能生成
 if(nospace(board)){
  return false;
 }
 //随机一个位置
 var randx = parseInt(Math.floor(Math.random() * 4));
  var randy = parseInt(Math.floor(Math.random() * 4));
while(true){
  if(board[randx][randy] == 0){
    break;
  }
   randx = parseInt(Math.floor(Math.random() * 4));
   randy = parseInt(Math.floor(Math.random() * 4));

}
 //随机数字
 //50%的概率生成2和4
 var randNum = Math.random() < 0.5 ?2:4;
 board[randx][randy] = randNum;
 showNumAnimation(randx ,randy,randNum);
 return true;
}


$(document).keydown(function(event){

  switch(event.keyCode){
    case 37://left
    if(moveLeft()){

      generateOneNumber();
      isGameOver();
    }
    break;
    case 38://up
    if(moveUp()){
      generateOneNumber();
      isGameOver();
    }
    break;
    case 39://right
     if(moveRight()){
      console.log("right");
      generateOneNumber();
      isGameOver();
    }
    break;
    case 40://down
     if(moveDown()){
      generateOneNumber();
      isGameOver();
    }
    break;
  }
});
function isGameOver(){

}
//对每一个数字的左侧位置进行判断，看是否可为落脚点
//落脚位置是否为空
//落脚位置数字和待判定元素数字是否相等
//移动路径中是否有障碍物
function moveLeft(){

  if(!canMoveLeft(board))return false;


  //moveLeft
  for(var i=0;i<4;i++)
    for(var j= 1;j<4;j++){

      if(board[i][j] !=0){
        for(var k=0;k<j;k++){

          if(board[i][k] == 0 && noBlock(i , k, j, board)){

            //move
            showMoveAnimation(i,j,i,k);
            board[i][k] =board[i][j];

            board[i][j] = 0;
            continue;
          }else if(board[i][k] == board[i][j] && noBlock(i,k,j,board)){
            console.log("=======")
            //move
            //add数字同叠加
            showMoveAnimation(i,j,i,k);

            board[i][k] += board[i][j];

            console.log(board[i][k])
            board[i][j] = 0;

            continue;

          }
        }
      }
    }

    updataBoardView(board);

return true;
}


function moveUp(){


  if(!moveUp(board))return false;


  //moveLeft
  for(var i=0;i<4;i++)
    for(var j= 1;j<4;j++){

      if(board[j][i] !=0){
        for(var k=0;k<j;k++){

          if(board[k][i] == 0 && noBlock(i , k, j, board)){

            //move
            showMoveAnimation(j,i,k,i);
            board[k][i] =board[j][i];

            board[j][i] = 0;
            continue;
          }else if(board[k][i] == board[j][i] && noBlock(i,k,j,board)){
            console.log("=======")
            //move
            //add数字同叠加
            showMoveAnimation(j,i,k,i);

            board[k][i] += board[j][i];

            console.log(board[k][i])
            board[j][i] = 0;

            continue;

          }
        }
      }
    }

    updataBoardView(board);

return true;
}

function moveRight(){

  if(!canMoveRight(board))return false;


  //moveRight
  for(var i=0;i<4;i++)
    for(var j= 2;j>= 0;j--){
       console.log(board[i][j]);
      if(board[i][j] !=0){

        for(var k=3;k>j;k--){

          if(board[i][k] == 0 && noBlock(i , j, k, board)){

            //move
            showMoveAnimation(i,k,i,j);
            board[i][k] =board[i][j];

            board[i][j] = 0;
            continue;
          }else if(board[i][k] == board[i][j] && noBlock(i,k,j,board)){

            //move
            //add数字同叠加
            showMoveAnimation(i,j,i,k);

            board[i][k] += board[i][j];

            console.log(board[i][k])
            board[i][j] = 0;

            continue;

          }
        }
      }
    }

    updataBoardView(board);

return true;
}

function moveDown(){

  if(!canMoveDown(board))return false;


  //moveDown
  for(var i=0;i<4;i++)
    for(var j= 2;j>= 0;j--){

      if(board[i][j] !=0){

        for(var k=3;k>j;k--){

          if(board[i][k] == 0 && noBlock(i , j, k, board)){

            //move
            showMoveAnimation(i,k,i,j);
            board[i][k] =board[i][j];

            board[i][j] = 0;
            continue;
          }else if(board[i][k] == board[i][j] && noBlock(i,k,j,board)){

            //move
            //add数字同叠加
            showMoveAnimation(i,j,i,k);

            board[i][k] += board[i][j];

            console.log(board[i][k])
            board[i][j] = 0;

            continue;

          }
        }
      }
    }

    updataBoardView(board);

return true;
}
