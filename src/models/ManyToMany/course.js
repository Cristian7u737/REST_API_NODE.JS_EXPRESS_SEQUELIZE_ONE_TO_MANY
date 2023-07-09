/* importar modulos */
import { DataTypes } from "sequelize";
import db from '../../config/connect.js';
/* Primero recibe el nombre de la tabla */
export const Course = db.define('Course', {
    /* Recibe un objeto, los atributos del modelo */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    teacher: {
        type: DataTypes.STRING,
    },
}, {
    /* tercer parametro del objeto */
    timestamps: false /* no coloca los createDate y updateDate */
});