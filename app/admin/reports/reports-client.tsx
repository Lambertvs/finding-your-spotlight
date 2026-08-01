"use client";

import React, { useState } from "react";
import {
  TrendingUpIcon,
  DollarSignIcon,
  BookOpenIcon,
  CalendarCheckIcon,
  DownloadIcon,
  CalendarIcon,
  ArrowUpRightIcon,
  FileSpreadsheetIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportsClient() {
  const [timeRange, setTimeRange] = useState("all");

  const metrics = {
    totalRevenue: "R 1,470.00",
    revenueGrowth: "+18.5%",
    ebookSalesCount: 3,
    bookingEnquiriesCount: 6,
    avgOrderValue: "R 490.00",
  };

  const ebookPerformance = [
    {
      id: "eb-1",
      title: "Finding Your Spotlight",
      price: "R 490.00",
      unitsSold: 1,
      totalRevenue: "R 490.00",
      status: "Active",
    },
    {
      id: "eb-2",
      title: "Directions To Gaytown",
      price: "R 490.00",
      unitsSold: 1,
      totalRevenue: "R 490.00",
      status: "Active",
    },
    {
      id: "eb-3",
      title: "20 Things They Dont Tell You About Parenting",
      price: "R 490.00",
      unitsSold: 1,
      totalRevenue: "R 490.00",
      status: "Active",
    },
  ];

  const bookingBreakdown = [
    {
      format: "1-on-1 Executive Coaching",
      enquiries: 3,
      percentage: "50%",
      confirmed: 2,
    },
    {
      format: "Leadership Development & Workshops",
      enquiries: 2,
      percentage: "33%",
      confirmed: 1,
    },
    {
      format: "Keynote & Public Speaking",
      enquiries: 1,
      percentage: "17%",
      confirmed: 1,
    },
  ];

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Product Title,Price,Units Sold,Gross Revenue\n" +
      ebookPerformance
        .map((e) => `"${e.title}","${e.price}",${e.unitsSold},"${e.totalRevenue}"`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fys-sales-report-${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 max-w-6xl">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Sales & Revenue Reports</h1>
          <p className="text-sm text-muted-foreground">
            Financial analytics, digital product sales performance, and booking enquiry conversion stats.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-card border rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
            <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-foreground focus:outline-none cursor-pointer font-medium"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="30days">Last 30 Days</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="text-xs gap-2 font-medium"
          >
            <FileSpreadsheetIcon className="w-3.5 h-3.5 text-emerald-500" />
            Export CSV Report
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Gross Revenue</span>
            <DollarSignIcon className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-heading text-foreground">{metrics.totalRevenue}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUpIcon className="w-3 h-3" />
            <span>{metrics.revenueGrowth} vs prior period</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>eBook Units Sold</span>
            <BookOpenIcon className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-heading text-foreground">{metrics.ebookSalesCount}</div>
          <div className="text-[11px] text-muted-foreground">Across 3 catalog titles</div>
        </div>

        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Session Enquiries</span>
            <CalendarCheckIcon className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-heading text-foreground">{metrics.bookingEnquiriesCount}</div>
          <div className="text-[11px] text-emerald-400 font-medium">4 confirmed sessions</div>
        </div>

        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Average Order Value</span>
            <ArrowUpRightIcon className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-heading text-foreground">{metrics.avgOrderValue}</div>
          <div className="text-[11px] text-muted-foreground">Digital eBook downloads</div>
        </div>
      </div>

      {/* Product Revenue Performance Table */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold text-foreground">Digital eBook Performance</h2>
          <span className="text-xs text-muted-foreground font-mono">Catalog: 3 eBooks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-3">Product Title</th>
                <th className="p-3">Unit Price (ZAR)</th>
                <th className="p-3">Units Sold</th>
                <th className="p-3">Gross Revenue</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {ebookPerformance.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium text-foreground">{item.title}</td>
                  <td className="p-3 text-muted-foreground font-mono">{item.price}</td>
                  <td className="p-3 font-semibold text-foreground">{item.unitsSold}</td>
                  <td className="p-3 font-bold text-amber-500 font-mono">{item.totalRevenue}</td>
                  <td className="p-3 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coaching Enquiries Breakdown */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold text-foreground">Session Booking Enquiries by Format</h2>
          <span className="text-xs text-muted-foreground">Conversion Breakdown</span>
        </div>

        <div className="space-y-4">
          {bookingBreakdown.map((b, i) => (
            <div key={i} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-medium">
                <span className="text-foreground">{b.format}</span>
                <span className="text-muted-foreground">
                  {b.enquiries} enquiries ({b.confirmed} confirmed)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: b.percentage }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
