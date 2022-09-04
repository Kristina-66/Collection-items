import ReactDom from "react-dom";
import React, { FC, CSSProperties } from "react";
import { Container } from "@mui/material";

const OVERLAY_STYLES: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.3)",
  zIndex: 1000,
};

const MODAL_STYLES: CSSProperties = {
  position: "fixed",
  height: "50vh",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  transition: "all 300ms ease",
  backgroundColor: "white",

  zIndex: 1000,
};

type ICommentModal = {
  openCommentModal: boolean;
  setOpenCommentModal: (openCommentModal: boolean) => void;
  children: React.ReactNode;
};

const CommentModal: FC<ICommentModal> = ({
  openCommentModal,
  setOpenCommentModal,
  children,
}) => {
  if (!openCommentModal) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={() => setOpenCommentModal(false)} />
      <Container
        maxWidth="sm"
        sx={{ p: "2rem 1rem", borderRadius: 1 }}
        style={MODAL_STYLES}
      >
        {children}
      </Container>
    </>,
    document.getElementById("collection-modal") as HTMLElement
  );
};

export default CommentModal;
