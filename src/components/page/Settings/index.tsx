import { useState } from "react";
import FormLabel from "@mui/joy/FormLabel";
import JoyInput from "@mui/joy/Input";
import Layout from "../../Layout";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import Box from "@mui/material/Box";
import { instance } from "../../../GetApi";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Avatar, Divider, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@mui/material";
import { setCurrentUser } from "../../../store/index2";

export function Settings() {
  const user = useSelector((state: any) => state.user.currentUser);

  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.username);
  const [image, setImage] = useState(user.image);
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState(user.password);
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const dispath = useDispatch();

  const navigate = useNavigate();

  const hanleSubmit = () => {
    instance
      .put("user", {
        user: {
          email: email,
          password: password,
          username: userName,
          bio: bio,
          image: image,
        },
      })
      .then((res) => {
        navigate(`/${userName}`);
        dispath(setCurrentUser(res.data.user));
      })
      .catch((err) => setError("Try Again"));
  };

  const hanleChangeImg = (e: any) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);
    console.log(file.preview);

    setAvatar(file);
    setImage(file.preview);
  };

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          width: { xs: 250, md: 500 },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          mt: { xs: 1, md: "50px" },
          mx: "auto",
          height: "100vh",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Your Settings
        </Typography>

        <Divider sx={{ my: 2 }} />

        {error && <>{error}</>}
        <FormControl onChange={hanleChangeImg}>
          <FormLabel>
            <Avatar
              alt="Remy Sharp"
              src={image}
              sx={{
                width: { sx: 35, md: 56 },
                height: { sx: 35, md: 56 },
                mr: 2,
              }}
            />
            <Input disableUnderline type="file" />
          </FormLabel>
        </FormControl>

        <FormControl>
          <FormLabel sx={{ fontSize: "15px", mt: { xs: 2, md: 3 } }}>
            UserName
          </FormLabel>
          <JoyInput
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="UserName"
            name="Name"
            type="tel"
            autoComplete="on"
            autoFocus
            fullWidth
            variant="outlined"
            color="neutral"
          />
        </FormControl>

        <FormControl>
          <FormLabel sx={{ fontSize: "15px", mt: { xs: 2, md: 3 } }}>
            Bio
          </FormLabel>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short Bio About You"
            sx={{ width: "100%" }}
            color="neutral"
            minRows={3}
            size="lg"
            variant="outlined"
          />
        </FormControl>

        <FormControl>
          <FormLabel sx={{ fontSize: "15px", mt: { xs: 2, md: 3 } }}>
            Email
          </FormLabel>
          <JoyInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Adress"
            name="Email"
            type="email"
            fullWidth
            variant="outlined"
            color="neutral"
          />
        </FormControl>

        <FormControl>
          <FormLabel sx={{ fontSize: "15px", mt: { xs: 2, md: 3 } }}>
            Change Password
          </FormLabel>
          <JoyInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Change Password"
            name="Password"
            type="password"
            fullWidth
            variant="outlined"
            color="neutral"
          />
        </FormControl>

        <Button
          onClick={hanleSubmit}
          sx={{ ml: "auto", mt: { xs: 2, md: 3 } }}
          variant="contained"
        >
          Contained
        </Button>
      </Box>
    </Layout>
  );
}

//Test
