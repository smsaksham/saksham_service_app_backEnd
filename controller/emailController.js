import nodemailer from "nodemailer"

function sendUserMail(user_mail,message){
    
    var transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"sakshammalviya12345@gmail.com",
            pass:"ozgsdxxarxxvhjyh"
        }
    })

    var mail_details_data = {
        from:"sakshammalviya12345@gmail.com",
        to:user_mail,
        subject:"otp from e-commerce app",
        html:'<h1>Welcome to E-Commerce App</h1><p>This is verification mail by E-Commerce App</p><h2>Email = '+user_mail+'<br/>Message = '+message+'</h2>'
    }

    transport.sendMail(mail_details_data,(err,result)=>{
        if(!err){
            console.log("mail sent successfully.."+result);
        }
        else{
            console.log("mail sent Unsuccessfully...",err);
        }
    })
}

export default sendUserMail;