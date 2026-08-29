export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-y-auto px-4 py-6">
      {children}
    </div>
  );
}
