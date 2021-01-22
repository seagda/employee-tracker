USE employees_db;

INSERT INTO department (name) VALUES
    ("Accounting"),("HR"),("Engineering"),("Sales"),("Executive");

INSERT INTO role (title,salary,department_id) VALUES
    ("Accounts Receivable",60000,1),
    ("Accounts Payable",40000,1),
    ("Sales Manager",70000,4),
    ("Payroll Supervisor", 56000,2),
    ("Data Engineer", 87000, 3),
    ("Web Developer", 95000, 3),
    ("CEO",1000000,5);

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES
    ("Joe","Smith",3,NULL),
    ("Shea","Mullaney", 5, NULL);
