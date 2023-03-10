import { Box, Modal } from "@mui/material";

import { Outlet } from "react-router-dom";
import { BoxModal } from "../CssMui";
import { SlugArticle } from "../page/SlugArticle";

export const ModalDetail = ({
  open,
  handleClose,
  setOpen,
  article,
  callApi,
}: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid grey",
    boxShadow: 24,
    borderRadius: "10px",
    p: 2,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxModal sx={style}>
        <SlugArticle setOpen={setOpen} callApi={callApi} article={article} />
      </BoxModal>
    </Modal>
  );
};
