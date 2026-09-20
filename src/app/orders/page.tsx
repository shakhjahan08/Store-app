"use client";

const orders = [
  { id: "#1024", customer: "Emma Hill", total: 237, status: "Shipped" },
  { id: "#1025", customer: "Aaron Clark", total: 89, status: "Processing" },
  { id: "#1026", customer: "Mila Gomez", total: 420, status: "Delivered" },
  { id: "#1027", customer: "Noah Smith", total: 120, status: "Pending" },
];

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm text-slate-400">Seller orders</p>
          <h1 className="text-4xl font-bold">Recent orders</h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div>
                <p className="text-sm text-slate-400">Order {order.id}</p>
                <h2 className="text-xl font-semibold">{order.customer}</h2>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">${order.total}</p>
                <p className="mt-1 text-sm text-blue-300">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
