let cc = document.getElementById("cc");
let games = fetch("/admindata", { method: "POST" })
games.then((value1) => {
    return value1.json()
}).then((value2) => {
  
    let total_games = value2.length;
    for (let i = 0; i < total_games; i++) {
        let male_d = value2[i].males;
        let female_d = value2[i].females;
        let gamecard = '<article class="icontainer"><p class="ititle">'+value2[i].name+'</p><p class="idownload">Male Downloads:' + male_d + '</p><p class="idownload">Female Downloads:' + female_d + '</p></article>';
        cc.innerHTML = cc.innerHTML + gamecard;
    }
})

