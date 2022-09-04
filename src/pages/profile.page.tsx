import { useState } from "react";

import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAppSelector } from "../redux/store";
import CollectionItem from "../components/collection/collection.component";
import { useGetAllCollectionsForUserQuery } from "../redux/api/collectionApi";

const ProfilePage = () => {
  const { data: collections } = useGetAllCollectionsForUserQuery();
  const user = useAppSelector((state) => state.userState.user);

  return (
    <Container>
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
        <PersonIcon fontSize="large" sx={{ color: "white" }} />
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: "white", fontWeight: 100 }}
        >
          Profile Page
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 6,
          pb: 3,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {user?.name}
          </Typography>

          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            {user?.email}
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: "#dad8d8",
          mt: "1rem",
          height: "3rem",
          mb: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "#212121", fontWeight: 100 }}>
          Your collections
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          mb: 2,
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
