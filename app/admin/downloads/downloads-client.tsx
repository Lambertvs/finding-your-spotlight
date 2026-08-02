"use client";

import React, { useState } from "react";
import {
  DownloadIcon,
  SearchIcon,
  CheckCircle2Icon,
  ClockIcon,
  ShieldCheckIcon,
  FileTextIcon,
  ExternalLinkIcon,
  CopyIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type OrderItem = {
  id: string;
  order_number: string;
  buyer_name: string;
  buyer_email: string;
  ebook_id: string;
  amount_zar: number;
  payment_status: string;
  yoco_charge_id: string | null;
  created_at: string;
  ebooks?: {
    title: string;
    file_path: string;
  } | null;
};

export function DownloadsClient({ initialOrders }: { initialOrders: OrderItem[] }) {
  const [orders] = useState<OrderItem[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [generatedLink, setGeneratedLink] = useState<{
    orderNumber: string;
    url: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.ebooks?.title && order.ebooks.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const handleGenerateFreshLink = async (order: OrderItem) => {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: order.yoco_charge_id || "tok_manual_gen",
          amountInCents: Math.round(order.amount_zar * 100),
          ebookId: order.ebook_id,
          buyerEmail: order.buyer_email,
          buyerName: order.buyer_name,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.downloadUrl) throw new Error(data.error || "Failed to generate link.");

      setGeneratedLink({
        orderNumber: order.order_number,
        url: data.downloadUrl,
      });
    } catch (err: any) {
      alert(err.message || "Could not generate signed download URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle: React.CSSProperties = {
    color: "#ffffff",
    backgroundColor: "#09090b",
    WebkitTextFillColor: "#ffffff",
    WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 font-sans">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Digital Download Activity Logs</h1>
          <p className="text-sm text-zinc-400 font-sans">
            Monitor digital PDF eBook delivery records, 24-hour signed storage URLs, and manual link generation.
          </p>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-sans">
            <span>Total Delivered eBooks</span>
            <DownloadIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">{orders.length}</div>
          <div className="text-[11px] text-zinc-400 font-sans">Purchased & delivered to clients</div>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-sans">
            <span>Security Standard</span>
            <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">24h Signed Token</div>
          <div className="text-[11px] text-emerald-400 font-medium font-sans">Encrypted Cloud Storage (`ebooks-private`)</div>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-sans">
            <span>Delivery Rate</span>
            <CheckCircle2Icon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">100% Instant</div>
          <div className="text-[11px] text-zinc-400 font-sans">Automated Email & On-Screen Access</div>
        </div>
      </div>

      {/* Generated Link Alert Banner */}
      {generatedLink && (
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-zinc-100 space-y-2 font-sans">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
              Fresh 24-Hour Signed Link for #{generatedLink.orderNumber}
            </span>
            <button onClick={() => setGeneratedLink(null)} className="text-zinc-400 hover:text-white">
              ✕
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={generatedLink.url}
              style={inputStyle}
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs font-mono text-white"
            />
            <Button onClick={handleCopy} size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-1 text-xs">
              <CopyIcon className="w-3.5 h-3.5" /> {copied ? "Copied!" : "Copy URL"}
            </Button>
            <a
              href={generatedLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-zinc-700 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-amber-400"
            >
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Toolbar Search */}
      <div className="flex justify-end font-sans">
        <div className="relative w-full md:w-80">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order #, customer, email, title..."
            style={inputStyle}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans"
          />
        </div>
      </div>

      {/* Downloads Activity Log Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3">Order Ref</th>
                <th className="px-4 py-3">Customer Email</th>
                <th className="px-4 py-3">eBook File Delivered</th>
                <th className="px-4 py-3">Signed Link Security</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-zinc-500 font-sans">
                    No download logs found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                    {/* Order Ref */}
                    <td className="px-4 py-4 font-mono font-bold text-amber-400 text-sm">
                      {order.order_number}
                    </td>

                    {/* Customer Email */}
                    <td className="px-4 py-4">
                      <span className="font-semibold text-white block text-sm font-sans">{order.buyer_name}</span>
                      <span className="text-xs text-zinc-400 block font-sans">{order.buyer_email}</span>
                    </td>

                    {/* eBook Title & Storage Path */}
                    <td className="px-4 py-4">
                      <span className="font-medium text-zinc-200 text-sm block font-sans">
                        {order.ebooks?.title || "Finding Your Spotlight eBook"}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-400 block mt-0.5">
                        {order.ebooks?.file_path || "pdfs/finding-your-spotlight.pdf"}
                      </span>
                    </td>

                    {/* Link Security Status */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span>24h Signed Token</span>
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-xs font-mono text-zinc-400">
                      {new Date(order.created_at).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={loading}
                        onClick={() => handleGenerateFreshLink(order)}
                        className="h-8 gap-1.5 text-xs font-medium border-zinc-700 bg-zinc-950 text-amber-400 hover:bg-zinc-800 hover:text-amber-300 font-sans"
                      >
                        <RefreshCwIcon className="w-3.5 h-3.5" /> Generate Fresh 24h Link
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
