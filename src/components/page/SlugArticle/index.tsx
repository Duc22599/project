import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../../GetApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import moment from "moment";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import { Comments } from "./Conments";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Divider } from "@mui/material";

export const SlugArticle = () => {
  const [slugs, setSlugs] = useState<any>(null);

  const navigate = useNavigate();

  const params = useParams();

  const getUser = useSelector((state: any) => state.user.currentUser.username);

  const callApi = () => {
    instance.get(`articles/${params.slug}`).then((res) => {
      setSlugs(res.data.article);
    });
  };

  useEffect(() => {
    callApi();
  }, [params]);

  const getUserToken = sessionStorage.getItem("userToken");

  // Follow
  const follower = () => {
    if (!getUser) {
      navigate("/login");
      return;
    }
    instance
      .post(`profiles/${slugs?.author.username}/follow`)
      .then((res) => callApi());
  };

  const unFollower = () => {
    instance
      .delete(`profiles/${slugs?.author.username}/follow`)
      .then((res) => callApi());
  };

  //Favorite

  const favorited = () => {
    if (!getUser) {
      navigate("/login");
      return;
    }
    instance.post(`articles/${slugs?.slug}/favorite`).then((res) => callApi());
  };

  const unFavorite = () => {
    instance
      .delete(`articles/${slugs?.slug}/favorite`)
      .then((res) => callApi());
  };

  // Delete My Article
  const deleteArt = () => {
    instance.delete(`articles/${slugs?.slug}`).then(() => navigate("/"));
  };

  return (
    <Box sx={{ height: "calc(100vh - 300px)", overflow: "auto" }}>
      <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
        Post by {slugs?.author.username}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
        }}
      >
        <CardHeader
          avatar={<Avatar src={slugs?.author.image} aria-label="recipe" />}
          title={slugs?.author.username}
          subheader={moment(slugs?.createdAt).format("LL")}
        />

        <CardActions>
          {getUser === slugs?.author.username ? (
            <>
              <Button
                onClick={() => {
                  navigate(`/edit/${slugs?.slug}`);
                }}
                variant="outlined"
                startIcon={<EditIcon />}
                color="success"
                size="small"
              >
                Edit Article
              </Button>

              <Button
                onClick={deleteArt}
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="secondary"
                size="small"
              >
                Delete Article
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={
                  slugs?.author.following ? <HorizontalRuleIcon /> : <AddIcon />
                }
                color="success"
                size="small"
                onClick={() => {
                  slugs?.author.following ? unFollower() : follower();
                }}
              >
                {slugs?.author.following
                  ? `UnFollow ${slugs?.author.username}`
                  : `Follow ${slugs?.author.username}`}
              </Button>

              <Button
                variant="outlined"
                startIcon={<FavoriteIcon />}
                color="secondary"
                size="small"
                onClick={() => {
                  slugs?.favorited ? unFavorite() : favorited();
                }}
              >
                {slugs?.favorited
                  ? `UnFavorite Article(${slugs?.favoritesCount})`
                  : `Favorite Article(${slugs?.favoritesCount})`}
              </Button>
            </>
          )}
        </CardActions>
      </Box>

      <Container>
        <Typography variant="h5" gutterBottom>
          {slugs?.title}
        </Typography>
      </Container>

      <Container>
        <Typography sx={{ mb: 4 }}>{slugs?.body}</Typography>
        {slugs?.tagList.map((tags: string, i: number) => (
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
            # {tags}
          </Typography>
        ))}
      </Container>

      <Container
        maxWidth="sm"
        sx={{ mt: 4, borderTop: 1, borderColor: "divider" }}
      >
        {getUserToken ? (
          <Comments
            data={slugs?.slug}
            userName={slugs?.author.username}
            avatarUser={slugs?.author.image}
          />
        ) : (
          <Box sx={{ mt: 3 }}>
            <Button onClick={() => navigate("/login")} variant="text">
              Sign in
            </Button>
            or
            <Button onClick={() => navigate("/register")} variant="text">
              Sign up
            </Button>
            to add comments on this article.
          </Box>
        )}
      </Container>
    </Box>
  );
};
