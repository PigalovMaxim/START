//Зависимости
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { LINKS } from "../../common";
//Компоненты
import WelcomePage from "../WelcomePage";
import Content from "../Content/Content";
import Header from "../Header/Header";
import NavMenu from "../NavMenu";
import UploadForm from "../UploadForm/UploadForm";
import EditPost from "../EditPost/EditPost";
//Разное
import "./App.css";

function App() {
  const [isUserLogin, setUserLogin] = useState(false);
  const [isMenuOpen, setMenu] = useState(true);
  const history = useNavigate();
  const SwipeLeft = () => setMenu(false);
  const SwipeRight = () => setMenu(true);
  const { ref } = useSwipeable({
    onSwipedLeft: SwipeLeft,
    onSwipedRight: SwipeRight,
  });
  useEffect(() => {
    if (localStorage.getItem("isLogin")) setUserLogin(true);
    if (!localStorage.getItem("isLogin")) {
      history(LINKS.WELCOME);
    }
    ref(document);
  }, []);
  return (
    <div className="App">
      {isUserLogin ? (
        <div className="content">
          <Content isUserLogin={isUserLogin} />
          <Header setUserLogin={setUserLogin} />
          <NavMenu setUserLogin={setUserLogin} isMenuOpen={isMenuOpen} />
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<div/>} />
          <Route
            path={LINKS.WELCOME}
            element={<WelcomePage setUserLogin={setUserLogin} />}
          />
        </Routes>
      )}
      {isUserLogin ? (
        <Routes>
          <Route path={LINKS.UPLOAD_FORM} element={<UploadForm />} />
          <Route path={LINKS.EDIT_POST + '/:id/:image/:video/:audio'} element={<EditPost />} />
        </Routes>
      ) : (
        <div />
      )}
    </div>
  );
}

export default App;
