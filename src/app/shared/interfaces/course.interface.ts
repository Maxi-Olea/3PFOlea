import { Student } from "./student.interface";

export interface Courses {
    id: number;
    course: string;
    professor?: string;
    email?: string;
    students?: Student[];
}