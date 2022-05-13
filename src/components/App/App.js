import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import WelcomePage from "../WelcomePage";
import Content from "../Content/Content";
import Header from "../Header/Header";
import NavMenu from "../NavMenu";
import UploadForm from "../UploadForm/UploadForm";

import "./App.css";

function App() {
  const [isUserLogin, setUserLogin] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLogin")) setUserLogin(true);
    if (!localStorage.getItem("isLogin")) {
      history("/Welcome");
    }
  }, []);
  return (
    <div className="App">
      {isUserLogin ? (
        <div className="content">
          <Content isUserLogin={isUserLogin} />
          <Header setUserLogin={setUserLogin} />
          <NavMenu />
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<div></div>} />
          <Route
            path="/Welcome"
            element={<WelcomePage setUserLogin={setUserLogin} />}
          />
        </Routes>
      )}
      {isUserLogin ? (
        <Routes>
          <Route path="/UploadForm" element={<UploadForm />} />
        </Routes>
      ) : (
        <div />
      )}
    </div>
  );
}

export default App;
