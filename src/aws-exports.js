const awsConfig = {
  Auth: {
    region: "REPLACE_AWS_REGION",
    userPoolId: "REPLACE_USER_POOL_ID",
    userPoolWebClientId: "REPLACE_USER_POOL_WEB_CLIENT_ID",
    oauth: {
      domain: "REPLACE_COGNITO_DOMAIN",
      redirectSignIn: "REPLACE_APP_URL",
      redirectSignOut: "REPLACE_APP_URL",
      responseType: "code"
    }
  },
  api: {
    endpoints: [
      {
        name: "UserAPI",
        endpoint: "REPLACE_API_URL"
      }
    ]
  }
};

export default awsConfig;
