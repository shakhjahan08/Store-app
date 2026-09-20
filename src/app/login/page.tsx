"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "seller">("client");
  const [name, setName] = useState("John Smith");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem("storeapp-user", JSON.stringify({ name, role }));
    router.push(role === "seller" ? "/dashboard" : "/store");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/60">
        <h1 className="text-3xl font-bold">Welcome to StoreApp</h1>
        <p className="mt-2 text-slate-400">Sign in as a client or a seller.</p>

        <div className="mt-8">
          <label className="block text-sm text-slate-300">
            Full name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none ring-0 placeholder:text-slate-500"
            />
          </label>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-sm text-slate-300">Select role</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("client")}
              className={`rounded-xl px-4 py-3 font-medium transition ${
                role === "client" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
              }`}
            >
              Client
            </button>

            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`rounded-xl px-4 py-3 font-medium transition ${
                role === "seller" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        <button className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500">
          Continue as {role}
        </button>
      </form>
    </main>
  );
}
