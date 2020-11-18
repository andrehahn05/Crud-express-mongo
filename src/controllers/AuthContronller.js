import User from '../models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {secret} from '../.env';
          
class AuthController {
    async store(req,res){

        const {email, password } = req.body;

        const user = await User.findOne({email});
     

        if(!user){
            return res.status(400).json({error:'Credencias do not match'})
        }

        if(user.deleted == true){
            return res.status(401).json({error:'Disable user'});
        }

        const checkPassowrd = await bcryptjs.compare(password, user.password);

        if(!checkPassowrd){
            return res.status(400).json({error:'Credencias do not match'});
        }
 
        const token = jwt.sign({id:user.id},secret, {
            subject:String(user.id),
            expiresIn:86400 
          });
 
        return res.json({user:user.display(),token});        
    }
}

export default new AuthController();
