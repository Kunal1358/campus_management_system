const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
});



const StudentMailSender = async (name, studentId, email, password) => {

    const studentMail = {
        from: process.env.USER_EMAIL,
        to: email,
        cc: process.env.USER_EMAIL,
        subject: 'Student Login Credentials',
        html: `<h1> Welcome Aboard "${name}" </h1><p>Kindly login using your Credentials provided below</p><p><b>Login email: ${email} </b></p><p><b>Student Id: ${studentId} </b></p><p><b>Password: ${password} </b></p>`,
    };

    const sendmail = await transporter.sendMail(studentMail);
    console.log(sendmail.response);
};



const resetPasswordMailer = async (email, subject, link) => {

    const studentMail = {
        from: process.env.USER_EMAIL,
        to: email,
        cc: process.env.USER_EMAIL,
        subject: subject,
        html: `<h1>Hello user your reset password link</h1><br><a>${link}</a>`
    };

    const sendmail = await transporter.sendMail(studentMail);
    console.log(sendmail.response);
};





const facultyMailSender = async (name, facultyId, email, password) => {

    const facultyMail = {
        from: process.env.USER_EMAIL,
        to: email,
        cc: process.env.USER_EMAIL,
        subject: 'Faculty Login Credentials',
        html: `<h1> Welcome Aboard "${name}" </h1><p>Kindly login using your Credentials provided below</p><p><b>Login email: ${email} </b></p><p><b>Faculty Id: ${facultyId} </b></p><p><b>Password: ${password} </b></p>`,
    };

    const sendmail = await transporter.sendMail(facultyMail);
    console.log(sendmail.response);

};


module.exports = {
    StudentMailSender,
    facultyMailSender,
    resetPasswordMailer

};
