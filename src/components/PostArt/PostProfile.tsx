import { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import moment from "moment";
import { instance } from "../../GetApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ModalDetail } from "../Modal";

export default function PostProfile({ article, setFavourite }: any) {
  const [open, setOpen] = useState(false);

  const getUser = useSelector((state: any) => state.user.currentUser.username);

  const handleOpen = () => {
    setOpen(true);
    navigate(`/article/${article.slug}`);
  };
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };
  const navigate = useNavigate();
  const favorited = () => {
    if (!getUser) {
      navigate("/login");
      return;
    }

    if (setFavourite) setFavourite(article);
    instance.post(`articles/${article?.slug}/favorite`);
  };

  const unFavorite = () => {
    if (setFavourite) setFavourite(article);
    instance.delete(`articles/${article?.slug}/favorite`);
  };

  return (
    <Box sx={{ minHeight: 350, mt: 3 }}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          cursor: "pointer",
          width: { sx: 200, md: 700 },
          gridColumn: "span 2",
          flexDirection: "row",
          flexWrap: "wrap",
          resize: "horizontal",
          overflow: "hidden",
          gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
          transition: "transform 0.3s, border 0.3s",
          "&:hover": {
            borderColor: theme.vars.palette.primary.outlinedHoverBorder,
            transform: "translateY(-2px)",
          },
          "& > *": { minWidth: "clamp(0px, (360px - 100%) * 999,100%)" },
        })}
      >
        <AspectRatio
          variant="soft"
          sx={{
            flexGrow: 1,
            display: "contents",
            "--AspectRatio-paddingBottom":
              "clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))",
          }}
        >
          <img
            src="https://newsgeek.com.br/wp-content/uploads/2022/07/Itachi-Uchiha-1.jpg"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 200,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              // component={Link}
              level="h2"
              sx={{ fontSize: "md" }}
              mb={0.5}
              // onClick={handleOpen}
            >
              {article?.title}
            </Typography>

            <IconButton
              onClick={() => {
                article?.favorited ? unFavorite() : favorited();
              }}
              size="sm"
              variant="plain"
              color="primary"
              sx={{ ml: "auto", alignSelf: "flex-start" }}
            >
              <FavoriteBorderRoundedIcon
                color={article?.favorited ? "error" : "inherit"}
              />
            </IconButton>
          </Box>
          <AspectRatio
            variant="soft"
            sx={{
              "--AspectRatio-paddingBottom":
                "clamp(0px, (100% - 200px) * 999, 200px)",
              pointerEvents: "none",
            }}
          >
            <img
              alt=""
              src="https://newsgeek.com.br/wp-content/uploads/2022/07/Itachi-Uchiha-1.jpg"
            />
          </AspectRatio>
          <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
            <Avatar
              src={article?.author.image}
              variant="soft"
              color="neutral"
              alt="A"
            />

            <div>
              <Link
                sx={{ color: "black" }}
                // component={Link}
                color="success"
                onClick={() => navigate(`/${article?.author.username}`)}
                fontWeight="lg"
                level="body2"
              >
                {article?.author.username}
              </Link>
              <Typography level="body2">
                {moment(article?.createdAt).format("LL")}
              </Typography>
            </div>
          </Box>
        </Box>
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
