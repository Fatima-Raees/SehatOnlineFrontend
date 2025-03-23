import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import Footer from "./pages/Footer";
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
<Footer />
      </body>
    </html>
  );
}
// "use client"; // Client Component

// import Navbar from "@/components/ui/Navbar";
// import Sidebar from "@/components/ui/Sidebar";
// import "./globals.css";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import theme from "../styles/theme";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Navbar />
//           <div style={{ display: "flex" }}>
//             <Sidebar />
//             <main style={{ flexGrow: 1, padding: "20px", marginLeft: 250 }}>{children}</main>
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
