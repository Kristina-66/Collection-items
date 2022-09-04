import { useLocation } from "react-router-dom";

import { format, parseISO } from "date-fns";
import { Box, Container, Typography } from "@mui/material";
import { Image } from "mui-image";
import CommentComponent from "../components/collection/comment.component";
import { IItemResponse } from "../redux/api/types";
import { ICommentResponse } from "../redux/api/types";

const ItemPage = () => {
  const location = useLocation();
  const { name, hashtag, description, image, createdAt, comments, ownerName, } =
    location.state as IItemResponse;
  const comment = location.state as ICommentResponse;
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2 }}>
        <Image src={image} fit="scale-down" height={300} />
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {name}
          </Typography>

          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            {hashtag}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            {description}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            <strong>Created: </strong>
            {format(parseISO(createdAt), "PPP")}
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            <strong>Collection:</strong>
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            <strong>Owner:</strong>{ownerName}
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      ></Box>
      <CommentComponent comments={comments} />
    </Container>
  );
};

export default ItemPage;
