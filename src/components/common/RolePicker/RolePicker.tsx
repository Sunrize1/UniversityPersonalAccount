import React, { useState } from 'react';
import styles from './RolePicker.module.css';
import typography from '../../../styles/typography.module.css';
import { RolePickerProps } from '../../../types/components/common/RolePickerProps';
import { FormattedMessage } from 'react-intl';

export const RolePicker: React.FC<RolePickerProps> = ({
  options,
  selectedRole,
  onRoleChange,
  className
}) => {
  const [activeRole, setActiveRole] = useState<string>(selectedRole || options[0]?.id || '');

  const handleRoleClick = (roleId: string) => {
    setActiveRole(roleId);
    onRoleChange?.(roleId);
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.budget}>
        <div className={styles.frame}>
          {options.map((option, index) => (
            <React.Fragment key={option.id}>
              <div 
                className={`${styles.menuItem} ${activeRole === option.id ? styles.menuItemActive : ''}`}
                onClick={() => handleRoleClick(option.id)}
              >
                <div className={styles.stateLayer}>
                  <div className={styles.content}>
                    <div className={styles.labelContainer}>
                      <span 
                        className={`${styles.labelText} ${typography.p1} ${activeRole === option.id ? styles.labelTextActive : ''}`}
                      >
                        <FormattedMessage id={option.label} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {index < options.length - 1 && (
                <div className={styles.separator} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
