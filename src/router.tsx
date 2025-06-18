import { Routes, Route, useLocation } from 'react-router-dom';
import BlackProfileIcon from './assets/icons/Icon/Icon/Menu/black/User.svg?react';
import BlackAdministratorIcon from './assets/icons/Icon/Icon/Menu/black/Administrator.svg?react';
import BlackCertificateIcon from './assets/icons/Icon/Icon/Menu/black/Certificate.svg?react';
import BlueProfileIcon from './assets/icons/Icon/Icon/Menu/red/User.svg?react';
import BlueAdministratorIcon from './assets/icons/Icon/Icon/Menu/red/Administrator.svg?react';
import BlueCertificateIcon from './assets/icons/Icon/Icon/Menu/red/Certificate.svg?react';
import { LanguageEnum } from "./types/redux/LanguageEnum";
import { useAppSelector } from "./store/hooks";
import { LOCALES } from "./i18n/locales";
import { IntlProvider } from "react-intl";
import { NotificationPopup } from "./components/common/NotificationPopup/NotificationPopup";
import { messages } from "./i18n/messages";
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Sidebar } from './components/common/Sidebar/Sidebar';
import styles from './App.module.css'; 
import { Header } from './components/common/Header/Header';
import { CertificateOrder } from './pages/CertificateOrder/CertificateOrder';

export const AppRouter = () => {
  const language = useAppSelector(state => state.user.language);
  const locale = language === LanguageEnum.RUSSIAN ? LOCALES.RUSSIAN : LOCALES.ENGLISH;
  const location = useLocation();

  const token = useAppSelector(state => state.user.accessToken)
  const shouldSidebarRender = (token && !(location.pathname == '/login'))
  

  const menuItems = [
    {
      id: 'profile',
      label: '/profile',
      basicIcon: <BlackProfileIcon />,
      activeIcon: <BlueProfileIcon />,
      active: location.pathname === '/profile',
    },
    {
      id: 'admin',
      label: '/admin',
      basicIcon: <BlackAdministratorIcon />,
      activeIcon: <BlueAdministratorIcon />,
      active: location.pathname === '/admin',
    },
    {
      id: 'certificate-order',
      label: '/certificate-order',
      basicIcon: <BlackCertificateIcon />,
      activeIcon: <BlueCertificateIcon />,
      active: location.pathname === '/certificate-order',
    },
  ];

  return (
    <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={LOCALES.RUSSIAN}>
      <div className={styles.appContainer}>
        {shouldSidebarRender && <Sidebar menuItems={menuItems} />}
        <main className={styles.mainContent}>
          <Header title={location.pathname}></Header>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/certificate-order" element={<CertificateOrder />} />
          </Routes>
          <NotificationPopup />
        </main>
      </div>
    </IntlProvider>
  );
};