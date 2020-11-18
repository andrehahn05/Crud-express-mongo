
import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

class Database {
    constructor(){
        this.init();
    }

    init(){

        mongoose.connect('mongodb://localhost/userdb',
        {useNewUrlParser:true,useUnifiedTopology:true},
        console.log('MongoDb On ...')
        );
    }
}

export default new Database();