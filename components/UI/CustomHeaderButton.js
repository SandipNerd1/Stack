import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { MaterialIcons } from "@expo/vector-icons";

const CustomHeaderButtons = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={35}
      color="#ff4848"
    />
  );
};

export default CustomHeaderButtons;
