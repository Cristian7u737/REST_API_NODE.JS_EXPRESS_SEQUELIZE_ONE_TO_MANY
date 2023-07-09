/* importar modulos */
import { DataTypes } from "sequelize";
import db from '../config/connect.js';
/* Primero recibe el nombre de la tabla */
export const Employee = db.define('Employee', {
    /* Recibe un objeto, los atributos del modelo */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'empleado'
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    /* tercer parametro del objeto */
    timestamps: false /* no coloca los createDate y updateDate */
});


