import { NextResponse } from "next/server";
import { publishReplication } from "@/src/services/replication-service";

export async function GET() {
  const trade = {
    symbol: "BTCUSDT",
    side: "BUY",
    qty: 1,
    masterTradeId: `m-${Date.now()}`
  };

  await publishReplication("trades", trade);
  return NextResponse.json({ ok: true, trade });
}
