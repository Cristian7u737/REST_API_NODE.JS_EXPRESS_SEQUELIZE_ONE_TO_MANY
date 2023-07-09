/* importar modelo Employee */
import { Employee } from '../models/employee.model.js';
/* importar modelo Company */
import { Company } from "../models/company.model.js";

/* Encontrar todas los empleados que hayan */
export const findAllEmployees = async (req, res) => {
    try {
        const employee = await Employee.findAll(); /* busca todos los registros */
        res.json(employee); /* la respuesta es lo que encontro employees en un objeto json */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Encontrar un empleado apartir de un ID */
export const findEmployeeById = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const employee = await Employee.findOne({ where: { id } }); /* recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL */
        if (!employee) { /* evalua si el id de employee es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No existe el employee con el id : ${id}.` /* manda un mensaje acerca del employee que no se encontro con el id */
            });
        }
        res.json(employee); /* la respuesta es lo que encontro employees en un objeto json */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Crear un empleado apartir del id del company*/
export const createEmployee = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const { firstName, lastName, role, active, companyId } = req.body; /* desestructura el objeto json para obtener los parametros firstName, lastName, role, active, companyId apartir de req */
        const company = await Company.findOne({ where: { id } }); /* busca en Company por id para actualizarlo despues*/
        if (!company) { /* evalua si el id de company es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No se puede crear el employee porque no existe el company con el id : ${id}.` /* manda un mensaje acerca de la company que no se encontro con el id */
            });
        }
        const newEmployee = await Employee.create({ firstName, lastName, role, active, companyId }); /* Crea el employe apartir de los parametros que le pasamos de body*/
        res.status(201).json(newEmployee); /* responde la solicitud con lo que creo en newCompany */
    } catch (error) {
        /* res.send({message: `No se pudo crear la employees con ese id`}); */
        res.status(500).json([{ error: error.message }]);
    }
};

/* Actualizar un empleado*/
export const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const employee = await Employee.findOne({ where: { id } }); /* busca en Employee por id para actualizarlo despues*/
        if (!employee) { /* evalua si el id de employee es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No existe el employee con el id : ${id}.` /* manda un mensaje acerca del employee que no se encontro con el id */
            });
        } 
        employee.set(req.body); /* actualiza los datos mediante set */
        await employee.save(); /* guardar en memoria la tabla  */
        res.status(202).json(employee); /* responde con un objeto json que contiene la información actualizada del employees */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Eliminar un empleado*/
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const employee = await Employee.destroy({ where: { id } }); /* elimina un company apartir de un id */
        if (!employee) {
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No existe el employee con el id : ${id}.` /* manda un mensaje acerca del employee que no se encontro con el id */
            });
        }
        res.json({ mensaje: `Se ha eliminado el employee con el id : ${id} .` });
        res.status(204).end(); /* ya no hay nada con 204 */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* exporta por default para ser usado en otro*/

