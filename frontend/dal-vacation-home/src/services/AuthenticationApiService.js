import axios from "axios";
import { GET_USER_URL, SAVE_USER_URL } from "../util/ApiConstants";

export const saveUserRegistration = async (userData, cognitoUser) => {
  try {
    await axios.post(SAVE_USER_URL, userData);
    return true;
  } catch (error) {
    cognitoUser.deleteUser((error, data) => {})
    return false;
  }
}

export const getUserData = async (email) => {
  try {
    const response = await axios.get(GET_USER_URL + email);
    return response.data.Items[0];
  } catch (error) {
    return "";
  }
}