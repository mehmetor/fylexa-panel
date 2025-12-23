"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Search, 
  UserPlus, 
  Filter, 
  MoreHorizontal, 
  ExternalLink,
  HeartPulse,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  FileDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const MEMBERS = [
  { id: "1", name: "Ahmet Yılmaz", email: "ahmet@gmail.com", phone: "0532 123 45 67", balance: "12 Kredi", status: "Aktif", health: true },
  { id: "2", name: "Selin Demir", email: "selin@hotmail.com", phone: "0544 987 65 43", balance: "0 Kredi", status: "Donduruldu", health: false },
  { id: "3", name: "Burak Kaya", email: "burak@outlook.com", phone: "0555 111 22 33", balance: "5 Kredi", status: "Aktif", health: true },
  { id: "4", name: "Elif Akın", email: "elif@gmail.com", phone: "0506 555 44 33", balance: "24 Kredi", status: "Aktif", health: false },
]

export default function MembersPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">CRM ve Üye Yönetimi</h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Tüm üyelerinizi listeleyin, profillerini inceleyin ve üyeliklerini yönetin.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/members/import")} className="font-bold">
            <FileDown className="mr-2 h-4 w-4" />
            İçe Aktar
          </Button>
          <Button className="font-bold shadow-lg shadow-primary/20">
            <UserPlus className="mr-2 h-4 w-4" />
            Yeni Üye Ekle
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="İsim, e-posta veya telefon ile ara..." className="pl-10 h-11 border-muted-foreground/20" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="h-11 font-bold"><Filter className="mr-2 h-4 w-4" /> Filtrele</Button>
          <Badge variant="outline" className="h-11 px-4 text-xs font-bold text-muted-foreground bg-muted/30">Toplam 512 Üye</Badge>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-black text-xs uppercase tracking-widest px-6 h-12">Üye Bilgisi</TableHead>
              <TableHead className="font-black text-xs uppercase tracking-widest h-12">İletişim</TableHead>
              <TableHead className="font-black text-xs uppercase tracking-widest h-12">Bakiye</TableHead>
              <TableHead className="font-black text-xs uppercase tracking-widest h-12">Durum</TableHead>
              <TableHead className="font-black text-xs uppercase tracking-widest h-12">Özel Not</TableHead>
              <TableHead className="text-right px-6 h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.map((member) => (
              <TableRow key={member.id} className="hover:bg-muted/20 transition-colors cursor-pointer group" onClick={() => router.push(`/members/${member.id}`)}>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border shadow-sm group-hover:scale-105 transition-transform">
                      <AvatarFallback className="font-bold bg-primary/5 text-primary text-xs">{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm leading-none">{member.name}</span>
                      <span className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-tighter">ID: #{member.id}042</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Mail className="h-3 w-3" /> {member.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Phone className="h-3 w-3" /> {member.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-black text-[10px] uppercase bg-primary/5 text-primary border-primary/10">
                    <CreditCard className="mr-1.5 h-3 w-3" /> {member.balance}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`font-black text-[10px] uppercase ${member.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-200' : 'bg-amber-500/10 text-amber-700 border-amber-200'}`}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {member.health && (
                    <Badge variant="outline" className="border-rose-200 text-rose-600 bg-rose-50 font-black text-[9px] uppercase tracking-tighter animate-pulse">
                      <HeartPulse className="mr-1.5 h-3 w-3" /> SAĞLIK UYARISI
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right px-6">
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}


