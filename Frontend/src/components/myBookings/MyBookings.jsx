import React, { useEffect, useState } from "react";
import "../../css/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import { cancelBooking, fetchBookingDetails, fetchUserBookings } from "../../store/Booking/booking-action";



const MyBookings = () => {
  const [cancellingId, setCancellingId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {bookings , loading} = useSelector((state)=> state.booking);

  
  useEffect(() => {
    // fetch the user bookings here and set them above.
    dispatch(fetchUserBookings())
  }, [dispatch]);

  console.log(bookings);

  const handleBookingClick = (bookingId) => {
    // TODO: fetch this booking's details here if you need to.
    dispatch(fetchBookingDetails(bookingId))
    navigate(`/user/myBookings/${bookingId}`);
  };

  const handleCancel = async (e, booking) => {
    e.stopPropagation(); // don't open the details page
    if (!window.confirm(`Cancel your booking at "${booking.property.propertyName}"?`)) return;
    try {
      setCancellingId(booking._id);
      await dispatch(cancelBooking(booking._id));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error(error.message || "Could not cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  if (bookings.length === 0 && !loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h3>Nothing booked yet</h3>
      </div>
    );
  }
  return (
    <>
      <ProgressSteps />
      <div className="wow">
        {loading && <LoadingSpinner />}
        {!loading &&
          bookings.length > 0 &&
          bookings.map((booking) => (
            <div
              className="main-container"
              onClick={() => handleBookingClick(booking._id)}
              key={booking._id}
            >
              <div className="mybookings-container row">
                <div className="image-container col-lg-3 col-md-3">
                  <img
                    className="booking-img"
                    src={
                      booking.property.images &&
                      booking.property.images.length > 0
                        ? booking.property.images[0].url
                        : undefined
                    }
                    alt="bookings"
                  />
                </div>
                <div className="booking-information col-lg-9 col-md-9">
                  <h6 className="hotel-name">
                    {booking.property.propertyName}
                  </h6>
                  <div className="stay-information">
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        bedtime
                      </span>
                      {booking.numberOfnights} nights
                    </span>
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        calendar_month
                      </span>
                      {new Date(booking.fromDate).toLocaleDateString()}
                    </span>
                    <span className="material-symbols-outlined icon">
                      arrow_forward
                    </span>
                    <span className="info">
                      <span className="material-symbols-outlined icon">
                        calendar_month
                      </span>
                      {new Date(booking.toDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h5 className="booking-price">
                    <span className="material-symbols-outlined">payments</span>{" "}
                    Total Price :&#8377; {booking.price}
                  </h5>
                  {new Date(booking.fromDate) > new Date() && (
                    <button
                      type="button"
                      className="cancel-booking-btn"
                      onClick={(e) => handleCancel(e, booking)}
                      disabled={cancellingId === booking._id}
                    >
                      <span className="material-symbols-outlined">cancel</span>
                      {cancellingId === booking._id ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyBookings;
