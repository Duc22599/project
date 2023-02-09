import { useEffect, useState, useCallback, useRef } from "react";
import { instance } from "../../../../GetApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../CssMui";
import { CircularProgress } from "@mui/material";
import PostArt from "../../../PostArt";

const PAGE_SIZE = 10;

export default function ArticlesGlobal() {
  const [globals, setGlobals] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offSet, setOffset] = useState(0);

  const offSett = useRef(0);

  const getArt = () => {
    offSett.current += PAGE_SIZE;

    instance
      .get(`articles?limit=${PAGE_SIZE}&offset=${offSett.current}`)
      .then((res) => {
        setHasMore(offSett.current < res.data?.articlesCount);

        setGlobals((prevArticles: any) => [
          ...prevArticles,
          ...res.data.articles,
        ]);
      });
  };

  // const navigate = useNavigate();
  const callApi = () => {
    instance
      .get(`articles?limit=${PAGE_SIZE}&offset=${offSet}`)
      .then((res: any) => {
        // setOffset((pre: number) => pre + PAGE_SIZE);

        setGlobals(res.data.articles);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  const setFavourite = (article: any) => {
    // TO DO: update state articles
    const index = globals.findIndex((a: any) => a.slug === article.slug);
    if (index < 0) return;
    const cloneUserFeeds = [...globals];
    const selectedArticle = { ...cloneUserFeeds[index] };
    const currentFavourite = selectedArticle.favorited;
    selectedArticle.favorited = !currentFavourite;
    selectedArticle.favoritesCount += currentFavourite ? -1 : 1;
    cloneUserFeeds[index] = selectedArticle;
    setGlobals(cloneUserFeeds);
  };

  return (
    <div
    // style={{ height: "calc(100vh - 300px)", overflow: "auto" }}
    // id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={globals.length}
        next={getArt}
        hasMore={hasMore}
        loader={
          <Loading>
            <CircularProgress />
          </Loading>
        }
        scrollableTarget="scrollableDiv"
      >
        {globals.map((item: any, index: number) => (
          <PostArt
            callApi={callApi}
            article={item}
            key={index}
            setFavourite={setFavourite}
          />
        ))}
      </InfiniteScroll>

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
    </div>
  );
}
