// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/Route";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/mainPage/MainPage";
import PersonalDetailPage from "./pages/personalDetailPage/PersonalDetailPage";
import LayoutWithNavbar from "./pages/navbar/LayoutWithNavbar";
import "bulma/css/bulma.css";
import "./index.css";
import PersonelAdd from "./components/personel/PersonelAdd.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import PersonelsByTeamNamePage from "./pages/personalDetailPage/PersonelsByTeamNamePage.jsx";
import AuthorizationPage from "./pages/authorizationPage/AuthorizationPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <MainPage />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/personal-detail/:id"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <PersonalDetailPage />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute restricted={true}>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/addperson"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <PersonelAdd />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <ContactPage />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/teamname/:teamName"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <PersonelsByTeamNamePage />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/authorization"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <AuthorizationPage />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
