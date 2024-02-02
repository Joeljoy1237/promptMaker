import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exist"],
    require: [true, "Email is required"],
  },
  username: {
    type: String,
    require: [true, "username is required"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
