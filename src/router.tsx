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
import { ProtectedRoute } from './components/common/ProtectedRoute/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { NotFoundPage } from './pages/Error/404/404';
import { ServerErrorPage } from './pages/Error/500/500';
import { Admin } from './pages/Admin/Admin';
import { AdminUsers } from './pages/Admin/Users/AdminUsers';
import { UserDetails } from './pages/Admin/Users/UserDetails/UserDetails';
import { UsefulServices } from './pages/Admin/UsefulServices/UsefulServices';
import { EventsForAdmin } from './pages/Admin/Events/EventsForAdmin';
import { EventDetailsForAdmin } from './pages/Admin/Events/EventDetails/EventDetailsForAdmin';

export const AppRouter = () => {
  const language = useAppSelector(state => state.user.language);
  const locale = language === LanguageEnum.RUSSIAN ? LOCALES.RUSSIAN : LOCALES.ENGLISH;
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isErrorPage = location.pathname === '/500' || 
                     !(['/login', '/events', '/profile', '/certificates', '/usefulservices', '/admin', '/admin/users'].some(path => 
                       location.pathname === path || location.pathname.startsWith(path + '/')));

  const shouldSidebarRender = (isAuthenticated && !(location.pathname === '/login') && !isErrorPage)

  const getPageTitle = (pathname: string) => {
    if (pathname.startsWith('/events/')) {
      return '/events';
    }
    if(pathname.startsWith('/admin')) {
      return '/admin'
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
      active: location.pathname === '/admin' || location.pathname.startsWith('/admin/'),
    },
    {
      id: 'certificates',
      label: '/certificates',
      basicIcon: <BlackCertificateIcon />,
      activeIcon: <BlueCertificateIcon />,
      active: location.pathname === '/certificates',
    },
    {
      id: 'usefulservices',
      label: '/usefulservices',
      basicIcon: <BlackLinkIcon />,
      activeIcon: <BlueLinkIcon />,
      active: location.pathname === '/usefulservices',
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
    <IntlProvider locale={locale} messages={messages[locale] as Record<string, string>} defaultLocale={LOCALES.RUSSIAN}>
      <div className={styles.appContainer}>
        {shouldSidebarRender && <Sidebar menuItems={menuItems} />}
        <main className={styles.mainContent}>
          {!isErrorPage && <Header title={getPageTitle(location.pathname)}></Header>}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/certificates" element={
              <ProtectedRoute>
                <CertificateOrder />
              </ProtectedRoute>
            } />
            <Route path="/usefulservices" element={
              <ProtectedRoute>
                <Links />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/users/:id" element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            } />
            <Route path='/admin/usefulservices' element={
              <ProtectedRoute>
                <UsefulServices/>
              </ProtectedRoute>
            }/>
            <Route path='/admin/events' element={
              <ProtectedRoute>
               <EventsForAdmin/>
              </ProtectedRoute>
            }/>
            <Route path='/admin/events/:id' element={
              <ProtectedRoute>
               <EventDetailsForAdmin/>
              </ProtectedRoute>
            }/>
            
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
            
          </Routes>
          <NotificationPopup />
        </main>
      </div>
    </IntlProvider>
  );
};