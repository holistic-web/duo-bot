# Duo Bot
This repo contains code to automate Google Duo calls, The goal is to develop an accessibility aid for people with poor eyesight/hearing, 
using a Raspberry Pi. Currently the code can perform outbound calls.

Currently development is done on a Windows machine for ease and speed with the program being ported across to Raspberry Pi for actual use.

To run this code on a PC you must complete the following:

- Install chromedriver and add it to your path.
- Find your google chrome profile local file at C:\Users\<username>\AppData\Local\Google\Chrome\User Data\Default. If you try to use this file with chrome already open it will cause errors so copy the folder to the C drive for ease of access.
- Go to ChromeClient.js and replace the filename in the build function, --user-data-dir=/myUserData with your file lcoation minus the 'C:/' e.g. 'C:/myUserData' => '/myUserData'
- Run the code with the command 'node .'

To run on raspberry pi:
- Again, install chromedriver and add it to your path.
- Find the default profile location, usually "/home/pi/.config/chromium/Default" and move the file to another location.

### N.B.
- This code is built for using Google Chrome and Chromium only, other browsers will need many alterartions to the code.
- To find the default Chrome user file, go to 'chrome://version' and find the 'Profile Path'.
