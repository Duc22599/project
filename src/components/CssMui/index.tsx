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
