import {Routes, Route} from 'react-router-dom';
import { LanguageEnum } from "./types/redux/LanguageEnum";
import { useAppSelector } from "./store/hooks";
import { LOCALES } from "./i18n/locales";
import { IntlProvider } from "react-intl";
import { NotificationPopup } from "./components/common/NotificationPopup/NotificationPopup";
import { LanguageSwitch } from "./components/common/LanguageSwitch/LanguageSwitch";
import { messages } from "./i18n/messages";
import { Login } from './pages/Login/Login';

export const AppRouter = () =>  {
    const language = useAppSelector(state => state.language.language);
    const locale = language === LanguageEnum.RUSSIAN ? LOCALES.RUSSIAN : LOCALES.ENGLISH;
    return (
        <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={LOCALES.RUSSIAN}>
            <LanguageSwitch />
            <NotificationPopup />
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </IntlProvider>
    );
}

