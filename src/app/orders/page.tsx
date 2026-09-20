"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrders, StoredOrder } from "@/lib/app-storage";

const demoOrders: StoredOrder[] = [
  { id: "#1024", customer: "Emma Hill", total: 237, status: "Shipped", items: [], createdAt: "" },
  { id: "#1025", customer: "Aaron Clark", total: 89, status: "Processing", items: [], createdAt: "" },
  { id: "#1026", customer: "Mila Gomez", total: 420, status: "Delivered", items: [], createdAt: "" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>(demoOrders);

  useEffect(() => {
    const saved = getOrders();
    if (saved.length) setOrders(saved);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white"><div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between"><div><p className="text-sm text-slate-400">Order history</p><h1 className="text-4xl font-bold">Recent orders</h1></div><Link href="/store" className="rounded-full bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500">Shop now</Link></div>
      <div className="space-y-4">{orders.map((order) => <div key={order.id} className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 p-5"><div><p className="text-sm text-slate-400">Order {order.id}</p><h2 className="text-xl font-semibold">{order.customer}</h2><p className="mt-1 text-sm text-slate-500">{order.items.length ? `${order.items.length} product type${order.items.length === 1 ? "" : "s"}` : "Historical order"}</p></div><div className="text-right"><p className="text-lg font-bold">${order.total}</p><p className="mt-1 text-sm text-blue-300">{order.status}</p></div></div>)}</div>
    </div></main>
  );
}
