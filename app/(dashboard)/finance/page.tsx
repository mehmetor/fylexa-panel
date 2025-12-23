"use client"

import { useState } from "react"
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  Calendar, 
  User, 
  Download, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  PieChart,
  ChevronRight,
  Wallet,
  Receipt,
  Upload,
  Info,
  Banknote,
  Percent,
  ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function FinancePage() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)

  const handleUploadInvoice = () => {
    toast.success("Fatura Yüklendi", { description: "Ödeme süreci 'Hazırlanıyor' aşamasına geçti." })
    setIsInvoiceModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Finans ve Hakediş</h1>
          <p className="text-muted-foreground mt-1 font-medium">Gelirlerinizi, eğitmen hakedişlerini ve ödeme takviminizi izleyin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="font-bold"><Download className="mr-2 h-4 w-4" /> Rapor İndir</Button>
          <Button className="font-bold shadow-lg shadow-primary/20"><Percent className="mr-2 h-4 w-4" /> Vergi Ayarları</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Toplam Brüt Gelir</span>
              <DollarSign className="h-4 w-4 opacity-70" />
            </div>
            <p className="text-3xl font-black">₺142.500</p>
            <p className="text-[10px] font-bold mt-2 opacity-70 flex items-center gap-1 uppercase tracking-tighter">
              <ArrowUpRight className="h-3 w-3" /> %18 geçen aya göre
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Net Hakediş</span>
              <Banknote className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-emerald-600">₺114.000</p>
            <p className="text-[10px] font-bold mt-2 text-muted-foreground uppercase tracking-widest">Komisyon düşüldü</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bekleyen Ödeme</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-3xl font-black text-amber-600">₺28.500</p>
            <p className="text-[10px] font-bold mt-2 text-muted-foreground uppercase tracking-widest">Sıradaki: 1 Ocak</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cüzdan Bakiyeleri</span>
              <Wallet className="h-4 w-4 text-violet-500" />
            </div>
            <p className="text-3xl font-black text-violet-600">₺4.250</p>
            <p className="text-[10px] font-bold mt-2 text-muted-foreground uppercase tracking-widest">Toplam üye kredileri</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ledger" className="w-full">
        <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none p-0 gap-8">
          <TabsTrigger value="ledger" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">İşlem Dökümü (Ledger)</TabsTrigger>
          <TabsTrigger value="payouts" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Ödeme Takvimi</TabsTrigger>
          <TabsTrigger value="payroll" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Eğitmen Hakedişleri</TabsTrigger>
          <TabsTrigger value="intelligence" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Kanal Analizi</TabsTrigger>
        </TabsList>

        {/* Ledger Tab (PD-190, 186) */}
        <TabsContent value="ledger" className="mt-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest px-6 h-12">Tarih</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest h-12">Üye / Ders Detayı</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest h-12">Brüt Tutar</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest h-12">Komisyon (%20)</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest h-12">Net Hakediş</TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-right px-6 h-12">Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { date: "23 Aralık, 10:45", user: "Ahmet Y.", detail: "Hatha Yoga - Check-in", gross: 250, comm: 50, net: 200, status: "Hakedildi" },
                  { date: "23 Aralık, 09:30", user: "Selin D.", detail: "Reformer Pilates - Satış", gross: 4500, comm: 900, net: 3600, status: "Hakedildi" },
                  { date: "22 Aralık, 18:15", user: "Burak K.", detail: "Yoga Matı - Ürün Satışı", gross: 1250, comm: 250, net: 1000, status: "Hakedildi" },
                  { date: "22 Aralık, 14:00", user: "Elif A.", detail: "İptal - Cüzdana İade", gross: -250, comm: 0, net: -250, status: "İade Edildi" },
                ].map((row, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="px-6 font-medium text-xs text-muted-foreground">{row.date}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{row.user}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{row.detail}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-sm">₺{row.gross.toLocaleString()}</TableCell>
                    <TableCell className="font-bold text-sm text-rose-600">₺{row.comm.toLocaleString()}</TableCell>
                    <TableCell className="font-black text-sm text-emerald-600">₺{row.net.toLocaleString()}</TableCell>
                    <TableCell className="text-right px-6">
                      <Badge variant="outline" className={`font-black text-[9px] uppercase ${row.status === 'İade Edildi' ? 'text-amber-600 border-amber-200' : 'text-primary border-primary/20'}`}>{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Payouts Tab (PD-189, 230) */}
        <TabsContent value="payouts" className="mt-6">
          <div className="grid gap-6">
            <Card className="border-none shadow-lg bg-primary/5 border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black tracking-tight uppercase">Sıradaki Ödeme</CardTitle>
                    <CardDescription className="font-bold text-primary/70">Fylexa tarafından yapılacak hakediş ödemesi.</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-muted-foreground uppercase">TAHMİNİ TUTAR</p>
                    <p className="text-3xl font-black text-primary">₺28.500</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Status Bar (PD-189) */}
                <div className="relative pt-8 pb-4">
                  <div className="absolute top-0 left-0 w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                  </div>
                  <div className="flex justify-between">
                    {[
                      { label: "Hesaplandı", date: "20 Ara", active: true },
                      { label: "Fatura Bekliyor", date: "Bugün", active: true },
                      { label: "Onaylandı", date: "-", active: false },
                      { label: "Ödeme Gönderildi", date: "-", active: false }
                    ].map((step, idx) => (
                      <div key={idx} className={`flex flex-col items-center gap-2 ${step.active ? 'opacity-100' : 'opacity-30'}`}>
                        <div className={`w-4 h-4 rounded-full border-4 border-background ${step.active ? 'bg-primary' : 'bg-muted'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-center">{step.label}</span>
                        <span className="text-[9px] font-bold text-muted-foreground">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-2xl"><Receipt className="h-6 w-6 text-amber-600" /></div>
                    <div>
                      <p className="font-black text-amber-900 leading-tight uppercase">Fatura Bekleniyor</p>
                      <p className="text-xs text-amber-800 font-medium">Ödemenin yapılabilmesi için ₺28.500 + KDV tutarında fatura yüklemelisiniz.</p>
                    </div>
                  </div>
                  <Button className="font-black bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-200" onClick={() => setIsInvoiceModalOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" /> FATURA YÜKLE
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader><CardTitle className="text-lg font-black uppercase tracking-tight">Geçmiş Ödemeler</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest px-6">Dönem</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Ödeme Tarihi</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Tutar</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">İşlem No</TableHead>
                      <TableHead className="text-right px-6 font-black text-[10px] uppercase tracking-widest">Dekont</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { period: "1 - 15 Aralık", date: "16 Aralık 2024", amount: "₺42.100", id: "#PAY-9042", status: "Gönderildi" },
                      { period: "15 - 30 Kasım", date: "1 Aralık 2024", amount: "₺38.450", id: "#PAY-8812", status: "Gönderildi" },
                    ].map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="px-6 font-bold text-sm">{row.period}</TableCell>
                        <TableCell className="text-xs font-medium text-muted-foreground">{row.date}</TableCell>
                        <TableCell className="font-black text-sm text-primary">{row.amount}</TableCell>
                        <TableCell className="text-xs font-bold text-muted-foreground">{row.id}</TableCell>
                        <TableCell className="text-right px-6">
                          <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase tracking-widest h-8"><Download className="mr-2 h-3 w-3" /> İNDİR</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll Tab (PD-188) */}
        <TabsContent value="payroll" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Eğitmen Hakediş Hesaplayıcı</CardTitle>
                <CardDescription className="font-medium text-xs uppercase opacity-70 tracking-widest">Aralık 2024 Dönemi</CardDescription>
              </div>
              <Badge variant="secondary" className="font-black text-[10px] py-1 px-3 uppercase tracking-widest bg-emerald-500/10 text-emerald-700 border-none">OTOMATİK HESAPLANIYOR</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest px-6">Eğitmen</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Ders Başı Ücret</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Tamamlanan Ders</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">İptal/Gelmedi</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Toplam Hakediş</TableHead>
                    <TableHead className="text-right px-6 font-black text-[10px] uppercase tracking-widest">İşlem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Zeynep Hoca", rate: 450, completed: 42, cancelled: 3, total: 18900 },
                    { name: "Mert Hoca", rate: 500, completed: 28, cancelled: 1, total: 14000 },
                    { name: "Selin Hoca", rate: 400, completed: 15, cancelled: 0, total: 6000 },
                  ].map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-black text-[10px]">{row.name.substring(0, 1)}</div>
                          <span className="font-bold text-sm">{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-muted-foreground tracking-widest uppercase">₺{row.rate}</TableCell>
                      <TableCell className="font-black text-sm text-primary">{row.completed}</TableCell>
                      <TableCell className="text-xs font-bold text-rose-500">{row.cancelled}</TableCell>
                      <TableCell className="font-black text-lg">₺{row.total.toLocaleString()}</TableCell>
                      <TableCell className="text-right px-6">
                        <Button variant="outline" size="sm" className="font-black text-[9px] uppercase tracking-widest h-8 border-primary/20">ÖDEME YAP</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channel Intel Tab (PD-187) */}
        <TabsContent value="intelligence" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Kanal Bazlı Gelir Dağılımı</CardTitle>
                <CardDescription className="font-medium">Fylexa vs Stüdyo Kasası</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 gap-8">
                <div className="relative w-48 h-48">
                  {/* Mock Pie Chart UI */}
                  <div className="absolute inset-0 rounded-full border-[24px] border-primary shadow-xl" />
                  <div className="absolute inset-0 rounded-full border-[24px] border-muted-foreground/20 border-t-transparent border-r-transparent border-b-transparent transform rotate-45" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black">₺142k</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">TOPLAM</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-xs font-bold uppercase tracking-widest">Fylexa App</span>
                    </div>
                    <p className="text-xl font-black">%65</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">₺92.625</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                      <span className="text-xs font-bold uppercase tracking-widest">Kendi Kasam</span>
                    </div>
                    <p className="text-xl font-black">%35</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">₺49.875</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary/5 border border-primary/10">
              <CardHeader>
                <div className="p-2 bg-primary/10 rounded-xl w-fit mb-2"><TrendingUp className="h-5 w-5 text-primary" /></div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Akıllı Özet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-white rounded-2xl border border-primary/10 space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">EN ÇOK KAZANDIRAN KANAL</p>
                  <p className="text-lg font-black text-primary uppercase">Fylexa Mobil Uygulama</p>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">Bu ayki toplam cironun %65'i Fylexa üzerinden gelen üyelerden sağlandı. Kendi satışlarınız geçen aya göre %5 artış gösterdi.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-primary/10 space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">PROJEKSİYON</p>
                  <p className="text-lg font-black text-emerald-600 uppercase">Artış Trendi</p>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">Mevcut doluluk ve satış hızıyla, ay sonunda hakedişinizin ₺125.000 seviyesine ulaşması bekleniyor.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Invoice Upload Modal (PD-230) */}
      <Dialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 text-primary mb-2">
              <div className="p-3 bg-primary/10 rounded-2xl"><Upload className="h-6 w-6" /></div>
              <div>
                <DialogTitle className="font-black text-xl tracking-tight uppercase">Fatura Yükle</DialogTitle>
                <DialogDescription className="font-bold text-[10px] uppercase opacity-70 tracking-widest">ÖDEME DÖNEMİ: 16-31 ARALIK</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-xl space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase">FATURA TUTARI</p>
                <p className="text-xl font-black">₺28.500</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase">VERGİ (KDV %20)</p>
                <p className="text-xl font-black">₺5.700</p>
              </div>
            </div>
            
            <div className="h-40 border-2 border-dashed border-muted-foreground/20 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-muted/30 transition-all group">
              <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold uppercase">E-Fatura PDF Dosyasını Seçin</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Veya sürükleyip bırakın</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                Faturanız yüklendikten sonra mali ekibimiz tarafından incelenecek ve en geç 24 saat içinde ödeme sürecine geçilecektir.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" className="font-bold uppercase text-[10px] tracking-widest" onClick={() => setIsInvoiceModalOpen(false)}>Vazgeç</Button>
            <Button className="font-black px-8 shadow-lg shadow-primary/20 uppercase" onClick={handleUploadInvoice}>DOSYAYI GÖNDER</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


