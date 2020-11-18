import User from '../models/User';
import crypto from 'crypto';
import { addMinutes, isAfter} from 'date-fns';
import Mail from '../helpers/Mail';
import mailConfig from '../config/mail'


class RecoveryController {
    async store(req, res) {
        
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'User does not found' });
        }

        const token = await crypto.randomBytes(8).toString('hex');
        const exp =  addMinutes(new Date(),5);
        
        user.token = token;
        user.expiration = exp;

        // nodemailer-------------------

        Mail.sendMail({
            from: mailConfig.from,
            to: user.email,
            subject: "Password recovery",
            text: `Password recovery token  ${token}`
        })

        await user.save();
        return res.status(201).send();
    }

    async update(req, res) {

        const { password, token } = req.body;
        const user = await User.findOne({ token });

        if(!user){
            return  res.json({ error: 'User does not found' });
        }

        if(isAfter(new Date(),new Date(user.expiration))) {
            user.token = null;
            await user.save();
            return res.status(401).json({ error: ' Token expired...' })   
        }

        user.password = password;
        user.token = null;
        user.exp = null;

        await user.save();
        return res.status(201).send()
    }
}

export default new RecoveryController();
