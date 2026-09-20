import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteAccomodation } from "../../store/Accomodation/Accomodation-action";

const MyAccomodation = ({ accomodation }) => {
  const dispatch = useDispatch();
  // id of the property being deleted (to disable its button)
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (item) => {
    const sure = window.confirm(
      `Are you sure you want to delete "${item.propertyName}"? This cannot be undone.`
    );
    if (!sure) return;

    try {
      setDeletingId(item._id);
      await dispatch(deleteAccomodation(item._id));
      toast.success("Accommodation deleted successfully");
    } catch (error) {
      toast.error(error.message || "Could not delete accommodation");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="main-container">
      {accomodation.map((item) => (
        <div className="myaccomodation-container row" key={item._id}>
          <div className="myaccomodation-image-container col-lg-3 col-md-3">
            <img
              className="myaccomodation-img"
              src={item.images[0].url}
              alt={item.propertyName}
            />
          </div>
          <div className="myaccomodation-information col-lg-9 col-md-9">
            <h6 className="myaccomodation-hotel-name">{item.propertyName}</h6>
            <div className="stay-information">
              <span className="info">
                <span className="material-symbols-outlined icon">
                  calendar_month
                </span>
                Check In Time: {item.checkInTime}
              </span>
              <span className="material-symbols-outlined icon">
                arrow_forward
              </span>
              <span className="info">
                <span className="material-symbols-outlined icon">
                  calendar_month
                </span>
                Check Out Time: {item.checkOutTime}
              </span>
            </div>
            <p className="myaccomodation-city">City :{item.address.city}</p>
            <p className="myaccomodation-guest">
              Max no of guest : {item.maximumGuest}
            </p>
            <h5 className="myaccomodation-price">
              <span className="material-symbols-outlined">payments</span> Total
              Price :&#8377; {item.price}
            </h5>
            <button
              type="button"
              className="delete-accomodation-btn"
              onClick={() => handleDelete(item)}
              disabled={deletingId === item._id}
            >
              <span className="material-symbols-outlined">delete</span>
              {deletingId === item._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAccomodation;
