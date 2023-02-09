import { useState, useEffect } from "react";
import Layout from "../../Layout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ArticlesGlobal from "./ArticlesGlobal";
import { instance } from "../../../GetApi";
import Grid from "@mui/material/Grid";
import { Button, Card } from "@mui/material";
import { HashTag } from "./HashTag";
import YouFeed from "./YouFeed";
import { TagsName } from "../../Tags";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export const ArticlesPage = () => {
  const [value, setValue] = useState("home");

  const [type, setType] = useState("");
  const getUserToken = sessionStorage.getItem("userToken");

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setType("");
  };

  const activeByHashTag = (hashTags: any) => {
    setValue(hashTags);
    setType(hashTags);
  };

  return (
    <Layout>
      <Box
        sx={{ width: { xs: "100%", md: "95%" }, ml: { xs: 0, md: 1, lg: 6 } }}
      >
        <Box sx={{ width: "100%" }}>
          <Tabs
            sx={{ borderBottom: 1, borderColor: "divider" }}
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            {getUserToken && (
              <Tab value={getUserToken ? "home" : "feed"} label="Your Feed" />
            )}
            <Tab value={getUserToken ? "global" : "home"} label="Global Feed" />
            {type && <Tab value={type} label={`# ${type}`} />}
          </Tabs>
        </Box>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Box sx={{ width: { xs: "100%", md: "70%" }, m: "auto" }}>
              <TabPanel value={value} index={getUserToken ? "home" : "feed"}>
                <YouFeed />
              </TabPanel>
              <TabPanel value={value} index={getUserToken ? "global" : "home"}>
                <ArticlesGlobal />
              </TabPanel>
              <TabPanel value={value} index={type}>
                <HashTag data={type} />
              </TabPanel>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <TagsName onTagName={activeByHashTag} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};
