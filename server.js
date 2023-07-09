/* importar modulos */
import express from 'express'
/* importar conexion */
import  db  from './src/config/connect.js';
/* Importar los routers */
import companiesRouter from './src/routes/companies.routes.js';
import employeesRouter from './src/routes/employees.routes.js';
/* ManyToMany */
/* import "./src/models/ManyToMany/studentCourses.js" */
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

app.use(companiesRouter); /* para poder usar las rutas */
app.use(employeesRouter); 

/* Middleware */
/* analizar solicitudes de tipo de contenido - application/json */
app.use(express.json());
/* analizar solicitudes de tipo de contenido - application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

/* Conexión a DB */
try {
    await db.authenticate(); /* se utiliza para conectarse con la base de datos y comprueba si las credenciales proporcionadas son correctas */
    console.log('-> DB connected <-');
} catch (error) {
    console.log(error);
}
/* declaración del puerto */
const PORT = process.env.PORT || 3000;
/* el servidor escucha */
app.listen(PORT, () => console.log(`Servidor corriendo en http//localhost:${PORT}`))

/* 
SEQUELIZE.

¿Qué es?

Sequelize es el principal ORM para Node.js que es compatible con prácticamente todas las bases de datos relacionales.

¿Qué es un ORM?

El pricipal objetivo de un ORM (Object-Relational mapping) es facilitar la comunicación entre un lenguaje de programación y una base de datos, gracias a esto se ve cómo resultado una aceleración y simplificación en el desarrollo de apps.


*/
 