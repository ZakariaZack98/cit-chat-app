import React from "react";
import SignUp from "./Pages/SignUp/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import RootLayout from "./assets/Components/RootLayout/RootLayout";
import Home from "./Pages/Home/Index";
import Chat from "./Pages/Chat/Chat";
import Notifications from "./Pages/Notifications/Notifications";
import Settings from "./Pages/Settings/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/settings" element={<Settings/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
