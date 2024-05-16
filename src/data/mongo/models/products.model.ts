import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  available: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  img:{
    type:String
  }

});

// _id __v
productSchema.set("toJSON",{
  virtuals:true,
  versionKey:false,
  transform:function(doc,ret,options){
    delete ret._id;
  },
})
export const ProductModel = mongoose.model("Product", productSchema);