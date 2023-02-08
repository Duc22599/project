import {
  CardMedia,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  CardActionArea,
  Modal,
  Box,
  Link,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import { useState, memo } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { instance } from "../../GetApi";
import { ModalDetail } from "../Modal";

export default function PostArt({ setFavourite, article }: any) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getUser = useSelector((state: any) => state.user.currentUser.username);

  const handleOpen = () => {
    setOpen(true);
    navigate(`/article/${article?.slug}`);
  };
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  // like
  //  like
  const favoritedd = () => {
    if (!getUser) {
      navigate("/login");
      return;
    }
    if (setFavourite) setFavourite(article);

    instance.post(`articles/${article?.slug}/favorite`).then((res: any) => {});
  };

  const unFavorite = () => {
    if (setFavourite) setFavourite(article);
    instance
      .delete(`articles/${article?.slug}/favorite`)
      .then((res: any) => {});
  };
  return (
    <Box>
      <Card
        // key={index}
        sx={{ maxWidth: 600, mb: 5, border: "2px solid #E4E4E4" }}
      >
        <CardActionArea>
          <CardHeader
            sx={{ cursor: "pointer" }}
            color="inherit"
            onClick={() => navigate(`${article?.author.username}`)}
            underline="hover"
            component={Link}
            avatar={<Avatar src={article?.author.image} aria-label="recipe" />}
            title={article?.author.username}
            subheader={moment(article?.creatArt).format("LL")}
          />

          <CardMedia
            component="img"
            sx={{ height: { xs: "194", md: "300" } }}
            image="https://newsgeek.com.br/wp-content/uploads/2022/07/Itachi-Uchiha-1.jpg"
            alt="Paella dish"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {article?.title}
            </Typography>
            {article?.tagList.map((tags: string, i: number) => (
              <Typography
                key={i}
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "inline-block",
                  m: 0.5,
                  padding: "5px",
                  border: "2px solid #E4E4E4",
                  borderRadius: "5px",
                }}
              >
                {`#${tags}`}
              </Typography>
            ))}
          </CardContent>
        </CardActionArea>

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              article?.favorited ? unFavorite() : favoritedd();
            }}
          >
            <FavoriteIcon color={article?.favorited ? "error" : "inherit"} />
            {article?.favoritesCount}
          </IconButton>
          <CardActions onClick={handleOpen} sx={{ ml: "auto" }}>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardActions>
      </Card>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Outlet />
        </Box>
      </Modal> */}

      <ModalDetail open={open} handleClose={handleClose} />
    </Box>
  );
}
