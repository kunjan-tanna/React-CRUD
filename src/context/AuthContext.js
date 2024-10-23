import React, { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [loggedInUser, setLoggedInUser] = useState(null);

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
    setLoggedInUser(user);
    return { success: true };
  };

  const logout = () => {
    setLoggedInUser(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
