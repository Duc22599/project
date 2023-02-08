import { Box, Modal } from "@mui/material";

import { Outlet } from "react-router-dom";

export const ModalDetail = ({ open, handleClose }: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
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
      <Box sx={style}>
        <Outlet />
      </Box>
    </Modal>
  );
};
