import React, { FC } from "react";
import { useLocation } from "react-router-dom";

import { format, parseISO } from "date-fns";
import {
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  Box,
  Typography,
  Fab,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../../redux/api/commentApi";
import { useAppSelector } from "../../redux/store";
import { IItemResponse } from "../../redux/api/types";
import { ICommentResponse } from "../../redux/api/types";
import CommentModal from "../modals/comment.modals";
import CreateComment from "./create-comment";

interface ICommentComponentProps {
  comments: ICommentResponse[];
}

const CommentComponent: FC<ICommentComponentProps> = ({ comments }) => {
  const [open, setOpen] = React.useState(false);
  const [filteredComments, setFilteredComments] = React.useState<
    ICommentResponse[]
  >([]);
  const user = useAppSelector((state) => state.userState.user);
  const location = useLocation();
  const [openCommentModal, setOpenCommentModal] = React.useState(false);
  const { _id } = location.state as IItemResponse;
  const { createdAt } = location.state as ICommentResponse;
  const [createComment, { data, isLoading, isSuccess }] =
    useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const displayedComments = () => {
    if (filteredComments.length > 0) {
      return filteredComments;
    }
    if (data === undefined) {
      return comments;
    }

    return data;
  };

  const onDeleteHandler = (id: string) => {
    if (window.confirm("Are you sure")) {
      deleteComment(id);
      const a = displayedComments().filter((comment) => comment._id !== id);
      setFilteredComments(a);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="h4">
          <strong>Comments</strong>
        </Typography>
        <IconButton
          aria-label="expand row"
          size="large"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper style={{ padding: "40px 20px" }}>
          {displayedComments()?.map((comment) => (
            <Grid container wrap="nowrap" spacing={2} key={comment._id}>
              <Grid item>
                <AccountCircleIcon />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <Typography variant="h6" sx={{ margin: 0, textAlign: "left" }}>
                  <strong>{comment.name}</strong>
                </Typography>
                <Typography sx={{ textAlign: "left", mb: 1, mt: 1 }}>
                  {comment.comment}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ textAlign: "left", color: "gray" }}>
                    {format(parseISO(createdAt), "PPP")}
                  </Typography>
                  <IconButton onClick={() => onDeleteHandler(comment._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Paper>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}></Grid>
        {user && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Fab
              color="primary"
              variant="extended"
              onClick={() => setOpenCommentModal(true)}
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: "#5d8c9b",
                "&:hover": {
                  backgroundColor: "#304850",
                },
              }}
            >
              <AddIcon sx={{ mr: 2 }} />
              Add comment
            </Fab>
          </Box>
        )}
      </Collapse>
      <CommentModal
        openCommentModal={openCommentModal}
        setOpenCommentModal={setOpenCommentModal}
      >
        <CreateComment
          setOpenCommentModal={setOpenCommentModal}
          itemId={_id}
          createComment={createComment}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </CommentModal>
    </>
  );
};

export default CommentComponent;
