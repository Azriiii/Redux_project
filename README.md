### OpenID-Client: A Recommended Alternative for Secure Authentication and Authorization with Keycloak .
It offers a robust and standardized implementation of the OpenID Connect protocol, which is essential for secure authentication and authorization processes.
When working with an identity provider, here's a general overview of how OIDC (OpenID Connect) authentication process typically works

### A simple example illustrating how OIDC (OpenID Connect) works with a provider.


![openid_diagram-Enterprise](https://github.com/Azriiii/Redux_project/assets/47857678/d33b2549-7e57-461e-9adb-9af8914be810)







### Here's our perspective of how OIDC authentication process works with our application

![Diagramme sans nom drawio](https://github.com/Azriiii/Redux_project/assets/47857678/ab675317-3f17-421b-86c8-6e8acd9ae736)


The implemented method in OpenID-Client is the Authorization Code Flow. This method allows the secure acquisition of Access Tokens (and optionally Refresh Tokens) for third-party API usage.

## Quick start


Keycloak realms operate independently, providing dedicated spaces for managing users, roles, 
permissions, and authentication settings. They create isolated environments that allow organizations to separate and manage different security contexts
 based on their specific requirements. Realms ensure distinct and well-defined user identities,
 authentication flows, and authorization policies within their respective domains.
 
 /realms/{realm-name}/.well-known/openid-configuration

 ![Captureq](https://github.com/Azriiii/Redux_project/assets/47857678/67ca9149-37f2-4e08-96b1-e315eb338cd0)

 
To connect OpenID-Client seamlessly with Keycloak, you only need to specify the issuer URL. This configuration allows Node applications to effectively integrate with Keycloak. Additionally, the setup of express sessions is required.
Here is an example code snippet to create a Keycloak client with the provided configurations:


```js
const { Issuer } = require('openid-client');

Issuer.discover(process.env.KEYCLOAK_SERVER_URL).then((keycloakIssuer) => {
  const client = new keycloakIssuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.KEYCLOAK_SECRET,
    redirect_uris: [process.env.CALLBACK_URL],
    post_logout_redirect_uri: [process.env.POST_LOGOUT_REDIRECT],
    token_endpoint_auth_method: process.env.KEYCLOAK_TOKEN_ENDPOINT,
    response_types: [process.env.KEYCLOAK_RESPONSE_TYPE],
  });
  console.log("Client created:", client);
  this.client = client;
});
```



Create a Keycloak client with the provided configurations, including the redirect URIs and other settings required for authentication and authorization.
These configurations play a crucial role in setting up the client application's communication and interaction with Keycloak:



```js
const client = new keycloakIssuer.Client({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.KEYCLOAK_SECRET,
            redirect_uris: [process.env.CALLBACK_URL],
            post_logout_redirect_uri: [process.env.POST_LOGOUT_REDIRECT],
            token_endpoint_auth_method: process.env.KEYCLOAK_TOKEN_ENDPOINT,
            response_types: [process.env.KEYCLOAK_RESPONSE_TYPE],
          });
```  
		  
		  
		  
client_id: Unique identifier for the client application used during authentication.

client_secret: Confidential value for secure communication between the client and Keycloak.

redirect_uris: URLs for user redirection after authentication or authorization.

post_logout_redirect_uri: URL for user redirection after logging out.

token_endpoint_auth_method: Method for client authentication during token requests.




Obtain the URL of the authorization endpoint with pre-encoded query parameters to perform a redirect.
Additionally, generate a code verifier and its corresponding code challenge.
 
 
 
```js
 const authorizationUrl = client.authorizationUrl({
  redirect_uri: process.env.CALLBACK_URL,
  scope: 'openid',
  code_challenge_method: 'S256',
  code_challenge: generatedCodeChallenge,
});
 ```
 
 
 
 After users are redirected back to your specified redirect_uri, the application handles the callback. 
 It includes the code_verifier when exchanging the authorization code for tokens. The obtained token set is then stored in the session for future use.
 
 
 
```js
const params = client.callbackParams(req);
const tokenSet = await client.callback(process.env.CALLBACK_URL, params, {
  code_verifier: generatedCodeVerifier,
});
req.session.tokens = tokenSet;
```


 
 To verify the session status and access token validity, you can use the checkSession function. It
 It ensures that the required tokens are present in the session and performs introspection on the access token. 
 If the session and token are valid, it returns the user and token information. If any errors occur during the process, appropriate status responses are sent.
 
 
```js
 async checkSession(req, res) {
  try {
    const { tokens } = req.session;

    if (!tokens) {
      console.error("Token is not present in request session");
      res.status(403).send();
      return;
    }

    const introspection = await client.introspect(tokens.access_token);
    if (introspection.active === false) {
      res.status(403).json();
      return;
    }

    const user = req.session.user;
    res.status(200).json({ user, tokens });
  } catch (error) {
    console.error("check-session" + error);
    res.status(500).send("Error logging in");
  }
}
```

### Demo of the login process


  ![Animation](https://github.com/Azriiii/Redux_project/assets/47857678/ef94237d-31db-46ab-a998-64e4d92ba555)




 
  the logout function  destroys the session, ensuring that any stored session data is cleared. It retrieves the post-logout redirect URI,
  which specifies where the user will be redirected  to the appropriate location after logging out.
  Please note that some details related to the logout process may be subject to change due to the instability of Keycloak server


![Animation33](https://github.com/Azriiii/Redux_project/assets/47857678/47fd0c26-b76d-4992-988f-e47fcf972373)




```js
async logout(req, res) {
  try {
    req.session.destroy();

    const postLogoutRedirectUri = process.env.POST_LOGOUT_REDIRECT;

    const endSessionUrl = client.endSessionUrl({
      post_logout_redirect_uris: postLogoutRedirectUri,
    });
    res.redirect(endSessionUrl);
  } catch (error) {
    res.status(500).send("Error redirecting");
  }
}
```
By the end, we create a singleton KeycloakClient instance to handle authentication and authorization operations throughout the application.
### Please note that the following demonstration may contain customizable details to cater to your specific needs and preferences
