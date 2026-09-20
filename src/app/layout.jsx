import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Cloud Memories",
  description: "A beautiful place to store your memories.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
