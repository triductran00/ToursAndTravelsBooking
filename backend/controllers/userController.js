import User from "../models/User.js";


// Create a new User
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true, message: "Successfully created User", data: savedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: "Failed to create User. Try again", error: error.message
        });
    }
}

//update User
export const updateUser = async (req, res) => {

    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update User. Try again",
            data: updatedUser,
        });
    }

}

//delete User
export const deleteUser = async (req, res) => {

    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete User. Try again",
        });
    }
}

//getSingle User
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            message: "found User",
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
}

//getAll Users
export const getAllUser = async (req, res) => {

    try {
        const user = await User.find({})
            .skip(page * 8)
            .limit(5);

        res.status(200).json({
            success: true,
            message: "Successful",
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
}