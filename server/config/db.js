

import mongoose from 'mongoose';


const connection = async()=> {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO CONNECTED");
        
    } catch (error) {
        console.error(error);
    }
}

export default connection