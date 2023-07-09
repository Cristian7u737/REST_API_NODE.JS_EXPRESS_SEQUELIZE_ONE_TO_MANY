/* importar modulos */
import { DataTypes } from "sequelize";
import db from '../config/connect.js';
import { Employee } from "./employee.model.js";
/* Primero recibe el nombre de la tabla */
export const Company = db.define('Company', {
    /* Recibe un objeto, los atributos del modelo */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    /* tercer parametro del objeto */
    timestamps: false /* no coloca los createDate y updateDate */
});

/* Relacionar las tablas ONE TO MANY*/
Company.hasMany(Employee, { /* una compañia puede tener muchos empleados */
    foreignKey: 'companyId',
    sourceKey: 'id'
});

Employee.belongsTo(Company, {/* Un empleado pertenece a una compañia */
    foreignKey: 'companyId',
    targetKey: 'id' /* clave a la que tienden a ser obejtivo que seria la de company */
});

/* Para hacer que se SINCRONICE con la DB */ 
await Company.sync();
await Employee.sync();

