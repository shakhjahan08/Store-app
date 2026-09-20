"use client";

import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          StoreApp
        </Link>

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Link href="/store" className="rounded-full px-3 py-2 hover:bg-slate-800">Store</Link>
          <Link href="/dashboard" className="rounded-full px-3 py-2 hover:bg-slate-800">Dashboard</Link>
          <Link href="/seller" className="rounded-full px-3 py-2 hover:bg-slate-800">Seller</Link>
          <Link href="/orders" className="rounded-full px-3 py-2 hover:bg-slate-800">Orders</Link>
          <Link href="/profile" className="rounded-full px-3 py-2 hover:bg-slate-800">Profile</Link>
          <Link href="/cart" className="rounded-full bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}
