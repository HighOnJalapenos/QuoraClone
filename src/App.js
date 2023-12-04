import "./App.css";
import Home from "./pages/Home";
import User from "./pages/User";
import Answer from "./pages/Answer";
import Question from "./pages/Question";
import Spaces from "./pages/Spaces";
import SingleSpace from "./pages/SingleSpace";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import ComingSoon from "./pages/ComingSoon";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import PrivateRouter from "./pages/PrivateRouter";
import { ToastContainer } from "react-toastify";

function App() {
  const queryClient = new QueryClient();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const currTheme = localStorage.theme || "light";
    const root = window.document.documentElement;
    const body = window.document.body;
    root.className = currTheme;
    body.className = currTheme;
    localStorage.theme = currTheme;
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<PrivateRouter />}>
            <Route path="" index element={<Home />} />
            <Route path="user/:id" element={<User />} />
            <Route path="answer" element={<Answer />} />
            <Route path="question/:id" element={<Question />} />
            <Route path="spaces" element={<Spaces />} />
            <Route path="spaces/:id" element={<SingleSpace />} />
            <Route path="search" element={<Search />} />
            <Route path="following" element={<ComingSoon />} />
            <Route path="notification" element={<ComingSoon />} />
            <Route path="quoraplus" element={<ComingSoon />} />
            <Route path="messages" element={<ComingSoon />} />
            <Route path="comingsoon" element={<ComingSoon />} />
            <Route path="*" element={<Navigate to="" />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
