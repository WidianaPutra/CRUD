"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "@/utils/auth";

export default function Login() {
  const [isUser, setIsUser] = useState("");
  const [isPass, setIsPass] = useState("");
  const [isLogin, setIsLogin] = useState(getCookie("isLogin"));
  const [email, setEmail] = useState(getCookie("email"));
  const nav = useRouter();

  isLogin && email && nav.push("/");

  const trimmedData = (data) => {
    const trim = data.trim();
    return trim.length === 0 ? false : true;
  };

  const handleLogin = async () => {
    if (trimmedData(isUser) && trimmedData(isPass)) {
      const post = await axios.post("/api/users/login", {
        user: isUser,
        password: isPass,
      });
      if (post.data?.isLogin === true) {
        setCookie("isLogin", "true");
        post.data?.data.map((el, i) => {
          setCookie("email", el.email);
          nav.refresh();
        });
        nav.push("/");
        console.log("H");
      } else {
        alert("password salah");
      }
    } else {
      alert("Tidak berhasil Login");
    }
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
