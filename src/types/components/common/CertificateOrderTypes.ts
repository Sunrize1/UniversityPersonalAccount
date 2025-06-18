import { EmployeeProfile, StudentProfile } from "../../api/studentEmployeeDataResponse";
import { UserType } from "../../api/profileResponse";

export interface TabInfoData {
  id: string;
  institute: string;
  level: string;
  status: string;
  faculty: string;
  direction: string;
  group: string;
}

export interface CertificateOrderProps {
  studentData?: StudentProfile;
  employeeData?: EmployeeProfile;
  tabsData: TabInfoData[];
  userType: UserType | null;
  onClose: () => void;
}

export interface CertificateOrderFormData {
  certificateType: string;
  receiveType: string;
} 