/* importar modulos */
import { DataTypes } from 'sequelize';
/* importar la conexión de DB */
import { sequelize } from '../../database/connect.js';
/* importar el modelo document para relacionar tablas */
import { Document } from './document.js';

/* Primero recibe el nombre de la tabla */
export const Person = sequelize.define('Person', {
    /* Recibe un objeto, los atributos del modelo */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
},
    {
        timestamps: false
    }
);

/* relacionar tablas */
Person.hasOne(Document, { /* una persona tiene un documento */
    foreignKey: 'personId', /* tiene como llave primaria la personId */
    sourceKey: 'id'
});

Document.belongsTo(Person, { /* Un documento pertenece a una persona */
    foreignKey: 'personId', /* tiene como llave primaria la personId */
    targetKey: 'id'
});

/* await Person.sync();
await Document.sync(); */