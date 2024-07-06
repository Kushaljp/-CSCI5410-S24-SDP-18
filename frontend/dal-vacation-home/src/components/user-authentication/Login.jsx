import { Alert, Container, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import UserPool from '../../util/user-authentication/UserPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import FirstFactorAuth from './FirstFactorAuth';
import SecondFactorAuth from './SecondFactorAuth';
import ThirdFactorAuth from './ThirdFactorAuth';
import { getUserData, setIsUserLoggedIn, verifyCipherText, verifySecurityQuestions } from '../../services/AuthenticationApiService';
import { encryptCipherText, formatSecurityQA, setUser } from '../../util/user-authentication/AuthenticationUtil';
import { DEFAULT_FIRST_FACTOR_AUTH, DEFAULT_SECOND_FACTOR_AUTH, DEFAULT_THIRD_FACTOR_AUTH } from '../../util/Constants';

function Login() {
  const [authStep, setAuthStep] = useState(0);
  const [firstFactorAuthData, setFirstFactorAuthData] = useState(DEFAULT_FIRST_FACTOR_AUTH)
  const [secondFactorAuthData, setSecondFactorAuthData] = useState(DEFAULT_SECOND_FACTOR_AUTH)
  const [thirdFactorAuthData, setThirdFactorAuthData] = useState(DEFAULT_THIRD_FACTOR_AUTH)
  //const [userData, setUserData] = useState()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState()
  const [verifiedSecondFactorAuth, setVerifiedSecondFactorAuth] = useState()
  const [verifiedThirdFactorAuth, setVerifiedThirdFactorAuth] = useState()

  const authenticateUser = () => {
    const user = new CognitoUser({
      Username: firstFactorAuthData.email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: firstFactorAuthData.email,
      Password: firstFactorAuthData.password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        setShowAlert(false)
        setAuthStep(2)
        //getUserData(firstFactorAuthData.email, setUserData)
      },
      onFailure: (error) => {
        setAuthStep(0)
        setShowAlert(true)
        setAlertMessage(error.message)
      }
    })
  }

  useEffect(() => {
    if (verifiedSecondFactorAuth === "verified") {
      setShowAlert(false)
      setAuthStep(4)
    } else if (verifiedSecondFactorAuth === "unverified") {
      setAuthStep(2)
      setShowAlert(true)
      setAlertMessage("Incorrect security questions and answers.")
    }
  }, [verifiedSecondFactorAuth]);

  useEffect(() => {
    if (verifiedThirdFactorAuth === "verified") {
      setShowAlert(false)
      setAuthStep(0)
      let user = {
        "email": firstFactorAuthData.email
      }
      let userLoggedInData = {
        "email": firstFactorAuthData.email,
        "isLoggedIn": true
      }
      setIsUserLoggedIn(userLoggedInData)
      setUser(user)
      alert("Successful login")
    } else if (verifiedThirdFactorAuth === "unverified") {
      setAuthStep(4)
      setShowAlert(true)
      setAlertMessage("Invalid cipher or shift number.")
    }
  }, [verifiedThirdFactorAuth]);

  const validateSecurityQuestions = () => {
    let data = {
      "data": formatSecurityQA(secondFactorAuthData),
      "email": firstFactorAuthData.email
    }
    verifySecurityQuestions(data, setVerifiedSecondFactorAuth);
  }

  const validateCipherText = () => {
    let data = {
      "data": encryptCipherText(thirdFactorAuthData.cipherText, thirdFactorAuthData.shiftNumber),
      "email": firstFactorAuthData.email
    }
    verifyCipherText(data, setVerifiedThirdFactorAuth);
  }

  return (
    <>
      <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '5vh', fontWeight: 'bold' }}>Login</Typography>
      {showAlert &&
        <Container maxWidth="xs" sx={{ py: '3%' }}>
          <Alert severity="error">{alertMessage}</Alert>
        </Container>
      }
      {authStep === 0 && <FirstFactorAuth setAuthStep={setAuthStep} data={firstFactorAuthData} setData={setFirstFactorAuthData} isRegister={false} />}
      {authStep === 1 && authenticateUser()}

      {authStep === 2 && <SecondFactorAuth setAuthStep={setAuthStep} data={secondFactorAuthData} setData={setSecondFactorAuthData} />}
      {authStep === 3 && validateSecurityQuestions()}

      {authStep === 4 && <ThirdFactorAuth setAuthStep={setAuthStep} data={thirdFactorAuthData} setData={setThirdFactorAuthData} />}
      {authStep === 5 && validateCipherText()}
    </>
  )
}

export default Login
