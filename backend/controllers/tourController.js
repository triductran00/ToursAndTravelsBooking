import Tour from "../models/tour.js";

// Create a new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({
            success: true, message: "Successfully created Tour", data: savedTour
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: "Failed to create Tour. Try again", error: error.message
        });
    }
}

//update tour
export const updateTour = async (req, res) => {

    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update Tour. Try again",
            data: updatedTour,
        });
    }

}

//delete tour
export const deleteTour = async (req, res) => {

    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete Tour. Try again",
        });
    }
}

//getSingle tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate('reviews');

        res.status(200).json({
            success: true,
            message: "found tour",
            data: tour,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
}

//getAll tours
export const getAllTour = async (req, res) => {
    //for pagination
    const page = parseInt(req.query.page);


    try {
        const tour = await Tour.find({})
            .populate('reviews')
            .skip(page * 8)
            .limit(5);

        res.status(200).json({
            success: true,
            count: tour.length,
            message: "Successful",
            data: tour,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
}

//get tour by search
export const getTourBySearch = async (req, res) => {

    const city = new RegExp(req.query.city, "i");
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        //gte = greate than or equal to
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize },
        }).populate('reviews');

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tours,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
            error: error.message,
        });
    }

}

export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({featured: true})
        .populate('reviews')
        .limit(8);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tours,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
            error: error.message,
        });
    }
}


//get Tour counts
export const getTourCounts = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            data: tourCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get Tour counts. Try again",
            error: error.message,
        });
    }
}

