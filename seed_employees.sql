USE employees_db;

INSERT INTO department (name) VALUES
    ("Executive"),
    ("Finance"),
    ("HR"),
    ("Engineering"),
    ("Sales"),
    ("Operations");

INSERT INTO role (title,salary,department_id) VALUES
    ("CEO", 900000, 1),
    ("COO", 495000, 1),
    ("CFO", 495000, 1),
    ("CTO", 600000, 1),
    ("HR Director",100000,3),
    ("Sales Director",200000,5),
    ("Office Manager",65000,6),
    ("Facilities Manager",70000,6),
    ("Accounts Receivable",60000,2),
    ("Accounts Payable",40000,2),
    ("Payroll Supervisor", 56000, 2),
    ("Salesperson", 70000, 5),
    ("Data Engineer", 87000, 4),
    ("Web Developer", 95000, 4);

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES
    ("Betty","Badass", 1, NULL),
    ("Joseph","Fixit", 2, 1),
    ("Finance","Guru", 3, 1),
    ("Shea","Mullaney", 4, 1),    
    ("Cara","Smith", 5, 2),
    ("Number", "Cruncher", 9, 3),
    ("Dora", "Explorer", 7, 3),
    ("Midas","Touch", 5, 3),
    ("Alan","Donovan", 12, 3),
    ("Louie","Luau", 14, 4);
