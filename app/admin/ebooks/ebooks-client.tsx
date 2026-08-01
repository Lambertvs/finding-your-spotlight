"use client";

import React, { useState } from "react";
import {
  BookOpenIcon,
  PlusIcon,
  XIcon,
  FileTextIcon,
  TagIcon,
  PencilIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  UploadIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type EbookItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price_zar: number;
  file_path: string;
  cover_image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export function EbooksClient({ initialEbooks }: { initialEbooks: EbookItem[] }) {
  const [ebooks, setEbooks] = useState<EbookItem[]>(initialEbooks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<EbookItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form State for Add / Edit
  const [form, setForm] = useState({
    title: "",
    description: "",
    price_zar: "0.00",
    file_path: "",
    cover_image_url: "",
    is_active: true,
  });

  const openAddModal = () => {
    setEditingBook(null);
    setForm({
      title: "",
      description: "",
      price_zar: "0.00",
      file_path: "",
      cover_image_url: "",
      is_active: true,
    });
    setErrorMsg("");
    setIsAddModalOpen(true);
  };

  const openEditModal = (book: EbookItem) => {
    setEditingBook(book);
    setForm({
      title: book.title,
      description: book.description || "",
      price_zar: Number(book.price_zar).toFixed(2),
      file_path: book.file_path || "",
      cover_image_url: book.cover_image_url || "",
      is_active: book.is_active,
    });
    setErrorMsg("");
    setIsAddModalOpen(true);
  };

  // Handle PDF file selection & direct upload to Supabase Storage
  const handlePdfFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "ebooks-private");
      formData.append("folder", "pdfs");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to upload file");

      setForm((prev) => ({ ...prev, file_path: result.filePath }));
    } catch (err: any) {
      setErrorMsg(err.message || "File upload failed.");
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (editingBook) {
        // Update existing book (PATCH)
        const res = await fetch("/api/ebooks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingBook.id,
            title: form.title,
            description: form.description,
            price_zar: parseFloat(form.price_zar),
            file_path: form.file_path,
            cover_image_url: form.cover_image_url || null,
            is_active: form.is_active,
          }),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to update eBook");

        setEbooks(
          ebooks.map((item) => (item.id === editingBook.id ? result.ebook : item))
        );
      } else {
        // Create new book (POST)
        const res = await fetch("/api/ebooks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            price_zar: parseFloat(form.price_zar),
            file_path: form.file_path,
            cover_image_url: form.cover_image_url || null,
            is_active: form.is_active,
          }),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to create eBook");

        setEbooks([result.ebook, ...ebooks]);
      }

      setIsAddModalOpen(false);
      setEditingBook(null);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/ebooks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_active: !currentStatus }),
      });

      const result = await res.json();
      if (res.ok && result.ebook) {
        setEbooks(
          ebooks.map((item) => (item.id === id ? { ...item, is_active: !currentStatus } : item))
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Digital Products & eBooks Catalog</h1>
          <p className="text-sm text-muted-foreground">
            Manage product details, ZAR pricing, direct Supabase PDF storage uploads, and availability.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-medium"
        >
          <PlusIcon className="w-4 h-4" /> Add New eBook
        </Button>
      </div>

      {/* Catalog Table View */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider border-b">
              <tr>
                <th className="px-4 py-3">Book Cover & Title</th>
                <th className="px-4 py-3">Price (ZAR)</th>
                <th className="px-4 py-3">Digital PDF Path</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ebooks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No eBooks found in catalog.
                  </td>
                </tr>
              ) : (
                ebooks.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    {/* Cover & Title */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {item.cover_image_url ? (
                          <img
                            src={item.cover_image_url}
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded border border-border shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-16 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
                            <BookOpenIcon className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <span className="font-semibold text-foreground text-base block leading-tight">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono block mt-0.5">
                            /{item.slug}
                          </span>
                          {item.description && (
                            <span className="text-xs text-muted-foreground/80 block mt-1 line-clamp-1 max-w-md">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Price in ZAR */}
                    <td className="px-4 py-4 font-bold text-amber-500 text-base">
                      R {Number(item.price_zar).toFixed(2)}
                    </td>

                    {/* Digital Storage File Path */}
                    <td className="px-4 py-4">
                      <span
                        className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border inline-block max-w-[220px] truncate"
                        title={item.file_path}
                      >
                        {item.file_path || "No file uploaded"}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleToggleActive(item.id, item.is_active)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          item.is_active
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                        }`}
                        title="Click to toggle status"
                      >
                        {item.is_active ? (
                          <CheckCircle2Icon className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircleIcon className="w-3.5 h-3.5" />
                        )}
                        <span>{item.is_active ? "Active" : "Draft"}</span>
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditModal(item)}
                          className="h-8 gap-1.5 text-xs font-medium"
                        >
                          <PencilIcon className="w-3.5 h-3.5" /> Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Modal (Add & Edit eBook with Direct File Upload) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-xl relative space-y-4 text-card-foreground">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-semibold text-foreground">
                {editingBook ? `Edit "${editingBook.title}"` : "Add New Digital eBook"}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 border border-red-500/50 bg-red-500/10 text-red-400 text-xs font-medium rounded">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  eBook Title <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Finding Your Spotlight"
                  className="w-full bg-background border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Price in ZAR (R) <span className="text-amber-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.price_zar}
                  onChange={(e) => setForm({ ...form, price_zar: e.target.value })}
                  placeholder="250.00"
                  className="w-full bg-background border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold text-amber-500"
                />
              </div>

              {/* Direct PDF File Upload to Supabase Storage */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground block">
                  Upload PDF to Private Supabase Bucket (`ebooks-private`)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/30 hover:bg-muted/60 text-xs font-medium cursor-pointer transition-colors text-foreground">
                    <UploadIcon className="w-4 h-4 text-amber-500" />
                    <span>{uploadingPdf ? "Uploading PDF..." : "Choose PDF File"}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfFileSelect}
                      disabled={uploadingPdf}
                      className="hidden"
                    />
                  </label>

                  {form.file_path && (
                    <span className="text-xs font-mono text-emerald-500 truncate max-w-[200px]" title={form.file_path}>
                      ✓ {form.file_path}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Summary of what the book covers..."
                  className="w-full bg-background border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={form.cover_image_url}
                  onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                  placeholder="/images/ebooks/finding-your-spotlight-cover.png"
                  className="w-full bg-background border rounded-md px-3 py-2 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Active in Store</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || uploadingPdf}
                  className="bg-primary text-primary-foreground font-medium disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingBook ? "Update eBook" : "Save eBook"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
