import express from "express";
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCounts, updateTour } from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifytoken.js";

const router = express.Router();

//Create a new tour
router.post("/",verifyAdmin, createTour);

//Update a tour
router.put("/:id",verifyAdmin, updateTour);

//Delete a tour
router.delete("/:id",verifyAdmin, deleteTour);

//get a single tour
router.get("/:id", getSingleTour);

//get all tours
router.get("/", getAllTour);

//get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCounts);

export default router;