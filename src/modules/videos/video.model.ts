import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";
// import { customAlphabet } from "nanoid";

// const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 11);

const nanoid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export class Video {
  @prop()
  title!: string;

  @prop()
  description!: string;

  @prop({ enum: ["mp4", "mov","mkv"] })
  extension!: string;

  @prop({ required: true, ref: () => User })
  public owner!: Ref<User>;

  @prop({ unique: true, default: nanoid })
  public videoId!: string;

  // @prop()
  // thumbnail!: string;

  @prop({ default: false })
  public published!: boolean;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: { timestamps: true, id: true },
});
