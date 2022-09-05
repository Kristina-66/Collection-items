import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { Image } from "mui-image";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetAllItemsInCollectionQuery } from "../redux/api/itemApi";
import { ICollectionResponse } from "../redux/api/types";
import { useAppSelector } from "../redux/store";
import Item from "../components/collection/item.component";
import ItemModal from "../components/modals/item.modal";
import CreateItem from "../components/collection/create-item";

const CollectionPage = () => {
  const [openItemModal, setOpenItemModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, name, description, image, category, owner } =
    location.state as ICollectionResponse;
  const { data: items, isSuccess } = useGetAllItemsInCollectionQuery(_id);
  const user = useAppSelector((state) => state.userState.user);
  const isAdmin = user?.role === "admin";

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 5 }}>
      <Box sx={{ mt: 2 }}>
        <Image src={image} fit="scale-down" height={300} />
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
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
            {category}
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
            {items?.length === 0 && (
              <span>This collection doesn't contain any items</span>
            )}
          </Typography>
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "#5d8c9b",
                "&:hover": {
                  backgroundColor: "#304850",
                },
              }}
            >
              Home
            </Button>
            {user && (isAdmin || owner === user?._id) && (
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={() => setOpenItemModal(true)}
                sx={{
                  backgroundColor: "#5d8c9b",
                  "&:hover": {
                    backgroundColor: "#304850",
                  },
                }}
              >
                Create Item
              </Button>
            )}
          </Stack>
        </Container>
      </Box>
      <Box></Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {isSuccess && items?.map((item) => <Item item={item}></Item> )}
      </Box>
      <ItemModal
        openItemModal={openItemModal}
        setOpenItemModal={setOpenItemModal}
      >
        <CreateItem setOpenItemModal={setOpenItemModal} collectionId={_id} />
      </ItemModal>
    </Container>
  );
};

export default CollectionPage;
