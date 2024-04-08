"use client";
import { useRouter } from "next/navigation";
export default function Back() {
  const nav = useRouter();
  nav.refresh();
  nav.push("/");
}
