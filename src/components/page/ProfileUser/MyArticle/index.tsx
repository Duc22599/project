import { useEffect, useRef, useState } from "react";
import { instance } from "../../../../GetApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { Loading } from "../../../CssMui";
import PostProfile from "../../../PostArt/PostProfile";

const pageLimit = 10;

export default function MyArticle({ userName }: any) {
  const [myArt, setMyArt] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offSet, setOffset] = useState(0);

  const offSets = useRef(0);

  const callMyArt = () => {
    offSets.current += pageLimit;
    instance
      .get(
        `articles?author=${userName}&limit=${pageLimit}&offset=${offSets.current}`
      )
      .then((response: any) => {
        setHasMore(offSets.current < response.data?.articlesCount);
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
