"use client";
import { useState } from "react";

export default function Home() {
  const [trade, setTrade] = useState<any>(null);

  async function replicateTrade() {
    const res = await fetch("/api/master");
    const data = await res.json();
    setTrade(data.trade);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-6 p-10 bg-white dark:bg-black rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Alva Replication Demo
        </h1>
        <button
          onClick={replicateTrade}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Replicate Trade
        </button>

        {trade && (
          <div className="mt-6 text-left">
            <h2 className="text-xl font-medium text-black dark:text-zinc-50">
              Last Published Trade:
            </h2>
            <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg text-sm text-black dark:text-zinc-50">
              {JSON.stringify(trade, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
