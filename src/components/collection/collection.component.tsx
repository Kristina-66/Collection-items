import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { FC, useEffect, useState } from "react";
import CollectionModal from "../modals/collection.modal";
import { useDeleteCollectionMutation } from "../../redux/api/collectionApi";
import { toast } from "react-toastify";
//   import UpdatePost from './update-post';
import { ICollectionResponse } from "../../redux/api/types";
import { format, parseISO } from "date-fns";
import "./collection.styles.css";

const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

interface ICollectionItemProps {
  collection: ICollectionResponse;
}

const CollectionItem: FC<ICollectionItemProps> = ({ collection }) => {
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [deleteCollection, { isLoading, error, isSuccess, isError }] =
    useDeleteCollectionMutation();

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
        <Card sx={{ maxWidth: 345, overflow: "visible" }}>
          <CardMedia
            component="img"
            height="250"
            image={collection.image}
            alt="green iguana"
            sx={{ p: "1rem 1rem 0" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "#4d4d4d", fontWeight: "bold", height: "64px" }}
            >
              {collection.name.length > 50
                ? collection.name.substring(0, 50) + "..."
                : collection.name}
            </Typography>
            <Box display="flex" alignItems="center" sx={{ mt: "1rem" }}>
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: "#dad8d8",
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  mr: "1rem",
                }}
              >
                {collection.category}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#ffa238",
                }}
              >
                {format(parseISO(collection.createdAt), "PPP")}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{ px: "0.5rem" }}
            >
              <Box display="flex" alignItems="center">
                {/* <Avatar
                    alt='cart image'
                    src={`${SERVER_ENDPOINT}/api/static/users/${collection.user.photo}`}
                  /> */}
                <Typography
                  variant="body2"
                  sx={{
                    ml: "1rem",
                  }}
                >
                  {collection.description}
                </Typography>
              </Box>
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
      {/* <PostModal
          openPostModal={openPostModal}
          setOpenPostModal={setOpenPostModal}
        >
          <UpdatePost setOpenPostModal={setOpenPostModal} post={post} />
        </PostModal> */}
    </>
  );
};

export default CollectionItem;
