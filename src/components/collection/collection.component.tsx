import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDeleteCollectionMutation } from "../../redux/api/collectionApi";
import { ICollectionResponse } from "../../redux/api/types";
import { format, parseISO } from "date-fns";
import CollectionModal from "../modals/collection.modal";

import "./collection.styles.css";
import UpdateCollection from "./update-collection";

const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

interface ICollectionItemProps {
  collection: ICollectionResponse;
}

const CollectionItem: FC<ICollectionItemProps> = ({ collection }) => {
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [deleteCollection, { isLoading, error, isSuccess, isError }] =
    useDeleteCollectionMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Collection deleted successfully");
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onDeleteHandler = (id: string) => {
    if (window.confirm("Are you sure")) {
      deleteCollection(id);
    }
  };

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ maxWidth: 272, minWidth: 272, minHeight: 506 }}>
          <CardHeader
            title={
              collection?.name?.length > 50
                ? collection.name.substring(0, 50) + "..."
                : collection.name
            }
            subheader={format(parseISO(collection.createdAt), "PPP")}
            sx={{
              backgroundColor: "#5d8c9b",
              p: "0.1rem 0.4rem",
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#5d8c9b8c",
              },
            }}
            onClick={() =>
              navigate(`../collections/${collection._id}`, {
                state: collection,
              })
            }
          />
          <CardMedia
            component="img"
            height="250"
            image={collection.image}
            alt="image collection"
            sx={{ p: "1rem 1rem 0" }}
          />
          <CardContent>
            <Typography
              variant="body1"
              sx={{
                backgroundColor: "#dad8d8",
                p: "0.1rem 0.4rem",
                borderRadius: 1,
              }}
            >
              Category: {collection.category}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                ml: "1rem",
              }}
            >
              {collection?.description?.length > 70
                ? collection.description.substring(0, 70) + "..."
                : collection.description}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                ml: "1rem",
                marginLeft: "7rem",
              }}
            >
              Created by: {collection?.ownerInfo[0]?.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{ px: "0.5rem" }}
            >
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Box></Box>
              <div className="collection-settings">
                <li>
                  <MoreHorizOutlinedIcon />
                </li>
                <ul className="menu">
                  <li onClick={() => setOpenCollectionModal(true)}>
                    <ModeEditOutlineOutlinedIcon
                      fontSize="small"
                      sx={{ mr: "0.6rem" }}
                    />
                    Edit
                  </li>
                  <li onClick={() => onDeleteHandler(collection._id)}>
                    <DeleteOutlinedIcon
                      fontSize="small"
                      sx={{ mr: "0.6rem" }}
                    />
                    Delete
                  </li>
                </ul>
              </div>
            </Box>
          </CardActions>
        </Card>
      </Grid>
      <CollectionModal
        openCollectionModal={openCollectionModal}
        setOpenCollectionModal={setOpenCollectionModal}
      >
        <UpdateCollection
          setOpenCollectionModal={setOpenCollectionModal}
          collection={collection}
        />
      </CollectionModal>
    </>
  );
};

export default CollectionItem;
