import React from "react";
import "./index.css";

import { BottomNavigationAction, BottomNavigation } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartPie,
  faEllipsisH,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [value, setValue] = React.useState("addmeasure");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
      className="footer bg-dark "
    >
      <BottomNavigationAction
        className="text-white"
        label="Add Measure"
        value="addmeasure"
        onClick={() => console.log("test")}
        icon={
          <FontAwesomeIcon className="fa-2x text-white" icon={faChartBar} />
        }
      ></BottomNavigationAction>
      <BottomNavigationAction
        className="text-white"
        label="Track.it"
        value="trackit"
        icon={
          <FontAwesomeIcon className="fa-2x text-white" icon={faChartLine} />
        }
      />
      <BottomNavigationAction
        className="text-white"
        label="Your Progress"
        value="progress"
        icon={
          <FontAwesomeIcon className="fa-2x text-white" icon={faChartPie} />
        }
      />
      <BottomNavigationAction
        className="text-white"
        label="More"
        value="more"
        icon={
          <FontAwesomeIcon className="fa-2x text-white" icon={faEllipsisH} />
        }
      />
    </BottomNavigation>
  );
};

export default Footer;
