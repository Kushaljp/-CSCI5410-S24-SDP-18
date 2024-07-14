import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_wy07lyZvM',
  ClientId: '4iaev7ktoiq4ho7rg0gliomrhb',
};

export default new CognitoUserPool(poolData);