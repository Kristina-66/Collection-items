import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import ProfilePage from "./pages/profile.page";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import UnauthorizePage from "./pages/unauthorize.page";
import RequireUser from "./components/RequireUser";
import AdminPage from "./pages/admin.page";
import CollectionPage from "./pages/collection.page";
import ItemPage from "./pages/item.page";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<RequireUser allowedRoles={["user", "admin"]} />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={["admin"]} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="unauthorized" element={<UnauthorizePage />} />
          <Route path="collections">
            <Route path=":id" element={<CollectionPage />} />
          </Route>
        <Route path="items">
          <Route path=":id" element={<ItemPage />} />
        </Route>
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
