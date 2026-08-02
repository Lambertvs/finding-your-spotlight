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
import { MessageSquareIcon, MailIcon, BookOpenIcon, CalendarCheckIcon, ArrowRightIcon } from "lucide-react";

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

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Top KPI Summary Grid */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-muted-foreground block mb-1">
                  Total eBook Sales (ZAR)
                </span>
                <span className="text-3xl font-bold tracking-tight text-amber-500">
                  R {totalRevenueZar.toFixed(2)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-3">From Yoco checkout</span>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-muted-foreground block mb-1">
                  eBook Orders Delivered
                </span>
                <span className="text-3xl font-bold tracking-tight">
                  {totalOrdersCount}
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-3">Completed purchases</span>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-muted-foreground block mb-1">
                  Session Bookings Enquiries
                </span>
                <span className="text-3xl font-bold tracking-tight">
                  {totalLeadsCount}
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-3">Consultation requests</span>
            </div>
          </div>

          {/* Split Sections: 1. Recent Session Bookings & 2. Recent eBook Sales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section 1: Recent Session Bookings */}
            <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b pb-3">
                  <div className="flex items-center gap-2">
                    <CalendarCheckIcon className="w-5 h-5 text-amber-500" />
                    <h2 className="text-lg font-semibold tracking-tight">Recent Session Bookings</h2>
                  </div>
                  <a
                    href="/admin/bookings"
                    className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-medium"
                  >
                    View All Enquiries <ArrowRightIcon className="w-3 h-3" />
                  </a>
                </div>

                {recentLeads && recentLeads.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">
                    No booking enquiries received yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentLeads?.map((lead) => {
                      const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
                      const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

                      return (
                        <div
                          key={lead.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors text-xs gap-2"
                        >
                          <div>
                            <span className="font-semibold block text-sm text-foreground">
                              {lead.full_name}
                            </span>
                            <span className="text-muted-foreground block mt-0.5">
                              {lead.service_requested || "Strategy Session"} • {lead.email}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded font-medium capitalize">
                              {lead.status}
                            </span>
                            {whatsappUrl && (
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 rounded"
                                title="WhatsApp"
                              >
                                <MessageSquareIcon className="w-3.5 h-3.5" />
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
            <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-5 h-5 text-amber-500" />
                    <h2 className="text-lg font-semibold tracking-tight">Recent eBook Sales</h2>
                  </div>
                  <a
                    href="/admin/orders"
                    className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-medium"
                  >
                    View Order Receipts <ArrowRightIcon className="w-3 h-3" />
                  </a>
                </div>

                {recentOrders && recentOrders.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">
                    No eBook sales transactions recorded yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentOrders?.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors text-xs gap-2"
                      >
                        <div>
                          <span className="font-semibold block text-sm text-foreground">
                            {order.buyer_name}
                          </span>
                          <span className="text-muted-foreground block mt-0.5">
                            Order #{order.order_number} • {order.buyer_email}
                          </span>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="font-bold text-emerald-400 block text-sm">
                            R {Number(order.amount_zar).toFixed(2)}
                          </span>
                          <span className="text-[10px] text-muted-foreground capitalize">
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
