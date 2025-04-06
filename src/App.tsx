import { Provider } from "react-redux";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import {store} from './store/store'
import { AppRouter } from "./router";
import { NotificationPopup } from "./components/common/NotificationPopup/NotificationPopup";

export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter />
            <NotificationPopup />
        </BrowserRouter>
    </Provider>
  );