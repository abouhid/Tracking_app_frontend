import React from "react";
import "./index.css";

import { BottomNavigationAction, BottomNavigation } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faChartPie,
  faEllipsisH,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className="footer">
      <BottomNavigationAction
        label="Add Measure"
        value="addmeasure"
        onClick={() => console.log("test")}
        icon={
          <FontAwesomeIcon
            className="ml-3 fa-2x text-white"
            icon={faChartBar}
          />
        }
      ></BottomNavigationAction>

      <BottomNavigationAction
        label="Track.it"
        value="trackit"
        icon={
          <FontAwesomeIcon
            className="ml-3 fa-2x text-white"
            icon={faChartLine}
          />
        }
      />
      <BottomNavigationAction
        label="Your Progress"
        value="progress"
        icon={
          <FontAwesomeIcon
            className="ml-3 fa-2x text-white"
            icon={faChartPie}
          />
        }
      />
      <BottomNavigationAction
        label="More"
        value="more"
        icon={
          <FontAwesomeIcon
            className="ml-3 fa-2x text-white"
            icon={faEllipsisH}
          />
        }
      />
    </BottomNavigation>
  );
};

export default Footer;
