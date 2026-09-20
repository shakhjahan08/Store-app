"use client";

import { useEffect, useState } from "react";
import TopNav from "@/components/TopNav";

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "Guest", role: "client" });

  useEffect(() => {
    const saved = localStorage.getItem("storeapp-user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <TopNav />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm text-slate-400">Account</p>
          <h1 className="text-4xl font-bold">Profile</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-sm capitalize text-slate-400">{user.role}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex justify-between rounded-xl bg-slate-800 p-3">
                <span>Email</span>
                <span>{user.name.toLowerCase().replace(/\s+/g, ".")}@storeapp.com</span>
              </div>
              <div className="flex justify-between rounded-xl bg-slate-800 p-3">
                <span>Location</span>
                <span>New York, US</span>
              </div>
              <div className="flex justify-between rounded-xl bg-slate-800 p-3">
                <span>Member since</span>
                <span>2026</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Orders</p>
                <p className="mt-2 text-2xl font-bold">18</p>
              </div>
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Saved items</p>
                <p className="mt-2 text-2xl font-bold">42</p>
              </div>
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Wishlist</p>
                <p className="mt-2 text-2xl font-bold">9</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
              <h3 className="text-xl font-semibold">Recent activity</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• Ordered Wireless Headphones</li>
                <li>• Added Smart Watch Pro to wishlist</li>
                <li>• Updated shipping address</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
