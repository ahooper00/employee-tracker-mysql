INSERT INTO department (department_name)
VALUES  ("Production"),
        ("Facility"),
        ("Quality Control"),
        ("Executives"),
        ("Human Resources");

INSERT INTO employee_role (department_id, title, salary)
VALUES  (1, "Production Manager", 100000.00),
        (1, "Production Operator", 80000.00),
        (2, "Facility Coordinator", 110000.00),
        (2, "Laboratory Assistant", 65000.00),
        (2, "Junior Laboratory Assistant", 45000.00),
        (3, "QC Manager", 70000.00),
        (3, "QC Analyst", 60000.00),
        (4, "Chief Executive Officer", 300000.00),
        (4, "Chief Financial Officer", 250000.00),
        (4, "Chief Scientific Officer", 250000.00),
        (5, "HR Coordinator", 90000.00),
        (5, "Training Manager", 90000.00);

INSERT INTO employee (role_id, first_name, last_name)
VALUES  (1, "Janine", "Smith"),
        (2, "Chloe", "Blue"),
        (2, "Joe", "White"),
        (2, "Phillip", "Borg"),
        (3, "Diane", "Hanna"),
        (4, "Amelia", "Hooper"),
        (4, "Eponine", "Lyon"),
        (5, "Homer", "Simpson"),
        (6, "Michael", "Scott"),
        (7, "Barbara", "Streisand"),
        (7, "Leslie", "Knope"),
        (8, "Ron", "Swanson"),
        (9, "Dwight", "Schrute"),
        (10, "Jerry", "Sienfeld"),
        (11, "Brad", "Pitt"),
        (12, "Tyler", "Durden");
