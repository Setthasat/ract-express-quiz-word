import mongoose, { Schema, Document } from 'mongoose';

export interface IWord {
  word: string;
  definition: string;
  part_of_speech: string;
}

export interface IUser extends Document {
  user_id: string;
  username: string;
  password: string;
  email: string;
  words: IWord[];
  verified: boolean;
  verificationToken : string
}

const WordSchema = new Schema<IWord>({
  word: { type: String, required: true },
  definition: { type: String, required: true },
  part_of_speech: { type: String, required: true },
});

const UserSchema = new Schema<IUser>({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  words: { type: [WordSchema], default: [] },
  verified: { type: Boolean, default: false },
  verificationToken : {type: String}
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
