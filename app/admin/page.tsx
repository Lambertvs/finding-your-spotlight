import { getSupabaseServerClient } from "@/lib/supabase-server";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MailIcon, BookOpenIcon, CalendarCheckIcon, ArrowRightIcon } from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = getSupabaseServerClient();

  // Fetch recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*, ebooks(title)")
    .order("created_at", { ascending: false })
    .limit(5);

  // KPI Metrics calculations
  const totalLeadsCount = recentLeads ? recentLeads.length : 0;
  const totalOrdersCount = recentOrders ? recentOrders.length : 0;
  const totalRevenueZar = recentOrders
    ? recentOrders.reduce((sum, order) => sum + (Number(order.amount_zar) || 0), 0)
    : 0;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">Admin Portal</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 font-sans">
          {/* Top KPI Summary Grid */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-zinc-400 block mb-1">
                  Total eBook Sales (ZAR)
                </span>
                <span className="text-3xl font-bold tracking-tight text-amber-400 font-sans">
                  R {totalRevenueZar.toFixed(2)}
                </span>
              </div>
              <span className="text-xs text-zinc-500 mt-3">From Yoco checkout</span>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-zinc-400 block mb-1">
                  eBook Orders Delivered
                </span>
                <span className="text-3xl font-bold tracking-tight text-white font-sans">
                  {totalOrdersCount}
                </span>
              </div>
              <span className="text-xs text-zinc-500 mt-3">Completed purchases</span>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-zinc-400 block mb-1">
                  Session Bookings Enquiries
                </span>
                <span className="text-3xl font-bold tracking-tight text-white font-sans">
                  {totalLeadsCount}
                </span>
              </div>
              <span className="text-xs text-zinc-500 mt-3">Consultation requests</span>
            </div>
          </div>

          {/* Split Sections: 1. Recent Session Bookings & 2. Recent eBook Sales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section 1: Recent Session Bookings */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <CalendarCheckIcon className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-bold tracking-tight text-white font-sans">Recent Session Bookings</h2>
                  </div>
                  <a
                    href="/admin/bookings"
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium font-sans"
                  >
                    View All Enquiries <ArrowRightIcon className="w-3 h-3" />
                  </a>
                </div>

                {recentLeads && recentLeads.length === 0 ? (
                  <p className="text-sm text-zinc-500 py-6 text-center font-sans">
                    No booking enquiries received yet.
                  </p>
                ) : (
                  <div className="space-y-3 font-sans">
                    {recentLeads?.map((lead) => {
                      const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
                      const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

                      return (
                        <div
                          key={lead.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-950 transition-colors text-xs gap-2"
                        >
                          <div>
                            <span className="font-semibold block text-sm text-white font-sans">
                              {lead.full_name}
                            </span>
                            <span className="text-zinc-400 block mt-0.5 font-sans">
                              {lead.service_requested || "Strategy Session"} • {lead.email}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[11px] font-semibold capitalize">
                              {lead.status}
                            </span>
                            {whatsappUrl && (
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-md transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <WhatsappLogo weight="regular" className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Recent eBook Sales */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 p-6 shadow-sm flex flex-col justify-between font-sans">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-bold tracking-tight text-white font-sans">Recent eBook Sales</h2>
                  </div>
                  <a
                    href="/admin/orders"
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium font-sans"
                  >
                    View Order Receipts <ArrowRightIcon className="w-3 h-3" />
                  </a>
                </div>

                {recentOrders && recentOrders.length === 0 ? (
                  <p className="text-sm text-zinc-500 py-6 text-center font-sans">
                    No eBook sales transactions recorded yet.
                  </p>
                ) : (
                  <div className="space-y-3 font-sans">
                    {recentOrders?.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-950 transition-colors text-xs gap-2"
                      >
                        <div>
                          <span className="font-semibold block text-sm text-white font-sans">
                            {order.buyer_name}
                          </span>
                          <span className="text-zinc-400 block mt-0.5 font-sans">
                            Order #{order.order_number} • {order.buyer_email}
                          </span>
                        </div>

                        <div className="text-left sm:text-right font-sans">
                          <span className="font-bold text-amber-400 block text-sm">
                            R {Number(order.amount_zar).toFixed(2)}
                          </span>
                          <span className="text-[10px] text-zinc-400 capitalize">
                            {order.payment_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
