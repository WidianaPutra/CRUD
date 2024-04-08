"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Input({ mutate }) {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const nav = useRouter();
  nav.refresh();
  const [isMsg, setIsMsg] = useState("");

  const trimmedData = (data) => {
    const trim = data.trim();
    trim.length === 0 ? false : true;
  };

  const handlePostData = async () => {
    if (!(email && isLogin)) return nav.push("/login");
    if (!trimmedData(isMsg)) {
      const postData = await axios.post("/api/comment", {
        email,
        comment: isMsg,
      });
      mutate("comment");
    } else return alert("T");
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
