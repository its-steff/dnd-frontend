"use client";

import styles from "./SkillsPanel.module.scss";
import { SkillsPanelProps } from "./SkillsPanelProps.types";

const SkillsPanel: React.FC<SkillsPanelProps> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default SkillsPanel;
