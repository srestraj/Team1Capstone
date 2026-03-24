import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public/swagger.json");
  const file = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}