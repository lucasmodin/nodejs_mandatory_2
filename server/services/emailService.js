import nodemailer from 'nodemailer';

let transporter;

export async function initEmail() {
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
}

export async function sendEmail(to, subject, html) {
    if (!transporter) {
        await initEmail();
    }

    const info = await transporter.sendMail({
        from: '"Mechanicus Auth" <no-reply@mechanicus.local>',
        to,
        subject,
        html
    });

    console.log("email sent:", info.messageId);
    console.log("preview:", nodemailer.getTestMessageUrl(info));
}

