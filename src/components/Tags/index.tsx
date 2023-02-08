import { Box, Button, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { instance } from "../../GetApi";

export const TagsName = ({ onTagName }: any) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    instance.get("tags").then((res) => setTags(res.data.tags));
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
        display: { xs: "none", md: "inline-block" },
      }}
    >
      <Card sx={{ p: 2 }}>
        {tags.map((tag, i) => (
          <Button
            key={i}
            sx={{
              margin: "5px",
            }}
            variant="outlined"
            onClick={() => {
              onTagName(tag);
            }}
          >
            {`# ${tag}`}
          </Button>
        ))}
      </Card>
    </Box>
  );
};
