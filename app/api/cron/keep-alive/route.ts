import {
  recordKeepAlivePing,
  verifyCronAuthorization,
} from "@/lib/supabase/keep-alive";
import { NextResponse } from "next/server";

async function handleKeepAlive(request: Request) {
  try {
    if (!verifyCronAuthorization(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { pingedAt, tableCreated } = await recordKeepAlivePing();

    return NextResponse.json({
      success: true,
      data: { pingedAt, tableCreated },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handleKeepAlive(request);
}

export async function POST(request: Request) {
  return handleKeepAlive(request);
}
