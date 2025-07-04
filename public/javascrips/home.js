// JavaScript source code
//creating trigger animations
let namecontainer = document.getElementById("nc");
let usercard = document.getElementById("u");
let ownercard = document.getElementById("o");
setTimeout(() => {
    namecontainer.classList.remove("n");
    usercard.classList.remove("u");
    ownercard.classList.remove("o");
    
}, 100)


//fecthing games data and putting gamecards
let cardcontainer = document.getElementById("cc")
let gamedata = fetch("/admindata", { method: "POST" })
gamedata.then((value1) => {
    return value1.json();
}).then((value2) =>{
    
   
    let card_number = value2.length;
    let carddets;
    for (let i = 0; i < card_number; i++) {
        if (value2[i].window == true && value2[i].android == true) {
            carddets = '<div class="gcard"><img class="cimg" src="' + value2[i].cover + '" /><div class="device flex_row m_flex_row" ><img class="dp" src="../images/window.png" /><img class="dp" src="../images/android.png" /></div><div class="ctitle">' + value2[i].name + '</div><a id="ge" class="clink" href="/games/' + value2[i].name + '">Download</a></div>'
        }
        else if (value2[i].window == true && value2[i].android == false) {
            carddets = '<div class="gcard"><img class="cimg" src="' + value2[i].cover + '" /><div class="device flex_row m_flex_row" ><img class="dp" src="../images/window.png" /></div><div class="ctitle">' + value2[i].name + '</div><a id="ge" class="clink" href="/games/' + value2[i].name + '">Download</a></div>'
        }
        else {
            carddets = '<div class="gcard"><img class="cimg" src="' + value2[i].cover + '" /><div class="device flex_row m_flex_row" ><img class="dp" src="../images/android.png" /></div><div class="ctitle">' + value2[i].name + '</div><a id="ge" class="clink" href="/games/' + value2[i].name + '">Download</a></div>'
        }
        
        cardcontainer.innerHTML = cardcontainer.innerHTML + carddets;
    }
})
//fecthing username of user and puting username 
let user = fetch("/user", { method: "POST" })
user.then((value1) => {
    return value1.json()
}).then((value2) => {
    let user_name = value2.fullname;
    usercard.innerHTML = "welcome:<br>" + user_name;
    
  

})
//trigering starter animation for cardcontainer
setTimeout(() => {
    cardcontainer.classList.remove("g");
},3000)
