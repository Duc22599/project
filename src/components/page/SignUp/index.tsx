import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { instance } from "../../../GetApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setCurrentUser } from "../../../store/index2";
import Link from "@mui/material/Link";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [userName, setUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    instance
      .post("users", {
        user: {
          username: userName,
          email: email,
          password: password,
        },
      })
      .then((res) => {
        navigate("/");
        sessionStorage.setItem("userToken", res.data.user.token);
        dispatch(setCurrentUser(res.data.user));
      })
      .catch((err: any) => {
        setErrorEmail("UserName or Email has already been taken");
      });
  };

  const onEnter = (e: any) => {
    if (e.code !== "Enter") {
      return;
    }

    handleSubmit();
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        m: "100px 0",
      }}
      onKeyUp={onEnter}
    >
      <Typography variant="h4" component="h4">
        Sign Up
      </Typography>

      <Link href="#" underline="hover" onClick={() => navigate("/login")}>
        Have an account?
      </Link>

      <FormControl sx={{ m: 5, width: { xs: "70%", md: "40%" } }}>
        <InputLabel htmlFor="outlined-adornment-username" size="small">
          UserName
        </InputLabel>
        <OutlinedInput
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          size="small"
          id="outlined-adornment-username"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle username visibility"
                edge="end"
              ></IconButton>
            </InputAdornment>
          }
          label="UserName"
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: { xs: "70%", md: "40%" } }}>
        <InputLabel htmlFor="outlined-adornment-email" size="small">
          Email
        </InputLabel>
        <OutlinedInput
          value={email}
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-adornment-email"
          type="email"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle email visibility"
                edge="end"
              ></IconButton>
            </InputAdornment>
          }
          label="email"
        />
      </FormControl>
      <FormControl
        sx={{ m: 5, width: { xs: "70%", md: "40%" } }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password" size="small">
          Password
        </InputLabel>
        <OutlinedInput
          value={password}
          size="small"
          onChange={(e) => setPassWord(e.target.value)}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Typography sx={{ color: "red", mb: 1 }} component="p">
        {errorEmail}
      </Typography>
      <Button
        variant="contained"
        size="medium"
        sx={{ width: { xs: "30%", md: "10%" } }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
}
