import "./globals.css";

export const metadata = {
  title: "StoreApp",
  description: "Marketplace web app for clients and sellers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
