import { LoadingButton } from "@mui/lab";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Item from "../components/collection/item.component";
import ItemModal from "../components/modals/item.modal";
import { useGetAllItemsQuery } from "../redux/api/itemApi";
import { ICollectionResponse } from "../redux/api/types";
import CreateItem from "../components/collection/create-item";
import AddIcon from '@mui/icons-material/Add';

import { styled } from "@mui/material/styles";

// const LoadingButton = styled(_LoadingButton)`
//   padding: 0.6rem 0;
//   background-color: #3d7587;
//   color: #ffffff;
//   font-weight: 500;

//   &:hover {
//     background-color: #274c58;
//     transform: translateY(-2px);
//   }
// `;

const CollectionPage = () => {
  const [openItemModal, setOpenItemModal] = useState(false);

  const location = useLocation();
  const { _id, name, description, image, category } =
    location.state as ICollectionResponse;
  const {
    data: items,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllItemsQuery(_id);

  useEffect(() => {
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
  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 5 }}>
      <div style={{ height: 50, width: "100%" }}></div>
      <img src={image} alt="image" height="250"></img>
      <Typography gutterBottom>
        <strong>Name of collection:</strong> {name}
      </Typography>
      <Typography gutterBottom>
        <strong>Category of collection:</strong> {category}
      </Typography>
      <Typography gutterBottom>
        <strong>Description: </strong> {description}
      </Typography>
      <Typography gutterBottom>
        <strong>Items:</strong>
      </Typography>
      {items?.length === 0 && (
        <span>This collection doesn't contain any items</span>
      )}
      
        <LoadingButton
          onClick={() => setOpenItemModal(true)}
          variant="contained"
          sx={{ mt: 1, backgroundColor: "#5d8c9b", 
          "&:hover": {
            backgroundColor: "#304850",
          }, }}
          disableElevation
          type="submit"
          endIcon={<AddIcon />}
        >
          Create Item
        </LoadingButton>
      
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {isSuccess && items?.map((item) => <Item item={item}></Item>)}
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
