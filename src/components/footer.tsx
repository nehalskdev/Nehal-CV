import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 border-t pt-8 pb-28 text-center text-sm text-muted-foreground sm:pb-32">
      <p>
        Designed & built by{" "}
        <span className="font-medium text-foreground">{profile.name} | </span>©{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
