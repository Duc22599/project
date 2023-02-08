import { useState, useEffect } from "react";
import { instance } from "../../../../GetApi";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Loading } from "../../../CssMui";
import PostArt from "../../../PostArt";

export const HashTag = ({ data }: any) => {
  const [hashTags, setHashTags] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`articles?tag=${data}&limit=20&offset=0`)
      .then((res) => {
        setHashTags(res.data.articles);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  }, []);

  const setFavourite = (article: any) => {
    // TO DO: update state articles
    const index = hashTags.findIndex((a: any) => a.slug === article.slug);
    if (index < 0) return;
    const cloneUserFeeds = [...hashTags];
    const selectedArticle = { ...cloneUserFeeds[index] };
    const currentFavourite = selectedArticle.favorited;
    selectedArticle.favorited = !currentFavourite;
    selectedArticle.favoritesCount += currentFavourite ? -1 : 1;
    cloneUserFeeds[index] = selectedArticle;
    setHashTags(cloneUserFeeds);
  };
  return (
    <>
      {isLoading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <>
          {hashTags.map((tag: any, index: number) => (
            <PostArt article={tag} key={index} setFavourite={setFavourite} />
          ))}
        </>
      )}
    </>
  );
};
