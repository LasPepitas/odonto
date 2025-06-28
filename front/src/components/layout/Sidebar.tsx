import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebard";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-slate-100 w-full">
        <SidebarTrigger className="cursor-pointer" />
        <section className="px-5">{children}</section>
      </main>
    </SidebarProvider>
  );
}
