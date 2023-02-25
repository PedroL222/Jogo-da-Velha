const celulas = document.querySelectorAll(".celula");
const opc_amigo = document.querySelector("#opc_amigo");
const opc_bot = document.querySelector("#opc_bot");
const wrapper = document.querySelector(".wrapper");
const jogo = document.querySelector(".jogo");
const voltar = document.querySelector(".voltar");

let checarTurno = true;

let fim = false;

const jogadorX = "X";
const jogadorO = "O";

const combinacoes = [
    [0,1,2],
    [3,4,5],
    [0,3,6],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Botão de selecionar jogar entre amigos

opc_amigo.addEventListener("click",(evt)=>{
    wrapper.classList.toggle("sumir");
    jogo.classList.toggle("sumir");
  

    document.addEventListener("click",(evt)=>{
        if(evt.target.matches(".celula")){
            jogarNormal(evt.target.id);
        }
    });
    
});

//Botão de selecionar jogar contra o bot

opc_bot.addEventListener("click",(evt)=>{
    wrapper.classList.add("sumir");
    jogo.classList.toggle("sumir");
    document.addEventListener("click",(evt)=>{
        if(evt.target.matches(".celula")){
            jogar(evt.target.id);
            setTimeout(bot,200);
        }
    });
});

//Botão de voltar às opções

voltar.addEventListener("click",()=>{
    location.reload();
})

//Criando o bot

function bot(){
    const disponiveis = [];
    for(i in celulas){
        if(!isNaN(i)){
            if(!celulas[i].classList.contains("X") && !celulas[i].classList.contains("O")){
                disponiveis.push(i);
            }
        }
    }
    const posaleatoria = Math.floor(Math.random()* disponiveis.length);
    if(!fim){
        jogar(disponiveis[posaleatoria],jogadorO);
    }
};

//Jogando contra o bot

function jogar(id,turno=jogadorX){
    const celula = document.getElementById(id);
        celula.textContent = turno;
        celula.classList.add(turno);
        setTimeout(checarVencedor(turno),3000);
};


//Jogando entre amigos

function jogarNormal(id){
    const celula = document.getElementById(id);
        turno2 = checarTurno ? jogadorX : jogadorO;
        celula.textContent = turno2;
        celula.classList.add(turno2);
        checarTurno = !checarTurno;
        checarVencedor(turno2);
};

//Verificando qual foi o vencedor no jogo contra o bot

function checarVencedor(turno){
    const vencedor = combinacoes.some((comb)=>{
        return comb.every((pos)=>{
            return celulas[pos].classList.contains(turno);
        })
    });
    if(vencedor){
       setTimeout( encerrarJogo(turno),1000);
    }else if(checarEmpate()){
        encerrarJogo();
    }
};

//Verificando qual foi o vencedor no jogo entre amigos

function checarVencedorNormal(turno){
    const vencedor = combinacoes.some((comb)=>{
        return comb.every((pos)=>{
            return celulas[pos].classList.contains(turno);
        })
    });
    if(vencedor){
       setTimeout( encerrarJogo(turno),1000);
    }else if(checarEmpate()){
        encerrarJogo();
    }
};

//Verificando se houve empate, no jogo entre amigos ou contra o bot

function checarEmpate(){
    let x = 0;
    let o = 0;

    for(i in celulas){
        if(!isNaN(i)){
            if(celulas[i].classList.contains(jogadorX)){
            x++;
        }
        if(celulas[i].classList.contains(jogadorO)){
            o++;
        }}
    }
    return x + o === 9 ? true : false;
};

//Encerrando o jogo se já houve um vencedor, no jogo entre amigos ou contra o bot

function encerrarJogo(vencedor = null){
    fim = true;

    const escura = document.querySelector("#escura");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let msg = null;

    escura.style.display = "flex";
    escura.appendChild(h2);
    escura.appendChild(h3);

    if(vencedor){
        h2.innerHTML = `Parabens! O jogador ${vencedor} venceu!`;
    }else{
        h2.innerHTML = "Empate";
    };
    setTimeout(h3.innerHTML = "Reiniciando jogo",2500);
    setTimeout( () => location.reload(),4000);
};
