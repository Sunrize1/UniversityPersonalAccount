import { StudentProfile } from "../../types/api/studentEmployeeDataResponse";
import { api } from "../instance";

export function getStudent() {
   return api.get<StudentProfile>('Profile/student');
}