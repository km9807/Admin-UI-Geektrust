import React from "react";
import UserDetails from "../UserDetails/UserDetails";
import styles from "./UserTable.module.css";

function UserTable({
  onDelete,
  getPaginatedData,
  handleConfirmEdit,
  onSelect,
  handleSelectAll,
  getUsersInThatPage,
  getSelectedUsers,
}) {
  return (
    <table className={styles.usersTable}>
      <thead>
        <tr>
          <th style={{ paddingLeft: "15px" }}>
            <input
              className={styles.largerCheckbox}
              type="checkbox"
              name="selectAll"
              onChange={(event) => {
                handleSelectAll(event, getUsersInThatPage());
              }}
              checked={getSelectedUsers()}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {getPaginatedData().map((user, idx) => (
          <UserDetails
            user={user}
            key={idx}
            onDelete={onDelete}
            onConfirmEdit={handleConfirmEdit}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
