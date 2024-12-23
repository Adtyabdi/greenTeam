export const dynamic = "force-dynamic";

import { db } from "@/app/lib/db";

function convertToCSV(data) {
  if (!data.length) return "";

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");

  return `${headers}\n${rows}`;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type || !["incubator", "battery"].includes(type)) {
    return new Response(JSON.stringify({ error: "Invalid type parameter" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const connection = await db();
    console.log("Database connected");

    let query = "";
    if (type === "incubator") {
      query = "SELECT * FROM incubator";
    } else if (type === "battery") {
      query = "SELECT * FROM battery";
    }

    const [rows] = await connection.execute(query);

    const csvData = convertToCSV(rows);

    return new Response(csvData, {
      status: 200,
      headers: {
        "content-type": "text/csv",
        "content-disposition": `attachment; filename="${type}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching data", error: error.message }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
