import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED:", conn.connection.host);
    } catch (error) {
        console.error("error connecting to Mongodb:",error);
        process.exit(1); // 1 status code mean fail , 0 mean success
    }
}