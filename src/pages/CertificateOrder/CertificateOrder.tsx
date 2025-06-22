import { Container } from "../../components/UI/Container/Container";
import { Breadcrumbs } from "../../components/common/Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from "react";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { CertificateOrderInfo } from "../../components/common/CertificateOrder/CertificateOrderInfo";
import { RoleSelector } from "../../components/common/RoleSelector/RoleSelector";
import styles from "./CertificateOrder.module.css";
import { UserType } from "../../types/api/profileResponse";
import { Spinner } from "../../components/UI/Spinner/Spinner";
import { useRoleManagement } from "../../hooks/useRoleManagement";
import { useProfileData } from "../../hooks/useProfileData";
import { mapEducationToTabInfo, mapPostToTabInfo } from "../../utils/dataMappers";

export const CertificateOrder = () => {
  const { setBreadcrumbItems } = useBreadcrumbs();
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  
  const { selectedRole, roleInfo, roleOptions, handleRoleChange, getSelectedRoleString } = useRoleManagement();
  const { studentProfile, employeeProfile, isLoading } = useProfileData({
    hasStudentRole: roleInfo.hasStudentRole,
    hasEmployeeRole: roleInfo.hasEmployeeRole
  });

  useEffect(() => {
    setBreadcrumbItems([
      {
        id: "home",
        label: "Главная",
        path: "/events"
      },
      {
        id: "certificates",
        label: "Справки",
        path: "/certificates"
      }
    ]);
  }, [setBreadcrumbItems]);

  const getInfoComponentProps = () => {
    if (selectedRole === UserType.Student && studentProfile) {
      return {
        userType: selectedRole,
        studentData: studentProfile,
        employeeData: undefined,
        tabsData: studentProfile.educationEntries.map(mapEducationToTabInfo)
      };
    } else if (selectedRole === UserType.Employee && employeeProfile) {
      return {
        userType: selectedRole,
        studentData: undefined,
        employeeData: employeeProfile,
        tabsData: employeeProfile.posts.map(mapPostToTabInfo)
      };
    }
    return {
      userType: selectedRole,
      studentData: undefined,
      employeeData: undefined,
      tabsData: []
    };
  };

  const infoProps = getInfoComponentProps();
  const hasRequiredData = selectedRole === UserType.Student ? !!studentProfile : !!employeeProfile;
  const shouldShowInfo = selectedRole && isInfoOpen && hasRequiredData && !isLoading;
  
  return (
    <Container>
      <Breadcrumbs />
      <div className={styles.certificateOrder}>
        <RoleSelector
          options={roleOptions}
          selectedRole={getSelectedRoleString()}
          onRoleChange={handleRoleChange}
          hasMultipleRoles={roleInfo.hasMultipleRoles}
        />
        
        {isLoading && (
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        )}
        
        {shouldShowInfo && (
          <div 
            className={`${styles.infoContainer}`}
            key={selectedRole} 
          >
            <CertificateOrderInfo 
              {...infoProps}
              onClose={() => setIsInfoOpen(false)} 
            />
          </div>
        )}
      </div>
    </Container>
  );
};
