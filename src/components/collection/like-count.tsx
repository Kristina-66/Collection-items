import { FC, useState } from "react";

import { Badge, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ILike } from "../../redux/api/types";
import { useLikeItemMutation } from "../../redux/api/itemApi";

interface ILikeCountProps {
  likes: ILike[];
  itemId: string;
}
const LikeCount: FC<ILikeCountProps> = ({ likes, itemId }) => {
  const [likeItem] = useLikeItemMutation();
  const [likeCount, setLikeCount] = useState(likes.length);

  const onLikeClick = async () => {
    const likes = await likeItem(itemId).unwrap();
    if (likes.length === 0) {
      setLikeCount((prev) => prev - 1);
      return;
    }
    setLikeCount(likes.length);
  };

  return (
    <>
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        badgeContent={likeCount}
        color="secondary"
        onClick={onLikeClick}
      >
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
      </Badge>
    </>
  );
};

export default LikeCount;
