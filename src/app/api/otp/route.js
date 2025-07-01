// app/api/send-otp/route.js
import { Resend } from "resend";
import { generateOTP } from "../../../utils/otp";
const resend = new Resend(process.env.RESEND_KEY);
const otpStore = new Map(); 
export async function POST(req) {
  const { email } = await req.json();
  const otp = generateOTP();
  otpStore.set(email, {
    code: otp,
    expires: Date.now() + 5 * 60 * 1000, 
  });
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    });
    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
