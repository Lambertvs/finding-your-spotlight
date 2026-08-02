"use client";

import React, { useState } from "react";
import {
  BookOpenIcon,
  PlusIcon,
  XIcon,
  PencilIcon,
  Trash2Icon,
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
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

  const handleDeleteBook = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/ebooks?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to delete eBook");

      setEbooks(ebooks.filter((item) => item.id !== id));
    } catch (err: any) {
      alert(err.message || "Could not delete eBook.");
    } finally {
      setDeletingId(null);
    }
  };

  // Reusable input styling for dark mode legibility
  const inputStyle: React.CSSProperties = {
    color: "#ffffff",
    backgroundColor: "#09090b",
    WebkitTextFillColor: "#ffffff",
    WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Digital Products & eBooks Catalog</h1>
          <p className="text-sm text-zinc-400 font-sans">
            Manage product details, ZAR pricing, PDF uploads, and availability.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 gap-2 font-bold font-sans"
        >
          <PlusIcon className="w-4 h-4" /> Add New eBook
        </Button>
      </div>

      {/* Catalog Table View */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3">Book Cover & Title</th>
                <th className="px-4 py-3">Price (ZAR)</th>
                <th className="px-4 py-3">Digital PDF Path</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {ebooks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-zinc-500 font-sans">
                    No eBooks found in catalog.
                  </td>
                </tr>
              ) : (
                ebooks.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    {/* Cover & Title */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {item.cover_image_url ? (
                          <img
                            src={item.cover_image_url}
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded border border-zinc-700 shadow-sm shrink-0 bg-zinc-950"
                          />
                        ) : (
                          <div className="w-12 h-16 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                            <BookOpenIcon className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <span className="font-semibold text-white text-base block leading-tight font-sans">
                            {item.title}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono block mt-0.5">
                            /{item.slug}
                          </span>
                          {item.description && (
                            <span className="text-xs text-zinc-400 block mt-1 line-clamp-1 max-w-md font-sans">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Price in ZAR */}
                    <td className="px-4 py-4 font-bold text-amber-400 text-base font-sans">
                      R {Number(item.price_zar).toFixed(2)}
                    </td>

                    {/* Digital Storage File Path */}
                    <td className="px-4 py-4">
                      <span
                        className="font-mono text-xs text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 inline-block max-w-[220px] truncate"
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
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
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
                          className="h-8 gap-1.5 text-xs font-medium border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-800 hover:text-white"
                        >
                          <PencilIcon className="w-3.5 h-3.5" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={deletingId === item.id}
                          onClick={() => handleDeleteBook(item.id, item.title)}
                          className="h-8 gap-1.5 text-xs font-medium border-red-500/30 bg-zinc-950 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/60"
                        >
                          <Trash2Icon className="w-3.5 h-3.5" />
                          {deletingId === item.id ? "Deleting..." : "Delete"}
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
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-700/80 bg-zinc-900 p-6 shadow-2xl relative space-y-4 text-zinc-100 font-sans">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-white font-sans">
                {editingBook ? `Edit "${editingBook.title}"` : "Add New Digital eBook"}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-medium rounded-lg flex items-center gap-2">
                <AlertCircleIcon className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-sm font-sans">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block font-sans">
                  eBook Title <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Finding Your Spotlight"
                  style={inputStyle}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block font-sans">
                  Price in ZAR (R) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.price_zar}
                  onChange={(e) => setForm({ ...form, price_zar: e.target.value })}
                  placeholder="250.00"
                  style={inputStyle}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans transition-colors font-semibold"
                />
              </div>

              {/* Direct PDF File Upload to Private Cloud Storage */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block font-sans">
                  Upload PDF to Private Storage (`ebooks-private`)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 border border-zinc-700/80 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-xs font-semibold cursor-pointer transition-colors text-white">
                    <UploadIcon className="w-4 h-4 text-amber-400" />
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
                    <span className="text-xs font-mono text-emerald-400 truncate max-w-[200px]" title={form.file_path}>
                      ✓ {form.file_path}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block font-sans">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Summary of what the book covers..."
                  style={inputStyle}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans resize-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block font-sans">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={form.cover_image_url}
                  onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                  placeholder="/images/ebooks/finding-your-spotlight-cover.png"
                  style={inputStyle}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-200 cursor-pointer font-sans">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Active in Store</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="border-zinc-700 text-zinc-300 hover:text-white bg-zinc-950"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || uploadingPdf}
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold disabled:opacity-50 font-sans"
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
