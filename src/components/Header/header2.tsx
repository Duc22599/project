import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { removeDataUser } from "../../store/index2";

function Header2() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.currentUser);
  const getUserToken = sessionStorage.getItem("userToken");
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("userToken");
    window.location.reload();
    dispatch(removeDataUser());
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0",
        right: "0",
        left: "0",
        height: "50",
        bgcolor: "#81d4fa",
        display: { xs: "flex", md: "none" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: `${
              getUserToken ? "space-between" : "space-around"
            }`,
          }}
        >
          <HomeIcon
            onClick={() => {
              navigate("/");
            }}
            sx={{ color: "white", fontSize: "40px" }}
          />
          {getUserToken ? (
            <>
              <AddCircleOutlineIcon
                onClick={() => {
                  navigate("/editor");
                }}
                sx={{ color: "white", fontSize: "40px" }}
              />
              <SettingsIcon
                onClick={() => {
                  navigate("/setting");
                }}
                sx={{ color: "white", fontSize: "40px" }}
              />
              <Avatar
                onClick={() => {
                  navigate(`/${user.username}`);
                }}
                alt="Remy Sharp"
                src={user.image}
                sx={{ fontSize: "40px" }}
              />
              <LogoutIcon
                onClick={logout}
                sx={{ color: "white", fontSize: "40px" }}
              />{" "}
            </>
          ) : (
            <>
              <HowToRegIcon
                onClick={() => navigate("/register")}
                sx={{ color: "white", fontSize: "40px" }}
              />

              <LogoutIcon
                onClick={() => navigate("/login")}
                sx={{ color: "white", fontSize: "40px" }}
              />
            </>
          )}
        </Toolbar>
      </Container>
    </Box>
  );
}
export default Header2;
