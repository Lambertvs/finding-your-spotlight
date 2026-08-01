import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseSecretKey);

// GET /api/bookings - Fetch leads
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching leads:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads: data || [] });
  } catch (err) {
    console.error("API error in GET /api/bookings:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/bookings - Update lead status or admin notes
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required." }, { status: 400 });
    }

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status) updatePayload.status = status;
    if (notes !== undefined) updatePayload.notes = notes;

    let { data, error } = await supabase
      .from("leads")
      .update(updatePayload)
      .eq("id", id)
      .select();

    // If error is missing 'notes' column, try updating without notes
    if (error && error.message.includes("notes")) {
      delete updatePayload.notes;
      const retry = await supabase
        .from("leads")
        .update(updatePayload)
        .eq("id", id)
        .select();

      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error("Error updating lead:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data?.[0] });
  } catch (err) {
    console.error("API error in PATCH /api/bookings:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
