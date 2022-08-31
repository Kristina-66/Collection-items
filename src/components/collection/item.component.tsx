import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { LoadingButton } from "@mui/lab";
import { FC, useEffect, useState } from "react";
import { useDeleteItemMutation } from "../../redux/api/itemApi";
import { toast } from "react-toastify";
import { IItemResponse } from "../../redux/api/types";
import { format, parseISO } from "date-fns";
import "./item.styles.css";
import { useNavigate } from "react-router-dom";

const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

interface IItemItemProps {
  item: IItemResponse;
}

const Item: FC<IItemItemProps> = ({ item }) => {
  const [openItemModal, setOpenItemModal] = useState(false);
  const [deleteItem, { isLoading, error, isSuccess, isError }] =
    useDeleteItemMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item deleted successfully");
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
      deleteItem(id);
    }
  };

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ maxWidth: 345, overflow: "visible" }}>
          <CardMedia
            component="img"
            height="250"
            image={item.image}
            alt="image"
            sx={{ p: "1rem 1rem 0" }}
          />
          <CardContent>
            <Link
              gutterBottom
              variant="h5"
              component="a"
              sx={{
                color: "#4d4d4d",
                fontWeight: "bold",
                height: "64px",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`../../items/${item._id}`, {
                  state: item,
                })
              }
            >
              {item.name.length > 50
                ? item.name.substring(0, 50) + "..."
                : item.name}
            </Link>
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
                {item.hashtag}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#ffa238",
                }}
              >
                {format(parseISO(item.createdAt), "PPP")}
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
                    src={`${SERVER_ENDPOINT}/api/static/users/${item.user.photo}`}
                  /> */}
                <Typography
                  variant="body2"
                  sx={{
                    ml: "1rem",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
              <div className="item-settings">
                <li>
                  <MoreHorizOutlinedIcon />
                </li>
                <ul className="menu">
                  <li onClick={() => setOpenItemModal(true)}>
                    <ModeEditOutlineOutlinedIcon
                      fontSize="small"
                      sx={{ mr: "0.6rem" }}
                    />
                    Edit
                  </li>
                  <li onClick={() => onDeleteHandler(item._id)}>
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

export default Item;
