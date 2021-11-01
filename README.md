# Musk Memory

Jogo da memória desenvolvido para a disciplina de Modelagem de Software, do curso Ciência da Computação, ministrada pelo professor Leonardo Veronese Soletti.

O tema escolhido para o jogo é _**Elon Musk e seus foguetes**_ 🚀

Para iniciar e jogar, vá até o [repositório do jogo](https://github.com/WalterWill/MuskMemory) e baixe a pasta zip que contém o jogo. Abra o arquivo index.html e divirta-se.
 
## Diferencial

Conforme o usuário conquista pontos, um foguete é montado. Um foguete precisa de uma determinada quantidade de pontos para ser completado.
Assim que o foguete é completado, o ambiente muda, sendo necessário um foguete novo e mais potente para alcançar um novo ambiente. Os ambientes são a Terra, Lua, Marte, Júpiter, Saturno, Urano, Netuno e Plutão. Nesta ordem.

### Astros
Cada astro simboliza um ambiente de jogo que o jogador alcançou devido a sua pontuação. 
O jogo inicia na Terra e após o jogador finalizar uma partida, é verificado se ele vai para o próximo ambiente e, caso sim, o foguete lança voo e pousa no próximo astro.

### Coringas

Existem 2 tipos de cartas coringa que podem ser inseridas no jogo. O primeiro tipo é chamado de Jeff Bezos, onde o bilionário processa a NASA, obrigando o Elon Musk a atrasar a construção do foguete.

Outro tipo de coringa é chamado de Novo Contrato, onde a NASA fecha mais um contrato com Elon Musk e injeta dinheiro para a aceleração da construção do foguete

## Selecionar dificuldade
Antes de iniciar o jogo, a dificuldade é selecionada. As 3 dificuldades disponíveis são: fácil, médio e difícil. Cada dificuldade tem suas próprias características.

### Fácil

Matriz: 2x2
Pontuação: Todos os pares/ciclo = 20 pontos, Se esgotar o tempo recebe 5 pontos por par
Tempo: 10 segundos

### Médio

Matriz: 2x2
Pontuação: Todos os pares/ciclo = 40 pontos,  Se esgotar o tempo recebe 10 pontos por par
Tempo: 45 segundos

### Difícil

Matriz: 6x6
Pontuação: Todos os pares/ciclo = 150, Se esgotar o tempo recebe 20 pontos por par
Tempo: 90 segundos

## Pontuação
A pontuação é calculada sempre no término da partida.
Há duas possibilidades: Encontrar todas as cartas ou não encontrar todas as cartas.

### Encontrei todas as Cartas
É adicionado os pontos da partida referentes a dificuldade escolhida
Fácil: 20 pontos
Médio: 40 pontos
Difícil: 150 pontos

### Não encontrei todas as cartas
Cada par de cartas encontradas geram uma quantidade de pontos, conforme a dificuldade selecionada
Fácil: 5 pontos
Médio: 10 pontos
Difícil: 20 pontos

Depois dos pontos serem calculados, é verificado se você possui os pontos necessários para mudar de astro
É necessário juntar o equivalente a 3 rodadas completas para avançar para o próximo astro

Fácil - 60 | Médio - 120 | Difícil - 450


## Coringa
A partir das cartas selecionadas do baralho para entrarem no jogo, é sorteada uma para ser a carta que irá disparar a existência de um coringa.
A função verificarSelecao responsável pela comparação das cartas e verificação de pares, também verifica se no par selecionado há um coringa.
Com o coringa revelado, 
- animação do coringa na tela

## Area administrativa
Na área administrativa é possível adicionar cartas mais cartas ao jogo do jogador. 
Essas cartas são apresentadas na tela e podem ser deletadas.


## Montar foguete
A construção do foguete é importante para prosseguir no jogo e desbloquear o próximo nível. A cada pontuação que o jogador consegue, aumentá-se o nível de construção do foguete.

## Finalizar partida
- abre o popup ok
- mostra os pontos ok
- monta o foguete de acordo com os pontos
- verificar se vai fazer transição de ambiente
- criar função para iniciar uma nova partida, sempre precisa iniciar a função insertjoke()

## Casos de teste
Os casos de teste são realizados após a conclusão das tarefas necessárias para a construção de um requisito.
Para o teste ter resultado positivo é necessário que todos os passos executados tenham o resultado de verificação esperado para validar o requisito.
Caso algum passo não ocorra como o esperado, o teste falha e uma correção é reportada.
A tabela a seguir indica os requisitos do jogo, os casos de teste criados o resultado dos testes executados.

| Requisito              | Caso de teste                   | Resultado do teste |
|------------------------|---------------------------------|--------------------|
| Selecionar dificuldade | TC001 – Iniciar Rodada- Fácil   | Passou             |
|                        | TC002 – Iniciar Rodada- Médio   | Passou             |
|                        | TC003 – Iniciar Rodada- Difícil | Passou             |
| Jogar                  | TC004 – Verificar par           | Passou             |
|                        | TC005 – Montar foguete          | Não passou         |
|                        | TC006 – Troca de astro          | Não passou         |
|                        | TC007 – Salvar pontuação        | Passou             |
| Diferencial            | TC008 – Receber coringa         | Passou             |
| Ranking                | TC009 – Visualizar ranking      | Não passou         |
| Gerir cartas           | TC010 – Incluir carta           | Não passou         |
|                        | TC011 – Deletar carta           | Passou             |

## Autores
Andressa Della Torre Salgado - @andressasalgado

Augusto Schneider Nascimento

Michely Amaral Machado

Rodrigo Fagundes Coruja - @rodrigo-fc-ulbra

William Walter Pereira - @WalterWill