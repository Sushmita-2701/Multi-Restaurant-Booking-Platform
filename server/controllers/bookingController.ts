import { AuthRequest } from "../middlewares/auth.js";
import { Response } from "express";
import { Booking } from "../models/Booking.js";
import { Restaurant } from "../models/Restaurants.js";

// crate new booking
//Post /api/bookings
//@acess Private
export const createBooking = async (req, res: Response): Promise<void> => {
    try {
        const { restaurantId, date, time, guests, occasion, specialRequests } = req.body;

        if (!restaurantId || !date || !time || !guests) {
            res.status(400).json({ message: "Please provide all required fields" });
            return;
        }
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant not found" });
            return;
        }
        if (restaurant.status !== "open") {
            res.status(400).json({ message: "Restaurant is not open for bookings" });
            return;
        }
        const requestedGuests = Number(guests);

        const existingBookings = await Booking.find({
            restaurant: restaurantId,
            date: new Date(date), time, status: "confirmed",
        })

        const bookedSeats = existingBookings.reduce((sum, b) => sum + b.guests, 0);

        const totalSeats = restaurant.totalSeats || 20;

        const availableSeats = totalSeats - bookedSeats;

        if (requestedGuests > availableSeats) {
            res.status(400).json({
                message: `Unable to book. Only ${availableSeats} seats are available for the selected date and time.`
            });
return;
        }
        const booking = await Booking.create({
            user: req.user._id,
            restaurant: restaurantId,
            date: new Date(date),
            time,
            guests: Number(guests),
            occasion,
            specialRequests,
            status: "confirmed",
        })
        const populatedBooking = await booking.populate("restaurant", "name location image address cuisine");
        res.status(201).json(populatedBooking);


    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

export const getMyBookings = async (req, res: Response): Promise<void> => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate("restaurant", "name location image address cuisine").sort({ date: -1, time: -1 });
        res.json(bookings);

    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

export const cancelBooking = async (req, res: Response): Promise<void> => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            res.status(404).json({ message: "Booking not found" });
            return;
        }
        if (booking.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: "You are not authorized to cancel this booking" });
            return;
        }
        booking.status = "cancelled";
        await booking.save();
       const populatedBooking = await booking.populate("restaurant", "name location image address cuisine");
        res.json(populatedBooking) ;

    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}