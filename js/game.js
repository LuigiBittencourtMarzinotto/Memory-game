const grid = document.querySelector(".grid")
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
let time=0;
let minutos=0;
const characters=[
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy'
]//Aqui vai dentro de array os nome das imagens
const createElement= function createElement(tag,className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}  ;  
let firstCard='';
let secondCard='';
function checkEndGame(){
    const disabledCards = document.querySelectorAll(".disabled-card");
    if(disabledCards.length == characters.length*2){
        clearInterval(this.loop)
        setTimeout(function(){
            confirm(`parabéns ${localStorage.getItem('name')}, deseja fazer novamente`)
            if(confirm){
                location.reload();
            }
        },500)


    }
}
function checkCards(){
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    if(firstCharacter==secondCharacter){
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')//isso é para o filho fica em preto e branco
        firstCard='';
        secondCard='';
        checkEndGame();

    }else{
        setTimeout(function(){
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')
            firstCard='';
            secondCard='';
        },600)

    }
}

const revealCard= function revealCard(event){
    if(event.target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(firstCard ===''){
        event.target.parentNode.classList.add("reveal-card"); // ele pega o pai da carta que foi clicada e adicionol essa class
        firstCard= event.target.parentNode;
    }else if(secondCard ===''){
        event.target.parentNode.classList.add("reveal-card"); // ele pega o pai da carta que foi clicada e adicionol essa class
        secondCard= event.target.parentNode;
    }
    checkCards();
    

}

const createCard= function createCard(character){
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back');
    front.style.backgroundImage= `url('../img/${character}.png')`;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)
    return card
    
};

const loadGame = function loadGame(){
    const duplicateCharacters = [...characters, ...characters]//isso e para ele pega todos
        
    const shuffledArray = duplicateCharacters.sort(()=>
        Math.random()-0.5
    )//metodo de embaralhar os elementos do array, se for menor que um ele pula para o outro, dai o radom vai rodando ate todos irem 
    
    shuffledArray.forEach(function(character){
        const card = createCard(character);
        grid.appendChild(card)
    });//busca carta do cards, um por um ele passa dentro de cada coisa do array
}
const startTimer = () => {

    this.loop=setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
  
  }
  

window.onload=function(){
    spanPlayer.innerHTML=localStorage.getItem('name')
    loadGame();
    startTimer();
}