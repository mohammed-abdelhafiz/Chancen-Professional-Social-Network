import { Header } from "@/components/layout/header/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <Header />
      {children}
    </div>
  );
}
