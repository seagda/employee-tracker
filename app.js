const mysql = require("mysql");
const inquirer = require("inquirer");

// connection data
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db"
});

// start program after connection
connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected to ${connection.database} as thread ${connection.threadId}\n\n`)
    makeHeader();
    mainMenu();
  });

// Make a pretty header
const makeHeader = () => {
    console.log("-".repeat(71));
    console.log("|"+" ".repeat(69)+"|");
    console.log("|"+" ".repeat(19)+"Welcome to the Employee Manager"+" ".repeat(19)+"|");
    console.log("|"+" ".repeat(69)+"|");
    console.log("-".repeat(71)+"\n\n");
};

// Main Menu
const mainMenu = () => {

    inquirer.prompt({
        name: "whatToDo",
        type: "list",
        message: "MAIN MENU:",
        choices: [
            "Manage Departments", 
            "Manage Roles", 
            "Manage Employees", 
            "Quit Application"
            ]
        
        }).then(({ whatToDo }) => {
            switch (whatToDo) {
                case "Manage Departments":
                    manageDepts();
                    break;
    
                case "Manage Roles":
                    manageRoles();
                    break;
    
                case "Manage Employees":
                    manageEmp();
                    break;

                case "Quit Application":
                    quitApp();
                    break;
                
                default:
                    quitApp();
                    break;
        }
    })    
};

// Quit Application
const quitApp = () => {
    connection.end();
    console.log("-".repeat(50)+"\n Thanks for using Employee Manager. Goodbye.\n"+"-".repeat(50)+"\n");
};

// Return to main or quit
const mainOrQuit = () => {
    inquirer
    .prompt({
      name: "returnChoice",
      type: "list",
      message: "What next?",
      choices: ["Return to Main","Quit App"]
    })
    .then(function(answer) {
        switch (answer.returnChoice) {
        case "Return to Main":
            console.log("=".repeat(30));
            mainMenu();
            break;
            
        case "Quit App":
            quitApp();
            break;
        }
    });
};

// Manage Departments
const manageDepts = () => {
    console.log("-".repeat(30)+"\n Now managing Departments:\n"+"-".repeat(30));
    let query = "SELECT "

    mainOrQuit();
};

// Manage Roles
const manageRoles = () => {
    console.log("-".repeat(30)+"\n Now managing Roles:\n"+"-".repeat(30));
    mainOrQuit();
};

// Manage Employees
const manageEmp = () => {
    console.log("-".repeat(30)+"\n Now managing Employees:\n"+"-".repeat(30));
    mainOrQuit();
};