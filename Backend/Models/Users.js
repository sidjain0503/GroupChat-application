const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = mongoose.Schema({
    name: {type:String,required: true},
    email: {type:String,required: true,unique: true},
    password: {type:String,required: true},
    pic: {type:String,
    default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3hwxmRfs4cG21fRSmvUsVJWSV2U93IMK4pw&usqp=CAU'},
},{
    timestamps:true
}

);

UserSchema.methods.matchPassword = async function (enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}

UserSchema.pre('save',async function (next){

    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User',UserSchema);

module.exports = User; 