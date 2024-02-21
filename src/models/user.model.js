import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema=new Schema(
    {
        username : {
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
            index:true
        },
        email : {
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true
        },
        fullName : {
            type:String,
            required:true,
            index : true ,
            trim:true
        },
        avatar: {
            type: String , //cloud
            required: true,
        },
        coverImage: {
            type:String, //cloud
        },
        watchHistory:[ {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String ,
        required:[true,'Password required!']
    },
    refreshToken:{
        type:String
    }
    },
    {
        timestamps:true
    });


userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        return next();
    }
    this.password=bcrypt.hash(this.password,9);
    next();
})

userSchema.methods.isPasswordLegit = async function(password){
    return await bcrypt.compare(password , this.password);
}

userSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email: this.email,
            username:this.username,
            fullname: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema); 