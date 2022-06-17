import React from "react";
import styles from "./NavigationButtons.module.css";

function NavigationButtons({ content, onClick, isDisabled, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.navBtns} ${isActive ? styles.active : ""}`}
      disabled={isDisabled}
    >
      <span>{content}</span>
    </button>
  );
}

export default NavigationButtons;
