# ToDoListV2
The To-Do List App is a Node.js, Express, MongoDB, and EJS templating engine-based application made to help users manage their daily tasks.

## Usage
The application is hosted on Cyclic, so feel free to follow the link to check it out:
https://troubled-wasp-undershirt.cyclic.app/
### Home Page
This is the default page that shows the "Todays" list where you can add new items to the list by typing in the input field and clicking the "+" button.
### Custom Lists
You can create custom lists by adding a name to the URL after "/" (e.g., https://troubled-wasp-undershirt.cyclic.app/monday) or (http://localhost:3000/monday (if you are hosting an app locally)). You can then add items to the custom list and access it using the previously specified name.
### Deleting Items
To delete an item, click on the checkbox next to the item. It will be marked as completed and automatically removed from the list.


## Using the app on the local computer
Feel free to set up the application on your computer by following the installation steps below.
## Prerequisites
Before running this project, make sure you have the following packages installed:
- Node.js: Download and Install Node.js
- MongoDB: Download and Install MongoDB

## Installation
Follow these steps to set up the application:
1. Open Powershell/Terminal and Clone the repository to your local machine:
 `git clone https://github.com/Vhkan/ToDoListV2`
2. Navigate to the project directory:
 `cd ToDoListV2`
3. Install the required dependencies:
`npm install`
4. Install additional packages:
`npm install mongoose lodash dotenv express ejs`

## Get Started
To run the To-Do List App, perform the following actions:
1. Open a new PowerShell window
2. Start MongoDB: `mongod`
3. Open another PowerShell window 
4. Launch MongoDB Shell: `mongosh`
5. Open another PowerShell window and navigate to the project directory: `cd ToDoListV2`
6. Run the application using a nodemon: `nodemon index.js`
7. Open a web browser and navigate to localhost:3000 to access the To-Do List app. Use localhost:3000/tuesday if you want to create a new To-Do list.

## Project Structure
`index.js`: The main entry point of the application. It configures the server, sets up the routes, and connects to the database.
`Item`: The model for individual to-do list items.
`WorkItem`: The model for work list items.
`List`: The model for the custom lists.
`public`: The directory containing static files such as CSS stylesheets.
`styles.css`: The directory containing the CSS stylesheets for the application.
`views`: The directory containing the EJS templates used to render the HTML pages.
`header.ejs`: The header template that is included in other EJS files.
`footer.ejs`: The footer template that is included in other EJS files.
`list.ejs`: The template for the to-do list page.

