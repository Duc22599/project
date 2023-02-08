import { BoxProFile, Boxs } from "../../CssMui";
import Layout from "../../Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { instance } from "../../../GetApi";
import { Avatar, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MyArticle from "./MyArticle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import { MyFavorited } from "./MyFavorite";
import SettingsIcon from "@mui/icons-material/Settings";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export const ProfileUser = () => {
  const [proFile, setProFile] = useState<any>([]);
  const navigate = useNavigate();

  const param = useParams();

  const getUser = useSelector((state: any) => state.user.currentUser.username);

  const [value, setValue] = useState("home");

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
  };

  const proFiles = () => {
    instance.get(`profiles/${param.username}`).then((res) => {
      setProFile(res.data.profile);
    });
  };

  useEffect(() => {
    proFiles();
  }, [param]);

  const folower = () => {
    if (!getUser) {
      navigate("/login");
      return;
    }
    instance
      .post(`profiles/${proFile?.username}/follow`)
      .then((res: any) => proFiles());
  };

  const unFolower = () => {
    instance
      .delete(`profiles/${proFile?.username}/follow`)
      .then((res: any) => proFiles());
  };

  return (
    <Layout>
      <Boxs></Boxs>
      <BoxProFile>
        <Box
          sx={{ display: "flex", alignItems: "center", mt: { xs: -1, md: -3 } }}
        >
          <Avatar
            alt="Remy Sharp"
            src={proFile?.image}
            sx={{ width: { xs: 50, md: 100 }, height: { xs: 50, md: 100 } }}
          />
          <Typography
            sx={{
              mt: { xs: 1, md: 2 },
              fontSize: { xs: "19px", md: "30px" },
              ml: 0.5,
            }}
            variant="body1"
            gutterBottom
          >
            {proFile?.username}
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          {getUser === proFile.username ? (
            <>
              <Button
                startIcon={<SettingsIcon />}
                variant="outlined"
                color="success"
                size="small"
                onClick={() => navigate("/setting")}
              >
                Edit Profile Setting
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  proFile?.following ? unFolower() : folower();
                }}
                startIcon={<AddIcon />}
                variant="outlined"
                color="success"
                size="small"
              >
                {proFile?.following
                  ? `UnFollow ${proFile?.username}`
                  : `Follow  ${proFile?.username}`}
              </Button>
            </>
          )}
        </Typography>
      </BoxProFile>

      <Box>
        <Box sx={{ width: "80%", mx: "auto", mt: 5 }}>
          <Tabs
            sx={{ borderTop: 1, borderColor: "divider" }}
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="home" label="My Article" />
            <Tab value="favorite" label="My Favorite" />
          </Tabs>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "70%" }, mx: "auto" }}>
          <TabPanel value={value} index="home">
            <MyArticle userName={proFile?.username} />
          </TabPanel>
          <TabPanel value={value} index="favorite">
            <MyFavorited username={proFile?.username} />
          </TabPanel>
        </Box>
      </Box>
    </Layout>
  );
};
