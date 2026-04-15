import { useState } from "react";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!email.includes("@")) return "Invalid email";
    if (password.length < 6) return "Password too short";
    return null;
  };

  return {
    email,
    password,
    remember,
    error,
    setEmail,
    setPassword,
    setRemember,
    setError,
    validate,
  };
};