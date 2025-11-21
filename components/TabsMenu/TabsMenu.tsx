"use client";

// import { useState } from "react";
import styles from "./TabsMenu.module.scss";
import { TabsMenuProps } from "./TabsMenu.types";

const TabsMenu: React.FC<TabsMenuProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <nav className={styles.tabsMenu}>
      {tabs.map((tab) => (
        <button
          className={activeTab === tab ? styles.active : ""}
          key={tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default TabsMenu;
