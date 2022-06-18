import React, { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./UserDetails.module.css";

function UserDetails({ user, onDelete, onConfirmEdit, onSelect }) {
  const userRoleLowerCase = user.role;
  const userRole =
    userRoleLowerCase.charAt(0).toUpperCase() + userRoleLowerCase.slice(1);

  const [editable, setEditable] = useState(false);

  const [userEditState, setUserEditState] = useState(user);

  const handleEditedValues = (event) => {
    setUserEditState({
      ...userEditState,
      [event.target.name]: event.target.value,
    });
  };

  const onEdit = () => {
    setEditable(true);
    setUserEditState({ ...user });
  };

  const onConfirm = () => {
    onConfirmEdit(user, userEditState);
    setEditable(false);
  };

  if (user.available) {
    return (
      <>
        <tr className={`${user.selected ? styles.selected : ""}`}>
          <td style={{ paddingLeft: "15px" }}>
            <input
              className={styles.largerCheckbox}
              type="checkbox"
              name={user.name}
              onChange={(event) => onSelect(event, user)}
              checked={user.selected}
            />
          </td>
          {editable ? (
            <>
              {[
                { name: "name", type: "text" },
                { name: "email", type: "email" },
                { name: "role", type: "text" },
              ].map((field) => (
                <td key={field.name}>
                  <input
                    type={field.type}
                    name={field.name}
                    value={userEditState[field.name]}
                    style={{ borderRadius: "6px", height: "22px" }}
                    onChange={handleEditedValues}
                  ></input>
                </td>
              ))}
            </>
          ) : (
            <>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{userRole}</td>
            </>
          )}

          {editable ? (
            <>
              <td>
                <button className={`${user.selected ? styles.selected : ""}`}>
                  <DoneIcon onClick={() => onConfirm()} />
                </button>
                <button className={`${user.selected ? styles.selected : ""}`}>
                  <ClearIcon onClick={() => setEditable(false)} />
                </button>
              </td>
            </>
          ) : (
            <>
              <td>
                <button className={`${user.selected ? styles.selected : ""}`}>
                  <EditIcon onClick={() => onEdit()} />
                </button>
                <button className={`${user.selected ? styles.selected : ""}`}>
                  <DeleteOutlineIcon
                    style={{ color: "red" }}
                    onClick={() => onDelete(user.id)}
                  />
                </button>
              </td>
            </>
          )}
        </tr>
      </>
    );
  }
}

export default UserDetails;
