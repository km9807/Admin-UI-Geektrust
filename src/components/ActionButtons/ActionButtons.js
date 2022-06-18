import NavigationButtons from "../NavigationButtons/NavigationButtons";
import React from "react";
import styles from "./ActionButtons.module.css";

function ActionButtons({
  getPaginationGroups,
  changePage,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  currentPage,
  pages,
  anyUserSelected,
  handleDeleteSelected,
}) {
  return (
    <div className={styles.ActionButtons}>
      <div style={{ width: "25%" }}>
        <button
          disabled={anyUserSelected()}
          className={styles.deleteSelected}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
      </div>
      <div style={{ width: "75%" }}>
        <NavigationButtons
          content={"<<"}
          isDisabled={currentPage === 1 ? true : false}
          isActive={false}
          onClick={goToFirstPage}
        />
        <NavigationButtons
          content={"<"}
          isDisabled={currentPage === 1 ? true : false}
          isActive={false}
          onClick={goToPreviousPage}
        />
        {getPaginationGroups().map((item, index) => (
          <NavigationButtons
            key={index}
            content={item}
            onClick={changePage}
            isDisabled={false}
            isActive={currentPage === item ? true : false}
          />
        ))}
        <NavigationButtons
          content={">"}
          onClick={goToNextPage}
          isDisabled={currentPage >= pages || pages === 0 ? true : false}
          isActive={false}
        />
        <NavigationButtons
          content={">>"}
          onClick={goToLastPage}
          isDisabled={currentPage >= pages || pages === 0 ? true : false}
          isActive={false}
        />
      </div>
    </div>
  );
}

export default ActionButtons;
