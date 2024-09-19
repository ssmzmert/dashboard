import { fetchDepartments } from "../../lib/data";

export async function GET(request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const page = url.searchParams.get("page");

  try {
    const { count, departments } = await fetchDepartments(q, page);
    // console.log("request", count, departments);
    return new Response(JSON.stringify({ count, departments }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch departments!" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
