"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/store/session-store";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="sidebar-link"
      onClick={() => {
        signOut();
        router.push("/login");
      }}
    >
      <LogOut aria-hidden /> Log out
    </button>
  );
}
