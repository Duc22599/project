import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ava from "../../Img/Screenshot_2.png";

export const Boxs = styled(Box)(() => ({
  backgroundImage: `url(${ava})`,
  // position: "relative",
  width: "100%",
  height: "65vh",
  backgroundPositionund: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

export const Loading = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignContent: " center",
  alignItems: "center",
  overflow: "hidden",
}));

export const BoxProFile = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.up("xs")]: {
    padding: "0 5px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 50px",
  },
}));

export const BoxModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "tranlate(-50%, -50%)",
  backgroundColor: "background.paper",
  border: "2px solid grey",
  boxShadow: "24",
  borderRadius: "10px",
  p: 4,
  [theme.breakpoints.up("xs")]: {
    width: 350,
  },

  [theme.breakpoints.up("md")]: {
    width: 750,
  },
}));
