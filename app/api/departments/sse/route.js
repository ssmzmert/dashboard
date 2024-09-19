//app/api/departments/sse/route.js
import { NextResponse } from "next/server";
import { Department } from "../../../lib/models";

export async function GET(req) {
  const changeStream = Department.watch();
  const { headers } = req;

  // Check if the client accepts SSE
  if (headers.get("accept") === "text/event-stream") {
    // Create a readable stream for the response
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        const HEARTBEAT_INTERVAL = 1000; // 5 seconds (adjust this as needed)

        // Send a heartbeat message to keep the connection alive
        const intervalId = setInterval(() => {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        }, HEARTBEAT_INTERVAL);

        // Function to send updates
        const sendUpdate = (data) => {
          const event = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(event));
        };

        // Listen to changeStream and send updates
        changeStream.on("change", (change) => {
          sendUpdate(change);
        });

        req.signal.addEventListener("abort", () => {
          clearInterval(intervalId);
          controller.close();
        });
      },
    });

    // Set required headers for SSE
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } else {
    // Return 404 for non-SSE requests
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
}
