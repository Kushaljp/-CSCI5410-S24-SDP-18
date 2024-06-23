import { Alert, Container } from '@mui/material'
import React, { useState } from 'react'
import UserPool from '../../util/user-authentication/UserPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import FirstFactorAuth from './FirstFactorAuth';
import SecondFactorAuth from './SecondFactorAuth';
import ThirdFactorAuth from './ThirdFactorAuth';
import { getUserData } from '../../services/AuthenticationApiService';

function Login() {
  const [authStep, setAuthStep] = useState(0);
  const [firstFactorAuthData, setFirstFactorAuthData] = useState()
  const [secondFactorAuthData, setSecondFactorAuthData] = useState()
  const [thirdFactorAuthData, setThirdFactorAuthData] = useState()
  const [userData, setUserData] = useState()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState()

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
        getUserData(firstFactorAuthData.email)
        setUserData(getUserData(firstFactorAuthData.email))
      },
      onFailure: (error) => {
        setAuthStep(0)
        setShowAlert(true)
        setAlertMessage(error.message)
      }
    })
  }

  const validateSecurityQuestions = () => {
    console.log(userData.securityQuestions.S)
    if (userData.securityQuestions.S === JSON.stringify(secondFactorAuthData)) {
      setShowAlert(false)
      setAuthStep(4)
    } else {
      setAuthStep(2)
      setShowAlert(true)
      setAlertMessage("Incorrect security questions and answers.")
    }
  }

  const validateCipherText = () => {
    console.log(userData.cipherText.S)
    if (userData.cipherText.S === encryptCipherText(thirdFactorAuthData.cipherText, thirdFactorAuthData.shiftNumber)) {
      setShowAlert(false)
      alert("Successful login")
    } else {
      setAuthStep(4)
      setShowAlert(true)
      setAlertMessage("Invalid cipher or shift number.")
    }
  }

  return (
    <>
      {showAlert &&
        <Container maxWidth="xs" sx={{ py: '3%' }}>
          <Alert severity="error">{alertMessage}</Alert>
        </Container>
      }
      {authStep === 0 && <FirstFactorAuth setAuthStep={setAuthStep} setData={setFirstFactorAuthData} isRegister={false} />}
      {authStep === 1 && authenticateUser()}

      {authStep === 2 && <SecondFactorAuth setAuthStep={setAuthStep} setData={setSecondFactorAuthData} />}
      {authStep === 3 && validateSecurityQuestions()}

      {authStep === 4 && <ThirdFactorAuth setAuthStep={setAuthStep} setData={setThirdFactorAuthData} />}
      {authStep === 5 && validateCipherText()}
    </>
  )
}

export default Login
