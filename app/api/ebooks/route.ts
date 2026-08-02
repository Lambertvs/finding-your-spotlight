import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

// GET /api/ebooks - Fetch catalog items
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("ebooks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching ebooks:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ebooks: data || [] });
  } catch (err) {
    console.error("API error in GET /api/ebooks:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/ebooks - Create new eBook catalog entry
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseServerClient();
    const body = await request.json();
    const { title, slug, description, price_zar, file_path, cover_image_url, is_active } = body;

    if (!title || !price_zar) {
      return NextResponse.json(
        { error: "Title and Price (ZAR) are required fields." },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const { data, error } = await supabase
      .from("ebooks")
      .insert([
        {
          title,
          slug: generatedSlug,
          description: description || null,
          price_zar: Number(price_zar) || 0.0,
          file_path: file_path || "ebooks/default.pdf",
          cover_image_url: cover_image_url || null,
          is_active: is_active !== undefined ? is_active : true,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating ebook:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, ebook: data?.[0] });
  } catch (err) {
    console.error("API error in POST /api/ebooks:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/ebooks - Toggle active status or update eBook
export async function PATCH(request: Request) {
  try {
    const supabase = getSupabaseServerClient();
    const body = await request.json();
    const { id, is_active, price_zar, title, description, file_path, cover_image_url } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const updatePayload: Record<string, any> = {};
    if (is_active !== undefined) updatePayload.is_active = is_active;
    if (price_zar !== undefined) updatePayload.price_zar = Number(price_zar);
    if (title !== undefined) updatePayload.title = title;
    if (description !== undefined) updatePayload.description = description;
    if (file_path !== undefined) updatePayload.file_path = file_path;
    if (cover_image_url !== undefined) updatePayload.cover_image_url = cover_image_url;

    const { data, error } = await supabase
      .from("ebooks")
      .update(updatePayload)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating ebook:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, ebook: data?.[0] });
  } catch (err) {
    console.error("API error in PATCH /api/ebooks:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/ebooks - Delete eBook catalog entry
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("ebooks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting ebook:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("API error in DELETE /api/ebooks:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
