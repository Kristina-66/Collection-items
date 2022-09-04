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
  const [likeItem, { data, isSuccess }] = useLikeItemMutation();
  const [likeCount, setLikeCount] = useState(likes.length);

  const getLikeCount = () => {
    console.log(data);
    if (isSuccess && data !== undefined) {
      if (data!.length > 0) {
        setLikeCount(data!.length);
        return;
      }
      setLikeCount(likes.length - 1);
      return;
    }
    setLikeCount(likes.length);
    return;
  };

  isSuccess ?? console.log(data);
  const onLikeClick = () => {
    likeItem(itemId);
    setTimeout(() => {
      getLikeCount();
    }, 1000);
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
