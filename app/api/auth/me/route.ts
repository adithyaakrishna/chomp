import { getJwtPayload } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getJwtPayload());
}
