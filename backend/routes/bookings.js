import express from 'express';
import { verifyUser } from '../utils/verifytoken.js';
import { createBooking, getAllBookings, getBookings } from '../controllers/bookingController.js';


const router = express.Router();


router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getBookings)
router.get('/', verifyUser, getAllBookings)


export default router;