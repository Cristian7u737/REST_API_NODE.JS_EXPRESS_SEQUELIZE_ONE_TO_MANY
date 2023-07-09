/* importar modelo Company */
import { Company } from '../models/company.model.js';
/* importar el modelo employee */
import { Employee } from '../models/employee.model.js';

/* Encontrar todas las compañias que hayan */
export const findAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll(); /* busca todos los registros */
        res.json(companies); /* la respuesta es lo que encontro companies en un objeto json */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};


/* Encontrar una compañia apartir de un ID */
export const findCompanyById = async (req, res) => {
    const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
    const company = await Company.findOne({ where: { id } }); /* recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL */
    if (!company) { /* evalua si el id de company es diferente / osea que no lo encuentra registrado*/
        return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
            mensaje: `No existe el company con el ID:${id}.` /* manda un mensaje acerca de la company que no se encontro con el id */
        });
    }
    res.json(company); /* responde la solicitud en formato JSON de lo que se almaceno en company */
};

/* Encontrar una compañia apartir de un ID y sus employees que esten relacionados a ese ID */
export const findCompanyByIdFromEmployees = async (req, res) => {
    const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
    const company = await Company.findOne({ where: { id }, include: { model: Employee, attributes: ['firstName', 'lastName'] } }); /* busca en Company por id e incluye el modelo Employee para traerselos si esta ligado a ese ID del company*/
    if (!company) { /* evalua si el id de company es diferente / osea que no lo encuentra registrado*/
        return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
            mensaje: `No existe el company con el ID:${id} y no tiene algun employee ligado a este.` /* manda un mensaje acerca del company que no se encontro con el id */
        });
    }
    res.json(company); /* responde la solicitud en formato JSON de lo que se almaceno en company */
};

/* Crear una compañia*/
export const createCompany = async (req, res) => {
    const { name, description } = req.body; /* desestructurar el json del body */
    try {
        const existsName = await Company.findOne({ where: { name } }); /* busca dentro de company si el name estara repetido */
        if (existsName) { /* verifica si el nombre de la company esta repetido o no */
            res.json({ mensaje: `La company con el name : ${name} ya existe.` }) /* si esta repetido se lo indica */
        } else { /* en caso de que no lo crea */
            const newCompany = await Company.create({ name, description }); /* Crea el companie apartir del name y description*/
            res.status(201).json(newCompany); /* responde la solicitud con lo que creo en newCompany */
        }
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Actualizar una compañia*/
export const updateCompanyById = async (req, res) => {
    try {
        const { name } = req.body; /* desestructura el objeto json para obtener el parametro name apartir de req */
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const company = await Company.findOne({ where: { id } }); /* busca en Company por id para actualizarlo despues*/
        const existsName = await Company.findOne({ where: { name } }); /* busca dentro de company si el name estara repetido */
        if (!company) { /* si el id de company es diferente */
            return res.status(404).json({ /* retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado. */
                mensaje: `No existe la company con el ID: ${id}.` /* manda un mensaje acerca de la company que no se encontro con el id */
            }); /* evalua si el name es diferente de la company / osea que no lo encuentra registrado*/
        } else if (existsName) { /* verifica si el nombre de la company esta repetido o no */
            return res.json({ mensaje: `La company con el name : ${name} ya existe, renombre la compañia con otro nombre.` }) /* si esta repetido se lo indica */
        }
        company.set(req.body);/* actualiza los datos mediante set */
        await company.save(); /* guardar en memoria los datos  */
        res.status(202).json(company); /* responde con un objeto json que contiene la información actualizada del company */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* Eliminar una compañia apartir de su id*/
export const deleteCompanyById = async (req, res) => {
    try {
        const { id } = req.params; /* desestructura el objeto json para obtener el parametro id apartir de req */
        const company = await Company.destroy({ where: { id } }); /* elimina un company apartir de un id */
        if (!company) { /* evalua si el id de company es diferente / osea que no lo encuentra registrado*/
            return res.status(404).json({
                mensaje: `No existe la company con el id : ${id}.`
            });
        }
        res.json({ mensaje: `Se ha eliminado la company con el id : ${id} .` }) /* si esta repetido se lo indica */
        res.status(204).end(); /* status: ya no hay nada con 204 */
    } catch (error) {
        res.status(500).json([{ error: error.message }]);
    }
};

/* exporta por default para ser usado en otro*/
