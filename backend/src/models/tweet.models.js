import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280, // Optional limit like Twitter
    },
    media: [
      {
        type: String, // URLs to image/video files
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    retweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    parentTweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet", // For replies or quote tweets
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
