import React, { useState } from "react";
import styles from "./UserTable.module.css";
import UserDetails from "../UserDetails/UserDetails";

function UserTable({
  onDelete,
  onEdit,
  getPaginatedData,
  handleConfirmEdit,
  handleUndoEdit,
  onSelect,
  handleSelectAll,
  getUsersInThatPage,
  getSelectedUsers,
}) {
  const [editedValues, setEditedValues] = useState({});

  const handleEdit = (event) => {
    setEditedValues({
      ...editedValues,
      [event.target.name]: event.target.value,
    });
  };

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
            onEdit={onEdit}
            handleUndoEdit={handleUndoEdit.bind(null, user)}
            handleEditedValues={handleEdit}
            onConfirmEdit={handleConfirmEdit.bind(null, user, editedValues)}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
