/* importar el controlador de company  */
import { findAllCompanies, findCompanyById, findCompanyByIdFromEmployees, createCompany, updateCompanyById, deleteCompanyById } from "../controllers/companies.controller.js";
/* importar express */
import express from 'express';
/* Crear el enrutador */
const routerCompany = express.Router();

routerCompany.get( "/company/:id", findCompanyById );
routerCompany.get( "/companies/", findAllCompanies );
routerCompany.get( "/companies/:id/employes", findCompanyByIdFromEmployees );
routerCompany.post( "/company/create/", createCompany );
routerCompany.put( "/company/update/:id", updateCompanyById );
routerCompany.delete( "/company/delete/:id", deleteCompanyById );

export default routerCompany;