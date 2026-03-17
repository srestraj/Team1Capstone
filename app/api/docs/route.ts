import { NextResponse } from "next/server";
import { getApiDocs } from "@/app/lib/swagger";

export async function GET() {
  const spec = getApiDocs();
  return NextResponse.json(spec);
}