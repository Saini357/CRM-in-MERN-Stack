import { Route, Routes } from "react-router-dom";
import Protected from "./loginSetup/Protected";
import Home from "./components/Home";
import Interchat from "./components/Interchat";
import LoginPage from "./loginSetup/LoginPage";
import Developer from "./components/Developer";
import Project from "./components/Project";
import HrDesk from "./components/HrDesk";
import Layout from "./loginSetup/Layout";
import FrontPage from "./loginSetup/FrontPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<FrontPage />} />

        <Route path="/" element={<Layout />}>
          <Route
            path="/home"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/interchat"
            element={
              <Protected>
                <Interchat />
              </Protected>
            }
          />
          <Route
            path="/developer"
            element={
              <Protected>
                <Developer />
              </Protected>
            }
          />
          <Route
            path="/hrdesk"
            element={
              <Protected>
                <HrDesk />
              </Protected>
            }
          />
          <Route
            path="/projects"
            element={
              <Protected>
                <Project />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
