"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { getCurrentUser, getOrders, StoredUser } from "@/lib/app-storage";

export default function ProfilePage() {
  const [user, setUser] = useState<StoredUser>({ name: "Guest", role: "client" });
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) setUser(savedUser);
    setOrderCount(getOrders().length);
  }, []);

  return <main className="min-h-screen bg-slate-950 text-white"><TopNav /><div className="mx-auto max-w-5xl px-6 py-10"><div className="mb-8 flex items-center justify-between"><div><p className="text-sm text-slate-400">Account</p><h1 className="text-4xl font-bold">Profile</h1></div><Link href="/orders" className="rounded-full border border-slate-700 px-4 py-2 hover:bg-slate-800">View orders</Link></div><div className="grid gap-6 lg:grid-cols-[1fr_2fr]"><div className="rounded-3xl border border-slate-800 bg-slate-900 p-6"><div className="mb-5 flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">{user.name.charAt(0).toUpperCase()}</div><div><h2 className="text-2xl font-semibold">{user.name}</h2><p className="text-sm capitalize text-slate-400">{user.role}</p></div></div><div className="space-y-3 text-sm text-slate-300"><div className="flex justify-between rounded-xl bg-slate-800 p-3"><span>Email</span><span>{user.name.toLowerCase().replace(/\s+/g, ".")}@storeapp.com</span></div><div className="flex justify-between rounded-xl bg-slate-800 p-3"><span>Location</span><span>New York, US</span></div></div></div><div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6"><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-slate-800 p-4"><p className="text-sm text-slate-400">Orders</p><p className="mt-2 text-2xl font-bold">{orderCount}</p></div><div className="rounded-2xl bg-slate-800 p-4"><p className="text-sm text-slate-400">Saved items</p><p className="mt-2 text-2xl font-bold">0</p></div><div className="rounded-2xl bg-slate-800 p-4"><p className="text-sm text-slate-400">Wishlist</p><p className="mt-2 text-2xl font-bold">0</p></div></div><div className="rounded-2xl border border-slate-700 bg-slate-800 p-4"><h3 className="text-xl font-semibold">Account storage</h3><p className="mt-2 text-sm text-slate-300">Your demo profile and orders are stored securely in this browser. Connect a server database when you are ready for multi-device accounts.</p></div></div></div></div></main>;
}
