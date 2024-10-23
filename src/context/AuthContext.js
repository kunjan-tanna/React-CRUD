import React, { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );

  const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, "secret-key").toString();
  };

  const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, "secret-key");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const signup = (user) => {
    if (users.some((u) => u.email === user.email)) {
      return { error: "Email already exists" };
    }
    user.password = encryptPassword(user.password);
    user.confirmPassword = encryptPassword(user.confirmPassword);
    const updatedUsers = [...users, user];
    console.log("updatedUsers", updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    return { success: true };
  };

  const login = (email, password) => {
    const user = users.find((u) => u.email === email);

    if (!user) {
      return { error: "User not found" };
    }
    if (decryptPassword(user.password) !== password) {
      return { error: "Invalid password" };
    }
    user.isAuthenticated = true;
    setLoggedInUser(user);
    localStorage.setItem("userData", JSON.stringify(user));
    return { success: true };
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.setItem("userData", null);
  };

  const forgotPassword = (newPassword, currentPassword) => {
    // console.log(currentPassword);
    const updatedUsers = users.map((user) =>
      decryptPassword(user.password) === currentPassword
        ? {
            ...user,
            password: encryptPassword(newPassword),
            confirmPassword: encryptPassword(newPassword),
          }
        : user
    );

    // console.log("FINALL", updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    return { success: true };
  };
  const updateUser = (data) => {
    const updatedUser = {
      ...loggedInUser,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
    };
    const updatedUsers = users.map((user) =>
      user.email === loggedInUser.email ? updatedUser : user
    );
    console.log("updatedUsers", updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setUsers(updatedUsers);
    setLoggedInUser(updatedUser);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        loggedInUser,
        users,
        decryptPassword,
        forgotPassword,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
