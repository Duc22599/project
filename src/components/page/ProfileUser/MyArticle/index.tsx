import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useCallback, useEffect, useRef, useState } from "react";
import { instance } from "../../../../GetApi";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { Outlet, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Loading } from "../../../CssMui";
import PostProfile from "../../../PostArt/PostProfile";
import PostArt from "../../../PostArt";

const pageLimit = 10;

export default function MyArticle({ userName }: any) {
  const [myArt, setMyArt] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offSet, setOffset] = useState(0);

  const navigate = useNavigate();

  const callMyArt = () => {
    instance
      .get(`articles?author=${userName}&limit=${pageLimit}&offset=${offSet}`)
      .then((response: any) => {
        setOffset((pre: number) => pre + pageLimit);

        setHasMore(offSet < response.data?.articlesCount);
        setMyArt((prevArticles: any) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
      });
  };

  const callApi = () => {
    instance
      .get(`articles?author=${userName}&limit=${pageLimit}&offset=${offSet}`)
      .then((res: any) => {
        setOffset((pre: number) => pre + pageLimit);
        setMyArt(res.data.articles);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  const setFavourite = (article: any) => {
    // TO DO: update state articles
    const index = myArt.findIndex((a: any) => a.slug === article.slug);
    if (index < 0) return;
    const cloneUserFeeds = [...myArt];
    const selectedArticle = { ...cloneUserFeeds[index] };
    const currentFavourite = selectedArticle.favorited;
    selectedArticle.favorited = !currentFavourite;
    selectedArticle.favoritesCount += currentFavourite ? -1 : 1;
    cloneUserFeeds[index] = selectedArticle;
    setMyArt(cloneUserFeeds);
  };

  return (
    <>
      {myArt === null ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <>
          {myArt && myArt.length > 0 ? (
            <>
              <InfiniteScroll
                dataLength={myArt.length}
                next={callMyArt}
                hasMore={hasMore}
                loader={
                  <Loading>
                    <CircularProgress />
                  </Loading>
                }
                scrollableTarget="scrollableDiv"
              >
                {myArt.map((item: any, index: number) => (
                  <PostProfile
                    key={index}
                    article={item}
                    setFavourite={setFavourite}
                  />
                ))}

                {/* <>
                  <Outlet />
                </> */}
              </InfiniteScroll>
            </>
          ) : (
            <>No articles are here... yet.</>
          )}
        </>
      )}
    </>
  );
}
