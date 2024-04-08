"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { email, user, isLogin } from "@/libs/localStorage.js";

export default function Register() {
  const [hidePass, setHidePass] = useState(false);
  const [inputType, setInputType] = useState("password");
  const nav = useRouter();
  isLogin && email && nav.back();

  const [user, setUser] = useState("");
  const [isEmail, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleHidePassword = (event) => {
    setHidePass(event.target.checked);
    hidePass ? setInputType("password") : setInputType("text");
  };

  const trimmedData = (data) => {
    const trim = data.trim();
    trim.length === 0 ? false : true;
  };

  const handleUpData = async () => {
    if (trimmedData(user) && trimmedData(isEmail) && trimmedData(pass))
      return alert("form tidak valid");
    else {
      const post = await axios.post("/api/users", {
        user,
        email: isEmail,
        password: pass,
      });
      console.log(post.data?.data.email);
      if (post.data?.isLogin === true) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("email", post.data?.data.email);
        nav.push("/");
      } else return alert("Tidak berhasil Login");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUser(e.target.value)}
        value={user}
      />
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type={inputType}
        placeholder="password"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
      />
      <input type="checkbox" onChange={handleHidePassword} checked={hidePass} />
      <label>Show Password</label>
      <br />
      <button onClick={handleUpData}>Submit</button>
    </div>
  );
}
