import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import GeekLayout from "./pages/Layout";
import "./App.css";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import Article from "./pages/Article";
function App() {
  return (
    <Router>
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
            <Route index element={<Home/>}/>
            <Route path="/publish" element={<Publish/>}/>
            <Route path="/article" element={<Article/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
