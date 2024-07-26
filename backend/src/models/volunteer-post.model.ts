import mongoose, { model } from "mongoose";

interface IVolunteerPost extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  location?: string;
  date?: Date;
  eventTime?: string;
}

const volunteerPostSchema: mongoose.Schema<IVolunteerPost> =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      date: {
        type: Date,
      },
      eventTime: {
        type: String, // Store as string in "HH:MM" format
        required: true,
        validate: {
          validator: function (v: string) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validate "HH:MM" format
          },
          message: (props: any) => `${props.value} is not a valid time format!`,
        },
      },
    },
    {
      timestamps: true,
    }
  );

export const VolunteerPost = model<IVolunteerPost>(
  "VolunteerPost",
  volunteerPostSchema
);
