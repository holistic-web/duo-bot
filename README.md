This is the javascript code that will be run on the Raspberry Pi to automate Google Duo calls.

To run this code you must complete the following:
- Find your google chrome profile local file at C:\Users\<username>\AppData\Local\Google\Chrome\User Data\Default. If you try to use this file with chrome already open it will cause errors so copy the folder to the C drive for ease of access.
- Go to ChromeClient.js and replace the filename in the build function, --user-data-dir=/myUserData with your file lcoation minus the 'C:/' e.g. 'C:/myUserData' => '/myUserData'
- Run the code with the command 'node .'
