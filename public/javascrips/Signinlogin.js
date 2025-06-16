//adding a toggling animation between login and sign up
let button = document.getElementById("b")
let lbutton=document.getElementById("lb")
let container = document.getElementById("a")
let signinform = document.getElementById("s")
let loginform = document.getElementById("l")
//toggle animation for login button
button.addEventListener("click", () => {
    event.preventDefault()
    container.classList.add("toggleanimate")
    setTimeout(() => {
        container.classList.remove("toggleanimate")
        
    }, 5000)
    setTimeout(() => {
        signinform.hidden = true;
        loginform.hidden = false;
        container.classList.add("tsize")
    }, 500)
   
})
//toggle animation for signin button
lbutton.addEventListener("click", () => {
    event.preventDefault()
    container.classList.add("toggleanimate")
    setTimeout(() => {
        
        container.classList.remove("toggleanimate")
        
    }, 5000)
    setTimeout(() => {
        signinform.hidden = false;
        loginform.hidden = true;
        container.classList.remove("tsize")
    }, 500)
})

