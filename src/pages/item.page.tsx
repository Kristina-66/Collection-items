import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import { IItemResponse } from "../redux/api/types";

const ItemPage = () => {
  const location = useLocation();
  const { _id, name, hashtag, description, image } =
    location.state as IItemResponse;
  return (
    <Container maxWidth="lg">
      <div style={{ height: 50, width: "100%" }}></div>
      <img src={image} alt="image item" height="250"></img>
      <Typography gutterBottom>
        <strong>Name of item:</strong> {name}
      </Typography>
      <Typography gutterBottom>
        <strong>Hashtag: </strong> {hashtag}
      </Typography>
      <Typography gutterBottom>
        <strong>Description: </strong> {description}
      </Typography>
      <div style={{ height: 50, width: "100%" }}></div>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      ></Box>
    </Container>
  );
};

export default ItemPage;
