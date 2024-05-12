import tour from "../models/tour.js"
import review from "../models/review.js"



export const createReview = async (req, res) => {

    const tourId = req.params.tourId;
    const newReview = new review({... req.body});

    try {
        const savedReview = await newReview.save();

        //after create review, update the reviews array of the tour
        await tour.findByIdAndUpdate(tourId, {
            $push: 
            {
                reviews: savedReview._id
            }
        })

        res.status(200).json({success:true, message:"Review submitted", data:savedReview});

    } catch (error) {
        res.status(500).json({success:false, message:"failed to submit", data:savedReview,error:error.message});
    }
}