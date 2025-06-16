//fecthing username of user and puting username

let game = fetch("/gdata", { method: "POST" })
game.then((value1) => {
    return value1.json()
}).then((value2) => {
    let screenshorst = [];
    screenshorst[0] = value2[0].s1;
    screenshorst[1] = value2[0].s2;
    screenshorst[2] = value2[0].s3;
    screenshorst[3] = value2[0].s4;
    screenshorst[4] = value2[0].s5;
    let body = document.getElementById("b")
    let bodydata;
    if (value2[0].android == true && value2[0].window == true) {
        bodydata = ' <header><nav class="navbar flex_row m_flex_row" ><div id="u" class="namecard u">' + value2[0].name + '</div><div id="nc" class="namecontainer flex_row m_flex_colomb n"><div class="iron"><b>IRON</b></div><div class="dev">DEV</div></div><div id="o" class="namecard o">Owned by:<br />Hamza Ahmad</div></nav></header><main ><article id="d" class="download_box flex_colomb m_flex_colomb d"><div class="ic flex_row m_flex_row"><div class=" titlec m_flex_colomb flex_row"><p class="gtitle">' + value2[0].name + '</p><p class="gtag">' + value2[0].tag + '</p></div><img src="../uploaded_files/' + value2[0].cover + '" class="gimg" /></div><div class="download_button flex_row m_flex_row"><a id="ge" href="/uploaded_files/' + value2[0].Zip + '" download>DOWNLOAD FOR PC</a><a id="ge" href="/uploaded_files/' + value2[0].apk + '" download>DOWNLOAD FOR mobile</a></div></article> <div id="sss" class="screenshortsection d"><h1 class="screenshot_heading">ScreenShorts</h1><article id="st" class="screenshots flex_row m_flex_colomb"> <img class="st" src="../uploaded_files/' + screenshorst[0] + '" /><img class="st" src="../uploaded_files/' + screenshorst[1] + '" /><img class="st" src="../uploaded_files/' + screenshorst[2] + '" /><img class="st" src="../uploaded_files/' + screenshorst[3] + '" /><img class="st" src="../uploaded_files/' + screenshorst[4] + '" /></article> </div><div class="about"><h1 class="screenshot_heading">About this game</h1> <article class="pcontainer"><p>' + value2[0].discription + '</p></article> </div></main>'
    }
    else if (value2[0].android == true && value2[0].window == false) {
        bodydata = ' <header><nav class="navbar flex_row m_flex_row" ><div id="u" class="namecard u">' + value2[0].name + '</div><div id="nc" class="namecontainer flex_row m_flex_colomb n"><div class="iron"><b>IRON</b></div><div class="dev">DEV</div></div><div id="o" class="namecard o">Owned by:<br />Hamza Ahmad</div></nav></header><main ><article id="d" class="download_box flex_colomb m_flex_colomb d"><div class="ic flex_row m_flex_row"><div class=" titlec m_flex_colomb flex_row"><p class="gtitle">' + value2[0].name + '</p><p class="gtag">' + value2[0].tag + '</p></div><img src="../uploaded_files/' + value2[0].cover + '" class="gimg" /></div><div class="download_button flex_row m_flex_row"><a id="ge" href="/uploaded_files/' + value2[0].apk + '" download>DOWNLOAD FOR mobile</a></div></article> <div id="sss" class="screenshortsection d"><h1 class="screenshot_heading">ScreenShorts</h1><article id="st" class="screenshots flex_row m_flex_colomb"> <img class="st" src="../uploaded_files/' + screenshorst[0] + '" /><img class="st" src="../uploaded_files/' + screenshorst[1] + '" /><img class="st" src="../uploaded_files/' + screenshorst[2] + '" /><img class="st" src="../uploaded_files/' + screenshorst[3] + '" /><img class="st" src="../uploaded_files/' + screenshorst[4] + '" /></article> </div><div class="about"><h1 class="screenshot_heading">About this game</h1> <article class="pcontainer"><p>' + value2[0].discription + '</p></article> </div></main>'
    }
    else {
        bodydata = ' < header > <nav class="navbar flex_row m_flex_row" ><div id="u" class="namecard u">' + value2[0].name + '</div><div id="nc" class="namecontainer flex_row m_flex_colomb n"><div class="iron"><b>IRON</b></div><div class="dev">DEV</div></div><div id="o" class="namecard o">Owned by:<br />Hamza Ahmad</div></nav></header > <main ><article id="d" class="download_box flex_colomb m_flex_colomb d"><div class="ic flex_row m_flex_row"><div class=" titlec m_flex_colomb flex_row"><p class="gtitle">' + value2[0].name + '</p><p class="gtag">' + value2[0].tag + '</p></div><img src="../uploaded_files/' + value2[0].cover + '" class="gimg" /></div><div class="download_button flex_row m_flex_row"><a id="ge" href="/uploaded_files/' + value2[0].Zip + '" download>DOWNLOAD FOR PC</a></div></article> <div id="sss" class="screenshortsection d"><h1 class="screenshot_heading">ScreenShorts</h1><article id="st" class="screenshots flex_row m_flex_colomb"> <img class="st" src="../uploaded_files/' + screenshorst[0] + '" /><img class="st" src="../uploaded_files/' + screenshorst[1] + '" /><img class="st" src="../uploaded_files/' + screenshorst[2] + '" /><img class="st" src="../uploaded_files/' + screenshorst[3] + '" /><img class="st" src="../uploaded_files/' + screenshorst[4] + '" /></article> </div><div class="about"><h1 class="screenshot_heading">About this game</h1> <article class="pcontainer"><p>' + value2[0].discription + '</p></article> </div></main>'
    }
    body.innerHTML = bodydata;
  
    
}).then(() => {

    //sending user information
    let dbutton = document.getElementById("ge");
    dbutton.addEventListener("click", ()=> {
        fetch("/userdownload", {method:"POST"})
    })

    
    //creating trigger animations
    let namecontainer = document.getElementById("nc");
    let usercard = document.getElementById("u");
    let ownercard = document.getElementById("o");
    let download_container = document.getElementById("d")
    let screenshortcontainer = document.getElementById("sss")
    setTimeout(() => {
        namecontainer.classList.remove("n");
        usercard.classList.remove("u");
        ownercard.classList.remove("o");
        //animating download section
        setTimeout(() => {
            download_container.classList.remove("d");
            setTimeout(() => {
                screenshortcontainer.classList.remove("d")
            }, 3000)
        }, 1000)

    }, 100)
})



