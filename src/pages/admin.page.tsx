import { Box, Container, Typography } from "@mui/material";

import UserList from "../components/UserList";

const AdminPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: "#5d8c9b",
          mt: "1rem",
          height: "6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: "white", fontWeight: 100 }}
        >
          Admin Page
        </Typography>
      </Box>
      <UserList />
    </Container>
  );
};

export default AdminPage;
