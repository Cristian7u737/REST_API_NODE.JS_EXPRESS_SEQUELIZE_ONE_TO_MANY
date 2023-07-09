/* importar modulos */
import { DataTypes } from 'sequelize';
/* importar la conexión de DB */
import { sequelize } from '../../database/connect.js';
/* Primero recibe el nombre de la tabla */
export const Document = sequelize.define('Document', {
    /* Recibe un objeto, los atributos del modelo */
    number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'card'
    },
},
    {
        timestamps: false
    }
);
