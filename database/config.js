const mongoose = require('mongoose')

const dbConnection = async()=> {
    try {
        
        await mongoose.connect(process.env.MONGODB_ATLAS, 
           {useNewUrlParser: true, 
            useUnifiedTopology: true,
           })
            console.log('Connected to MongoDB');


    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database')
    }
}


module.exports= {
    dbConnection
}