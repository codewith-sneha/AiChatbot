import mongoose from "mongoose"



export const connectDb = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO}/Gptify`);
                console.log("mongodb connected sucessfully ✅")
    } catch (error) {
                   console.log("mongodb connection failed ❌")
    }
}

