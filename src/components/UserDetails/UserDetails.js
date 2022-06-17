import React from "react";
import styles from "./UserDetails.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

function UserDetails({
  user,
  onDelete,
  onEdit,
  handleEditedValues,
  handleUndoEdit,
  onConfirmEdit,
  onSelect,
}) {
  const userRoleLowerCase = user.role;
  const userRole =
    userRoleLowerCase.charAt(0).toUpperCase() + userRoleLowerCase.slice(1);

  if (user.available && !user.deleted) {
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
          {user.editable ? (
            <>
              <td>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  style={{ borderRadius: "6px", height: "22px" }}
                  onChange={handleEditedValues}
                ></input>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  style={{ borderRadius: "6px", height: "22px" }}
                  onChange={handleEditedValues}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  name="role"
                  defaultValue={userRole}
                  style={{ borderRadius: "6px", height: "22px" }}
                  onChange={handleEditedValues}
                ></input>
              </td>
            </>
          ) : (
            <>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{userRole}</td>
            </>
          )}

          {user.editable ? (
            <>
              <td>
                <button className={`${user.selected ? styles.selected : ""}`}>
                  <DoneIcon onClick={onConfirmEdit} />
                </button>
                <button className={`${user.selected ? styles.selected : ""}`}>
                  <ClearIcon onClick={handleUndoEdit} />
                </button>
              </td>
            </>
          ) : (
            <>
              <td>
                <button className={`${user.selected ? styles.selected : ""}`}>
                  <EditIcon onClick={() => onEdit(user)} />
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
