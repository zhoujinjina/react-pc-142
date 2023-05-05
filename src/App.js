
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./pages/Login";
import GeekLayout from "./pages/Layout";
import "./App.css"
import AuthRoute from "./components/AuthRoute";
function App() {
  return (
      <Router>
        <div className="app">
        <Routes>
          <Route element={<Login/>} path="/login"></Route>
          <Route element={<AuthRoute><GeekLayout/></AuthRoute>} path="/"></Route>
        </Routes>
        </div>
      </Router>
  );
}

export default App;
