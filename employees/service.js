const employeeMap = {};

function findByName(name, surname) {

    let result_employee_array = [];

    for (let employee of EMPLOYEES_DATA.employees) {
        if ((!name || employee.name === name) && (!surname || employee.surname === surname)) {
            result_employee_array.push(employee);
        }
    }

    return result_employee_array;
}

function addEmployee(name, surname) {
    if (!name || name.length == 0 || !surname || surname.length == 0) {
        throw new Error("empty name or surname");
    }
    else {
        let max_id = 0;
        for (let employee of EMPLOYEES_DATA.employees) {
            if (employee.id > max_id) {
                max_id = employee.id;
            }
        }
        EMPLOYEES_DATA.employees.push({ id: max_id + 1, name, surname });
        return max_id + 1;
    }
}

function deleteEmployee(id) {
    let indexToDelete = 0;
    for (let employee of EMPLOYEES_DATA.employees) {
        if (employee.id === id) {
            EMPLOYEES_DATA.employees.splice(indexToDelete, 1);
            break;
        }
        indexToDelete++;
    }
}

function showEmployee(employee) {
    const keys = Object.keys(employee);
    console.log("Employee info: " + employee["name"] + ":");
    for (let key of keys) {
        console.log(key + "=" + employee[key]);
    }
}

function showAllEmployees() {
    for (let employee of EMPLOYEES_DATA.employees) {
        showEmployee(employee)
    }
}

function alternativeMethodToShowAllEmployees() {
    EMPLOYEES_DATA.employees.forEach(showEmployee);
}

function findById(id) {
    if (employeeMap[id]) {
        return employeeMap[id];
    }

    for (let employee of EMPLOYEES_DATA.employees) {
        if (employee.id == id) {
            employeeMap[id] = employee;
            return employee;
        }
    }
}

function addPhone(id, phoneNumber) {
    const employee = findById(id);
    if (!employee.phones) {
        employee.phones = [];
    }
    employee.phones.push(phoneNumber);
}

function setDateOfBirth(id, date) {
    const employee = findById(id);
    employee.dateOfBirth = new Date(date);
}

function getAge(id) {
    const employee = findById(id);
    let ageDiff = Date.now() - employee.dateOfBirth.getTime();
    let ageDate = new Date(ageDiff);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatDate(date) {
    let day = date.getDate();
    if (day < 10) day = '0' + day;
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let year = date.getFullYear();

    return day + '.' + month + '.' + year;
}

function getEmployeeInfo(id) {
    const employee = findById(id);
    const phones = employee.phones ?
        `Phone numbers: ${employee.phones}` : 'No number';
    const age = employee.dateOfBirth ?
        `Age: ${getAge(employee.id)}` : 'No age';
    const birtday = employee.dateOfBirth ?
        `Birthday: ${formatDate(employee.dateOfBirth)}` : 'No birthday';
    return ` 
     Name: ${employee.name}
     Surname: ${employee.surname}
     ${birtday}
     ${phones} 
     ${age}
    `;
}

function testEmployee() {
    let employeeName = 'TestName';
    let employeeSurname = 'TestSurname';
    addEmployee(employeeName, employeeSurname);
    let existingEmployee = findByName(employeeName);
    for (let i_empl of existingEmployee) {
        addPhone(i_empl.id, "666-66-66 " + i_empl.id);
        setDateOfBirth(i_empl.id, '2000, 1, 1');
        const info = getEmployeeInfo(i_empl.id);
        console.log(info);
    }
}

function getEmployeeJSON(id) {
    const employee = findById(id);
    return JSON.stringify(employee);
}

function setEmployeeManager(id, managerId) {
    const employee = findById(id);
    employee.managerRef = managerId;
}

function searchEmployees(name, surname, managerRef) {
    let result = [];
    for (let e of EMPLOYEES_DATA.employees) {
        if ((!name || e.name == name) &&
            (!surname || e.surname == surname) &&
            (!managerRef || e.managerRef == managerRef)) {
            result.push(e);
        }
    }
    return result;
}
