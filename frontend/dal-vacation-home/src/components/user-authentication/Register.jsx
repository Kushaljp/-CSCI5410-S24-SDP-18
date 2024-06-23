import React, { useEffect, useState } from 'react';
import FirstFactorAuth from './FirstFactorAuth';
import SecondFactorAuth from './SecondFactorAuth';
import ThirdFactorAuth from './ThirdFactorAuth';
import { Alert, Container } from '@mui/material';
import ConfirmRegistration from './ConfirmRegistration';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../../util/user-authentication/UserPool';
import { encryptCipherText } from '../../util/user-authentication/AuthenticationUtil';
import { getUserData, saveUserRegistration } from '../../services/AuthenticationApiService';

export default function Register() {
  const [authStep, setAuthStep] = useState(0);
  const [firstFactorAuthData, setFirstFactorAuthData] = useState()
  const [secondFactorAuthData, setSecondFactorAuthData] = useState()
  const [thirdFactorAuthData, setThirdFactorAuthData] = useState()
  const [cognitoUser, setCognitoUser] = useState()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState()

  const saveUserToCognito = () => {
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: firstFactorAuthData.email,
      })
    );
    UserPool.signUp(firstFactorAuthData.email, firstFactorAuthData.password, attributeList, null, (error, data) => {
      if (error) {
        setAuthStep(0)
        setShowAlert(true)
        setAlertMessage(error.message)
      } else {
        setShowAlert(false)
        setCognitoUser(data.user)
        setAuthStep(2)
      }
    })
  }

  const registerUser = () => {
    let userData = {
      "email": firstFactorAuthData.email,
      "firstname": firstFactorAuthData.firstname,
      "lastname": firstFactorAuthData.lastname,
      "securityQuestions": JSON.stringify(secondFactorAuthData),
      "cipherText": encryptCipherText(thirdFactorAuthData.cipherText, thirdFactorAuthData.shiftNumber)
    }
    if(saveUserRegistration(userData, cognitoUser)) {
      alert("User registered")
    } else {
      setShowAlert(true)
      setAlertMessage("Registration failed. Please try again!")
    }
  }

  return (
    <>
      {showAlert &&
        <Container maxWidth="xs" sx={{ py: '3%' }}>
          <Alert severity="error">{alertMessage}</Alert>
        </Container>
      }
      {authStep === 0 && <FirstFactorAuth setAuthStep={setAuthStep} setData={setFirstFactorAuthData} isRegister={true} />}
      {authStep === 1 && saveUserToCognito()}
      {authStep === 2 && <ConfirmRegistration setAuthStep={setAuthStep} cognitoUser={cognitoUser} />}

      {authStep === 3 && <SecondFactorAuth setAuthStep={setAuthStep} setData={setSecondFactorAuthData} />}
      {authStep === 4 && <ThirdFactorAuth setAuthStep={setAuthStep} setData={setThirdFactorAuthData} />}
      {authStep === 5 && registerUser()}
    </>
  )
}