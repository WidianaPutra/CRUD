"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "@/utils/auth";

export default function Input({ mutate }) {
  const [isLogin, setIsLogin] = useState(getCookie("isLogin"));
  const [email, setEmail] = useState(getCookie("email"));
  const nav = useRouter();
  const [isMsg, setIsMsg] = useState("");

  useEffect(() => {
    setIsLogin(getCookie("isLogin"));
    setEmail(getCookie("email"));
  }, []);

  const trimmedData = (data) => {
    const trim = data.trim();
    return trim.length === 0 ? false : true;
  };

  const handlePostData = async () => {
    if (!(email && isLogin)) return nav.push("/login");
    if (trimmedData(isMsg)) {
      const postData = await axios.post("/api/comment", {
        email,
        comment: isMsg,
      });
      mutate("comment");
    } else {
      alert("T");
    }
  };

  return (
    <div className="flex">
      <textarea
        style={{ resize: "none" }}
        onChange={(e) => setIsMsg(e.target.value)}
        value={isMsg}
      ></textarea>
      <button onClick={handlePostData}>Kirim</button>
    </div>
  );
}
