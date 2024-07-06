import axios from "axios";
import { GET_USER_URL, SAVE_USER_URL, SET_ISLOGGEDIN_URL, VERIFY_CIPHER_TEXT_URL, VERIFY_SECURITY_QA_URL } from "../util/ApiConstants";

export const saveUserRegistration = async (userData, cognitoUser, authDetails) => {
  try {
    let response = await axios.post(SAVE_USER_URL, userData);
    if(Object.keys(response.data).length !== 0) {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: () => {
          cognitoUser.deleteUser((error, data) => {})
        }
      })
      return false;
    }
    return true;
  } catch (error) {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: () => {
        cognitoUser.deleteUser((error, data) => {})
      }
    })
    return false;
  }
}

export const getUserData = async (email, setUserData) => {
  try {
    const response = await axios.get(GET_USER_URL + email);
    setUserData(response.data.Items[0]);
  } catch (error) {
    setUserData("");
  }
}

export const setIsUserLoggedIn = async (data) => {
  try {
    await axios.put(SET_ISLOGGEDIN_URL, data);
  } catch (error) {}
}

export const verifySecurityQuestions = async (data, setVerifiedSecondFactorAuth) => {
  try {
    const response = await axios.post(VERIFY_SECURITY_QA_URL, data);
    console.log(response.data);
    if(response.data) {
      setVerifiedSecondFactorAuth("verified")
    } else {
      setVerifiedSecondFactorAuth("unverified")
    }
  } catch (error) {
    setVerifiedSecondFactorAuth("unverified")
  }
}

export const verifyCipherText = async (data, setVerifiedThirdFactorAuth) => {
  try {
    const response = await axios.post(VERIFY_CIPHER_TEXT_URL, data);
    console.log(response.data);
    if(response.data) {
      setVerifiedThirdFactorAuth("verified")
    } else {
      setVerifiedThirdFactorAuth("unverified")
    }
  } catch (error) {
    setVerifiedThirdFactorAuth("unverified")
  }
}