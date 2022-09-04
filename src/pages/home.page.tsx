import { Box, Container } from "@mui/material";

import CollectionItem from "../components/collection/collection.component";
import Item from "../components/collection/item.component";
import { useGetAllCollectionsQuery } from "../redux/api/collectionApi";
import { useGetAllItemsQuery } from "../redux/api/itemApi";

const HomePage = () => {
  const { data: collections } = useGetAllCollectionsQuery();
  const { data: items } = useGetAllItemsQuery();
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
      <Box
        sx={{
          mt: "2rem",
          mb: "2rem",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {items?.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
