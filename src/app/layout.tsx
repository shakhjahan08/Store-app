import "./globals.css";

export const metadata = {
  title: "StoreApp | Buy and sell simply",
  description: "A marketplace for clients and sellers."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
