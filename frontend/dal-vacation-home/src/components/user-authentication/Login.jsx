import { Alert, Container } from '@mui/material'
import React, { useState } from 'react'
import UserPool from '../../util/user-authentication/UserPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import FirstFactorAuth from './FirstFactorAuth';
import SecondFactorAuth from './SecondFactorAuth';
import ThirdFactorAuth from './ThirdFactorAuth';

function Login() {
  const [authStep, setAuthStep] = useState(0);
  const [firstFactorAuthData, setFirstFactorAuthData] = useState()
  const [secondFactorAuthData, setSecondFactorAuthData] = useState()
  const [thirdFactorAuthData, setThirdFactorAuthData] = useState()
  const [cognitoUser, setCognitoUser] = useState()

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
      },
      onFailure: (error) => {
        setAuthStep(0)
        setShowAlert(true)
        setAlertMessage(error.message)
      }
    })
  }

  const registerUser = () => {
    console.log("Register")
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
      {authStep === 3 && <ThirdFactorAuth setAuthStep={setAuthStep} setData={setThirdFactorAuthData} />}
      {authStep === 4 && registerUser()}
    </>
  )
}

export default Login
