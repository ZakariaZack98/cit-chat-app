import React from "react";
import SignUp from "./Pages/SignUp/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import RootLayout from "./assets/Components/RootLayout/RootLayout";
import Home from "./Pages/Home/Index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/chat" element={"This is chat page"} />
          <Route path="/notifications" element={"This is notifications page"} />
          <Route path="/setting" element={"This is setting page"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
