import PostArt from "../../../PostArt";
import { useState, useEffect, useRef } from "react";
import { instance } from "../../../../GetApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { Loading } from "../../../CssMui";

export default function YouFeed() {
  const [following, setFollowing] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offSet, setOffset] = useState(0);

  const limitPage = 10;

  const offSets = useRef(0);

  const callFolow = () => {
    offSets.current += limitPage;
    instance
      .get(`articles/feed?limit=${limitPage}&offset=${offSets.current}`)
      .then((res: any) => {
        setHasMore(offSets.current < res.data.articlesCount);

        setFollowing((pre: any) => [...pre, ...res.data.articles]);
      });
  };

  const callApi = () => {
    instance
      .get(`articles/feed?limit=${limitPage}&offset=${offSet}`)
      .then((res: any) => {
        // setOffset((pre: number) => pre + limitPage);

        setFollowing(res.data.articles);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  const setFavourite = (article: any) => {
    // TO DO: update state articles
    const index = following.findIndex((a: any) => a.slug === article.slug);
    if (index < 0) return;
    const cloneUserFeeds = [...following];
    const selectedArticle = { ...cloneUserFeeds[index] };
    const currentFavourite = selectedArticle.favorited;
    selectedArticle.favorited = !currentFavourite;
    selectedArticle.favoritesCount += currentFavourite ? -1 : 1;
    cloneUserFeeds[index] = selectedArticle;
    setFollowing(cloneUserFeeds);
  };

  return (
    <>
      {following === null ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <>
          {following.length > 0 && following ? (
            <div
            // id="scrollableDiv"
            // style={{
            //   height: 300,
            //   overflow: "auto",
            //   display: "flex",
            //   flexDirection: "column-reverse",
            // }}
            >
              <InfiniteScroll
                dataLength={following.length}
                next={callFolow}
                hasMore={hasMore}
                loader={
                  <Loading>
                    <CircularProgress />
                  </Loading>
                }
                scrollableTarget="scrollableDiv"
              >
                {following.map((item: any, index: number) => (
                  <PostArt
                    key={index}
                    article={item}
                    setFavourite={setFavourite}
                  />
                ))}
              </InfiniteScroll>
            </div>
          ) : (
            <>No articles are here... yet.</>
          )}
        </>
      )}
    </>
  );
}
