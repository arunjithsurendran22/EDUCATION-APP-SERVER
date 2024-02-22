import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  Category: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
  
});

const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;
