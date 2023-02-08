import { useState, useEffect } from "react";
import FormLabel from "@mui/joy/FormLabel";
import JoyInput from "@mui/joy/Input";
import Layout from "../../Layout";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Theme, useTheme } from "@mui/material/styles";
import { instance } from "../../../GetApi";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

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

export function EditArt() {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const param = useParams();

  const navigate = useNavigate();

  const callEditArt = () => {
    instance.get(`/articles/${param.slug}`).then((res: any) => {
      setPersonName(res.data.article.tagList);
      setTitle(res.data.article.title);
      setDescription(res.data.article.description);
      setBody(res.data.article.body);
    });
  };

  useEffect(() => {
    instance.get("tags").then((res) => setTags(res.data.tags));

    callEditArt();
  }, [param]);

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
      .put(`articles/${param.slug}`, {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: personName,
        },
      })
      .then((res) => navigate("/"));
  };

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          width: { xs: 250, md: 500 },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",

          mt: "50px",
          mx: "auto",
          height: "100vh",
        }}
      >
        <FormControl>
          <FormLabel sx={{ fontSize: "20px" }}>Article Title</FormLabel>
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
          <FormLabel sx={{ fontSize: "20px", mt: 3 }}>
            What's this article about?
          </FormLabel>
          <JoyInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this article about?"
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
          <FormLabel
            sx={{ fontSize: "20px", mt: 3 }}
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
            sx={{ fontSize: "20px", mt: 3 }}
            id="demo-multiple-chip-label"
          >
            Hash Tags
          </FormLabel>

          <Select
            fullWidth
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>

          <Button
            onClick={hanleSubmit}
            sx={{ ml: "auto", mt: 3 }}
            variant="contained"
          >
            Contained
          </Button>
        </FormControl>
      </Box>
    </Layout>
  );
}

//Test
