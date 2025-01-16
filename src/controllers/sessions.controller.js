import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const login = async (req,res)=>{
    const { email , password} = req.body;
    try {
        const usuario =  await userModel.findOne({email:email});
        console.log("El usuario existe: ",usuario);
        if(usuario ) {
            const match = await bcrypt.compare(password, usuario.password);
            if(match){    
                req.session.email = usuario.email
                req.session.first_name = usuario.first_name
                req.session.last_name = usuario.last_name
                res.status(200).send({message:"Usuario logueado ", user:usuario})
            }else{
                res.status(401).send({message:"Contraseña o usuario incorrecta"})
            }
            
        }else{
            res.status(404).send({message:"Usuario no encontrado "})
        }
    } catch (e) {
        res.status(500).send({message:"Error en la conexion"})
    }
    
}

export const register = async (req,res) => {
    const {first_name, last_name, email, age, pass} = req.body;
    const password=  await bcrypt.hash(pass, 10);
    try {
        let message = await userModel.create({first_name,last_name,email,age,password})
        res.status(201).send({message:"User created ok"})
    } catch (e) {
        res.status(500).send({message:"Error, user not created ",e})
    }
}

export const viewLogin = (req, res) =>{
    res.status(200).render('templates/login',{js:'login.js',css:'styles.css'})
}

export const viewRegister = (req, res) =>{
    res.status(200).render('templates/register',{js:'register.js',css:'styles.css'})
}
