import { Routes, Route, useLocation } from 'react-router-dom';
import BlackProfileIcon from './assets/icons/Icon/Icon/Menu/black/User.svg?react';
import BlackAdministratorIcon from './assets/icons/Icon/Icon/Menu/black/Administrator.svg?react';
import BlackCertificateIcon from './assets/icons/Icon/Icon/Menu/black/Certificate.svg?react';
import BlueProfileIcon from './assets/icons/Icon/Icon/Menu/red/User.svg?react';
import BlueAdministratorIcon from './assets/icons/Icon/Icon/Menu/red/Administrator.svg?react';
import BlueCertificateIcon from './assets/icons/Icon/Icon/Menu/red/Certificate.svg?react';
import BlackLinkIcon from './assets/icons/Icon/Icon/Menu/black/Link.svg?react';
import BlueLinkIcon from './assets/icons/Icon/Icon/Menu/red/Link.svg?react';
import BlackMapIcon from './assets/icons/Icon/Icon/Menu/black/Map.svg?react'
import BlueMapIcon from './assets/icons/Icon/Menu/red/Map.svg?react'
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
import { Links } from './pages/Links/Links';
import { Events } from './pages/Events/Events';
import { EventDetails } from './pages/Events/EventDetails/EventDetails';

export const AppRouter = () => {
  const language = useAppSelector(state => state.user.language);
  const locale = language === LanguageEnum.RUSSIAN ? LOCALES.RUSSIAN : LOCALES.ENGLISH;
  const location = useLocation();

  const token = useAppSelector(state => state.user.accessToken)
  const shouldSidebarRender = (token && !(location.pathname == '/login'))

  const getPageTitle = (pathname: string) => {
    if (pathname.startsWith('/events/')) {
      return '/events';
    }
    return pathname;
  };
  

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
    {
      id: 'links',
      label: '/links',
      basicIcon: <BlackLinkIcon />,
      activeIcon: <BlueLinkIcon />,
      active: location.pathname === '/links',
    },
    {
      id: 'events',
      label: '/events',
      basicIcon: <BlackMapIcon />,
      activeIcon: <BlueMapIcon />,
      active: location.pathname === '/events' || location.pathname.startsWith('/events/'),
    }
  ];

  return (
    <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={LOCALES.RUSSIAN}>
      <div className={styles.appContainer}>
        {shouldSidebarRender && <Sidebar menuItems={menuItems} />}
        <main className={styles.mainContent}>
          <Header title={getPageTitle(location.pathname)}></Header>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/certificate-order" element={<CertificateOrder />} />
            <Route path="/links" element={<Links />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
          <NotificationPopup />
        </main>
      </div>
    </IntlProvider>
  );
};