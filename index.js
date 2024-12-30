let inputDir = {x: 0 , y:0};
let snakeArr = [{x:8,y: 15}];
let food = {x:13,y: 10};
let speed = 10;
let lastpainttime = 0;
let score = 0;

//Game function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastpainttime)/1000 < 1/speed){
        return ;
    }
    lastpainttime = ctime;
    gameEngine();
}

function isCollied(snar){
    for(let i = 1;i<snakeArr.length;i++){
        if(snar[0].x === snar[i].x && snar[0].y === snar[i].y){
            return true;
        }
    }
    if(snar[0].x <= 0 || snar[0].x >= 18 || snar[0].y <= 0 || snar[0].y >= 18){
        return true;
    }
    return false;
}

function gameEngine(){

    if(score>15){
        board.style.background = 'black';
    }
    else{
        board.style.background = 'linear-gradient(rgb(180, 255, 180),rgb(255, 255, 166))';
    }

    if(isCollied(snakeArr)){
        inputDir = {x:0,y:0};
        alert("GameOver press any key to start the game again ");
        snakeArr = [{x:8,y: 15}];
        score=0;
        setscore.innerHTML = "Score : " + score;
    }

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        snakeArr.unshift({x: snakeArr[0].x+ inputDir.x , y: snakeArr[0].y+inputDir.y});
        score++;
        setscore.innerHTML = "Score : " + score;
        a = 16;
        b = 2;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for(let i = snakeArr.length - 2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.x;
        snakeElement.style.gridColumnStart = e.y;
        if(index === 0){
            if(score>15){
            snakeElement.classList.add('head2');
            }
            else{
            snakeElement.classList.add('head');
            }
        }
        else{
            if(score>15){
            snakeElement.classList.add('snake2');
            }
            else{
                snakeElement.classList.add('snake');
            }
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    if(score>15){
        foodElement.classList.add('food2');
    }
    else{
    foodElement.classList.add('food');
    }
    board.appendChild(foodElement);

}













setInterval(() => {
  window.requestAnimationFrame(main);
}, 1000 / 60);
window.addEventListener('keydown',(e)=>{
    switch(e.key){
        case 'ArrowUp':
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowDown':
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case 'ArrowLeft':
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case 'ArrowRight':
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        default:
            break;
    }
})