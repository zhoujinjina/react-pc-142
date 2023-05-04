
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import "./index.scss"
function App() {
  return (
      <Router>
        <div className="app">
        <Routes>
          <Route element={<Login/>} path="/login"></Route>
          <Route element={<Layout/>} path="/"></Route>
        </Routes>
        </div>
      </Router>
  );
}

export default App;
