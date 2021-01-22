const mysql = require("mysql");
const inquirer = require("inquirer");

// connection data
const connection = mysql.createConnection({host: "localhost", port: 3306, user: "root", password: "password", database: "employees_db"});

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
        choices: ["Manage Departments", "Manage Roles", "Manage Employees", "Quit Application"]
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
        }
    })    
};

// Quit Application
const quitApp = () => {
    connection.end();
    console.log("-".repeat(50)+"\n Thanks for using Employee Manager. Goodbye.\n"+"-".repeat(50)+"\n");
};

// Manage Department Functions Start Here ==================
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
            choices: ["Add Department", "Edit Department", "Delete Department", "Return to Main", "Quit"]
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

                default:
                    quitApp();
                    break;
                }
            });
        
    })  
};

// Add a Dept
const addDept = () => {
    inquirer.prompt([
      {name: "newDept", type: "input", message: "Name of new department:"}
    ])
    .then(function(answer) {
    connection.query("INSERT INTO department SET ?", {name: answer.newDept}, function(err) {
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
            {name: "deptChoice",
             type: "rawlist",
             choices: function() {
                 let deptArray = [];
                 for (let i = 0; i < deptData.length; i++) {
                     deptArray.push(deptData[i].name);
                 }
                 return deptArray;},
             message: "What department would you like to edit?"},
            {name: "nameEdit", type: "input", message: "Enter new name:"}
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
const deleteDept = () => {
    connection.query("SELECT * FROM ??","department", function(err, deptData) {
        if (err) throw err;
        inquirer.prompt([
            {name: "deptChoice",
             type: "rawlist",
             choices: function() {
                 let deptArray = [];
                 for (let i = 0; i < deptData.length; i++) {
                     deptArray.push(deptData[i].name);
                 }
                 return deptArray;},
             message: "What department would you like to delete?"}
        ]).then(function(answer) {
            let chosenDept;
            for (let i=0; i < deptData.length; i++) {
                if (deptData[i].name === answer.deptChoice){
                    chosenDept = deptData[i];
                }
            }
            connection.query("SELECT * FROM ?? WHERE department_id = ?", ["role", chosenDept.id], function(err, data) {
                if (err){
                 throw err;
                } else if (!data.length){
                  console.log("No associated roles, OK to delete...");
                  (function deleteDept() {
                    connection.query("DELETE FROM ?? WHERE ?", ["department", {id: chosenDept.id}], 
                    function(err, res){
                        if (err) throw err;
                        console.log("\n\n** Department successfully deleted.**\nHit 'Enter' to Manage Departments");
                    })
                    
                  })();
                } else {
                console.log("The following Roles are associated with this Department. Cannot delete.")
                console.table(data);
                }
                mainMenu();
            })
        });
    });
};
// ============ END MANAGE DEPTS =================

// Manage Role Functions Start Here ==============
const manageRoles = () => {
    console.log("-".repeat(30)+"\n Now managing Roles:\n"+"-".repeat(30));
    connection.query("SELECT role.title, role.salary, department.name AS department FROM ?? LEFT JOIN ?? ON role.department_id = department.id",
    ["role","department"],
     function(err, data) {
        if (err) throw err;
        console.table(data);
        console.log("_".repeat(30));
        inquirer.prompt({
            name: "actionRole",
            type: "list",
            message: "What next?",
            choices: ["Add Role", "Edit Role", "Delete Role", "Return to Main", "Quit"]
            })
            .then(function(answer) {
            switch (answer.actionRole) {

            case "Add Role":
                addRole();
                break;
            case "Edit Role":
                editRole();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "Return to Main":
                console.log("=".repeat(30));
                mainMenu();
                break;                
            case "Quit App":
                quitApp();
                break;
            default:
                quitApp();
                break;
            }
        });      
    }) 
};

// Add a Role
const addRole = () => {
    inquirer.prompt([
      {name: "newRole", type: "input", message: "Name of new role:"},
      {name: "newSalary", type: "input", message: "Salary for this role:"},
      {
        name: "newDeptId", 
        type: "rawlist", 
        choices: function() {
            connection.query("SELECT * FROM ??","department", function(err, deptData) {
                if (err) throw err;
                let deptArray = [];
                for (let i = 0; i < deptData.length; i++) {
                deptArray.push(deptData[i].name);
                }
                return deptArray;
            });
        },
        message: "Choose a Department:"
    }
    ])
    .then(function(answer) {
    connection.query("INSERT INTO role SET ?,?,?", [
        {name: answer.newRole},
        {salary: answer.newSalary},
        {department_id: answer.newDeptId}
    ], function(err) {
        if (err) throw err;
        console.log(`${answer.newRole} added.`);
        manageRoles();
     });
  })
};

// Edit a Role
const editRole = () => {
    connection.query("SELECT * FROM ??","role", function(err, roleData) {
        if (err) throw err;
        inquirer.prompt([
            {name: "roleChoice",
             type: "rawlist",
             choices: function() {
                 let roleArray = [];
                 for (let i = 0; i < roleData.length; i++) {
                     roleArray.push(roleData[i].name);
                 }
                 return roleArray;},
             message: "What Role would you like to edit?"},
            {name: "nameEdit", type: "input", message: "Enter new name:"}
        ]).then(function(answer) {
            let chosenRole;
            for (let i=0; i < roleData.length; i++) {
                if (roleData[i].name === answer.roleChoice){
                    chosenRole = roleData[i];
                }
            }
            connection.query("UPDATE ?? SET ? WHERE ?",["role",{name:answer.nameEdit},{id:chosenRole.id}], function(err) {
                if (err) throw err;
                console.log("Role updated.");
                manageRoles();
            })
        });
    });
};

// Delete a Role
const deleteRole = () => {
    connection.query("SELECT * FROM ??", "role", function(err, roleData) {
        if (err) throw err;
        inquirer.prompt([
            {name: "roleChoice",
             type: "rawlist",
             choices: function() {
                 let roleArray = [];
                 for (let i = 0; i < roleData.length; i++) {
                     roleArray.push(roleData[i].name);
                 }
                 return roleArray;},
             message: "Which Role would you like to delete?"}
        ]).then(function(answer) {
            let chosenRole;
            for (let i=0; i < roleData.length; i++) {
                if (roleData[i].name === answer.roleChoice){
                    chosenRole = roleData[i];
                }
            }
            connection.query("SELECT * FROM ?? WHERE role_id = ?", ["employee", chosenRole.id], function(err, data) {
                if (err){
                 throw err;
                } else if (!data.length){
                  console.log("No associated employees, OK to delete...");
                  (function deleteRole() {
                    connection.query("DELETE FROM ?? WHERE ?", ["role", {id: chosenRole.id}], 
                    function(err, res){
                        if (err) throw err;
                        console.log("\n\n** Role successfully deleted.**\nHit 'Enter' to Manage more Roles");
                    })
                    
                  })();
                } else {
                console.log("The following Roles are associated with this Department. Cannot delete.")
                console.table(data);
                }
                mainMenu();
            })
        });
    });
};

// ============ END MANAGE ROLES =================

// Manage Employee Functions Start Here ==============
const manageEmp = () => {
    console.log("-".repeat(30)+"\n Now managing Employees:\n"+"-".repeat(30));
    connection.query("SELECT e.first_name, e.last_name, r.title, d.name AS department FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id",
     function(err, data) {
        if (err) throw err;
        console.table(data);
        console.log("_".repeat(30));
        inquirer.prompt({
            name: "actionEmp",
            type: "list",
            message: "What next?",
            choices: ["Add Employee", "Update Employee", "Terminate Employee", "Return to Main", "Quit"]
            })
            .then(function(answer) {
            switch (answer.actionEmp) {

            case "Add Employee":
                addEmp();
                break;
            case "Update Employee":
                updateEmp();
                break;
            case "Terminate Employee":
                termEmp();
                break;
            case "Return to Main":
                console.log("=".repeat(30));
                mainMenu();
                break;                
            case "Quit App":
                quitApp();
                break;
            default:
                quitApp();
                break;
            }
        });      
    }) 
};    

const addEmp = () => {

};

const updateEmp = () => {

};

const termEmp = () => {

};