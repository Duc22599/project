import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ava from "../../Img/instagram.jpg";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import InputIcon from "@mui/icons-material/Input";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import SettingsIcon from "@mui/icons-material/Settings";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux/es/exports";
import { removeDataUser } from "../../store/index2";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { NewArt2 } from "../page/NewArt/newArt";

export default function BasicList() {
  //test
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
    // navigate("/editor2");
  };
  const handleClose = () => {
    setOpen(false);
  };

  //

  const user = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch();

  const logout = () => {
    sessionStorage.removeItem("userToken");
    window.location.reload();
    dispatch(removeDataUser());
  };

  const navigate = useNavigate();
  return (
    <Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "100%",
          maxWidth: 260,
          height: "100%",
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          position: "fixed",
        }}
      >
        <List sx={{ width: "100%" }}>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <Avatar alt="Remy Sharp" src={ava} sx={{ mr: "5px" }} />
              <Typography variant="h5">Instagram</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          {user.username ? (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate(`/${user.username}`)}>
                  <ListItemIcon>
                    <Avatar
                      alt="Remy Sharp"
                      src={user.image}
                      sx={{ width: 24, height: 24 }}
                    />
                  </ListItemIcon>

                  <ListItemText primary={user.username} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleOpen}>
                  <ListItemIcon>
                    <DriveFileRenameOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Articles" />
                </ListItemButton>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <>
                    <NewArt2 hanleClose={setOpen} />
                  </>
                </Modal>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/setting");
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="LogOut" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <ListItemIcon>
                    <InputIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  <ListItemIcon>
                    <HowToRegIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign In" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Box>
  );
}
