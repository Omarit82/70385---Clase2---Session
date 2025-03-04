import { Schema,model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    age: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    rol: {
        type:String,
        default:"User"
    }
})
 
const userModel = model('users',userSchema);
export default userModel;