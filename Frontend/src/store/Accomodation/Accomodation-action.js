import { accomodationActions } from "./Accomodation-slice";
import { axiosInstance } from "../../utils/axios";

export const createAccomodation = (accomodationData) => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());

    const response = await axiosInstance.post(
      "/v1/rent/user/newAccommodation",
      accomodationData
    );

    if (!response) {
      throw new Error("Could not create accommodation");
    }

    return response.data;
  } catch (error) {
    dispatch(
      accomodationActions.getErrors(
        error.response?.data?.message || error.message
      )
    );

    throw error;
  }
};

export const getAllAccomodation = () => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());

    const { data } = await axiosInstance.get(
      "/v1/rent/user/myAccommodation"
    );

    const accom = data.data;

    dispatch(accomodationActions.getAccomodation(accom));

    return accom;
  } catch (error) {
    dispatch(
      accomodationActions.getErrors(
        error.response?.data?.message || error.message
      )
    );

    throw error;
  }
};

export const deleteAccomodation = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/v1/rent/user/myAccommodation/${id}`);

    // remove it from the screen without reloading
    dispatch(accomodationActions.removeAccomodation(id));
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(accomodationActions.getErrors(message));

    throw new Error(message);
  }
};
