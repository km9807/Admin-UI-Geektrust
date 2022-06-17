import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import styles from "./App.module.css";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import configObject from "./config/configuration";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(configObject.USERS_URL);
      if (response.status !== StatusCodes.OK) {
        throw new Error("Something wrong while making API call");
      }
      let usersData = response.data.map((user) => ({
        ...user,
        deleted: false,
        available: true,
        editable: false,
        selected: false,
      }));
      setUsers(usersData);
    } catch (error) {
      const statusCode = error.response.status
        ? error.response.status
        : StatusCodes.BAD_REQUEST;
      setError({ statusCode, message: error.message });
    }
  };

  const handleDelete = (id) => {
    const data = [...users];
    const afterDeletionData = data.map((d) => {
      if (d.id === id) {
        return { ...d, deleted: true };
      }
      return d;
    });
    setUsers(afterDeletionData);
  };

  const handleSearch = (event) => {
    const toBeSearched = event.target.value.toLowerCase();
    const data = [...users];
    const afterSearchData = data.map((d) => {
      if (
        d.name.toLowerCase().includes(toBeSearched) ||
        d.email.toLowerCase().includes(toBeSearched) ||
        d.role.toLowerCase().includes(toBeSearched)
      ) {
        return { ...d, available: true };
      } else {
        return { ...d, available: false };
      }
    });
    setUsers(afterSearchData);
  };

  const handleEdit = (user) => {
    const data = [...users];
    const userId = data.indexOf(user);
    data[userId].editable = true;
    setUsers(data);
  };

  const handleUndoEdit = (user) => {
    const data = [...users];
    const userId = data.indexOf(user);
    data[userId].editable = false;
    setUsers(data);
  };

  const handleConfirmEdit = (user, editedValues) => {
    const data = [...users];
    const userId = data.indexOf(user);
    if (editedValues["name"]) {
      data[userId].name = editedValues.name;
    }
    if (editedValues["email"]) {
      data[userId].email = editedValues.email;
    }
    if (editedValues["role"]) {
      data[userId].role = editedValues.role;
    }
    data[userId].editable = false;
    setUsers(data);
  };

  const handleSelect = (event, user) => {
    const current = event.target;
    const data = [...users];
    const userId = data.indexOf(user);
    if (current.checked) {
      data[userId].selected = true;
    } else {
      data[userId].selected = false;
    }
    setUsers(data);
  };

  const handleSelectAll = (event, usersInThatPage) => {
    const current = event.target;
    const data = [...users];
    if (current.checked) {
      data.forEach((d) => {
        usersInThatPage.forEach((user) => {
          if (d.id === user.id) {
            d.selected = true;
          }
        });
      });
    } else {
      data.forEach((d) => {
        usersInThatPage.forEach((user) => {
          if (d.id === user.id) {
            d.selected = false;
          }
        });
      });
    }
    setUsers(data);
  };

  const handleDeleteSelected = (selectedUsers) => {
    const data = [...users];
    data.forEach((d) => {
      selectedUsers.forEach((user) => {
        if (user.id === d.id && user.selected) {
          d.deleted = true;
        }
      });
    });
    setUsers(data);
  };

  return (
    <div className={styles.AppDiv}>
      {users.length > 0 ? (
        <AdminPanel
          users={users}
          pagesLimit={configObject.PAGE_LIMIT}
          dataLimit={configObject.DATA_LIMIT}
          onDelete={handleDelete}
          onSearch={handleSearch}
          onEdit={handleEdit}
          handleUndoEdit={handleUndoEdit}
          handleConfirmEdit={handleConfirmEdit}
          onSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleDeleteSelected={handleDeleteSelected}
        />
      ) : (
        <h1>No Users to Display, {error.message}</h1>
      )}
    </div>
  );
}

export default App;
