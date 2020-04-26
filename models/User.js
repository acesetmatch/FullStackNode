const mongoose = require("mongoose");
const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
})

// Create new Model class for users
mongoose.model("users", userSchema);

