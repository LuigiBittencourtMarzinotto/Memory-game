const input = document.querySelector(".login_input");
const button = document.querySelector(".login_button");

input.addEventListener("input", function(event){
    //esse "input", ele faz essa função ser chamada sempre que algum dado for colocado no input
    if(event.target.value.length>2){
        button.removeAttribute('disabled')
    }else{
        button.setAttribute("disabled","")
    }
})
button.addEventListener("click",function(event){
    event.preventDefault();//bloquear o envio do formulario
    localStorage.setItem("name",input.value)
    window.location = 'pages/game.html'
})