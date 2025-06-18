import { FormProvider, useForm } from 'react-hook-form';
import { RolePicker } from '../RolePicker/RolePicker';
import { Select } from '../../UI/Select/Select';
import styles from './RoleSelector.module.css';

interface RoleOption {
  id: string;
  label: string;
  value: string;
}

interface RoleSelectorProps {
  options: RoleOption[];
  selectedRole: string;
  onRoleChange: (roleId: string) => void;
  hasMultipleRoles: boolean;
}

export const RoleSelector = ({ 
  options, 
  selectedRole, 
  onRoleChange, 
  hasMultipleRoles 
}: RoleSelectorProps) => {
  const methods = useForm({
    defaultValues: {
      role: selectedRole
    }
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRoleChange(event.target.value);
  };

  if (!hasMultipleRoles) {
    return null;
  }

  return (
    <>
      <RolePicker 
        options={options} 
        className={styles.rolePicker}
        onRoleChange={onRoleChange}
        selectedRole={selectedRole}
      />
      
      <FormProvider {...methods}>
        <div className={styles.roleSelector}>
          <Select
            name="role"
            placeholder="selectRolePlaceholder"
            options={options}
            onChange={handleSelectChange}
          />
        </div>
      </FormProvider>
    </>
  );
}; 