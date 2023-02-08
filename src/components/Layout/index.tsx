import BasicList from "../Header/header";
import Grid from "@mui/material/Grid";
import Header2 from "../Header/header2";

const Layout = ({ children }: any) => {
  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <BasicList />
      </Grid>

      <Grid item xs={12} md={10}>
        {children}

        <Header2 />
      </Grid>
    </Grid>
  );
};

export default Layout;
