import { SidebarProps } from '../../../types/components/common/SidebarProps';
import ToggleSidebarIcon from '../../../assets/icons/Icon/Icon/Menu/red/toggleSidebar.svg?react';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { API_BASE_URL } from '../../../api/instance';
import { setIsSidebarHidden, toggleIsSidebarActive } from '../../../store/UISlice/UISlice';
import { FormattedMessage } from 'react-intl';
import { Spinner } from '../../UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../Logout/Logout';


export const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const dispatch = useAppDispatch();
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const isSidebarHidden = useAppSelector(state => state.UISlice.isSidebarHidden);
  const isSidebarActive = useAppSelector(State => State.UISlice.isSidebarActive);
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(state => state.user.user)
  const navigate = useNavigate();
  const avatarUrl = user?.avatar?.id ? `${API_BASE_URL}/files/${user.avatar.id}` : null;
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsLogoutMenuOpen(false);
      }
    };

    if (isLogoutMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLogoutMenuOpen]);

  const handleAvatarLoad = () => {
    setIsAvatarLoading(false);
  };

  const handleAvatarClick = () => {
    setIsLogoutMenuOpen(!isLogoutMenuOpen);
  }

  useEffect(() => {
    const handleResize = () => {
      const shouldHide = window.innerWidth < 1200;
      dispatch(setIsSidebarHidden(shouldHide));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const sidebarClasses = [
    (isSidebarHidden && !isSidebarActive) ? styles.rootFixedHidden : '',
    isOpen ? styles.rootOpen : styles.rootClosed,
    isSidebarActive ? styles.rootFixed : styles.root
  ].filter(Boolean).join(' ')

  const handleNavigateClick = (path: string) => {
    if(isSidebarActive) {
      dispatch(toggleIsSidebarActive());
    }
    handleNavigation(path);
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  }

  return (
    <div 
      className={sidebarClasses}
    >
      <div className={styles.avatarContainer} ref={containerRef}>
      {avatarUrl ? (
         <>
         {isAvatarLoading && <Spinner />}
         <img
           className={styles.avatar}
           src={avatarUrl}
           alt='avatar'
           onClick={() => isAvatarLoading ? null : handleAvatarClick()}
           onLoad={handleAvatarLoad}
           style={{ opacity: isAvatarLoading ? 0 : 1 }}
           loading="lazy"
         />
       </>
        ) : (
         <div className={styles.avatar} />
        )}
        {isLogoutMenuOpen && <Logout />}
      </div>

      <div className={styles.menuContainer}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNavigateClick(item.label)}
            className={`${styles.menuItem} ${!isOpen ? styles.menuItemClosed : ''} ${item.active ? styles.active : ''}`}
          >
            <div className={styles.icon}>
              <div className={`${styles.vector} ${item.active ? styles.vectorActive : ''}`}>
                {item.active ? item.activeIcon : item.basicIcon}
              </div>
            </div>
            {isOpen && (
              <span className={styles.label}>
                <FormattedMessage id={item.label} />
              </span>
            )}
          </div>
        ))}
      </div>

      <div 
        className={styles.toggleButton}
        onClick={toggleSidebar}
      >
        <div 
        className={styles.toggleIcon}
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <ToggleSidebarIcon />
        </div>
      </div>
    </div>
  );
};