import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../redux/api/userApi";

import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { useAppSelector } from "../redux/store";
import { useLogoutUserMutation } from "../redux/api/authApi";

import { styled } from "@mui/material/styles";

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  background-color: #ffffff;
  color: #000000;
  font-weight: 500;

  &:hover {
    background-color: #ffffff;
    transform: translateY(-2px);
  }
`;

const Header = () => {
  const { isLoading: isLoadingUser } = userApi.endpoints.getMe.useQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.user);

  const [logoutUser, { isLoading, isSuccess, error, isError }] = useLogoutUserMutation();

  useEffect(() => {

    if (isSuccess) {
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
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#5d8c9b" }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            Task 4
          </Typography>
          <Box display="flex" sx={{ ml: "auto" }}>
            {!user && (
              <>
                <LoadingButton
                  sx={{ mr: 2 }}
                  onClick={() => navigate("/register")}
                >
                  SignUp
                </LoadingButton>
                <LoadingButton onClick={() => navigate("/login")}>
                  Login
                </LoadingButton>
              </>
            )}
            {user && (
              <>
                <LoadingButton onClick={onLogoutHandler} loading={isLoading}>
                  Logout
                </LoadingButton>
                <Box sx={{ ml: 4 }}>
                  <Tooltip title="Profile" onClick={() => navigate("/profile")}>
                    <IconButton sx={{ p: 0 }}>
                      {!isLoadingUser && (
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
