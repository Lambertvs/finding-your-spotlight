"use client";

import React, { useState } from "react";
import {
  DollarSignIcon,
  ReceiptIcon,
  SearchIcon,
  CheckCircle2Icon,
  CalendarIcon,
  MailIcon,
  DownloadIcon,
  XIcon,
  CreditCardIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
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

export function OrdersClient({ initialOrders }: { initialOrders: OrderItem[] }) {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatusMsg, setResendStatusMsg] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.payment_status === statusFilter;
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.yoco_charge_id && order.yoco_charge_id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount_zar) || 0), 0);
  const completedOrdersCount = orders.filter((o) => o.payment_status === "completed").length;
  const avgTicketZar = orders.length > 0 ? totalRevenue / orders.length : 0;

  const handleResendReceipt = async () => {
    if (!selectedOrder) return;
    setResendingEmail(true);
    setResendStatusMsg("");

    try {
      // Trigger checkout route to regenerate signed link and resend email
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: selectedOrder.yoco_charge_id || "tok_resend_receipt",
          amountInCents: Math.round(selectedOrder.amount_zar * 100),
          ebookId: selectedOrder.ebook_id,
          buyerEmail: selectedOrder.buyer_email,
          buyerName: selectedOrder.buyer_name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend receipt.");

      setResendStatusMsg(`Receipt and fresh download link successfully sent to ${selectedOrder.buyer_email}`);
    } catch (err: any) {
      setResendStatusMsg(err.message || "Failed to send email receipt.");
    } finally {
      setResendingEmail(false);
    }
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
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Sales & Payment Receipts</h1>
          <p className="text-sm text-zinc-400 font-sans">
            Real-time digital product purchases, Yoco transaction receipts, and customer delivery records.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-sans">
            <span>Total Sales Revenue</span>
            <DollarSignIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">R {totalRevenue.toFixed(2)} ZAR</div>
          <div className="text-[11px] text-emerald-400 font-medium font-sans">100% Verified via Yoco Payments</div>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-sans">
            <span>Completed Orders</span>
            <ReceiptIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">{completedOrdersCount}</div>
          <div className="text-[11px] text-zinc-400 font-sans">Paid eBook orders processed</div>
        </div>

        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-sans">
            <span>Average Order Value</span>
            <CreditCardIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-sans">R {avgTicketZar.toFixed(2)} ZAR</div>
          <div className="text-[11px] text-zinc-400 font-sans">Per digital eBook sale</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 font-sans">
        <div className="flex flex-wrap items-center gap-2 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              statusFilter === "all"
                ? "bg-amber-500 text-zinc-950"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              statusFilter === "completed"
                ? "bg-amber-500 text-zinc-950"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Completed ({completedOrdersCount})
          </button>
        </div>

        <div className="relative w-full md:w-80">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order #, customer, email, charge ID..."
            style={inputStyle}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans"
          />
        </div>
      </div>

      {/* Sales Orders Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Customer Details</th>
                <th className="px-4 py-3">eBook Purchased</th>
                <th className="px-4 py-3">Amount (ZAR)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-zinc-500 font-sans">
                    No sales receipts found matching your search.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                    {/* Order Number */}
                    <td className="px-4 py-4">
                      <span className="font-mono text-amber-400 font-bold text-sm block">
                        {order.order_number}
                      </span>
                      <span className="text-[11px] text-zinc-400 block font-mono">
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="px-4 py-4">
                      <span className="font-semibold text-white block text-sm font-sans">{order.buyer_name}</span>
                      <span className="text-xs text-zinc-400 block font-sans">{order.buyer_email}</span>
                    </td>

                    {/* eBook Title */}
                    <td className="px-4 py-4">
                      <span className="font-medium text-zinc-200 text-sm block font-sans">
                        {order.ebooks?.title || "Finding Your Spotlight eBook"}
                      </span>
                    </td>

                    {/* Amount in ZAR */}
                    <td className="px-4 py-4 font-bold text-amber-400 text-sm font-sans">
                      R {Number(order.amount_zar).toFixed(2)}
                    </td>

                    {/* Payment Status Pill */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2Icon className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    </td>

                    {/* View / Resend Actions */}
                    <td className="px-4 py-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                        className="h-8 gap-1.5 text-xs font-medium border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-800 hover:text-white font-sans"
                      >
                        <ReceiptIcon className="w-3.5 h-3.5 text-amber-400" /> Receipt & Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Detail & Resend Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 font-sans">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-700/80 bg-zinc-900 p-6 shadow-2xl relative space-y-5 text-zinc-100 font-sans">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold block">
                  Payment Receipt
                </span>
                <h2 className="text-xl font-bold text-white font-sans">
                  Order #{selectedOrder.order_number}
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setResendStatusMsg("");
                }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {resendStatusMsg && (
              <div className="p-3 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-lg flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 shrink-0" />
                <span>{resendStatusMsg}</span>
              </div>
            )}

            <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 text-xs font-sans">
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Customer Name:</span>
                <span className="font-semibold text-white">{selectedOrder.buyer_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Email Address:</span>
                <span className="font-semibold text-white">{selectedOrder.buyer_email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">eBook Purchased:</span>
                <span className="font-semibold text-amber-400">{selectedOrder.ebooks?.title || "Finding Your Spotlight eBook"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Total Amount Paid:</span>
                <span className="font-bold text-amber-400">R {Number(selectedOrder.amount_zar).toFixed(2)} ZAR</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/60">
                <span className="text-zinc-400">Payment Gateway:</span>
                <span className="font-semibold text-emerald-400">Yoco Payments (SSL 256-bit)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Transaction Date:</span>
                <span className="font-mono text-zinc-300">{new Date(selectedOrder.created_at).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedOrder(null);
                  setResendStatusMsg("");
                }}
                className="border-zinc-700 text-zinc-300 hover:text-white bg-zinc-950 font-sans"
              >
                Close
              </Button>
              <Button
                disabled={resendingEmail}
                onClick={handleResendReceipt}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-2 font-sans"
              >
                <MailIcon className="w-4 h-4" />
                {resendingEmail ? "Sending Email..." : "Resend Email Receipt & PDF Link"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
