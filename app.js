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
    console.log("\n\nConnected to employees_db as "+ connection.threadId + "\n")
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

// Manage Departments
const manageDepts = () => {
    console.log("-".repeat(30)+"\n Now managing Departments:\n"+"-".repeat(30));
    connection.query("SELECT * FROM ??","department", function(err, data) {
        if (err) throw err;
        console.table(data);
        console.log("_".repeat(30));
        inquirer.prompt({
            name: "actionDept",
            type: "list",
            message: "What next?",
            choices: ["Add Department", 
                "Edit Department",
                "Delete Department",
                "Return to Main",
                "Quit"]
            })
            .then(function(answer) {
                switch (answer.actionDept) {

                case "Add Department":
                    addDept();
                    break;

                case "Edit Department":
                    editDept();
                    break;

                case "Delete Department":
                    deleteDept();
                    break;

                case "Return to Main":
                    console.log("=".repeat(30));
                    mainMenu();
                    break;
                    
                case "Quit App":
                    quitApp();
                    break;
                }
            });
        
    })  
};

// Add a Dept
const addDept = () => {
    inquirer.prompt([
        {
         name: "newDept",
         type: "input",
         message: "Name of new department:"
        }
    ])
    .then(function(answer) {
    connection.query("INSERT INTO department SET ?",
    {name: answer.newDept},
    function(err) {
        if (err) throw err;
        console.log(`${answer.newDept} Department added.`);
        manageDepts();
     });
  })
};

// Edit a Dept
const editDept = () => {
    connection.query("SELECT * FROM ??","department", function(err, deptData) {
        if (err) throw err;
        inquirer.prompt([
            {
             name: "deptChoice",
             type: "rawlist",
             choices: function() {
                 let deptArray = [];
                 for (let i = 0; i < deptData.length; i++) {
                     deptArray.push(deptData[i].name);
                 }
                 return deptArray;
             },
             message: "What department would you like to edit?"
            },
            {
                name: "nameEdit",
                type: "input",
                message: "Enter new name:"
            }
        ]).then(function(answer) {
            let chosenDept;
            for (let i=0; i < deptData.length; i++) {
                if (deptData[i].name === answer.deptChoice){
                    chosenDept = deptData[i];
                }
            }
            connection.query("UPDATE ?? SET ? WHERE ?",["department",{name:answer.nameEdit},{id:chosenDept.id}], function(err) {
                if (err) throw err;
                console.log("Department updated.");
                manageDepts();
            })
        });
    });
};

// Delete a Dept
const deleteDept = () => {};

// Manage Roles
const manageRoles = () => {
    console.log("-".repeat(30)+"\n Now managing Roles:\n"+"-".repeat(30));
};

// Manage Employees
const manageEmp = () => {
    console.log("-".repeat(30)+"\n Now managing Employees:\n"+"-".repeat(30));
};