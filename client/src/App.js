import "./App.css";
import Routers from "./components/Routes";
import Login from "./components/Login";
import Registration from "./components/Registration";
import HomePage from "./components/HomePage";
import Create from "./components/Create";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Content from "./components/Content";
import Edit from "./components/Edit";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Routers />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Registration />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/content/:id" element={<Content />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
