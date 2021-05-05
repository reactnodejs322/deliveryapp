import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useLocation } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import "./navbar.styles.scss";
import globalcss from "../../global-css/styled-component-variable";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexGrow: 1,
    maxWidth: "100%",
    justifyContent: "center",
    backgroundColor: globalcss.secondary,
    color: "white",
  },
});

const directory: { [key: string]: number } = {
  "/missioncontrol": 0,
  "/settings": 1,
  "/": 1,
};
interface ChildComponentProps extends RouteComponentProps<any> {
  currentUser?: unknown;
}
export const NavBar: React.FC<ChildComponentProps> = ({
  history,
  currentUser,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = React.useState(directory[`${location.pathname}`]);
  useEffect(() => {
    setValue(directory[`${location.pathname}`]);
  }, [location.pathname]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (!currentUser) return;

    setValue(newValue);
  };
  return (
    <div className="navbar">
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          TabIndicatorProps={{ style: { background: globalcss.primary } }}
          data-test="dateTabs"
          onChange={handleChange}
          variant="fullWidth"
          textColor="inherit"
          aria-label="icon label tabs example"
        >
          <Tab
            data-test="dateTab1"
            onClick={() => history.push("/missioncontrol")}
            label="MAP"
          />
          <Tab
            data-test="dateTab2"
            onClick={() => history.push("/settings")}
            label="SETTINGS"
          />
        </Tabs>
      </Paper>
    </div>
  );
};

export default withRouter(NavBar);
