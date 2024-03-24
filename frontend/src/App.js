import "./App.css";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from "react";
import ProfilePage from "./screens/ProfilePage/ProfilePage";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mynotes" element={<MyNotes search={search} />} />
        <Route path="/note/:id" element={<SingleNote />} />
        <Route path="/createNote" element={<CreateNote />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
