"use client";

import TopNav from "@/components/TopNav";
import StatCard from "@/components/StatCard";
import { useEffect, useState } from "react";
import { sellerProducts, sellerSummary } from "@/lib/store-data";

export default function DashboardPage() {
  const [name, setName] = useState("Seller");

  useEffect(() => {
    const user = localStorage.getItem("storeapp-user");
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed?.name) setName(parsed.name);
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <TopNav />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Seller dashboard</p>
            <h1 className="text-4xl font-bold">Welcome, {name}</h1>
          </div>

          <div className="flex gap-3">
            <a href="/seller" className="rounded-full border border-slate-700 px-4 py-2 hover:bg-slate-800">
              Product manager
            </a>
            <a href="/orders" className="rounded-full bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500">
              Orders
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Sales" value={`$${sellerSummary.sales.toLocaleString()}`} />
          <StatCard label="Orders" value={sellerSummary.orders.toString()} />
          <StatCard label="Products" value={sellerSummary.products.toString()} />
          <StatCard label="Pending" value={sellerSummary.pending.toString()} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your listings</h2>
              <a href="/seller" className="text-sm text-blue-300">Manage</a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-slate-800">
                  <tr className="text-slate-300">
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Revenue</th>
                  </tr>
                </thead>

                <tbody>
                  {sellerProducts.map((product) => (
                    <tr key={product.id} className="border-t border-slate-800">
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">{product.category}</td>
                      <td className="p-4">${product.price}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4">${product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Quick actions</h2>
            <div className="mt-5 space-y-3">
              <a href="/seller" className="block rounded-2xl bg-slate-800 p-4 hover:bg-slate-700">Add new product</a>
              <a href="/orders" className="block rounded-2xl bg-slate-800 p-4 hover:bg-slate-700">View all orders</a>
              <a href="/profile" className="block rounded-2xl bg-slate-800 p-4 hover:bg-slate-700">Edit profile</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
