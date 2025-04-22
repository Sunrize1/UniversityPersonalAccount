import { EmployeeProfile} from "../../types/api/studentEmployeeDataResponse";
import { api } from "../instance";

export function getEmployee() {
    return api.get<EmployeeProfile>('Profile/employee');
}