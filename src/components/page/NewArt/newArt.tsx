import { useState, useEffect } from "react";
import FormLabel from "@mui/joy/FormLabel";
import JoyInput from "@mui/joy/Input";
import Typography from "@mui/material/Typography";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Theme, useTheme } from "@mui/material/styles";
import { instance } from "../../../GetApi";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const NewArt2 = ({ hanleClose }: any) => {
  const style = {
    position: "absolute" as "absolute",
    height: 600,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    instance.get("tags").then((res) => setTags(res.data.tags));
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const hanleSubmit = () => {
    instance
      .post("articles", {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: personName,
        },
      })
      .then((res) => {
        navigate(0);
        // window.location.reload();
        hanleClose(false);
      });
  };

  return (
    <Box sx={style}>
      <Box
        component="form"
        sx={{
          width: { xs: 250, md: 500 },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",

          mx: "auto",
          height: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Post Article
          <Divider sx={{ my: 2 }} />
        </Typography>

        <FormControl>
          <FormLabel sx={{ fontSize: "15px" }}>Article Title</FormLabel>
          <JoyInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title"
            name="Name"
            type="tel"
            autoComplete="on"
            autoFocus
            error
            fullWidth
            variant="outlined"
            color="neutral"
          />
        </FormControl>

        <FormControl>
          <FormLabel sx={{ fontSize: "15px", mt: 3 }}>
            What's this article about?
          </FormLabel>
          <JoyInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this article about?"
            name="Name"
            type="tel"
            error
            fullWidth
            variant="outlined"
            color="neutral"
          />
        </FormControl>

        <FormControl>
          <FormLabel
            sx={{ fontSize: "15px", mt: 3 }}
          >{`Write your article(in markdown)`}</FormLabel>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Write your article(in markdown)`}
            sx={{ width: "100%" }}
            color="neutral"
            minRows={5}
            size="lg"
            variant="outlined"
          />

          <FormLabel
            sx={{ fontSize: "15px", mt: 3 }}
            id="demo-multiple-checkbox-label"
          >
            Hash Tags
          </FormLabel>

          <Select
            fullWidth
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {tags.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {`# ${name}`}
              </MenuItem>
            ))}
          </Select>

          <Button
            onClick={hanleSubmit}
            sx={{ ml: "auto", mt: 3 }}
            variant="contained"
          >
            Post Article
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};
