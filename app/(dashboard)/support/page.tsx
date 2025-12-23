"use client"

import { useState } from "react"
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  FileQuestion, 
  DollarSign, 
  Calendar, 
  Settings, 
  ExternalLink, 
  Plus, 
  Upload, 
  Send,
  MoreVertical,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  Paperclip,
  ImageIcon,
  User,
  ShieldQuestion,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const FAQ_CATEGORIES = [
  { id: "finance", label: "Finans & Ödemeler", icon: DollarSign, color: "bg-emerald-500/10 text-emerald-600" },
  { id: "booking", label: "Rezervasyonlar", icon: Calendar, color: "bg-blue-500/10 text-blue-600" },
  { id: "account", label: "Hesap & Ayarlar", icon: Settings, color: "bg-violet-500/10 text-violet-600" },
  { id: "technical", label: "Teknik Sorunlar", icon: HelpCircle, color: "bg-amber-500/10 text-amber-600" },
]

export default function SupportPage() {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
  const [isTicketChatOpen, setIsTicketChatOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreateTicket = () => {
    toast.success("Destek Talebi Oluşturuldu", {
      description: "Talebiniz alınmıştır. Destek ekibimiz en kısa sürede size dönüş yapacaktır."
    })
    setIsTicketModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight uppercase italic">Yardım & Destek Merkezi</h1>
          <p className="text-muted-foreground mt-1 font-medium italic">Sorularınıza hızlı cevap bulun veya destek ekibimize ulaşın.</p>
        </div>
        <Button className="font-black h-12 px-8 shadow-lg shadow-primary/20 uppercase tracking-widest" onClick={() => setIsTicketModalOpen(true)}>
          <Plus className="mr-2 h-5 w-5" /> YENİ DESTEK TALEBİ
        </Button>
      </div>

      <Tabs defaultValue="knowledge-base" className="w-full">
        <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none p-0 gap-8">
          <TabsTrigger value="knowledge-base" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Bilgi Bankası (SSS)</TabsTrigger>
          <TabsTrigger value="tickets" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Taleplerim</TabsTrigger>
        </TabsList>

        {/* Knowledge Base (PD-200) */}
        <TabsContent value="knowledge-base" className="mt-6 space-y-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Ödeme ne zaman yatar? | Ders nasıl iptal edilir?..." 
              className="pl-12 h-14 font-bold text-lg rounded-2xl shadow-xl border-primary/10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FAQ_CATEGORIES.map(cat => (
              <Card key={cat.id} className="border-none shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group">
                <CardContent className="flex flex-col items-center justify-center py-8 gap-4">
                  <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${cat.color}`}>
                    <cat.icon className="h-8 w-8" />
                  </div>
                  <span className="font-black text-xs uppercase tracking-widest text-center">{cat.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">Popüler Sorular</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Ödemelerim her ayın hangi günlerinde yatırılır?",
                "Bir dersin kontenjanını nasıl değiştirebilirim?",
                "Fylexa komisyon oranları ve vergilendirme hakkında bilgi.",
                "Eğitmenlerin kendi programlarını görmesi için yetki nasıl verilir?",
                "Üyelik dondurma işlemi finansal hakedişi etkiler mi?"
              ].map((q, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors text-left group">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <FileQuestion className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-sm">{q}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                </button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tickets (PD-201) */}
        <TabsContent value="tickets" className="mt-6">
          <div className="grid gap-4">
            {[
              { id: "T-9042", subject: "Fatura yükleme hatası alıyorum", status: "İNCELENİYOR", date: "2 saat önce", priority: "Yüksek", color: "text-amber-600 bg-amber-50 border-amber-200" },
              { id: "T-8812", subject: "Yeni şube açılışı hakkında destek", status: "ÇÖZÜLDÜ", date: "3 gün önce", priority: "Orta", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
            ].map((ticket) => (
              <Card key={ticket.id} className="border-none shadow-sm cursor-pointer hover:bg-muted/20 transition-all group" onClick={() => setIsTicketChatOpen(true)}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-xl w-16 h-16 shrink-0">
                      <span className="text-[10px] font-black text-muted-foreground uppercase">{ticket.priority}</span>
                      <ShieldQuestion className="h-6 w-6 text-primary mt-1" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-xs text-muted-foreground uppercase tracking-widest">{ticket.id}</span>
                        <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 py-0.5 ${ticket.color}`}>{ticket.status}</Badge>
                      </div>
                      <p className="text-lg font-bold mt-1 group-hover:text-primary transition-colors">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground font-medium flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3" /> Son güncelleme: {ticket.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-10 w-10 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* New Ticket Modal (PD-201) */}
      <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 text-primary mb-2">
              <div className="p-3 bg-primary/10 rounded-2xl"><MessageSquare className="h-6 w-6" /></div>
              <DialogTitle className="font-black text-xl tracking-tight uppercase">Yeni Destek Talebi</DialogTitle>
            </div>
            <DialogDescription className="font-medium">Sorunu detaylı açıklayarak ekran görüntüsü ekleyebilirsiniz.</DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Konu Başlığı</Label>
              <Input placeholder="Örn: Ödeme ekranı donuyor" className="h-11 font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Kategori</Label>
                <Select defaultValue="finance">
                  <SelectTrigger className="h-11 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Finans & Ödemeler</SelectItem>
                    <SelectItem value="technical">Teknik Hata</SelectItem>
                    <SelectItem value="feedback">Geri Bildirim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Aciliyet</Label>
                <Select defaultValue="low">
                  <SelectTrigger className="h-11 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Düşük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="high">Yüksek (Acil)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Mesajınız</Label>
              <Textarea placeholder="Sorununuzu buraya yazın..." className="min-h-[120px] font-medium" />
            </div>
            <div className="h-32 border-2 border-dashed border-muted-foreground/20 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-all group">
              <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-black text-muted-foreground uppercase">Ekran Görüntüsü Ekle</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" className="font-bold uppercase text-[10px]" onClick={() => setIsTicketModalOpen(false)}>İptal</Button>
            <Button className="font-black px-8 shadow-lg shadow-primary/20 uppercase" onClick={handleCreateTicket}>TALEBİ GÖNDER</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ticket Chat Simulation (PD-201) */}
      <Dialog open={isTicketChatOpen} onOpenChange={setIsTicketChatOpen}>
        <DialogContent className="max-w-2xl p-0 border-none overflow-hidden shadow-2xl h-[600px] flex flex-col">
          <div className="bg-primary p-6 text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl"><ShieldQuestion className="h-6 w-6" /></div>
              <div>
                <p className="text-[10px] font-black opacity-60 uppercase">TICKET ID: #T-9042</p>
                <h2 className="text-xl font-black tracking-tight uppercase">Fatura yükleme hatası alıyorum</h2>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsTicketChatOpen(false)}><X className="h-6 w-6" /></Button>
          </div>
          
          <ScrollArea className="flex-1 bg-muted/20 p-6">
            <div className="space-y-8">
              {/* Member Message */}
              <div className="flex items-start gap-4 pr-12">
                <Avatar className="h-10 w-10 shrink-0 border shadow-sm">
                  <AvatarFallback className="font-black bg-primary/5 text-primary">MD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">SİZ (YÖNETİCİ)</span>
                    <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">14:20</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-muted text-sm font-medium leading-relaxed">
                    Merhaba, fatura yükle ekranında PDF seçtikten sonra "Dosya tipi desteklenmiyor" hatası alıyorum. PDF formatı uygun değil mi?
                  </div>
                </div>
              </div>

              {/* Support Response */}
              <div className="flex items-start gap-4 pl-12 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 border-2 border-white shadow-lg">
                  <div className="font-black italic text-white text-[10px]">F</div>
                </div>
                <div className="space-y-2 flex flex-col items-end">
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">FYLEXA DESTEK</span>
                    <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">14:45</span>
                  </div>
                  <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-xl text-sm font-medium leading-relaxed">
                    Merhaba Mehmet Bey, yaşadığınız sorun için özür dileriz. Bir güncelleme sonrası PDF validasyonunda geçici bir hata oluşmuştu. Şu an düzelttik, tekrar denediğinizde yüklemenin başarılı olması gerekiyor.
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-6 bg-white border-t flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl">
              <Input placeholder="Bir mesaj yazın..." className="border-none shadow-none focus-visible:ring-0 h-10 bg-transparent font-medium" />
              <div className="flex gap-1 pr-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><Paperclip className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><ImageIcon className="h-4 w-4" /></Button>
                <Button className="h-10 w-10 p-0 shadow-lg shadow-primary/20"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
            <p className="text-[9px] text-center text-muted-foreground font-black uppercase tracking-[0.2em]">Destek talebi henüz çözüldü olarak işaretlenmedi.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


