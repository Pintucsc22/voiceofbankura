"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {

    e.preventDefault();

    if (
      username === "admin" &&
      password === "123456"
    ) {

      localStorage.setItem("vob_admin", "true");

      router.push("/admin/add-article");

    } else {

      alert("Invalid Credentials");

    }

  };

  return (
    <div className="
      min-h-screen
      bg-gray-100
      flex
      items-center
      justify-center
      p-4
    ">

      <div className="
        bg-white
        rounded-3xl
        shadow-2xl
        p-8
        w-full
        max-w-md
      ">

        <h1 className="
          text-4xl
          font-extrabold
          text-center
          text-red-700
        ">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Voice Of Bankura
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            placeholder="Username"
            className="
              w-full
              border
              p-4
              rounded-2xl
              outline-none
            "
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full
              border
              p-4
              rounded-2xl
              outline-none
            "
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="
            w-full
            bg-red-700
            hover:bg-black
            transition
            text-white
            py-4
            rounded-2xl
            font-bold
            text-lg
          ">

            Login

          </button>

        </form>

      </div>

    </div>
  );
}