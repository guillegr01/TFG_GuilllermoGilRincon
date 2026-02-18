# TFG_GuilllermoGilRincon
Private github repository, where my final college degree project is gonna be allocated. This  software is about a diabetes caretracker multiplatform application. This application shall be avaliable for both Android and iOS, either OS should be compatible.

## Installation and execution instructions
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

  To activate all of this dependencies, drivers and "node_modules" folder, user have to execute the following command:
  - npm install
    
  This command only works if user is located in the root of backend folder.

  ### Environmental variables
  An environmental variable is required to connect the program with the MongoDB Atlas Database.
  
  - User shall create a .env file in the root of backend directory with the following content:
    MONGO_URL="mongodb+srv://ggil:user@clustername.rznxc.mongodb.net/?retryWrites=true&w=majority&appName=clustername"
  
  NOTE: For privacy and security reasons ".env" file is not uploaded to GitHub repository.
 
  ### Executing the server
  To execute the server, user shall execute the following command (user have to be located inside backend directory): 
  - npm run dev
  
  NOTE: This command is the one established to execute the server, according to "scripts" section in package.json.

  <img width="988" height="406" alt="Image" src="https://github.com/user-attachments/assets/27193a83-c0ca-4b6b-94c5-043229901aad" />
  
  ### Additional notes
  - "node_modules" folder is not included in the repository
  - All dependencies can be installed with "npm install".
  - The Database used in this project is MongoDB Atlas.
  
  
## Author
Guillermo Gil Rincón
