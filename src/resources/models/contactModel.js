const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id:{
      type : mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter a name for this contact"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email for this contact"],
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter a valid phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact",contactSchema)
