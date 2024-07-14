export const BASE_URL = "https://lqknmdcv2a.execute-api.us-east-1.amazonaws.com/prod";

export const SAVE_USER_URL = BASE_URL + "/user";
export const GET_USER_URL = BASE_URL + "/user/";
export const SET_ISLOGGEDIN_URL = BASE_URL + "/user/setlogin";

export const VERIFY_SECURITY_QA_URL = BASE_URL + "/lambda/secondfactorauth";
export const VERIFY_CIPHER_TEXT_URL = BASE_URL + "/lambda/thirdfactorauth";