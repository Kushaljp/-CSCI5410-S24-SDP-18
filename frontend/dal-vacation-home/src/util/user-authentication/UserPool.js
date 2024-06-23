import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_PLBXmIkIS',
  ClientId: '56qh5va2dh3qcj40clp5io0jhm',
};

export default new CognitoUserPool(poolData);