export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 rounded-full border-4 border-muted border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
