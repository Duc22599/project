import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { instance } from "../../../../GetApi";
import { Loading } from "../../../CssMui";

import PostProfile from "../../../PostArt/PostProfile";

export const MyFavorited = ({ username }: any) => {
  const limitPage = 10;
  const [myFavorite, setMyFavorited] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offSet, setOffset] = useState(0);

  const getMyFavoried = () => {
    instance
      .get(`articles?favorited=${username}&limit=${limitPage}&offset=${offSet}`)
      .then((res: any) => {
        setOffset((pre: number) => pre + limitPage);

        setHasMore(offSet < res.data?.articlesCount);
        setMyFavorited((pre: any) => [...pre, ...res.data.articles]);
      });
  };

  const callApi = () => {
    instance
      .get(`articles?favorited=${username}&limit=${limitPage}&offset=${offSet}`)
      .then((res: any) => {
        setOffset((pre: number) => pre + limitPage);

        setMyFavorited(res.data.articles);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  const setFavourite = (article: any) => {
    // TO DO: update state articles
    const index = myFavorite.findIndex((a: any) => a.slug === article.slug);
    if (index < 0) return;
    const cloneUserFeeds = [...myFavorite];
    const selectedArticle = { ...cloneUserFeeds[index] };
    const currentFavourite = selectedArticle.favorited;
    selectedArticle.favorited = !currentFavourite;
    selectedArticle.favoritesCount += currentFavourite ? -1 : 1;
    cloneUserFeeds[index] = selectedArticle;
    setMyFavorited(cloneUserFeeds);
  };

  return (
    <div>
      {myFavorite === null ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <>
          {myFavorite.length > 0 ? (
            <InfiniteScroll
              dataLength={myFavorite.length}
              next={getMyFavoried}
              hasMore={hasMore}
              loader={
                <Loading>
                  <CircularProgress />
                </Loading>
              }
              scrollableTarget="scrollableDiv"
            >
              {myFavorite.map((item: any, index: number) => (
                <PostProfile
                  key={index}
                  article={item}
                  setFavourite={setFavourite}
                />
              ))}
            </InfiniteScroll>
          ) : (
            <>No articles are here... yet.</>
          )}
        </>
      )}
    </div>
  );
};
