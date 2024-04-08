"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Gunung from "@/assets/th.jpg";
import { useRouter } from "next/navigation";
import axios from "axios";
import swr, { useSWRConfig } from "swr";
import Input from "@/components/input";
import { getCookie, removeCookie } from "@/utils/auth";

export default function App() {
  const [isLogin, setIsLogin] = useState(getCookie("isLogin"));
  const [email, setEmail] = useState(getCookie("email"));
  const { mutate } = useSWRConfig();
  const nav = useRouter();

  useEffect(() => {
    setIsLogin(getCookie("isLogin"));
    setEmail(getCookie("email"));
  }, []);

  const getComment = async () => {
    const getData = await axios.get("api/comment");
    return getData.data;
  };

  const handleLogout = () => {
    removeCookie("isLogin");
    removeCookie("email");
    nav.push("/back");
  };

  const { data } = swr("comment", getComment);
  return (
    <>
      <div className="flex fixed right-0">
        {!isLogin && !email && (
          <a
            href="/login"
            className="text-white p-2 px-5 cursor-pointer hover:text-red-600"
          >
            Login
          </a>
        )}
        {isLogin && email && (
          <h1
            className="text-white p-2 px-5 cursor-pointer hover:text-red-600"
            onClick={handleLogout}
          >
            Logout
          </h1>
        )}
      </div>
      <Image
        src={Gunung}
        height={200}
        width={200}
        alt="..."
        className="w-full"
      />
      <h1 className="text-3xl ">
        Bagaimana pendapat anda mengenai Gunung di atas?
      </h1>
      <h1 className="text-xl">Comment</h1>
      <Input mutate={mutate} />
      <br />
      <div className="grid md:grid-cols-4 sm:grid-cols2 grid-cols-1 gap-3">
        {data?.data.map((el) => (
          <div
            key={el.id}
            className="commet-card w-full bg-red-600 p-2 break-words"
          >
            <h1 className="text-white text-xl">{el.email}</h1>
            <p className="text-white">{el.comment}</p>
          </div>
        ))}
      </div>
      <br />
    </>
  );
}
