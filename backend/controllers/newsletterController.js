import nodemailer from 'nodemailer';

export const subscribeNewsletter = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Newsletter Subscription',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50;">Thank You for Subscribing!</h2>
                    <p>We’re thrilled to have you on board. Stay tuned for exciting offers and updates.</p>
                    <img 
                        src="https://res.cloudinary.com/djjrhbo0g/image/upload/v1736492316/zjf3gkppkhvghzrrttcz.png" 
                        alt="Welcome" 
                        style="width: 100%; max-width: 400px; border-radius: 10px; margin: 20px 0;" 
                    />
                    <p>Visit our website to explore more.</p>
                    <a href="https://sakhi-frontend.vercel.app/" 
                       style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                       Visit Now
                    </a>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            info,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};
