/* importar modulos */
import { DataTypes } from "sequelize";
import db from '../../config/connect.js';
/* Primero recibe el nombre de la tabla */
export const Student = db.define('Student', {
    /* Recibe un objeto, los atributos del modelo */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    legajo: {
        type: DataTypes.INTEGER,
    },
}, {
    /* tercer parametro del objeto */
    timestamps: false /* no coloca los createDate y updateDate */
});