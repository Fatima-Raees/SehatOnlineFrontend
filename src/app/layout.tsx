import Navbar from "@/components/ui/Navbar";
import "./globals.css";

export const metadata = {
  title: "SehatOnline",
  description: "Your healthcare companion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
