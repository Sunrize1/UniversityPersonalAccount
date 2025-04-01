import { Provider } from "react-redux";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { AppRouter } from "./router";

export const App = () => (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
  );