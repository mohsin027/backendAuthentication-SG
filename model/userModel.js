import mongoose from "mongoose";


const userSchema=mongoose.Schema({
fullName: {
  type: String,
},
email:{
    type: String,
    required:true,
    unique:true
},
password:{
    type:String,
},

},
{ timestamps: true }
)

const UserModel=mongoose.model('user',userSchema)
export default UserModel;