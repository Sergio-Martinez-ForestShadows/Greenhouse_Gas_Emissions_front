export function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-primary/40" />
          <div className="absolute inset-4 rounded-full bg-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Loading emissions data...</p>
      </div>
    </div>
  );
}
