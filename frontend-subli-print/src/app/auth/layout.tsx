import PageIllustration from "@/components/ui/page-illustration";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex grow flex-col">
      <Suspense>
        <PageIllustration multiple />
      </Suspense>
      {children}
    </main>
  );
}
