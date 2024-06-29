import { Alert, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserPool from '../../util/user-authentication/UserPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import FirstFactorAuth from './FirstFactorAuth';
import SecondFactorAuth from './SecondFactorAuth';
import ThirdFactorAuth from './ThirdFactorAuth';
import { getUserData } from '../../services/AuthenticationApiService';
import { encryptCipherText, formatSecurityQA, setUser } from '../../util/user-authentication/AuthenticationUtil';
import { DEFAULT_FIRST_FACTOR_AUTH, DEFAULT_SECOND_FACTOR_AUTH, DEFAULT_THIRD_FACTOR_AUTH } from '../../util/Constants';

function Login() {
  const [authStep, setAuthStep] = useState(0);
  const [firstFactorAuthData, setFirstFactorAuthData] = useState(DEFAULT_FIRST_FACTOR_AUTH)
  const [secondFactorAuthData, setSecondFactorAuthData] = useState(DEFAULT_SECOND_FACTOR_AUTH)
  const [thirdFactorAuthData, setThirdFactorAuthData] = useState(DEFAULT_THIRD_FACTOR_AUTH)
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
        getUserData(firstFactorAuthData.email, setUserData)
      },
      onFailure: (error) => {
        setAuthStep(0)
        setShowAlert(true)
        setAlertMessage(error.message)
      }
    })
  }

  const validateSecurityQuestions = () => {
    if (userData.securityQuestions.S === formatSecurityQA(secondFactorAuthData)) {
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
      setAuthStep(0)
      let user = {
        "email": firstFactorAuthData.email,
        "firstname": userData.firstname.S,
        "lastname": userData.lastname.S,
        "role": userData.role.S
      }
      setUser(user)
      alert("Successful login")
    } else {
      setAuthStep(4)
      setShowAlert(true)
      setAlertMessage("Invalid cipher or shift number.")
    }
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
