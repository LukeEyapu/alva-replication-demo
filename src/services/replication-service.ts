import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Separate connections for publishing and subscribing
const publisher = new Redis(redisUrl);
const subscriber = new Redis(redisUrl);

export async function publishReplication(channel: string, payload: unknown) {
  const message = JSON.stringify({ payload, ts: Date.now() });
  await publisher.publish(channel, message);
  console.log(`[ReplicationService] Published -> ${channel}`, payload);
}

let subscribedChannels: Set<string> = new Set();

export async function subscribeReplication(
  channel: string,
  handler: (data: { payload: unknown; ts: number }) => void
) {
  if (subscribedChannels.has(channel)) return; // avoid duplicates in dev mode
  subscribedChannels.add(channel);

  await subscriber.subscribe(channel);
  console.log(`[ReplicationService] Subscribed <- ${channel}`);

  subscriber.on("message", (chan, raw) => {
    if (chan !== channel) return;
    try {
      const parsed = JSON.parse(raw);
      handler(parsed);
    } catch (e) {
      console.error("[ReplicationService] Parse error:", e);
    }
  });
}
