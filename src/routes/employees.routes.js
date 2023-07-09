/* importar el controlador de employee  */
import { findAllEmployees, findEmployeeById, createEmployee, updateEmployeeById, deleteEmployee } from "../controllers/employees.controller.js";
/* importar express */
import express from 'express';
/* Crear el enrutador */
const routerEmployee = express.Router();

routerEmployee.get( "/employee/:id", findEmployeeById )
routerEmployee.get( "/employees/", findAllEmployees )
routerEmployee.post( "/create/employee/:id", createEmployee )
routerEmployee.put( "/employee/update/:id", updateEmployeeById )
routerEmployee.delete( "/employee/delete/:id", deleteEmployee )

export default routerEmployee;