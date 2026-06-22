import nodemailer from "nodemailer";

let transporter = null;

// ================= CREATE TRANSPORTER SAFELY =================

if (
process.env.EMAIL_USER &&
process.env.EMAIL_PASS
) {
transporter = nodemailer.createTransport({
service: "gmail",

auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
},

});

transporter.verify((error) => {
if (error) {
console.log(
"Email Service Error ❌",
error.message
);
} else {
console.log(
"Email Service Ready ✅"
);
}
});
} else {
console.log(
"⚠ Email credentials missing. Email features disabled temporarily."
);
}

// ================= SEND INVITATION EMAIL =================

export const sendInvitationEmail = async ({
email,
teamName,
inviterName,
inviteLink,
}) => {
try {
if (!transporter) {
console.log(
"Email transporter unavailable. Skipping email."
);
return;
}

await transporter.sendMail({
  from: `"LinkZip Team" <${process.env.EMAIL_USER}>`,

  to: email,

  subject: `Invitation to join ${teamName}`,

  html: `
  <div style="font-family:Arial,sans-serif">
    <h2>Team Invitation</h2>

    <p>
      ${inviterName}
      has invited you to join
      <b>${teamName}</b>
    </p>

    <p>Click below to accept:</p>

    <a
      href="${inviteLink}"
      style="
        background:#2563eb;
        color:white;
        padding:10px 16px;
        text-decoration:none;
        border-radius:6px;
      "
    >
      Accept Invitation
    </a>

    <p style="margin-top:20px">
      If you did not expect this invitation,
      you can safely ignore this email.
    </p>
  </div>
  `,
});

console.log(
  `Invitation sent to ${email}`
);

} catch (error) {
console.log(
"Email Send Error ❌",
error.message
);
}
};

export default transporter;