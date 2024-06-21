const mongoose =require('mongoose');
const  { Schema } = mongoose;
const BrokerSchema=new Schema({
    AngelId:String,
    AngelPass:String,
    SecretKey:String,
    ApiKey:String
})
const DeployedSchema=new Schema({
    Strategy:Number,
    Index:String,
    Quantity:String,
    Account:String,
    AppliedDate:String
})

const userSchema= new Schema({
    Name:String,
    Email:String,
    Password:String,
    MobileNo:String,
    Profile_Img: String,
    Broker:Boolean,
    BrokerCount:Number,
    Verification:Boolean,
    Tour:Boolean,
    MyStartegies: [Number],
    BrokerData:[BrokerSchema],
    DeployedData:[DeployedSchema]
});

const User=new mongoose.model('AWT',userSchema);
module.exports=userSchema
module.exports=BrokerSchema
module.exports=User;