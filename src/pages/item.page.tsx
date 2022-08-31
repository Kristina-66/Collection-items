import { Box, Container, Typography } from "@mui/material";

const ItemPage = () => {
  return (
    <Container maxWidth="lg">
      <div style={{ height: 50, width: "100%" }}></div>
      <Typography gutterBottom>
        <strong>Name of item:</strong>
      </Typography>
      <Typography gutterBottom>
        <strong>Hashtag: </strong>
      </Typography>
      <Typography gutterBottom>
        <strong>Description: </strong>
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
