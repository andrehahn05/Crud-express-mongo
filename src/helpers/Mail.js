import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
    constructor(){
        const { host, port, secure,auth } = mailConfig;

        this.transporter = nodemailer.createTransport({
            host, port, secure,auth 
        });
    }

    sendMail(data) {

        this.transporter.sendMail(data);
    }

}

export default new Mail()