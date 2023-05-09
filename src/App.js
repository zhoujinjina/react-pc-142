import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import GeekLayout from "./pages/Layout";
import "./App.css";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import Article from "./pages/Article";
import { history } from "./utils/history";
import { ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";
function App() {
  return (
    <ConfigProvider locale={locale}>
      <HistoryRouter history={history}>
        <div className="app">
          <Routes>
            <Route element={<Login />} path="/login"></Route>
            <Route
              element={
                <AuthRoute>
                  <GeekLayout />
                </AuthRoute>
              }
              path="/"
            >
              <Route index element={<Home />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/article" element={<Article />} />
            </Route>
          </Routes>
        </div>
      </HistoryRouter>
    </ConfigProvider>
  );
}

export default App;
