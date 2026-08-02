"use client";

import React, { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import {
  MailIcon,
  PhoneIcon,
  ClockIcon,
  CheckCircle2Icon,
  SearchIcon,
  XIcon,
  UserIcon,
  CalendarIcon,
  FileTextIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type LeadItem = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  service_requested: string | null;
  message: string | null;
  status: "pending" | "confirmed" | "contacted" | "completed" | "archived";
  notes?: string | null;
  created_at: string;
  updated_at?: string;
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  { value: "confirmed", label: "Confirmed", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  { value: "contacted", label: "Contacted", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { value: "completed", label: "Completed", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { value: "archived", label: "Archived", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
];

export function BookingsClient({ initialLeads }: { initialLeads: LeadItem[] }) {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filter leads by search & status
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus;
    const matchesSearch =
      lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  // Handle live status update
  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const result = await res.json();
      if (res.ok && result.lead) {
        setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l)));
        if (activeLead?.id === id) {
          setActiveLead({ ...activeLead, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle saving admin notes
  const handleSaveNotes = async () => {
    if (!activeLead) return;
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeLead.id, notes: adminNotes }),
      });

      const result = await res.json();
      if (res.ok) {
        setLeads(leads.map((l) => (l.id === activeLead.id ? { ...l, notes: adminNotes } : l)));
        setActiveLead({ ...activeLead, notes: adminNotes });
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    }
  };

  const openDrawer = (lead: LeadItem) => {
    setActiveLead(lead);
    setAdminNotes(lead.notes || "");
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Session Bookings CRM</h1>
          <p className="text-sm text-muted-foreground">
            Manage consultation enquiries, update booking statuses, and reply directly to clients.
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 bg-muted/40 p-1 rounded-lg border">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedStatus === "all"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({leads.length})
          </button>
          {STATUS_OPTIONS.map((opt) => {
            const count = leads.filter((l) => l.status === opt.value).length;
            return (
              <button
                key={opt.value}
                onClick={() => setSelectedStatus(opt.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedStatus === opt.value
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone..."
            style={{
              color: "#ffffff",
              backgroundColor: "#09090b",
              WebkitTextFillColor: "#ffffff",
              WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
            }}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider border-b">
              <tr>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Contact Details</th>
                <th className="px-4 py-3">Requested Session</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No booking enquiries found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
                  const whatsappMessage = encodeURIComponent(
                    `Hi ${lead.full_name}, this is Jennis from Finding Your Spotlight. Thank you for your consultation request for an ${lead.service_requested || "Online Strategy Session"}.`
                  );
                  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${whatsappMessage}` : null;
                  const mailtoUrl = `mailto:${lead.email}?subject=Finding Your Spotlight Consultation Session&body=${encodeURIComponent(
                    `Hi ${lead.full_name},\n\nThank you for reaching out regarding your consultation session.\n\nBest regards,\nJennis Williamson\nFinding Your Spotlight`
                  )}`;

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => openDrawer(lead)}
                    >
                      <td className="px-4 py-4 font-semibold text-foreground">
                        <span className="text-base block">{lead.full_name}</span>
                        <span className="text-xs font-normal text-muted-foreground block mt-0.5">
                          {new Date(lead.created_at).toLocaleDateString("en-ZA", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col gap-1 text-xs">
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1.5 text-foreground hover:text-amber-500 transition-colors"
                          >
                            <MailIcon className="w-3.5 h-3.5 text-muted-foreground" />
                            {lead.email}
                          </a>
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1.5 text-foreground hover:text-amber-500 transition-colors"
                            >
                              <PhoneIcon className="w-3.5 h-3.5 text-muted-foreground" />
                              {lead.phone}
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium text-foreground inline-block">
                          {lead.service_requested || "Strategy Session"}
                        </span>
                      </td>

                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative inline-block">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full border appearance-none pr-7 cursor-pointer outline-none transition-all ${
                              STATUS_OPTIONS.find((s) => s.value === lead.status)?.color ||
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-card text-foreground">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
                        </div>
                      </td>

                      <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {whatsappUrl && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center p-2 rounded-md bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 transition-colors"
                              title="Send WhatsApp Reply"
                            >
                              <WhatsappLogo weight="regular" className="w-4.5 h-4.5 text-emerald-500" />
                            </a>
                          )}
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center justify-center p-2 rounded-md bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 transition-colors"
                            title="Send Email Reply"
                          >
                            <MailIcon className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-Over Drawer for Lead Details */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-card border-l text-card-foreground p-6 h-full overflow-y-auto flex flex-col justify-between shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{activeLead.full_name}</h2>
                  <span className="text-xs text-muted-foreground">
                    Enquiry ID: {activeLead.id.slice(0, 8)}...
                  </span>
                </div>
                <button
                  onClick={() => setActiveLead(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector */}
              <div className="mb-6 space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground block">
                  Booking Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleStatusChange(activeLead.id, opt.value)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                        activeLead.status === opt.value
                          ? `${opt.color} ring-2 ring-amber-500/50`
                          : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6 p-4 rounded-lg bg-muted/30 border border-border text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <a
                    href={`mailto:${activeLead.email}`}
                    className="font-medium text-foreground hover:text-amber-500 flex items-center gap-1"
                  >
                    {activeLead.email} <ExternalLinkIcon className="w-3 h-3" />
                  </a>
                </div>
                {activeLead.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <a
                      href={`tel:${activeLead.phone}`}
                      className="font-medium text-foreground hover:text-amber-500 flex items-center gap-1"
                    >
                      {activeLead.phone} <ExternalLinkIcon className="w-3 h-3" />
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Session Type:</span>
                  <span className="font-semibold text-amber-500">
                    {activeLead.service_requested || "Strategy Session"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span className="text-foreground">
                    {new Date(activeLead.created_at).toLocaleString("en-ZA")}
                  </span>
                </div>
              </div>

              {/* Client Message */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-medium text-muted-foreground block">
                  Client Message / Goals
                </label>
                <div className="p-3 bg-muted/20 border border-border rounded-lg text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                  {activeLead.message || "No detailed message provided."}
                </div>
              </div>

              {/* Admin Private Notes */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-medium text-muted-foreground block">
                  Private Admin Notes (Only visible to Jennis)
                </label>
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add private notes about this client or session schedule..."
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#09090b",
                    WebkitTextFillColor: "#ffffff",
                    WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none font-sans"
                />
                <Button
                  onClick={handleSaveNotes}
                  size="sm"
                  variant="outline"
                  className="w-full text-xs font-medium"
                >
                  Save Admin Notes
                </Button>
              </div>
            </div>

            {/* Quick Action Footer Buttons */}
            <div className="pt-4 border-t border-border grid grid-cols-2 gap-3">
              {activeLead.phone && (
                <a
                  href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hi ${activeLead.full_name}, this is Jennis from Finding Your Spotlight.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors"
                >
                  <WhatsappLogo weight="regular" className="w-4.5 h-4.5" /> WhatsApp Reply
                </a>
              )}
              <a
                href={`mailto:${activeLead.email}?subject=Finding Your Spotlight Consultation`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-colors"
              >
                <MailIcon className="w-4 h-4" /> Email Client
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
