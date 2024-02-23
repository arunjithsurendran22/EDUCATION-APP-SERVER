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
  course: [
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
      subjects: [
        {
          title: {
            type: String,
          },
          courseId: {
            type: String,
          },
          courseName: {
            type: String,
          },
          image: {
            type: String,
          },
          videos: [
            {
              video: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
});

const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;
