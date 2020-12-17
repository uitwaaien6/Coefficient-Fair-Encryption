# Coefficient-Fair-Encryption-System

This encryption system is designed to be used in the client side
and its aim is to protect passwords from the internet traffic while being sent to the server. 
So is anyone to capture the password from the internet traffic is going to get the encrypted password.

# HOW IT WORKS

~ Requirements to test the program >
  - node.js
  - expo client app in your phone
  
# STEP BY STEP

 - First download the whole file from repository to your desktop and unzip it.
 - Change the directory to our app file in your terminal.
 - type "npm install" without quotes into your terminal.
 - Close all the servers and localhosts which is running at port:3000 & port:19002 & port:19001 & 19000
 - Open 3 terminals side by side
 - In the first terminal, type: "node server.js"
 - In the second terminal, type: "npm run tunnel"
    and the terminal will give you 2 url which looks like this -> "Forwarding        http://{random numbers}.ngrok.io -> http://localhost:3000"
    that command is a json script and will create a tunnel of your local host and expose it to the public world
 - Then you have to copy that url which ends with the .io and you have to paste it in to the coefficient-fair-encryption-system/src/api/jsonServer.js -> axios.create({
    baseURL: 'http://{random numbers}.ngrok.io'
});
    
 - In the third terminal, type: "expo start" or "npm start" 
    and then the terminal or "localhost:19002" will give you a QR Code and you have to scan it with your phones camera.
    Then wait for the javascript bundle to download.

 - And that is it. type whatever you want in to the input and it will send that input to the server as encrypted and will fetch it back.
