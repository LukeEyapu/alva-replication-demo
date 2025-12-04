import { NextResponse } from "next/server";
import { subscribeReplication } from "@/src/services/replication-service";

let subscribed = false;

export async function GET() {
  if (!subscribed) {
    subscribed = true;
    await subscribeReplication("trades", ({ payload, ts }) => {
      console.log("[Copier] Received trade:", payload, "at", new Date(ts).toISOString());
    });
  }

  return NextResponse.json({ ok: true, msg: "Copier listening" });
}
