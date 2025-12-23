"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  HeartPulse,
  History,
  Settings2,
  Snowflake,
  ShieldAlert,
  Clock,
  ExternalLink,
  MessageSquare,
  MoreVertical,
  CheckCircle2,
  ChevronRight,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function MemberDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false)
  const [isHealthAlertOpen, setIsHealthAlertOpen] = useState(false)

  // Mock Member Data
  const member = {
    id: params.id,
    name: "Ahmet Yılmaz",
    email: "ahmet@gmail.com",
    phone: "0532 123 45 67",
    joinDate: "12 Ocak 2024",
    status: "Aktif",
    balance: 12,
    healthNote: "Bel fıtığı teşhisi var. Ağır kaldırmaktan kaçınmalı. (L4-L5 bölgesi hassas)",
    healthWarning: true,
    lastClasses: [
      { name: "Hatha Yoga", date: "Bugün, 10:00", instructor: "Zeynep H.", status: "Girdi" },
      { name: "Reformer Pilates", date: "21 Aralı, 14:00", instructor: "Mert A.", status: "Girdi" },
      { name: "Mat Pilates", date: "18 Aralık, 11:30", instructor: "Selin Y.", status: "Gelmedi" },
    ]
  }

  const handleFreeze = () => {
    toast.success("Üyelik Donduruldu", {
      description: "Paket bitiş tarihi dondurulan gün sayısı kadar otomatik olarak ileri atıldı."
    })
    setIsFreezeModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-background shadow-xl">
              <AvatarFallback className="text-xl font-black bg-primary/5 text-primary">AY</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">{member.name}</h1>
                <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200 text-[10px] font-black uppercase tracking-widest px-2 py-0.5">AKTİF</Badge>
              </div>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                ID: #{member.id}042 • {member.joinDate}'den beri üye
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="font-bold border-primary/20 text-primary hover:bg-primary/5" onClick={() => setIsFreezeModalOpen(true)}>
            <Snowflake className="mr-2 h-4 w-4" />
            Üyeliği Dondur
          </Button>
          <Button className="font-bold shadow-lg shadow-primary/20">
            <Settings2 className="mr-2 h-4 w-4" />
            Profili Düzenle
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Stats & Contact */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                <div className="p-2 bg-background rounded-lg shadow-sm">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">E-posta</span>
                  <span className="text-sm font-bold">{member.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                <div className="p-2 bg-background rounded-lg shadow-sm">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Telefon</span>
                  <span className="text-sm font-bold">{member.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest opacity-80">Kalan Paket Bakiyesi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">{member.balance}</span>
                <span className="text-lg font-bold mb-1 opacity-80 uppercase">Kredi</span>
              </div>
              <p className="text-[10px] font-bold mt-4 uppercase tracking-widest opacity-70">Son Kullanma: 12 Mart 2025</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="secondary" className="w-full font-bold bg-white/10 hover:bg-white/20 text-white border-none">
                <CreditCard className="mr-2 h-4 w-4" /> Paket Yükle
              </Button>
            </CardFooter>
          </Card>

          {/* Health Note UI (PD-181) */}
          <Card className={`border-none shadow-sm ${member.healthWarning ? 'bg-rose-50 border-rose-100' : ''}`}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className={`text-sm font-bold uppercase tracking-widest ${member.healthWarning ? 'text-rose-700' : 'text-muted-foreground'}`}>
                Sağlık Notları
              </CardTitle>
              {member.healthWarning && <HeartPulse className="h-5 w-5 text-rose-600 animate-pulse" />}
            </CardHeader>
            <CardContent>
              {member.healthWarning ? (
                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-xl border border-rose-200 text-sm font-medium text-rose-900 leading-relaxed">
                    {member.healthNote}
                  </div>
                  <Button variant="outline" className="w-full border-rose-200 text-rose-700 hover:bg-rose-100 font-bold" onClick={() => setIsHealthAlertOpen(true)}>
                    <ShieldAlert className="mr-2 h-4 w-4" /> Eğitmen Uyarısını Gör
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">Kayıtlı sağlık notu bulunmuyor.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs & History */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none p-0 gap-8">
              <TabsTrigger value="history" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold text-sm px-0">Ders Geçmişi</TabsTrigger>
              <TabsTrigger value="packages" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold text-sm px-0">Paketler & Ödemeler</TabsTrigger>
              <TabsTrigger value="notes" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold text-sm px-0">CRM Notları</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-6 space-y-4">
              <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y">
                    {member.lastClasses.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl ${item.status === 'Girdi' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                            {item.status === 'Girdi' ? <CheckCircle2 className="h-5 w-5" /> : <X className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-sm leading-none">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">{item.date} • {item.instructor}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={`font-black text-[10px] uppercase ${item.status === 'Girdi' ? 'text-emerald-600 border-emerald-200' : 'text-rose-600 border-rose-200'}`}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-center border-t py-3">
                  <Button variant="ghost" className="text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary">Tüm Geçmişi Gör <ChevronRight className="ml-1 h-3 w-3" /></Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-[10px] font-bold">MD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Mehmet Demir • 2 gün önce</p>
                        <Badge variant="outline" className="text-[9px] font-black uppercase">CRM NOTU</Badge>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-xl text-sm font-medium">
                        Üye bel fıtığı problemi olduğunu belirtti. Derslerde hocaların özellikle Reformer'da dikkat etmesi gerekiyor. Manuel not eklendi.
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex gap-2">
                      <Input placeholder="Yeni not ekle..." className="h-11 font-medium" />
                      <Button className="font-bold h-11"><MessageSquare className="mr-2 h-4 w-4" /> Ekle</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Freezing Modal (PD-208) */}
      <Dialog open={isFreezeModalOpen} onOpenChange={setIsFreezeModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Snowflake className="h-6 w-6" />
              <DialogTitle className="font-bold">Üyelik Dondurma</DialogTitle>
            </div>
            <DialogDescription className="font-medium">
              Üyenin paketini belirli bir süre için dondurabilirsiniz. Bu işlem bitiş tarihini otomatik günceller.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Başlangıç Tarihi</Label>
                <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Bitiş Tarihi</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-2">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-3 w-3" /> OTOMATİK HESAPLAMA
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Üyelik <span className="font-bold text-foreground">30 gün</span> süreyle dondurulacak. 
                Yeni paket bitiş tarihi <span className="font-bold text-foreground">12 Nisan 2025</span> olarak güncellenecektir.
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Dondurma Nedeni</Label>
              <Input placeholder="Örn: Sağlık durumu, Tatil vb." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" className="font-bold" onClick={() => setIsFreezeModalOpen(false)}>Vazgeç</Button>
            <Button className="font-bold px-8 shadow-lg shadow-primary/20" onClick={handleFreeze}>Onayla ve Dondur</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Health Alert Popup (PD-181) */}
      <Dialog open={isHealthAlertOpen} onOpenChange={setIsHealthAlertOpen}>
        <DialogContent className="max-w-md border-rose-200 bg-rose-50 shadow-2xl shadow-rose-200/50">
          <DialogHeader>
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <div>
                <DialogTitle className="text-xl font-black tracking-tight uppercase">KRİTİK EĞİTMEN UYARISI!</DialogTitle>
                <DialogDescription className="font-bold text-rose-800 opacity-80">BU NOTU OKUMADAN DERSE BAŞLATMAYIN</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="py-2">
            <div className="p-6 bg-white rounded-2xl border-2 border-rose-200 shadow-inner">
              <p className="text-lg font-bold text-rose-950 leading-relaxed text-center">
                "{member.healthNote}"
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center mt-4">
            <Button className="w-full h-12 bg-rose-600 hover:bg-rose-700 font-black text-lg" onClick={() => setIsHealthAlertOpen(false)}>
              ANLADIM, DİKKAT EDECEĞİM
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

