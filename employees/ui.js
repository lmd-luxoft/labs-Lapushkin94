const PLACEHOLDER = 'employeesPlaceholder';

function runUI() {
    showEmployees(EMPLOYEES_DATA.employees);
    fillSelect(document.getElementById("managerSelect"), getEmployeesOptions());
    fillSelect(document.getElementById("managerSearch"), getEmployeesOptions());
    document.getElementById("searchButton").click();
}

function clearEmployeesPlaceholder() {
    document.getElementById(PLACEHOLDER).innerHTML = "";
}

function showEmployees(employees) {
    clearEmployeesPlaceholder();
    const ul = document.createElement("ul");


    for (let employee of employees) {
        const li = document.createElement("li");
        ul.appendChild(li);

        const managerSpan = document.createElement("span");
        const managerSelect = document.createElement("select");

        let managerHTML = "";
        let manager = findById(employee.managerRef);
        fillSelect(managerSelect, getEmployeesOptions(), employee.managerRef);
        managerSelect.addEventListener('change', () => employee.managerRef = managerSelect.value);
        managerSpan.innerHTML = " <b>Manager:</b> ";

        li.innerHTML = employee.name + " " + employee.surname;
        li.appendChild(managerSpan);
        li.appendChild(managerSelect);

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Delete";
        removeButton.addEventListener('click', () => removeEmployeeUI(employee.id));
        li.appendChild(removeButton);
    }
    document.getElementById(PLACEHOLDER).appendChild(ul);
}

function removeEmployeeUI(id) {
    deleteEmployee(id);
    showEmployees(EMPLOYEES_DATA.employees);
}

function addEmployeeUI() {
    let errorHTML = "";
    const name = document.getElementById("name").value;
    if (name == "") {
        errorHTML += "- Name cant be null<br>";
        document.getElementById("name").style.backgroundColor = '#FFEEEE';
    }
    const surname = document.getElementById("surname").value;
    if (surname == "") {
        errorHTML += "- Surname cant be null<br>";
        document.getElementById("surname").style.backgroundColor = '#FFEEEE';
    }
    document.getElementById("addEmployeeFormErrorMessage").innerHTML = errorHTML;
    if (errorHTML.length != 0) return;

    const id = addEmployee(name, surname);
    const managerId = document.getElementById("managerSelect").value;
    setEmployeeManager(id, managerId);

    showEmployees(EMPLOYEES_DATA.employees);
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
}

function fillSelect(select, values, selectedValue) {

    const defaultOption = document.createElement("option");
    defaultOption.text = "No manager";
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    for (let val of values) {
        const option = document.createElement("option");
        option.text = val.text;
        option.value = val.value;
        if (selectedValue == option.value) {
            option.selected = true;
            defaultOption.selected = false;
        }
        select.appendChild(option);
    }
}

function getEmployeesOptions() {
    let options = [];
    for (let e of EMPLOYEES_DATA.employees) {
        options.push({ text: e.name + " " + e.surname, value: e.id })
    }
    return options;
}

function searchEmployeeUI() {
    const name = document.getElementById("nameSearch").value;
    const surname = document.getElementById("surnameSearch").value;
    let managerRef = document.getElementById("managerSearch").value;
    if (managerRef == "No manager") {
        managerRef = "";
    }

    const employees = searchEmployees(name, surname, managerRef);
    showEmployees(employees);
}

function openTab(event, id) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    document.getElementById(id).style.display = "block";
    event.currentTarget.className += "active";
}