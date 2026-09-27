import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Background } from "@/components/background";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <Background />
      <p className="text-gradient font-display text-8xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-semibold">This page wandered off.</h1>
      <p className="mt-2 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button asChild className="mt-8 rounded-full" size="lg">
        <Link href="/">Back home</Link>
      </Button>
    </main>
  );
}
