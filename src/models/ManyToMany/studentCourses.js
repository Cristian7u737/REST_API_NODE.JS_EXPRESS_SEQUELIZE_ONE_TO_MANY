/* importar modulos */
import { DataTypes } from "sequelize";
import db from '../../config/connect.js';
/* importar los modelos de course student */
import { Course } from "./course.js";
import { Student } from "./student.js";
/* Primero recibe el nombre de la tabla */
export const studentCourses = db.define('studentCourses', {
    /* Recibe un objeto, los atributos del modelo */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
}, {
    /* tercer parametro del objeto */
    timestamps: false /* no coloca los createDate y updateDate */
});
/* Relación ManyToMany */
Student.belongsToMany(Course, { /* Un estudiante pertenece a muchos cursos */
    through: studentCourses
});

Course.belongsToMany(Student, { /* Un curso pertence a muchos estudiantes */
    through: studentCourses 
});
/* sincronizar modelos */
/* await Student.sync();
await Course.sync();
await studentCourses.sync(); */
