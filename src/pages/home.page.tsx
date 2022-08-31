import { Box, Container } from "@mui/material";

import CollectionItem from "../components/collection/collection.component";
import { useGetAllCollectionsQuery } from "../redux/api/collectionApi";

const HomePage = () => {
  const { data: collections } = useGetAllCollectionsQuery();
  return (
    <Container maxWidth="lg">
      <div style={{ height: 50, width: "100%" }}></div>
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

export default HomePage;
