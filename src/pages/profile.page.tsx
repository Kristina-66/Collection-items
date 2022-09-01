import { Box, Container, Typography } from "@mui/material";

import { useAppSelector } from "../redux/store";
import CollectionItem from "../components/collection/collection.component";
import { useGetAllCollectionsForUserQuery } from "../redux/api/collectionApi";

const ProfilePage = () => {
  const { data: collections } = useGetAllCollectionsForUserQuery();
  const user = useAppSelector((state) => state.userState.user);

  const allUsers = useAppSelector((state) => state.userState.users);

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#5d8c9b",
          mt: "2rem",
          height: "8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ color: "#1f1e1e", fontWeight: 100 }}
        >
          Profile Page
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>
          <strong>Full Name:</strong> {user?.name}
        </Typography>
        <Typography gutterBottom>
          <strong>Email Address:</strong> {user?.email}
        </Typography>
        <Typography gutterBottom>
          <strong>Role:</strong> {user?.role}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#5d8c9b",
          mt: "2rem",
          height: "3rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#1f1e1e", fontWeight: 100 }}>
          You collections!
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {collections?.map((collection) => (
          <CollectionItem key={collection._id} collection={collection} />
        ))}
      </Box>
    </Container>
  );
};

export default ProfilePage;
