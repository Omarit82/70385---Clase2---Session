import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./routes/sessions.routes.js";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import  __dirname  from "./path.js"
import path from 'path'
/**SERVIDOR**/
const app = express();
app.use(express.json());
const PORT = 8080;


/**HANDLEBARS**/
const hbs = create();
app.engine('handlebars',hbs.engine)
app.set('view engine','handlebars')

/**USO DE SESSION**/
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://roselliomar82:rucU4Yvf2ZGfuh94@cluster0.nayeb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl:15
    }),
    secret:"codigo",
    resave:true,
    saveUninitialized:true
}))
mongoose.connect("mongodb+srv://roselliomar82:rucU4Yvf2ZGfuh94@cluster0.nayeb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("DB is connected"))
.catch((e)=>console.log("Error connecting to DB: ",e))

/**CONEXION PARA TESTING Y RUTEO**/

app.get('/', (req,res)=>{
    res.status(200).send({message:"App Conectada"})
})

app.use('/api/sessions',sessionRouter)
app.use('/public', express.static(__dirname+'/public'))

app.set('views',path.join(__dirname,'views'));

/**LEVANTO EL SERVIDOR ESCUCHANDO EN EL PUERTO: 8080**/
app.listen(PORT, ()=>{
    console.log("Server at port: ",PORT);
})