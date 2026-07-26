import {Document, model, Schema} from 'mongoose'

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    phone?: string;
   role: "user" | "admin" | "owner";
   createdAt: Date;
   updatedAt: Date;
}
const userSchema = new Schema<IUser>(
   { 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "owner"], default: "user" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{timestamps: true}
)
userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }   
});
export const User = model<IUser>("User", userSchema);