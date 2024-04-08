"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isUser, setIsUser] = useState("");
  const [isPass, setIsPass] = useState("");
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const nav = useRouter();
  isLogin && email && nav.back();

  const trimmedData = (data) => {
    const trim = data.trim();
    trim.length === 0 ? false : true;
  };

  const handleLogin = async () => {
    if (!(trimmedData(isUser) && trimmedData(isUser))) {
      const post = await axios.post("/api/users/login", {
        user: isUser,
        password: isPass,
      });
      if (post.data?.isLogin === true) {
        localStorage.setItem("isLogin", "true");
        post.data?.data.map((el, i) => {
          localStorage.setItem("email", el.email);
          nav.refresh();
        });
        nav.push("/");
      }
    } else return alert("Tidak berhasil Login");
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="user"
          onChange={(e) => setIsUser(e.target.value)}
          value={isUser}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setIsPass(e.target.value)}
          value={isPass}
        />
        <input type="button" value="Login" onClick={handleLogin} />
      </div>
      <a href="/register" className="underline">
        Buat Akun
      </a>
    </>
  );
}
