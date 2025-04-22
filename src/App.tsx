import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {store} from './store/store'
import { AppRouter } from "./router";



export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </Provider>
  );