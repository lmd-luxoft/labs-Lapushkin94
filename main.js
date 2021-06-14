import { runUI, addEmployeeUI, openTab, searchEmployeeUI } from './employees/ui';
import './style.css';

if (module.hot) { 
    module.hot.accept(); 
}

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
runUI();