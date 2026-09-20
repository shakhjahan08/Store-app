import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          StoreApp
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/store" className="rounded-full border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">
            Browse store
          </Link>
          <Link href="/login" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500">
            Login
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
            Client & Seller marketplace
          </p>
          <h1 className="text-5xl font-black leading-tight tracking-tight">
            Buy better, sell smarter.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            A storefront for buyers and a control panel for sellers in one simple web app.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/store" className="rounded-full bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
              Shop now
            </Link>
            <Link href="/dashboard" className="rounded-full border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800">
              Seller dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/70">
          <div className="grid gap-4">
            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Monthly sales</p>
              <p className="mt-2 text-3xl font-bold">$12.4K</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Orders</p>
                <p className="mt-2 text-2xl font-bold">342</p>
              </div>
              <div className="rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Sellers</p>
                <p className="mt-2 text-2xl font-bold">48</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
