//requiring fs
let fs=require("fs")
//requires express package
let express=require("express")
let app = express();
//requires bcrypt package
let bcrypt = require("bcrypt")
//requires and use cookie parser
const cookieParser = require("cookie-parser")
//requires and use multer
let m = require("multer");
let path = require("path");
let storage = m.diskStorage({
    destination: function (req, file, cb) {
        return cb(null,__dirname+"/public/uploaded_files")
    },
    filename: function (req, file, cb) {
        let filename = Date.now() + path.extname(file.originalname);
        return cb(null,filename)
    }
})
let upload = m({ storage: storage })
//requiring cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "dteqtlhu4",
    api_key:"925379643181887",
    api_secret:"L6VtJOSMpNAhzmdIR5LFXKGAZ9Y"
})

//connects to mongodb server and require mongodb packages
let mongoose = require("mongoose");
mongoose.connect("mongodb+srv://himlands786:covide19@cluster0.ibk6maw.mongodb.net/irondev")
let user_data = require("./database_modules/users.js");
let game_data= require("./database_modules/gamedata.js")
//creating routes to files
function isgamename(req, res, next) {
    let files = fs.readdirSync(__dirname + "/uplaoded_games")

    for (let i = 0; i < files.length; i++) {
        if (req.params.games + ".html" == files[i]) {
            next()
        }
    }
    res.cookie("name", "dsfsddfsdfdfdfafafhggssfafdds")
    res.redirect("/games")
}
var loaded_game;
app.get("/games/:game",async (req, res) => {
    if (req.params.game.includes('.')) {
        console.log("error")
    } else {
        loaded_game = req.params.game
    }
    
   
   
    res.sendFile(__dirname + "/gamepage.html");

   
    
})
//sends game data to route
app.post("/gdata", async (req, res) => {
    let users = await game_data.find({ name: loaded_game })
    res.send(users)
})
//creates basic middlewheres
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("public"))

//sends login and signup form on browser
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html")
})
//variable which gets data of user loged in or signed in
var entered_user;
//fetches signin data
app.post("/signin", async (req, res) => {
    let salt = await bcrypt.genSalt(10);
    let passwords = await bcrypt.hash(req.body.password, salt)
    //checks if email exist or not and create user if email doesnt exist
    let users = await user_data.find({ email: req.body.email })
    if (users.length == 0) {
        if (req.body.email == "irondev786@gmail.com") {
            await user_data.create({
                fullname: req.body.fname + " " + req.body.lname,
                gender: req.body.gender,
                email: req.body.email,
                password: passwords,
                isadmin: true
            })
            res.cookie("name", "sdgsgdsgsgsgdfgsfhdhfgsgfsgxgdhdghfghfthfhgfh")
            res.redirect("/admin")
        }
        else {
            await user_data.create({
                fullname: req.body.fname + " " + req.body.lname,
                gender: req.body.gender,
                email: req.body.email,
                password: passwords,
                isadmin: false
            })
            entered_user = req.body.email;
            res.cookie("name", "dsfsddfsdfdfdfafafhggssfafdds")
            res.cookie("email", req.body.email)
            res.redirect("/games")
        }
        
    }
    else {
        res.redirect("/signuperror")
    }
})
//fetching data from login route
app.post("/login", async (req, res) => {
    let users = await user_data.find({email:req.body.email})
    if (users.length == 0) {
        res.redirect("/loginerror")
    }
   else {
        let ourusser = await user_data.findOne({ email: req.body.email })
        let hash = ourusser.password;
        bcrypt.compare(req.body.password, hash, function (err, result) {
            if (result == true) {
                entered_user = req.body.email;
                if (ourusser.isadmin == true) {
                    res.cookie("name", "sdgsgdsgsgsgdfgsfhdhfgsgfsgxgdhdghfghfthfhgfh")
                    res.redirect("/admin");
                }
                else {
                    res.cookie("name", "dsfsddfsdfdfdfafafhggssfafdds")
                    res.cookie("email",req.body.email)
                    res.redirect("/games")
                }
                
            }
            else {
               
                res.redirect("/loginerror")
            }
        })
    }
})
//route that sends username of entered user.
app.post("/user", async (req, res) => {
    let our_user = await user_data.findOne({ email: entered_user })
    res.send(our_user);
})
//creating protected rout to display my games
function issignedin(req, res, next) {
    if (req.cookies.name == "dsfsddfsdfdfdfafafhggssfafdds") {
        res.clearCookie("name")
        next()
    }
    else {
        res.redirect("/")
    }
}
app.get("/games",issignedin, (req, res) => {
   
    res.sendFile(__dirname+"/homepage.html")
})
//creating rout to display signup error
app.get("/signuperror", (req, res) => {
    res.sendFile(__dirname+"/signupfailled.html")
})
//creating rout to display login error
app.get("/loginerror", (req, res) => {
    res.sendFile(__dirname+"/loginfailed.html")
})
//setingup adminrout
function isadmin(req, res, next) {
    if (req.cookies.name == "sdgsgdsgsgsgdfgsfhdhfgsgfsgxgdhdghfghfthfhgfh") {
        res.clearCookie("name")
        next()
    }
    else {
        res.redirect("/")
    }
}
app.get("/admin", isadmin,(req, res) => {
    res.sendFile(__dirname+"/adminroom.html")
})
//getting game information from /uploads

app.post("/uploads", upload.fields([{ name:"cover"}, { name:"s1"}, { name:"s2"}, { name:"s3"}, { name:"s4"}, { name:"s5"} ]), async (req, res) => {
    let window_device;
    let gamefiledata;
    if (req.body?.windows === 'on') {
        window_device = true;
    }
    else {
        window_device = false;
    }
    let android_device;
    if (req.body?.android === 'on') {
        android_device = true;
    }
    else {
        android_device = false;
    }
  
    //fs.writeFileSync(req.body.title+'.html',gamefiledata)
    let cover= await cloudinary.uploader.upload(req.files.cover[0].path);
    let s1=await cloudinary.uploader.upload(req.files.s1[0].path);
    let s2=await cloudinary.uploader.upload(req.files.s2[0].path);
    let s3=await cloudinary.uploader.upload(req.files.s3[0].path);
    let s4=await cloudinary.uploader.upload(req.files.s4[0].path);
    let s5=await cloudinary.uploader.upload(req.files.s5[0].path);

  

    
    game_data.create({
        name: req.body.title,
        tag: req.body.tagline,
        android: android_device,
        window: window_device,
        discription: req.body.description,
        cover: cover.url,
        apk: req.body.apk,
        Zip: req.body.zip,
        s1: s1.url,
        s2: s2.url,
        s3: s3.url,
        s4: s4.url,
        s5: s5.url,
        males: req.body.male_downloads,
        females: req.body.female_downloads

    })
 
    res.cookie("name", "sdgsgdsgsgsgdfgsfhdhfgsgfsgxgdhdghfghfthfhgfh")
    res.redirect("/admin");
    
})
//creating rout to send game data to admin room
app.post("/admindata", async (req, res) => {
    let users = await game_data.find();
  
    res.send(users);
 
   
})
//reciving user info
app.post(("/userdownload"),async (req, res) => {
 
    let user = await user_data.findOne({ email: req.cookies.email })
    let game = await game_data.findOne({ name: loaded_game })
    let download;
    if (user.gender == "male") {
        download = game.males;
        download++;
        let new_user = await game_data.findOneAndUpdate({ name: loaded_game }, { males: download }, {new:true})
        
    }
    else {
        download = game.females;
        download++;
        let new_user = await game_data.findOneAndUpdate({ name: loaded_game }, { femmales: download }, { new: true })
        
    }
    
})

app.listen(3000, () => {
    console.log("server is created")
   

})
