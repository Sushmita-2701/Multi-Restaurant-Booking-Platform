import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurants.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Booking } from "../models/Booking.js";

// Get all restaurants with search and filter functionality
export const getRestaurants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      search,
      priceRange,
      rating,
      location,
      cuisine,
      sort,
    } = req.query;

    const queryObj: any = {
      status: "approved",
    };

    // Search
    if (search) {
      queryObj.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // Price Filter
    if (priceRange) {
      const prices = Array.isArray(priceRange)
        ? priceRange
        : [priceRange];

      queryObj.priceRange = {
        $in: prices,
      };
    }

    // Rating Filter
    if (rating) {
      queryObj.rating = {
        $gte: parseFloat(rating as string),
      };
    }

    // Location Filter
    if (location) {
      queryObj.location = {
        $regex: location as string,
        $options: "i",
      };
    }

    // Cuisine Filter
    if (cuisine) {
      const cuisines = Array.isArray(cuisine)
        ? cuisine
        : [cuisine];

      queryObj.cuisine = {
        $in: cuisines,
      };
    }

    // Sorting
    let sortOption: any = { createdAt: -1 };

    if (sort === "rating") {
      sortOption = { rating: -1 };
    } else if (sort === "priceAsc") {
      sortOption = { priceRange: 1 };
    } else if (sort === "priceDesc") {
      sortOption = { priceRange: -1 };
    }

    const restaurants = await Restaurant.find(queryObj).sort(sortOption);

    res.status(200).json(restaurants);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Featured Restaurants
export const getFeaturedRestaurants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const featured = await Restaurant.find({
      status: "approved",
      $or: [
        { featured: true },
        { exclusive: true },
      ],
    }).limit(6);

    res.status(200).json(featured);
  } catch (error: any) {
    console.error("Get Featured Restaurants Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Restaurant By Slug
export const getRestaurantBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({
      slug: req.params.slug,
    });

    if (!restaurant) {
      res.status(404).json({
        message: "Restaurant not found",
      });
      return;
    }

    if (restaurant.status !== "approved") {
      let isAuthorized = false;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        try {
          const token = req.headers.authorization.split(" ")[1];

          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
          ) as { id: string };

          const user = await User.findById(decoded.id).select("-password");

          if (
            user &&
            (user.role === "admin" ||
              (user.role === "owner" &&
                user._id.equals(restaurant.owner)))
          ) {
            isAuthorized = true;
          }
        } catch (error) {
          console.error("Token verification error:", error);
        }
      }

      if (!isAuthorized) {
        res.status(403).json({
          message: "Restaurant is not approved yet.",
        });
        return;
      }
    }

    res.status(200).json(restaurant);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Restaurant Availability
export const getRestaurantAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date } = req.query;

    if (!date) {
      res.status(400).json({
        message: "Please provide a date",
      });
      return;
    }

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      res.status(404).json({
        message: "Restaurant not found",
      });
      return;
    }

    const bookingDate = new Date(date as string);

    const bookings = await Booking.find({
      restaurant: restaurant._id,
      date: bookingDate,
      status: "confirmed",
    });

    const availability = restaurant.availableSlotes.map((slot) => {
      const bookedSeats = bookings
        .filter((booking) => booking.time === slot)
        .reduce((sum, booking) => sum + booking.guests, 0);

      const totalSeats = restaurant.totalSeats || 20;

      const availableSeats = totalSeats - bookedSeats;

      return {
        time: slot,
        availableSeats,
        isAvailable: availableSeats > 0,
      };
    });

    res.status(200).json(availability);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};