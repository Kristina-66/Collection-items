import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import HomeIcon from "@mui/icons-material/Home";
import { useAppSelector } from "../redux/store";
import { userApi } from "../redux/api/userApi";
import { useLogoutUserMutation } from "../redux/api/authApi";
import CollectionModal from "./modals/collection.modal";
import CreateCollection from "./collection/create-collection";

const Header = () => {
  const { isLoading: isLoadingUser } = userApi.endpoints.getMe.useQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.user);

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess && !user) {
      navigate("/login");
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "bottom-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "bottom-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess, user]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#5d8c9b" }}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            aria-label="Home"
            size="large"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", color: "white" }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" sx={{ color: "white" }}>
            Collection items
          </Typography>

          <Box display="flex" sx={{ ml: "auto" }}>
            {!user && (
              <>
                <Tooltip title="SignUp" onClick={() => navigate("/register")}>
                  <IconButton
                    aria-label="SignUp"
                    size="large"
                    sx={{ color: "white" }}
                  >
                    <PersonAddAltIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Login" onClick={() => navigate("/login")}>
                  <IconButton
                    aria-label="Login"
                    size="large"
                    sx={{ color: "white" }}
                  >
                    <LoginIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {user && (
              <>
                <Tooltip title="Logout" onClick={onLogoutHandler}>
                  <IconButton
                    aria-label="Logout"
                    size="large"
                    sx={{ color: "white" }}
                  >
                    <LogoutIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Box sx={{ ml: 1 }}>
                  <Tooltip title="Profile" onClick={() => navigate("/profile")}>
                    <IconButton
                      aria-label="Account"
                      size="large"
                      sx={{ color: "white" }}
                    >
                      <AccountCircleIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <Box sx={{ ml: 1 }}>
                  <Tooltip title="Admin" onClick={() => navigate("/admin")}>
                    <IconButton
                      aria-label="Account"
                      size="large"
                      sx={{ color: "white" }}
                    >
                      <AdminPanelSettingsIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}
          </Box>
          {user && (
            <>
              <Box sx={{ ml: 1 }}>
                <Tooltip
                  title="Create collection"
                  onClick={() => setOpenCollectionModal(true)}
                >
                  <IconButton
                    aria-label="Create"
                    size="large"
                    sx={{ color: "white" }}
                  >
                    <CreateNewFolderIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Toolbar>
        <CollectionModal
          openCollectionModal={openCollectionModal}
          setOpenCollectionModal={setOpenCollectionModal}
        >
          <CreateCollection setOpenCollectionModal={setOpenCollectionModal} />
        </CollectionModal>
      </Container>
    </AppBar>
  );
};

export default Header;
