import { Document, model, Schema, Types } from 'mongoose'
import crypto from 'crypto';

export interface IBooking extends Document {
    user: Types.ObjectId;
    restaurant: Types.ObjectId;
    date: Date;
    time: string;
    guests: number;
    occasion: string;
    specialRequests: string;
    status: "completed" | "confirmed" | "cancelled";
    bookingId: string;
    createdAt: Date;
    updatedAt: Date;

}
const bookingSchema = new Schema<IBooking>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        guests: { type: Number, required: true },
        occasion: { type: String, required: true },
        specialRequests: { type: String, default: "" },
        status: { type: String, enum: ["completed", "confirmed", "cancelled"], default: "confirmed" },
        bookingId: { type: String, required: true, unique: true },
    },
    { timestamps: true }
)
bookingSchema.pre("save", function (next) {
    if (!this.bookingId) {
        this.bookingId = `GR-${crypto
            .randomBytes(4)
            .toString("hex")
            .toUpperCase()}`;
    }

    next();
});
export const Booking = model<IBooking>("Booking", bookingSchema);