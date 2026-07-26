import {Document, model, Schema, Types} from 'mongoose'

export interface IRestaurant extends Document {
    name: string;
   slug: string;
   description: string;
   cuisine: string;
   priceRange: "$" | "$$" | "$$$" | "$$$$";
   rating: number;
   reviewCount: number;
   location: String;
   address: String;
   image: String;
   chef: String;
   tags: string[];
   availableSlotes: string[];
   featured: boolean;
   exclusive: boolean;
   owner : Types.ObjectId;
   status: "open" | "closed" | "coming soon";
   totalSeats: number;
   createdAt: Date;
   updatedAt: Date;
}
const RestaurantSchema = new Schema<IRestaurant>(
   { 
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    cuisine: { type: String, required: true },
    priceRange: { type: String, enum: ["$", "$$", "$$$", "$$$$"], default: "$" },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    location: { type: String, required: true }, 
    address: { type: String, required: true },
    image: { type: String, required: true },
    chef: { type: String, required: true },
    tags: { type: [String], default: [] },
    availableSlotes: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    exclusive: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["open", "closed", "coming soon"], default: "coming soon" },
    totalSeats: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{timestamps: true}
)

export const Restaurant = model<IRestaurant>("Restaurant", RestaurantSchema);