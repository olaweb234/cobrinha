let eixox = 10;
let eixoy = 0;
let velocidade = 200;
let intervalo;
let placar = 0;

let comida = document.getElementById('comida');
let cobrinha = [
    { x: 50, y: 50 },
    { x: 40, y: 50 },
    { x: 30, y: 50 }
];

document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowDown" && eixoy !== -10) {
        eixox = 0;
        eixoy = 10;
    } else if (event.key === "ArrowUp" && eixoy !== 10) {
        eixox = 0;
        eixoy = -10;
    } else if (event.key === "ArrowLeft" && eixox !== 10) {
        eixox = -10;
        eixoy = 0;
    } else if (event.key === "ArrowRight" && eixox !== -10) {
        eixox = 10;
        eixoy = 0;
    }
});

function movercobrinha() {
    
    let cabeça = cobrinha[0];
    let novaCabeça = {
        x: cabeça.x + eixox,
        y: cabeça.y + eixoy
    };

    let jogo = document.getElementById('jogo');
    let largura =  jogo.clientWidth;
    let altura = jogo.clientHeight;

    if (
        novaCabeça.x < 0 || novaCabeça.x >= largura ||
        novaCabeça.y < 0 || novaCabeça.y >= altura
    ) {
        alert('Game over! A cobrinha bateu na parede.');
        location.reload();
        return;
    }

    cobrinha.unshift(novaCabeça);

    if (
        novaCabeça.x === comida.offsetLeft &&
        novaCabeça.y === comida.offsetTop
    ) {
        atualizarPlacar();
       
        reposicionarcomida();
        if (velocidade > 50) velocidade -= 20;
        iniciarjogo();
    } else {
        cobrinha.pop();
    }
}

function checarcolisaocauda() {
    const [cabeça, ...corpo] = cobrinha;
    for (let segmento of corpo) {
        if (cabeça.x === segmento.x && cabeça.y === segmento.y) {
            alert('Game Over! A cobrinha colidiu com a cauda.');
            location.reload();
        }
    }
}

function atualizarPlacar() {
    placar++;
    document.getElementById('placar').innerText = `placar: ${placar}`;
}


function reposicionarcomida() {
    const jogo = document.getElementById('jogo');
    let largura = Math.floor(jogo.clientWidth/10)*10;

    let altura = Math.floor(jogo.clientHeight/10)*10;

    let posicaox = Math.floor(Math.random() * (largura / 10)) * 10;
    let posicaoy = Math.floor(Math.random() * (altura / 10)) * 10;
    comida.style.left = posicaox + 'px';
    comida.style.top = posicaoy + 'px';
}

function desenharcobrinha() {
    const areadojogo = document.getElementById("jogo");
    areadojogo.innerHTML = "";

    cobrinha.forEach(segmento => {
        const elemento = document.createElement("div");
        elemento.style.left = segmento.x + "px";
        elemento.style.top = segmento.y + "px";
        elemento.classList.add("cobra");
        areadojogo.appendChild(elemento);
    });

    areadojogo.appendChild(comida);
}

function iniciarjogo() {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        movercobrinha();
        desenharcobrinha();
        checarcolisaocauda();
    }, velocidade);
}



iniciarjogo();
