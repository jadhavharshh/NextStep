import { auth } from "@/lib/auth"

console.log("Auth module loaded:", !!auth);
console.log("Auth handler:", typeof auth.handler);

export async function GET(request: Request) {
  console.log("GET request received");
  try {
    return await auth.handler(request);
  } catch (error) {
    console.error("Auth handler error:", error);
    return new Response(JSON.stringify({ error: "Auth handler failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function POST(request: Request) {
  console.log("POST request received");
  try {
    return await auth.handler(request);
  } catch (error) {
    console.error("Auth handler error:", error);
    return new Response(JSON.stringify({ error: "Auth handler failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}