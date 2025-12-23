"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Bell,
  Calendar,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Users,
  Settings2,
  Menu,
  Store,
  ChevronDown,
  ClipboardCheck,
  Megaphone,
  HelpCircle,
  AlertCircle,
  Clock,
  CheckCircle2,
  Info,
  Package,
  Star,
  User
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/mode-toggle"

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Operasyon", href: "/operations", icon: ClipboardCheck },
  { name: "Takvim", href: "/calendar", icon: Calendar },
  { name: "Üyeler", href: "/members", icon: Users },
  { name: "Kasa/POS", href: "/pos", icon: CreditCard },
  { name: "Finans", href: "/finance", icon: CreditCard },
  { name: "Pazarlama", href: "/marketing", icon: Megaphone },
  { name: "Destek", href: "/support", icon: HelpCircle },
  { name: "Ayarlar", href: "/settings", icon: Settings },
]

const venues = [
  { id: "all", name: "Tüm Şubeler", location: "Global" },
  { id: "etiler", name: "Fylexa Etiler", location: "Etiler, İstanbul" },
  { id: "nisantasi", name: "Fylexa Nişantaşı", location: "Nişantaşı, İstanbul" },
  { id: "kadikoy", name: "Fylexa Kadıköy", location: "Kadıköy, İstanbul" },
]

const NOTIFICATIONS = [
  { id: 1, type: "CRITICAL", title: "Ödeme Başarısız", desc: "Ahmet Yılmaz'ın ₺4.500 tutarlı ödemesi reddedildi.", time: "2dk önce", icon: AlertCircle, color: "text-rose-600 bg-rose-50" },
  { id: 2, type: "ACTION", title: "Yeni Yorum Onay Bekliyor", desc: "Selin D. Reformer Pilates dersine yorum yaptı.", time: "15dk önce", icon: Star, color: "text-amber-600 bg-amber-50" },
  { id: 3, type: "INFO", title: "Yeni Üye Kaydı", desc: "Mert A. stüdyonuza üye oldu.", time: "1saat önce", icon: User, color: "text-blue-600 bg-blue-50" },
  { id: 4, type: "INFO", title: "Stok Uyarısı", desc: "Doğal Kaynak Suyu stoğu 10 adetin altına düştü.", time: "3saat önce", icon: Package, color: "text-violet-600 bg-violet-50" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [selectedVenue, setSelectedVenue] = React.useState(venues[1])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader className="h-16 flex items-center px-4 border-b">
            <Link href="/" className="flex items-center w-full h-full overflow-hidden">
              <Image 
                src="/horizontal-original.png" 
                alt="Fylexa Logo" 
                width={120} 
                height={32} 
                className="h-7 w-auto group-data-[collapsible=icon]:hidden" 
                priority
              />
              <div className="hidden group-data-[collapsible=icon]:flex w-8 h-8 rounded bg-primary text-primary-foreground items-center justify-center font-black italic shrink-0">F</div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="py-4">
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className="h-11 px-4"
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Çıkış Yap" className="h-11 px-4 text-destructive hover:text-destructive">
                  <Link href="/login">
                    <LogOut className="h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b px-4 sticky top-0 bg-background z-20">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">Fylexa Panel</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {menuItems.find(item => item.href === pathname)?.name || "Dashboard"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="ml-auto flex items-center gap-2 md:gap-4">
              {/* Venue Switcher (PD-204) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex h-9 gap-2 px-3 border-muted-foreground/20 hover:bg-muted/50">
                    <Store className="h-4 w-4 text-primary" />
                    <div className="flex flex-col items-start text-[10px] leading-none">
                      <span className="font-bold text-foreground">{selectedVenue.name}</span>
                      <span className="text-muted-foreground font-medium">{selectedVenue.location}</span>
                    </div>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2 py-1.5">Şube Değiştir</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {venues.map((venue) => (
                    <DropdownMenuItem 
                      key={venue.id} 
                      onClick={() => setSelectedVenue(venue)}
                      className="flex flex-col items-start gap-0.5 py-2 cursor-pointer"
                    >
                      <span className={`text-sm font-bold ${selectedVenue.id === venue.id ? "text-primary" : ""}`}>
                        {venue.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{venue.location}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="hidden sm:block h-6 mx-1" />

              <div className="relative hidden lg:flex w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Ara..." className="pl-10 h-9 bg-muted/50 border-none" />
              </div>
              
              <ModeToggle />

              {/* Notification Center (PD-203) */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[380px] p-0 border-none shadow-2xl overflow-hidden">
                  <div className="bg-primary p-4 text-primary-foreground flex items-center justify-between">
                    <h3 className="font-black text-xs uppercase tracking-widest">Bildirim Merkezi</h3>
                    <Badge className="bg-white/20 text-white border-none font-bold text-[9px] uppercase px-2 py-0.5">4 YENİ</Badge>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <div className="divide-y">
                      {NOTIFICATIONS.map((notif) => (
                        <div key={notif.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group flex items-start gap-4">
                          <div className={`p-2.5 rounded-xl shrink-0 ${notif.color}`}>
                            <notif.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className={`text-xs font-black uppercase tracking-tighter ${notif.type === 'CRITICAL' ? 'text-rose-600' : notif.type === 'ACTION' ? 'text-amber-600' : 'text-primary'}`}>{notif.type}</p>
                              <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{notif.time}</span>
                            </div>
                            <p className="text-sm font-bold text-foreground leading-tight">{notif.title}</p>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">{notif.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-3 bg-muted/30 border-t flex justify-center">
                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">Tümünü Okundu İşaretle</Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 gap-2 px-1 pr-2 rounded-full hover:bg-muted">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start text-[10px] leading-none text-left">
                      <span className="font-bold text-foreground">Mehmet Demir</span>
                      <span className="text-muted-foreground font-medium uppercase tracking-tighter">Owner</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="px-2 py-1.5">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Mehmet Demir</p>
                      <p className="text-xs leading-none text-muted-foreground">mehmet@studyo.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="px-2 py-1.5 cursor-pointer">Profil</DropdownMenuItem>
                  <DropdownMenuItem className="px-2 py-1.5 cursor-pointer">Ayarlar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive font-semibold px-2 py-1.5 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
