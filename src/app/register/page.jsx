"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/auth";

export default function Register() {
  const [hidePass, setHidePass] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [isLogin, setIsLogin] = useState(getCookie("isLogin"));
  const [email, setEmailC] = useState(getCookie("email"));
  const nav = useRouter();
  !isLogin && !email && nav.push("/");

  const [user, setUser] = useState("");
  const [isEmail, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleHidePassword = (event) => {
    setHidePass(event.target.checked);
    hidePass ? setInputType("password") : setInputType("text");
  };

  const trimmedData = (data) => {
    const trim = data.trim();
    return trim.length === 0 ? false : true;
  };

  const handleUpData = async () => {
    if (!trimmedData(user) || !trimmedData(isEmail) || !trimmedData(pass)) {
      alert("Form tidak valid");
      return;
    }

    try {
      const post = await axios.post("/api/users", {
        user,
        email: isEmail,
        password: pass,
      });

      if (post.data?.isLogin === true) {
        setCookie("isLogin", "true");
        setCookie("email", post.data?.data.email);
        nav.push("/");
      } else {
        alert("Tidak berhasil Login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Terjadi kesalahan saat mendaftar.");
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
        value={isEmail}
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
