import twilio from 'twilio';


const client = twilio(process.env.AccountSid, process.env.AuthToken);

export const sendOTP = async (phone, otp) => {
  try {
    const mssg = client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TwilioPhone,
      to: phone,
    });
    return mssg.sid;
  } catch (error) {
    throw new Error('Failed to send OTP: ' + error.message);
  }
};