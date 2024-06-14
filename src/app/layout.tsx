
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Appbar from "../components/appbar";
import Sidebar from "../components/sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {/* <ResizablePanelGroup direction="horizontal">
  <ResizablePanel>
  <Appbar />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>
  <ResizablePanelGroup direction="vertical">
  <ResizablePanel>
  <Sidebar />
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>
  {children}
  </ResizablePanel>
  </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup> */}
    <html lang="en" >
      <body className="min-h-screen">
        <Appbar />
        <Sidebar />
        <main className={`ml-64 pt-16 ${inter.className}`}>
          {children}
        </main>
      </body>
    </html>
    </>
  );
}
