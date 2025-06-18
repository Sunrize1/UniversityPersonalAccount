import { useState, useEffect } from 'react';
import { EmployeeProfile, StudentProfile } from '../types/api/studentEmployeeDataResponse';
import { UserType } from '../types/api/profileResponse';
import { getStudent } from '../api/requests/getStudent';
import { getEmployee } from '../api/requests/getEmployee';
import { useAppDispatch } from '../store/hooks';
import { showNotification } from '../utils/notification';
import { NotificationTypeEnum } from '../types/redux/NotificationTypeEnum';

interface UseProfileDataProps {
  hasStudentRole: boolean;
  hasEmployeeRole: boolean;
}

export const useProfileData = ({ hasStudentRole, hasEmployeeRole }: UseProfileDataProps) => {
  const dispatch = useAppDispatch();
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [employeeProfile, setEmployeeProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedRoles, setLoadedRoles] = useState<Set<UserType>>(new Set());

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      const rolesToLoad: UserType[] = [];
      
      if (hasStudentRole && !loadedRoles.has(UserType.Student)) {
        rolesToLoad.push(UserType.Student);
      }
      if (hasEmployeeRole && !loadedRoles.has(UserType.Employee)) {
        rolesToLoad.push(UserType.Employee);
      }

      if (rolesToLoad.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const promises = [];
        
        if (rolesToLoad.includes(UserType.Student)) {
          promises.push(
            getStudent().then(response => {
              setStudentProfile(response.data);
              setLoadedRoles(prev => new Set([...prev, UserType.Student]));
            })
          );
        }
        
        if (rolesToLoad.includes(UserType.Employee)) {
          promises.push(
            getEmployee().then(response => {
              setEmployeeProfile(response.data);
              setLoadedRoles(prev => new Set([...prev, UserType.Employee]));
            })
          );
        }

        await Promise.all(promises);
      } catch (error) {
        showNotification(dispatch, 'Ошибка загрузки данных', NotificationTypeEnum.ERROR, 5000);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [hasStudentRole, hasEmployeeRole, loadedRoles, dispatch]);

  return {
    studentProfile,
    employeeProfile,
    isLoading
  };
}; 