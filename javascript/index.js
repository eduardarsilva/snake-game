const musicaFundo = new Audio("music/music.mp3");
const gameOver = new Audio("music/gameover.mp3");
const musicaMover = new Audio("music/move.mp3");
const musicaComer = new Audio("music/food.mp3");

var direcao = { x: 0, y: 0};
var cobrinha = [ {  x: 5, y: 5  } ]
var fruta = { 
    x: Math.floor(Math.random() * 16) + 1,
    y: Math.floor(Math.random() * 16) + 1
}
var pontos = 0;

var ultimaVezAtualizada = 0;
var velocidade = 6;

function principal (tempoAtual) {
    window.requestAnimationFrame(principal);
    if((tempoAtual - ultimaVezAtualizada) / 1000 < (1 / velocidade)){
        return;
    }
    ultimaVezAtualizada = tempoAtual;

    atualizaGame();
}

function verificaColisao() {
    for(var i = 1; i < cobrinha.length; i++){
        if(cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y){
            return true;
        }
    }
    if(cobrinha[0].x >= 18 || cobrinha[0].x <= 0 || cobrinha[0].y >= 18 || cobrinha[0].y <= 0) {
        return true;
    }

    return false;
}

function verificaComeuFrutinha() {
    if (cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y) {
        musicaComer.play();
        pontos = pontos + 10;
        pontuacao.innerHTML = pontos + " pontos";
        cobrinha.unshift({ x: cobrinha[0].x + direcao.x, y: cobrinha[0].y + direcao.y})
        fruta.x = Math.floor(Math.random() * 16) + 1,
        fruta.y = Math.floor(Math.random() * 16) + 1
        velocidade = velocidade + 0.5;

    }
}

function atualizaGame(){

    var colidiu = verificaColisao();
    if(colidiu == true){
        musicaFundo.pause();
        gameOver.play();
        alert("GAME OVER")
        cobrinha = [{x: 5, y: 5}]
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
    }

    verificaComeuFrutinha();

    for(var i = cobrinha.length - 2; i >=0; i--){
        cobrinha[i + 1] = { ...cobrinha[i]}

    }

    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;

    boadr.innerHTML = "";
    for(var i = 0; i < cobrinha.length; i++){
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if(i == 0){
            parteCobrinha.classList.add("heard");
        }else {
            parteCobrinha.classList.add("snake");
        }

        boadr.appendChild(parteCobrinha);
    }

    var frutinha = document.createElement("div");
    frutinha.style.gridColumnStart = fruta.x;
    frutinha.style.gridRowStart = fruta.y;
    frutinha.classList.add("fruta");
    boadr.appendChild(frutinha);
}


function mexiCobrinha(e) {
     musicaMover.play();


    switch(e.code){
        case "KeyW":
        direcao.x = 0
        direcao.y = -1;
            break;
        case "KeyA":
            direcao.x = -1
            direcao.y = 0;
             break;
        case "KeyS":
            direcao.x = 0
            direcao.y = 1;
            break;
        case "KeyD":
            direcao.x = 1
            direcao.y = 0;
             break
        case "Enter":
            direcao.x = 1;
            direcao.y = 0;
            musicaFundo.play();
            break;        

    }
}

window.addEventListener("keydown", (e) => mexiCobrinha (e))




principal();