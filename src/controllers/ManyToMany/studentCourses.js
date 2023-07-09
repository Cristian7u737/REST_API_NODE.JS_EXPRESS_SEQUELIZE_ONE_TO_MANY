import { Router } from "express";
import { Course } from "../../models/ManyToMany/course";
import { Student } from "../../models/ManyToMany/student";
import '../../models/ManyToMany/studentCourses.js'
const studentCoursesRouter = Router();

studentCoursesRouter.get("students/courses", async (req,res) => {
    try {
        const student = await Student.findAll({include: {model: Course}});
        res.json(student);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

studentCoursesRouter.get("courses/students", async (req,res) => {
    try {
        const courses = await Course.findAll({include: {model: Student}});
        res.json(courses);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default studentCoursesRouter;