const User = require("../models/users");
const nodemailer = require("nodemailer");
const base64url = require("base64url");

const resetPassword = async (req, res) => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://xalgos.netlify.app"
      : "http://localhost:3000";

  const email = req.body.email;
  const checking = await User.findOne({ Email: req.body.email });

  if (checking) {
    const expiryTime = Date.now() + 3600000;
    const payload = {
      email: email,
      expiry: expiryTime,
    };

    const encodedPayload = base64url.encode(JSON.stringify(payload));
    const verificationLink = `${url}/resetPassword?token=${encodeURIComponent(
      encodedPayload
    )}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshdvadhavana26@gmail.com",
        pass: "sfai mxlq yera mfmh",
      },
    });

    const mailOptions = {
      from: "ayushsantoki1462004@gmail.com",
      to: `${req.body.email}`,
      subject: "HTML Email Example",
      html: `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
        
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    We cannot simply send you your old password. A unique link to reset your
                                                    password has been generated for you. To reset your password, click the
                                                    following link and follow the instructions.
                                                </p>
                                                <a href="${verificationLink}"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                    Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
        
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
        return res.json({ email: data.email });
      }
    });

    res.json(true);
  } else {
    res.json(false);
  }
};

module.exports = resetPassword;
