import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import { instance } from "../../../../GetApi";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { Avatar } from "@mui/material";

export function Comments({ data, userName, avatarUser }: any) {
  const [postComment, setPostComment] = useState("");
  const [getComment, setGetComment] = useState<any>([]);

  const getComments = () => {
    instance
      .get(`articles/${data}/comments`)
      .then((res) => setGetComment(res.data.comments));
  };

  useEffect(() => {
    getComments();
  }, [data]);

  const handlePost = () => {
    instance
      .post(`articles/${data}/comments`, {
        comment: {
          body: postComment,
        },
      })
      .then((res) => {
        setPostComment("");
        getComments();
      });
  };

  const onEnter = (e: any) => {
    if (e.code !== "Enter") {
      return;
    }

    handlePost();
  };

  // Delete Comment

  const handleDelete = (id: number) => {
    instance
      .delete(`articles/${data}/comments/${id}`)
      .then((res) => getComments());
  };

  return (
    <>
      {getComment?.map((item: any, index: number) => (
        <Card key={index} variant="outlined" sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "md", mb: 2.5 }}>
            {item.body}

            <Typography
              level="body3"
              sx={{ fontWeight: "sm", color: "text.secondary", ml: 1 }}
            >
              {/* {moment().startOf(item.createdAt).fromNow()} */}
            </Typography>
          </Typography>

          <CardOverflow
            variant="soft"
            sx={{
              display: "flex",
              gap: 1.5,
              py: 1.5,
              px: "var(--Card-padding)",
              bgcolor: "background.level1",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              level="body3"
              sx={{
                fontWeight: "md",
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ mr: 1 }}
                src={item.author.image}
                aria-label="recipe"
              />
              {item.author.username}
            </Typography>

            <Button
              variant="outlined"
              color="success"
              size="sm"
              sx={{ ml: "auto" }}
              onClick={() => handleDelete(item.id)}
            >
              <DeleteIcon />
            </Button>
          </CardOverflow>
        </Card>
      ))}

      <FormControl onKeyUp={onEnter} sx={{ mt: 3 }}>
        <FormLabel>Your comment</FormLabel>
        <Textarea
          placeholder="Type something here…"
          minRows={3}
          value={postComment}
          onChange={(e) => {
            setPostComment(e.target.value);
          }}
          endDecorator={
            <Box
              sx={{
                display: "flex",
                gap: "var(--Textarea-paddingBlock)",
                pt: "var(--Textarea-paddingBlock)",
                borderTop: "1px solid",
                borderColor: "divider",
                flex: "auto",
              }}
            >
              <Typography
                level="body3"
                sx={{
                  fontWeight: "md",
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ mr: 1 }} src={avatarUser} aria-label="recipe" />
                {userName}
              </Typography>

              <Button onClick={handlePost} sx={{ ml: "auto" }}>
                Send
              </Button>
            </Box>
          }
        />
      </FormControl>
    </>
  );
}
