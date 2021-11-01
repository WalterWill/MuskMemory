window.idBotaoClicado = 0;
// popup de seleção de nivel
var nivel = document.getElementById("selecionarNivel");

// Botao que carrega dificuldade
var play = document.getElementById("play");

// seta variavel global de dificuldade
function setLocalStorage(){
    play.addEventListener('click', () => {
        localStorage.setItem('dificuldade',play.nodeValue())
    })
}
//isso fica sempre guardando o botao clicado
function botaoClicado(e){
    window.idBotaoClicado = e;
}
//dificuldade selecionada
function ok(){
    localStorage.setItem('dificuldade',window.idBotaoClicado);
    nivel.style.display = "none";
    initialRound();
    startRound();
}

function animacoes(){
    document.getElementById('foguete').setAttribute('class', 'foguete foguete-animacao');
    document.getElementById('tabuleiro').setAttribute('class', 'tabuleiro quadro-animacao');
    document.getElementById('header').setAttribute('class', 'cabecalho quadro-animacao');
    document.getElementById('astro').setAttribute('class', 'astro quadro-animacao');
}

function carregarCartas(){
    let dificuldade = localStorage.getItem('dificuldade');
    console.log("Dificuldade: "+dificuldade);
    switch (dificuldade){
        case '1': 
            document.getElementsByName('facil')[0].style.display = 'block';
            document.getElementsByName('facil')[0].setAttribute('id', 'cartasSelecionadas');
            tempo = 10;
            sortearCartas(2);
            
            break;
        case '2': 
            document.getElementsByName('medio')[0].style.display = 'block';
            document.getElementsByName('medio')[0].setAttribute('id', 'cartasSelecionadas');
            tempo = 45;
            sortearCartas(8);
            
            break;
        case '3': 
            document.getElementsByName('dificil')[0].style.display = 'block';
            document.getElementsByName('dificil')[0].setAttribute('id', 'cartasSelecionadas');
            tempo = 90;
            sortearCartas(18);
            
            break;
        default: 
            break;
    }
}


//Sorteia as cartas do baralho que seráo utilizadas
function sortearCartas(numeroDePares){
    var pares = new Array(numeroDePares*2);
    for(let i = 0; i < numeroDePares; i++){
        var status = false;
        while(status==false){
            var aux = Math.floor(Math.random() * (19 - 1) + 1);     
            if(!pares.includes(aux)){
                pares[i] = aux;
                status = true;
            }
        }           
    }
    saveCartas(pares);
    duplicarCartas(numeroDePares);
}

//Salvar localmente cartas sorteadas
function saveCartas(arrayCartas){
    localStorage.setItem("cartas", JSON.stringify(arrayCartas));
}

//Carregar cartas sorteadas e armazenadas localmente
function loadCartas(){
    return JSON.parse(localStorage.getItem("cartas"));
}

//Duplica as cartas criando pares
function duplicarCartas(numeroDePares){
    var pares = loadCartas();
    var aux = new Array(numeroDePares);
    for(let i=0;i<pares.length;i++){
       if(pares[i]!=null){
            aux[i] = pares[i];
        }else{
            aux[i] = pares[i-numeroDePares];
        }
    }
    embaralharCartas(aux);
}

//Embaralha as cartas no tabuleiro
function embaralharCartas(pares){
    for(let i = pares.length - 1; i > 0; i--){
        let posicao_swap = Math.floor(Math.random() * (i) + 1);
        let aux = pares[i];
        pares[i] = pares[posicao_swap];
        pares[posicao_swap] = aux;
    }
    saveCartas(pares);
    exibirCartas(pares);
}

//Carrega as cartas no tabuleiro
function exibirCartas(pares){
    var $div = document.querySelector("#cartasSelecionadas");
    for(let i=0; i<pares.length; i++){
        $div.innerHTML += '<img src="img/verso_' + localStorage.getItem('dificuldade') + '.jpg" name="'+ i +'" id="' + i +  '" class="card" width="150px" heigth="150px">';
        $div.innerHTML += '<img src="img/Image' + pares[i] + '.jpg" name="card'+ i +'" id="card' + i +  '" class="card hidden" width="150px" heigth="150px">';
    }
    startTimer(tempo, document.getElementById("cronometro"));
}

//bloco de leitura de cartas selecionadas
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard, firstName, secondName;

cards.forEach(card => card.addEventListener('click', flipCard));

$(document).on('click', '.card', function (){
    this.classList.add('flip');
    setTimeout(() => {
        this.classList.add('hidden');
        document.getElementById('card'+this.id).classList.remove('hidden');
    }, 330);
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this.id;
        firstName = this.name;
        return;
    }
    
    secondCard = this.id;
    secondName = this.name;
    hasFlippedCard = false;
    verificarSelecao(firstName, secondName);
});

//Verifica cartas clicadas
function verificarSelecao(carta1, carta2){
    let pares = loadCartas();
    let aux = new Array(2);
    aux[0] = pares[carta1];
    aux[1] = pares[carta2];

    if(aux[0] == aux[1]){
        addFindedCard(aux[0]);
        if(isJoke(carta1) === true){
            if(chooseJoke() == 1){
                console.log("1");
                var y = document.getElementById("coringa-1");
                if (y.style.display === "none") {
                    y.style.display = "block";
                    setTimeout(() => {
                        y.style.display = "none";
                    }, 1000);
                }
                
            }
            else if(chooseJoke() == 0){
                console.log("0");
                var y = document.getElementById("coringa-0");
                if (y.style.display === "none") {
                    y.style.display = "block";
                    setTimeout(() => {
                        y.style.display = "none";
                    }, 1000);
                }
            }
        }
        bloqueia();
        return true;
    }else{
        vira();
        return false;
    }
}

function bloqueia() {
    document.getElementsByName('card'+firstName)[0].setAttribute('class','flip disabled');
    document.getElementsByName('card'+secondName)[0].setAttribute('class','flip disabled');
}

function vira() {
    setTimeout(() => {
        document.getElementsByName('card'+firstName)[0].setAttribute('class','card hidden');
        document.getElementsByName('card'+secondName)[0].setAttribute('class','card hidden');
    }, 1400);
    setTimeout(() => {
        document.getElementsByName(firstName)[0].classList.remove('hidden');
        document.getElementsByName(secondName)[0].classList.remove('hidden');
    }, 1400);
    setTimeout(() => {
        document.getElementsByName(firstName)[0].classList.remove('flip');
        document.getElementsByName(secondName)[0].classList.remove('flip'); 
    }, 1430);
}

//Inicializa os pares já encontrados
function initialFindedCards() {
    let bingo;
    let dificuldade = parseInt(localStorage.getItem("dificuldade"));

    switch (dificuldade) {
        case 1:
            bingo = new Array(2);
            break;
        case 2:
            bingo = new Array(8);
            break;
        case 3:
            bingo = new Array(18);
            break;
    
        default:
            break;
    }

    for (let i = 0; i < bingo.length; i++) {
        bingo[i] = false;
    }

    localStorage.setItem("finded_cards", JSON.stringify(bingo));
}

//Get cartas encontradas
function getFindedCard() {
    return JSON.parse(localStorage.getItem("finded_cards"));
}

//Registra carta encontrada
function addFindedCard(indexOfCardOnBoard) {
    let findedCard = getFindedCard();
    let tabuleiro = JSON.parse(localStorage.getItem("cartas"));

    let aux = 0;

    while ((findedCard[aux] == false) && (aux < findedCard.length)) {
        aux++
    }

    if (aux < findedCard.length) {
        findedCard[aux] = tabuleiro[indexOfCardOnBoard];
    }
}

//Todos os pares foram encontrados?
function isAllCardsFind(){
    let findedCard = getFindedCard();
    if (findedCard[(findedCard.length - 1)] != false) {
        return true;
    }
    return false;
    
}

//timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (timer > 0) {
            --timer;
        }
        if(timer == 0){
            setInterval(function () {
                acabaPartida();
            }, 1000);
        }
    }, 1000);
}
window.onload = function () {
var duration = 60 * 5; // Converter para segundos
display = document.querySelector('#cronometro'); // selecionando o timer
};

function acabaPartida(){
    var x = document.getElementById("finalizarPartida");
    endedRound();
    if(isReadyForNext() === true){
        mudaAmbiante();
    }
    if (x.style.display === "none") {
        x.textContent = getPoints();
        x.style.display = "block";
    }
}

function criarRanking(){
    let ranking = new Array(10);
    localStorage.setItem("ranking_facil", JSON.stringify(ranking));
    localStorage.setItem("ranking_medio", JSON.stringify(ranking));
    localStorage.setItem("ranking_dificil", JSON.stringify(ranking));
}
var astro_atual = 1; //o primeiro astro é a terra
//astros
function mudaAmbiante(){
    console.log(astro_atual);
    setTimeout(() => {
    switch (astro_atual) {
        case 1:
            document.getElementById('terra').setAttribute('class', 'hidden');
            document.getElementById('lua').removeAttribute('class');
            astro_atual = 2;
            break;
        case 2:
            document.getElementById('lua').setAttribute('class', 'hidden');
            document.getElementById('marte').removeAttribute('class');
            astro_atual = 3;
            break;
        case 3:
            document.getElementById('marte').setAttribute('class', 'hidden');
            document.getElementById('jupiter').removeAttribute('class');
            astro_atual = 4;
            break;
        case 4:
            document.getElementById('jupiter').setAttribute('class', 'hidden');
            document.getElementById('saturno').removeAttribute('class');
            astro_atual = 5;
            break;
        case 5:
            document.getElementById('saturno').setAttribute('class', 'hidden');
            document.getElementById('urano').removeAttribute('class');
            astro_atual = 6;
            break;
        case 6:
            document.getElementById('urano').setAttribute('class', 'hidden');
            document.getElementById('netuno').removeAttribute('class');
            astro_atual = 7;
            break;
        case 7:
            document.getElementById('netuno').setAttribute('class', 'hidden');
            document.getElementById('plutao').removeAttribute('class');
            astro_atual = 8;
            break;

        default:
            break;
    }
    }, 2000);
}

function loadRanking(dificuldade){
    let ranking;
    switch (dificuldade) {
        case 1:
            ranking = JSON.parse(localStorage.getItem("ranking_facil"));
            break;
        case 2:
            ranking = JSON.parse(localStorage.getItem("ranking_medio"));
            break;
        case 3:
            ranking = JSON.parse(localStorage.getItem("ranking_dificil"));
            break;

        default:
            break;
    }
    return ranking;
}

function saveRanking(array, dificuldade){
    switch (dificuldade) {
        case 1:
            localStorage.setItem("ranking_facil", JSON.stringify(array));
            break;
        case 2:
            localStorage.setItem("ranking_medio", JSON.stringify(array));
            break;
        case 3:
            localStorage.setItem("ranking_dificil", JSON.stringify(array));
            break;

        default:
            break;
    }
}
//Envia pontos para o Ranking, será salvo caso seja maior que a ultima posição
function submitToRanking(pontuacao, dificuldade){

    let atual_ranking = loadRanking(dificuldade);
    let aux = 0;
    for (let i = 0; i < atual_ranking.length; i++) {
        if (pontuacao > atual_ranking[i]) {
            aux = atual_ranking[i];
            atual_ranking[i] = pontuacao;
            pontuacao = aux;
        }
    }
    saveRanking(atual_ranking, dificuldade);
}

function getRanking(dificuldade){
    let aux;
    switch (dificuldade) {
        case 1:
            aux = JSON.parse(localStorage.getItem("ranking_facil"));
            break;
        case 2:
            aux = JSON.parse(localStorage.getItem("ranking_medio"));
            break;
        case 3:
            aux = JSON.parse(localStorage.getItem("ranking_dificil"));
            break;

        default:
            break;
    }
    return aux;
}

//Inicializa os marcadores de pontos
function initialPoints() {
    let points = 0;
    let goal_points;
    let dificuldade = parseInt(localStorage.getItem("dificuldade"));
    switch (dificuldade) {
        case 1:
            goal_points = points + (20 *3);
            break;
        case 2:
            goal_points = points + (40 *3);
            break;
        case 3:
            goal_points = points + (150 *3);
            break;
    
        default:
            break;
    }

    localStorage.setItem("current_points", points);
    localStorage.setItem("checkpoint_points", points);
    localStorage.setItem("goal_points", goal_points);
}

//Calcula o total de pontos gerados pelos pares encontrados
function calculatePointPerPair(){
    let dificuldade = parseInt(localStorage.getItem("dificuldade"));
    let findedCard = getFindedCard();

    let aux = 0;

    while ((findedCard[aux] == false) && (aux < findedCard.length)) {
        aux++
    }

    let total;
    switch (dificuldade) {
        case 1:
            total = aux * 5;
            break;
        case 2:
            total = aux * 10;
            break;
        case 3:
            total = aux * 20;
            break;
    
        default:
            break;
    }

    return total;
}

//Adiciona pontos passados por parametro
function addPoints(n) {
    let current_points = parseInt(localStorage.getItem("current_points"));
    current_points += n;
    localStorage.setItem("current_points", current_points);
}

//Adiciona pontos de uma rodada
function addRoundPoints() {
    let current_points = parseInt(localStorage.getItem("current_points"));
    let round_points = 0;

    let dificuldade = parseInt(localStorage.getItem("dificuldade"));
    switch (dificuldade) {
        case 1:
            round_points = 20;
            break;
        case 2:
            round_points = 40;
            break;
        case 3:
            round_points = 150;
            break;
                
        default:
            break;
    }

    current_points += round_points;
    localStorage.setItem("current_points", current_points);
}
//Atualiza pontos do checkpoint
//primeiro atualizar o checkpoint
function refreshCheckpoint() {
    let current_points = parseInt(localStorage.getItem("current_points"));
    localStorage.setItem("checkpoint_points", current_points);
}
//depois o refreshgoal points pra extipular nova meta
//Atualiza Meta de pontos, chama quando mudar de astro
function refreshGoalPoints() {
    let checkpoint = parseInt(localStorage.getItem("checkpoint_points"));
    let dificuldade = parseInt(localStorage.getItem("dificuldade"));
    let goal_points;

    switch (dificuldade) {
        case 1:
            goal_points = checkpoint + (20 *3);
            break;
        case 2:
            goal_points = checkpoint + (40 *3);
            break;
        case 3:
            goal_points = checkpoint + (150 *3);
            break;
    
        default:
            break;
    }

    localStorage.setItem("goal_points", goal_points);
}
//Consulta pontos do usuario
function getPoints() {
    return parseInt(localStorage.getItem("current_points"));
}
//Consulta meta de pontos
function getGoalPoints(){
    return parseInt(localStorage.getItem("goal_points"));
}

//Esta pronto para ir para o proximo astro?
function isReadyForNext() {
    if (getPoints() >= getGoalPoints()) {
        return true;
    }
    return false;
}

function jeffBezos() {
    let points = parseInt(localStorage.getItem("checkpoint_points"));
    localStorage.setItem("current_points", points);
}

function nasaContract() {
    let dificuldade = parseInt(localStorage.getItem("dificuldade"));
    switch (dificuldade) {
        case 1:
            addPoints(20);
            break;
        case 2:
            addPoints(40);
            break;
        case 3:
            addPoints(150);
            break;
                
        default:
            break;
    }
}

function insertjoke() {
    let baralho = JSON.parse(localStorage.getItem("cartas"));
    let aux = Math.floor(Math.random() * (baralho.length - 1) + 1);
    console.log("Joke sorted: "+aux);
    let selectedCard = baralho[aux];
    console.log("Selected Card: "+selectedCard);
    localStorage.setItem("coringa", selectedCard);
}

function isJoke(positionOfCardOnBoard) {
    let baralho = JSON.parse(localStorage.getItem("cartas"));
    let selectedCard = parseInt(baralho[positionOfCardOnBoard]);
    let jokeCard = parseInt(localStorage.getItem("coringa"));
    if (selectedCard == jokeCard) {
        return true
    }
    return false;
}

//Função que devo chamar caso a carta seja um coringa (resposta da função isJoke())
function chooseJoke() {     // 0 - Jeff Bezos | 1 - Nasa contract
    return Math.floor(Math.random() * (1) + 1);
}

function initialAstros(){
    let astros = new Array(8);

    astros[0] = "terra";
    astros[1] = "lua";
    astros[2] = "marte";
    astros[3] = "jupiter";
    astros[4] = "saturno";
    astros[5] = "urano";
    astros[6] = "netuno";
    astros[7] = "plutão";

    localStorage.setItem("astros", JSON.stringify(astros));
}

function getAstro(indexOfAstro) {
    let astros = JSON.parse(localStorage.getItem("astros"));
    return astros[indexOfAstro];
}
//Prepara para primeiro Round
function initialRound() {
    initialAstros();
    initialPoints();
    initialFindedCards();
    criarRanking();
}

//Salva pontuação ao final do Round
function endedRound() {
    //Verificar se encontrou todos os pares
    let foundAllPair = isAllCardsFind();

    //Adiciona pontuação do round
    if (foundAllPair) {
        addRoundPoints();
    }else{
        let roundPoits = calculatePointPerPair();
        addPoints(roundPoits);
    }
}

//Prepara para novo Round
function startRound() {
    //Salva checkpoint e meta gera nova mete de pontos
    refreshCheckpoint();
    refreshGoalPoints();

    //Gera cartas
    carregarCartas();
    insertjoke();
    initialFindedCards();
}