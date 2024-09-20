import { fetchProduct } from "../../../lib/data";

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/")[3];

  try {
    const product = await fetchProduct(id);
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch product!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
