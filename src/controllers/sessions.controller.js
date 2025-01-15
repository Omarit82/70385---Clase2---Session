import userModel from "../models/user.model.js";

export const login = async (req,res)=>{
    const { email , password} = req.body;
    try {
        const usuario =  await userModel.findOne({email:email});
        if(usuario && usuario.password == password ) {
            console.log("El usuario existe: ",usuario);
            req.session.email = usuario.email
            req.session.first_name = usuario.first_name
            req.session.last_name = usuario.last_name
            res.status(200).send({message:"Usuario logueado ", user:usuario})
        }else{
            res.status(404).send({message:"Usuario no encontrado "})
            console.log("El usuario no existe: ",usuario)
        }
    } catch (e) {
        res.status(500).send({message:"Error en la conexion"})
    }
    
}

export const register = async (req,res) => {
    const {first_name, last_name, email, age, password} = req.body;
    try {
        let message = await userModel.create({first_name,last_name,email,age,password})
        
        res.status(201).redirect('/api/sessions/viewlogin')
    } catch (e) {
        res.status(500).send({message:"Error, user not created ",e})
    }
    
}

export const viewLogin = (req, res) =>{
    res.status(200).render('templates/login',{})
}

export const viewRegister = (req, res) =>{
    res.status(200).render('templates/register',{})
}
