"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en");
  }, [router]);

  return (
    <main className="p-6">
      <noscript>
        <Link href="/en">Continue to English</Link>
      </noscript>
    </main>
  );
}
