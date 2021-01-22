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
        message: "What would you like to do?",
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

// quit function
const quitApp = () => {
    connection.end();
    console.log("-".repeat(50)+"\n Thanks for using Employee Manager. Goodbye.\n"+"-".repeat(50)+"\n");
};

// Manage Departments
const manageDepts = () => {
    console.log("-".repeat(30)+"\n Now managing Departments:\n"+"-".repeat(30));

};

// Manage Roles
const manageRoles = () => {
    console.log("-".repeat(30)+"\n Now managing Roles:\n"+"-".repeat(30));
};

// Manage Employees
const manageEmp = () => {
    console.log("-".repeat(30)+"\n Now managing Employees:\n"+"-".repeat(30));
};