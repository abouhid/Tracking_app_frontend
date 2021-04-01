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
      className="footer bg-dark h-100 w-100"
    >
      <BottomNavigationAction
        className="p-1 text-white"
        label="Add Measure"
        value="addmeasure"
        onClick={() => console.log("test")}
        icon={<FontAwesomeIcon className="m-1 text-white" icon={faChartBar} />}
      ></BottomNavigationAction>
      <BottomNavigationAction
        className="p-1 text-white"
        label="Track"
        value="trackit"
        icon={<FontAwesomeIcon className="m-1 text-white" icon={faChartLine} />}
      />
      <BottomNavigationAction
        className="p-1 text-white"
        label="Your Progress"
        value="progress"
        icon={<FontAwesomeIcon className="m-1 text-white" icon={faChartPie} />}
      />
      <BottomNavigationAction
        className="p-1 text-white"
        label="More"
        value="more"
        icon={<FontAwesomeIcon className="m-1 text-white" icon={faEllipsisH} />}
      />
    </BottomNavigation>
  );
};

export default Footer;
