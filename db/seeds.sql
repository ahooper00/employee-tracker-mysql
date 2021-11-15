INSERT INTO department (department_name)
VALUES  ("Production"), --1
        ("Facility"), --2
        ("Quality Control"), --3
        ("Executives"), --4
        ("Human Resources"); --5

INSERT INTO employee_role (department_id, title, salary)
VALUES  (1, "Production Manager", 100000.00), --1
        (1, "Production Operator", 80000.00), --2
        (2, "Facility Coordinator", 110000.00), --3
        (2, "Laboratory Assistant", 65000.00), --4
        (2, "Junior Laboratory Assistant", 45000), --5
        (3, "QC Manager", 70000), --6
        (3, "QC Analyst", 60000), --7 
        (4, "Chief Executive Officer", 300000), --8
        (4, "Chief Financial Officer", 250000), --9
        (4, "Chief Scientific Officer", 250000), --10
        (5, "HR Coordinator", 90000), --11
        (5, "Training Manager", 90000); --12

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, "Janine", "Smith", ?),
        (2, "Chloe", "Blue", 1),
        (2, "Joe", "White", 1),
        (2, "Phillip", "Borg", 1),
        (3, "Diane", "Hanna", ?),
        (4, "Amelia", "Hooper", 5),
        (4, "Eponine", "Lyon", 5),
        (5, "Homer," "Simpson", 5),
        (6, "Michael", "Scott", ?),
        (7, "Barbara", "Streisand", 6),
        (7, "Leslie", "Knope", 6),
        (8, "Ron", "Swanson", NULL),
        (9, "Dwight", "Schrute", 8),
        (10, "Jerry", "Sienfeld", 8),
        (11, "Brad", "Pitt", 8),
        (12, "Tyler", "Durden", 11);
