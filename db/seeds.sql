INSERT INTO
  departments (name)
VALUES
  ("Accounting"),
  ("Legal"),
  ("Customer Service"),
  ("Tech"),
  ("Sales");
INSERT INTO
  roles (title, salary, department_id)
VALUES
  ('Accounting Manager', 100000, 1),
  ('Accountant', 55000, 1),
  ('Legal Manager', 120000, 2),
  ('Lawyer', 80000, 2),
  ('Service Representative', 40000, 3),
  ('Service Manager', 70000, 3),
  ('Chief Technology Officer', 140000, 4),
  ('Sales Representative', 70000, 5),
  ('Sales Lead', 120000, 5);
INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Billy', 'Blanks', 1, null),
  ('Randy', 'Savage', 2, 1),
  ('Kevin', 'Nash', 3, null),
  ('Rey', 'Mysterio', 4, 3),
  ('Fred', 'Astair', 5, 6),
  ('George', 'Kelly', 6, null),
  ('Jesus', 'Rosa', 7, null),
  ('Mary', 'Smith', 8, 9),
  ('Edgar', 'Martinez', 9, null);