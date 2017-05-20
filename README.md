# Getting Started : Viber Susi AI Bot Installation 

It's easy for you to create your own Viber messenger bot and integrate susi's API into it. You can read the [documentation](https://support.viber.com/customer/en/portal/articles/2554141-create-a-public-account?b_id=13518) on how to make a public account in Viber and get started.

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
 
 <img src="./docs/images/getPermissionForPA.png" alt="alt text">
 
 Follow the instructions for verification as indicated by viber.
 
 3. After verification, create and setup the public account.
 
 Click Second button from top-right, to discover public accounts made by you.
 
 <img src="./docs/images/publicAccoutStartScreen.png" alt="alt text" height = '480' width="270">

 Click blue button at bottom-right, to create a new one.
 
 <img src="./docs/images/publicAccountSecondScreen.png" alt="alt text" height = '480' width="270">
 
 Click Join Now to start setting it up.
 
 <img src="./docs/images/Joining_public_%20account.png" alt="alt text" height = '480' width="270">
 
 After filling the required details click Continue
 
 <img src="./docs/images/infoPublicAccount.png" alt="alt text" height = '480' width="270">
 
 Add more specific details.
 
 <img src="./docs/images/editAccountDetails.png" alt="alt text" height = '480' width="270">
 
 Select Viber chat Api as your chat Solution.
 
 <img src="./docs/images/chooseChatSoln.png" alt="alt text" height = '480' width="270">
 
 Copy the public account key. (It will be in the area that is coloured gray).
 
 <img src="./docs/images/publicAccountKey.png" alt="alt text" height = '480' width="270">
 
4. Create a new heroku app [here](https://dashboard.heroku.com/new?org=personal-apps).

 This app will accept the requests from Viber and Susi api.
 
 <img src="./docs/images/createHerokuApp.png" alt="alt text">

5. Create a config variable by switching to settings page of your app. The name of your config variable should be X_VIBER_AUTH_TOKEN 
   and its value is the API key generated in step 3.

   <img src="./docs/images/configVariables.PNG" alt="alt text">

6. Change the url in set webhook request options that is on line 33 in index.js file to https://YOUR-HEROKU-APP-NAME.herokuapp.com enclosed in ' '. Commit and push the changes to this forked repository.

7. Connect the heroku app to the forked repository.
 
 Connect the app to Github by selecting the name of this forked repository.
 
<img src="./docs/images/herokuGithubConnect.png" alt="alt text">

8. Deploy on development branch. If you intend to contribute, it is recommended to Enable Automatic Deploys.

 Branch Deployment.
 
<img src="./docs/images/branchSelection.png" alt="alt text">

 Successful Deployment.
 
 <img src="./docs/images/herokuDeployment.png" alt="alt text">

9. Now, visit the created heroku app from a browser, and check if the status message received for set Webhook request is - ok. That means the webhook is successfully set. 

 This should be the output.
 
 <img src="./docs/images/statusMessageForWebhook.png" alt="alt text">

10. Go to the Viber public account created and click the symbol indicating 1-on-1 chat with Susi at your top right(second symbol).
  
 1-on-1 chat
 
<img src="./docs/images/topRight.png" alt="alt text" height = '480' width="270">

11. Enjoy chatting with Susi.

 <img src="./docs/images/susiChat.png" alt="alt text" height = '480' width="270">
