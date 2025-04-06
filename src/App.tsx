import { Provider } from "react-redux";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import {store} from './store/store'
import { AppRouter } from "./router";

export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </Provider>
  );