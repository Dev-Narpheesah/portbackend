const sendEmail = require("../utils/sendEmail");
const Message = require("../models/Message");

exports.sendContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save message to DB (optional)
    try {
      await Message.create({ name, email, message });
    } catch (e) {
      // non-fatal — log and continue
      console.warn("Could not save message:", e.message);
    }

    // Send email notification
    const subject = `New contact from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    await sendEmail({ subject, text });

    res.json({ success: true, message: "Message sent" });
  } catch (err) {
    next(err);
  }
};
