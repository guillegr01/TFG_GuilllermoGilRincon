# TFG_GuilllermoGilRincon
Private github repository, where my final college degree project is gonna be allocated. This  software is about a diabetes caretracker multiplatform application. This application shall be avaliable for both Android and iOS, either OS should be compatible.

## Backend Installation and execution instructions
  ### Requirements 
  - Node.JS installed
  - npm installed (included with Node.JS)
  - Internet connection for the installed dependencies.

  ### Cloning Repository
  - Open Visual Studio Code
  - Ctrl+shift+P
  - Git clone
  - Enter the repository url (http or ssh)
  - Save the project into a folder and then open it

  ### Dependencies and Drivers installation
  Once you have the project cloned and opened in VSCode:
  - Change to backend directory: cd ./backend/

  Already there, user shall find several files as:
  - package.json (required config file)
  - package-lock.json (required config file) (editable by user)
  - tsconfig.json (required config file) (editable by user)
  - src (folder with the application software)
  
  Being at backend directory, the dependencies and drivers that are already installed are the followings:
  - ts-node-dev -D
  - express
  - @types/express -D
  - mongodb
  - -D @types/node
  - dotenv

  To activate all of this dependencies, drivers and "node_modules" folder, user have to execute the following command:
  - npm install
    
  This command only works if user is located in the root of backend folder.

  ### Environmental variables
  An environmental variable is required to connect the program with the MongoDB Atlas Database.
  
  - User shall create a .env file in the root of backend directory with the following content:
    <img width="1742" height="250" alt="Image" src="https://github.com/user-attachments/assets/4e3d5cc8-5718-464c-9ca4-d45d66216c7e" />
    
  NOTE: For privacy and security reasons ".env" file is not uploaded to GitHub repository.
 
  ### Executing the server
  To execute the server, user shall execute the following command (user have to be located inside backend directory): 
  - npm run dev
  
  NOTE: This command is the one established to execute the server, according to "scripts" section in package.json.

  <img width="1100" height="250" alt="Image" src="https://github.com/user-attachments/assets/27193a83-c0ca-4b6b-94c5-043229901aad" />

## Frontend Installation and execution instructions
  ### Requirements 
  - Node.JS installed
  - npm installed (included with Node.JS)
  - Expo Go app installed on your mobile device (iOS or Android)
  - Internet connection for dependencies and Expo services

  ### Dependencies installation
  Once you have the project cloned and opened in VSCode:
  - Change to frontend directory: `cd ./frontend/`

  Inside the frontend directory, you will find the configuration files for React Native and Expo (`package.json`, `app.json`, `babel.config.js`). To install all     necessary libraries and the `node_modules` folder, execute:
  - `npm install`

  The main dependencies included in this frontend are:
  - expo
  - react & react-native
  - react-navigation (Stack & Bottom Tabs)
  - typescript
  - axios (for API communication)

  ### Executing the Frontend
  The backend part is already uploaded on the cloud, so it is not neccesary to execute backend. In the other hand, it will be neccesary
  to run frontend part if you want to try the app via Expo Go on iOS, Android or Android Emulator. Execute the following command inside the frontend directory:
  - `npx expo start`

  ### How to view the application
  Once the command is running, a QR code will appear in the terminal:
  1. **Android:** Open the **Expo Go** app and scan the QR code.
  2. **iOS:** Open the **Camera app**, scan the QR code, and tap the notification to open Expo Go.
  3. **Important:** Your mobile device and your computer must be connected to the same Wi-Fi network.
  
  
### Additional notes
- "node_modules" folder is not included in the repository
- All dependencies can be installed with "npm install".
- The Database used in this project is MongoDB Atlas.
- **Expo Go** is used to avoid the need for Android Studio or Xcode during development.
- For production-like testing, ensure the Backend server is running simultaneously.
  
  
## Author
Guillermo Gil Rincón
