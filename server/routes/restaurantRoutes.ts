import {Router} from "express";
import { getRestaurants, getFeaturedRestaurants, getRestaurantBySlug } from "../controllers/restaurantController.js";

const restaurantRouter = Router();

restaurantRouter.get('/', getRestaurants);
restaurantRouter.get('/featured', getFeaturedRestaurants);
restaurantRouter.get('/:slug', getRestaurantBySlug);
restaurantRouter.get('/:id/availability', getRestaurantBySlug);
export default restaurantRouter;