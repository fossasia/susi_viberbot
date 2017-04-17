# Getting Started : Viber Susi AI Bot Installation 

It's easy for you to create your own Viber messenger bot and integrate susi's API into it. You can read the [documentation](https://developers.viber.com/public-accounts/index.html) on how to make a public account in Viber and get started.

Messenger bots uses a web server to process messages it receives or to figure out what messages to send.

## Prerequisites
To create your account on -:
1. Viber
2. Github
3. Heroku

## Setup your own Messenger Bot
1. Fork this repository.

2. Request for a public account on Viber.

 [Fill this form](https://support.viber.com/customer/widget/emails/new?interaction_name=NEWEA)
 
 <img src="./docs/images/getPermissionForPA.png" alt="alt text" width="700" height="500">
 
 Follow the instructions for verification as indicated by viber.
 
 3. After verification, create and setup the public account.
 
 Click Second button from top-right, to discover public accounts made by you.
 
 <img src="./docs/images/publicAccoutStartScreen.png" alt="alt text" width="350" height="600">

 Click blue button at bottom-right, to create a new one.
 
 <img src="./docs/images/publicAccountSecondScreen.png" alt="alt text" width="350" height="600">
 
 Click Join Now to start setting it up.
 
 <img src="./docs/images/Joining_public_%20account.png" alt="alt text" width="350" height="600">
 
 After filling the required details click Continue
 
 <img src="./docs/images/infoPublicAccount.png" alt="alt text" width="350" height="600">
 
 Add more specific details.
 
 <img src="./docs/images/editAccountDetails.png" alt="alt text" width="350" height="600">
 
 Select Viber chat Api as your chat Solution.
 
 <img src="./docs/images/chooseChatSoln.png" alt="alt text" width="350" height="600">
 
 Copy the public account key.
 
 <img src="./docs/images/publicAccountKey.png" alt="alt text" width="350" height="600">
 
4. Change the key written after "'x-viber-auth-token':" (in index.js file) with the new public account key generated. Enclose the api key in ' '. Commit and push the changes to this forked repository.

5. Create a new heroku app [here](https://dashboard.heroku.com/new?org=personal-apps).

 This app will accept the requests from Viber and Susi api.
 
 <img src="./docs/images/createHerokuApp.png" alt="alt text" width="800" height="500">

6. Change the url in set webhook request options that is on line 33 in index.js file to https://YOUR-APP-NAME.herokuapp.com enclosed in ' '. Commit and push the changes to this forked repository.

7. Connect the heroku app to the forked repository.
 
 Connect the app to Github
 
<img src="./docs/images/herokuGithubConnect.png" alt="alt text" width="800" height="500">

8. Deploy on development branch. If you intend to contribute, it is recommended to Enable Automatic Deploys.

 Branch Deployment.
 
<img src="./docs/images/branchSelection.png" alt="alt text" width="800" height="500">

 Successful Deployment.
 
 <img src="./docs/images/herokuDeployment.png" alt="alt text" width="800" height="500">

9. Now, visit the created heroku app from a browser, and check if the status message received for set Webhook request is - ok. That means the webhook is successfully set. 

 This should be the output.
 
 <img src="./docs/images/statusMessageForWebhook.png" alt="alt text" width="800" height="500">

10. Go to the Viber public account created and click the symbol indicating 1-on-1 chat with Susi at your top right(second symbol).
  
 1-on-1 chat
 
<img src="./docs/images/topRight.png" alt="alt text" width="350" height="600">

11. Enjoy chatting with Susi.

 <img src="./docs/images/susiChat.png" alt="alt text" width="350" height="600">
