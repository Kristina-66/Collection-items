import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Badge, IconButton } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { IItemResponse } from "../../redux/api/types";

interface ICommentItemProps {
  item: IItemResponse;
}
const CommentItem: FC<ICommentItemProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        badgeContent={item.comments.length}
        color="secondary"
        onClick={() =>
          navigate(`../../items/${item._id}`, {
            state: item,
          })
        }
      >
        <IconButton>
          <ModeCommentIcon />
        </IconButton>
      </Badge>
    </>
  );
};

export default CommentItem;
