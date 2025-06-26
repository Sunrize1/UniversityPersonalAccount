import { useState, useEffect, useMemo } from 'react';
import { UserType } from '../types/api/profileResponse';
import { useAppSelector } from '../store/hooks';

export const useRoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState<UserType | null>(null);
  const user = useAppSelector((state) => state.user.user);
  const userTypes = user?.userTypes || [];

  const roleInfo = useMemo(() => {
    const hasStudentRole = userTypes.includes(UserType.Student);
    const hasEmployeeRole = userTypes.includes(UserType.Employee);
    const hasMultipleRoles = hasStudentRole && hasEmployeeRole;

    return {
      hasStudentRole,
      hasEmployeeRole,
      hasMultipleRoles
    };
  }, [userTypes]);

  const roleOptions = useMemo(() => {
    const options = [];
    if (roleInfo.hasStudentRole) {
      options.push({ id: "student", label: "student", value: "student" });
    }
    if (roleInfo.hasEmployeeRole) {
      options.push({ id: "employee", label: "employee", value: "employee" });
    }
    return options;
  }, [roleInfo]);

  useEffect(() => {
    if (!roleInfo.hasMultipleRoles) {
      if (roleInfo.hasStudentRole) {
        setSelectedRole(UserType.Student);
      } else if (roleInfo.hasEmployeeRole) {
        setSelectedRole(UserType.Employee);
      }
    } else {
      setSelectedRole(UserType.Employee);
    }
  }, [roleInfo]);

  const handleRoleChange = (roleId: string) => {
    const roleType = roleId === "student" ? UserType.Student : UserType.Employee;
    setSelectedRole(roleType);
  };

  const getSelectedRoleString = () => {
    return selectedRole === UserType.Student ? "student" : "employee";
  };

  return {
    selectedRole,
    roleInfo,
    roleOptions,
    handleRoleChange,
    getSelectedRoleString
  };
}; 