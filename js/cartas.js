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
        carregarCartas(localStorage.getItem('dificuldade'));
        initialPoints();
        testarRanking();
    }

    function animacoes(){
        document.getElementById('foguete').setAttribute('class', 'foguete foguete-animacao');
        document.getElementById('tabuleiro').setAttribute('class', 'tabuleiro quadro-animacao');
        document.getElementById('header').setAttribute('class', 'cabecalho quadro-animacao');
        document.getElementById('astro').setAttribute('class', 'astro quadro-animacao');
    }

    function carregarCartas(dificuldade){
        console.log(dificuldade);
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
        for(i = 0; i < numeroDePares; i++){
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
        let cartas = JSON.parse(localStorage.getItem("cartas"));
        return cartas;
    }

    //Duplica as cartas criando pares
    function duplicarCartas(numeroDePares){
        var pares = loadCartas();
        var aux = new Array(numeroDePares);
        for(i=0;i<pares.length;i++){
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
        console.log("Entrada: "+pares);
        for(i = pares.length - 1; i > 0; i--){
            posicao_swap = Math.floor(Math.random() * (i) + 1);
            console.log("posicao swap"+posicao_swap)
            aux = pares[i];
            pares[i] = pares[posicao_swap];
            pares[posicao_swap] = aux;
        }
        console.log("Saida: "+pares);
        saveCartas(pares);
        exibirCartas(pares);
    }

    //Carrega as cartas no tabuleiro
    function exibirCartas(pares){
        var $div = document.querySelector("#cartasSelecionadas");
        for(i=0; i<pares.length; i++){
            console.log(i);
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
        console.log(firstCard, secondCard);
        verificarSelecao(firstName, secondName);
    });

    //Verifica cartas clicadas
   function verificarSelecao(carta1, carta2){
        pares = loadCartas();
        aux = new Array(2);
        aux[0] = pares[carta1];
        aux[1] = pares[carta2];

        if(aux[0] == aux[1]){
            console.log("true");
            bloqueia();
            return true;
        }else{
            console.log("false");
            vira();
            return false;
        }
    }

    function bloqueia() {
        document.getElementsByName('card'+firstName)[0].setAttribute('class','flip disabled');
        document.getElementsByName('card'+secondName)[0].setAttribute('class','flip disabled');
        setTimeout(() => {
            //alert('ACERTOU');
        }, 1400);
    }

    function vira() {
        setTimeout(() => {
            document.getElementsByName('card'+firstName)[0].setAttribute('class','card hidden');
            document.getElementsByName('card'+secondName)[0].setAttribute('class','card hidden');
            console.log('card'+firstName, 'card'+secondName);
        }, 1400);
        setTimeout(() => {
            document.getElementsByName(firstName)[0].classList.remove('hidden');
            document.getElementsByName(secondName)[0].classList.remove('hidden');
        }, 1400);
        setTimeout(() => {
            document.getElementsByName(firstName)[0].classList.remove('flip');
            document.getElementsByName(secondName)[0].classList.remove('flip'); 
        }, 1430);
        setTimeout(() => {
            //alert('ERROU');
        }, 1750);
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
        console.log("acabou");
        var x = document.getElementById("finalizarPartida");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
    }

    function criarRanking(){
        ranking = new Array(10);
        localStorage.setItem("ranking_facil", JSON.stringify(ranking));
        localStorage.setItem("ranking_medio", JSON.stringify(ranking));
        localStorage.setItem("ranking_dificil", JSON.stringify(ranking));
    }

    //astros
    function mudaAmbiante(){
        const pontuacaoteste = 101;
        setTimeout(() => {
        if(pontuacaoteste > 100){
            document.getElementById('terra').setAttribute('class', 'hidden');
            document.getElementById('lua').removeAttribute('class');
        }else{
            
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

    function verificaRanking(pontuacao, dificuldade){

        switch (dificuldade) {
            case 1:
                atual_ranking = loadRanking(dificuldade);
                aux = 0;
                for (let i = 0; i < atual_ranking.length; i++) {
                    if (pontuacao > atual_ranking[i]) {
                    aux = atual_ranking[i];
                    atual_ranking[i] = pontuacao;
                    pontuacao = aux;
                    }
                }
                break;
            case 2:
                atual_ranking = loadRanking(dificuldade);
                aux = 0;
                for (let i = 0; i < atual_ranking.length; i++) {
                    if (pontuacao > atual_ranking[i]) {
                    aux = atual_ranking[i];
                    atual_ranking[i] = pontuacao;
                    pontuacao = aux;
                    }
                }
                break;
            case 3:
                atual_ranking = loadRanking(dificuldade);
                aux = 0;
                for (let i = 0; i < atual_ranking.length; i++) {
                    if (pontuacao > atual_ranking[i]) {
                    aux = atual_ranking[i];
                    atual_ranking[i] = pontuacao;
                    pontuacao = aux;
                    }
                }
                break;
                    
            default:
                break;
        }
        saveRanking(atual_ranking, dificuldade);
    }

    function testarRanking(){
        criarRanking();
        console.log('--- Testando Ranking ---');
        for (let d = 1; d <= 3; d++) {
            for (let i = 0; i <= 10 ; i++) {
                var n = Math.floor(Math.random() * (19 - 1) + 1);
                console.log('Pontuação: '+n);
                verificaRanking(n, d);
            }
        }
    }

    function initialPoints() {
        let points = 0;
        let rounds = Array(3);

        rounds[0] = False;
        rounds[1] = False;
        rounds[2] = False;

        localStorage.setItem("current_points", points);
        localStorage.setItem("checkpoint_points", points);
        localStorage.setItem("rounds", JSON.stringify(rounds));
    }

    function addPoints(n) {
        let current_points = parseInt(localStorage.getItem("current_points"));
        current_points += n;
        localStorage.setItem("current_points", current_points);
    }

    function addRoundPoints() {
        let current_points = parseInt(localStorage.getItem("current_points"));
        let round_points = 0;

        dificuldade = parseInt(localStorage.getItem("dificuldade"));
        switch (dificuldade) {
            case 1:
                round_points = 100;
                break;
            case 2:
                round_points = 100;
                break;
            case 3:
                round_points = 100;
                break;
                    
            default:
                break;
        }

        current_points += round_points;
        localStorage.setItem("current_points", current_points);
    }

    function refreshCheckpoint() {
        let current_points = parseInt(localStorage.getItem("current_points"));
        localStorage.setItem("checkpoint_points", current_points);
    }

    function getPoints() {
        return parseInt(localStorage.getItem("current_points"));
    }

    function isReadyForNext() {
        let rounds = JSON.parse(localStorage.getItem("rounds"));
        return rounds[2];
    }

    function resetRound() {
        let rounds = JSON.parse(localStorage.getItem("rounds"));

        rounds[0] = False;
        rounds[1] = False;
        rounds[2] = False;

        localStorage.setItem("rounds", JSON.stringify(rounds));
    }

    function finishRound() {
        let rounds = JSON.parse(localStorage.getItem("rounds"));
        let status = False;
        let count = 0;
        while (status == False) {
            if (rounds[count] == False) {
                rounds[count] = True;
                status = True;
            }

            if (count < (rounds.length - 1)) {
                count++;
            }
        }
    }

    function jeffBezos() {
        let points = parseInt(localStorage.getItem("checkpoint_points"));
        localStorage.setItem("current_points", points);
    }

    function nasaContract(params) {
        dificuldade = parseInt(localStorage.getItem("dificuldade"));
        switch (dificuldade) {
            case 1:
                addPoints(100);
                break;
            case 2:
                addPoints(200);
                break;
            case 3:
                addPoints(300);
                break;
                    
            default:
                break;
        }
    }