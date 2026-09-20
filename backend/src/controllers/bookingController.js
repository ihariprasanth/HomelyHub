import {Property} from "../Models/propertyModel.js"
import {Booking} from  "../Models/bookingModel.js"

//createorder : booking any property
const createOrder = async(req,res)=>{
   const {amount,propertyId, fromDate,toDate,guests} = req.body;

   //orderID : order_1780533652671
   const orderId = "order_" + Date.now();
   res.json({
    success:true,
    message: "Order created Successfully",
    orderId,
    amount,
    propertyId,
    fromDate,
    toDate,
    guests
   })


}

//verifyPayment
// 25, 26
// 1. save the booking
// 2. Block these dates

const verifyPayment = async(req,res) =>{
    try{
        const{orderId, bookingDetails, forceStatus} = req.body;

        if(forceStatus !=="success"){
            return res.status(400).json({
                success:false,
                message:"Payment failed!",
                orderId
            })
        }

        if(!bookingDetails || !bookingDetails.propertyId){
            return res.status(400).json({
                success:false,
                message:"Booking details are missing"
            })
        }

        // make sure the property exists and the dates are still free
        const property = await Property.findById(bookingDetails.propertyId);
        if(!property){
            return res.status(404).json({
                success:false,
                message:"Property not found"
            })
        }

        const newFrom = new Date(bookingDetails.fromDate);
        const newTo = new Date(bookingDetails.toDate);

        const clash = property.currentBookings.some(
            (b) => b.fromDate < newTo && b.toDate > newFrom
        );
        if(clash){
            return res.status(409).json({
                success:false,
                message:"These dates are already booked. Please choose different dates."
            })
        }

        const paymentId = "pay_" + Date.now();

        //save booking
        const newBooking = await Booking.create({
            user: req.user._id,
            property: bookingDetails.propertyId,
            price:bookingDetails.price,
            fromDate: bookingDetails.fromDate,
            toDate:bookingDetails.toDate,
            guests:bookingDetails.guests,
            numberOfnights:bookingDetails.nights,
            paid:true
        });

        //tell property those dates are taken
        await Property.findByIdAndUpdate(
            bookingDetails.propertyId,{
                $push:{
                    currentBookings:{
                        bookingId:newBooking._id,
                        fromDate:bookingDetails.fromDate,
                        toDate:bookingDetails.toDate,
                        userId:req.user._id
                    }
                }
            },
            {new:true}
        );

        res.json({
            success:true,
            message:"Payment successful, booking confirmed!!",
            paymentId,
            orderId,
            booking:newBooking
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//get my bookings
const getUserBookings = async(req,res)=>{
    try{
        const bookings = await Booking.find({user:req.user._id});

        res.status(200).json({
            status:"success",
            data:{
                bookings
            }
        })

    }catch(error){
          res.status(401).json({
            status:"fail",
            message:error.message
          })
    }
}

//get one booking details
// /:bookingid
const getBookingDetails = async(req,res)=>{
    try{
        const bookings = await Booking.findById(req.params.bookingId);

        if(!bookings || bookings.user._id.toString() !== req.user._id.toString()){
            return res.status(404).json({
                status:"fail",
                message:"Booking not found"
            })
        }

        
        res.status(200).json({
            status:"success",
            data:{
                bookings
            }
        })
            
    }catch(error){
        res.status(401).json({
            status:"fail",
            message:error.message
          })
    }
}


// cancel a booking
// 1. only the guest who made it can cancel
// 2. only before the stay has started
// 3. delete booking + free the dates on the property
const cancelBooking = async(req,res)=>{
    try{
        const booking = await Booking.findById(req.params.bookingId);

        if(!booking){
            return res.status(404).json({status:"fail", message:"Booking not found"})
        }

        if(booking.user._id.toString() !== req.user._id.toString()){
            return res.status(403).json({status:"fail", message:"You can cancel only your own booking"})
        }

        if(new Date(booking.fromDate) <= new Date()){
            return res.status(400).json({
                status:"fail",
                message:"This stay has already started or finished, so it cannot be cancelled"
            })
        }

        // free the dates on the property (booking.property is populated)
        await Property.findByIdAndUpdate(booking.property._id,{
            $pull:{currentBookings:{bookingId:booking._id}}
        });

        await Booking.findByIdAndDelete(booking._id);

        res.status(200).json({
            status:"success",
            message:"Booking cancelled successfully"
        })
    }catch(error){
        res.status(400).json({status:"fail", message:error.message})
    }
}

export {getBookingDetails,getUserBookings,createOrder,verifyPayment,cancelBooking}