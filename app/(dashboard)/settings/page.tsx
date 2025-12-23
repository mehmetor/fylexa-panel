"use client"

import { useState } from "react"
import { 
  Building2, 
  Clock, 
  ShieldCheck, 
  FileCheck, 
  Users, 
  Trash2, 
  Save, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Lock,
  ChevronRight,
  Download,
  Mail,
  Smartphone,
  Fingerprint
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [isContractSigned, setIsContractSigned] = useState(false)

  const handleSignContract = () => {
    toast.success("Dijital Onay Başarılı", {
      description: "Sözleşme SMS doğrulaması ile imzalandı ve dijital arşive eklendi."
    })
    setIsContractSigned(true)
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Kurumsal Ayarlar ve Politikalar</h1>
        <p className="text-muted-foreground mt-1 font-medium">İşletme kurallarını, personel yetkilerini ve yasal belgeleri yönetin.</p>
      </div>

      <Tabs defaultValue="policies" className="w-full">
        <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none p-0 gap-8">
          <TabsTrigger value="policies" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">İptal Politikası</TabsTrigger>
          <TabsTrigger value="permissions" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Yetki Matrisi</TabsTrigger>
          <TabsTrigger value="contracts" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Sözleşmeler & Evrak</TabsTrigger>
          <TabsTrigger value="business" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">İşletme Bilgileri</TabsTrigger>
        </TabsList>

        {/* Cancellation Policy (PD-193) */}
        <TabsContent value="policies" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Rezervasyon İptal Kuralları</CardTitle>
                <CardDescription className="font-medium text-xs uppercase tracking-widest opacity-70">Üyelerin iptal penceresini belirleyin.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4 p-6 bg-muted/30 rounded-2xl border">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Ceza Penceresi</Label>
                      <p className="text-xs text-muted-foreground font-medium">Ders başlamasına ne kadar kala iptallerde kredi yanar?</p>
                    </div>
                    <Select defaultValue="12">
                      <SelectTrigger className="w-[120px] h-10 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Saat</SelectItem>
                        <SelectItem value="3">3 Saat</SelectItem>
                        <SelectItem value="6">6 Saat</SelectItem>
                        <SelectItem value="12">12 Saat</SelectItem>
                        <SelectItem value="24">24 Saat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="bg-muted-foreground/10" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">No-Show Kısıtlaması</Label>
                      <p className="text-xs text-muted-foreground font-medium">Habersiz gelmeyen üyeye ek ceza uygula.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                  <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    Bu ayar finansal modül ile entegre çalışır. Pencere dışındaki iptallerde sistem otomatik olarak "İade Edilemez" uyarısı verir.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button className="font-black w-full shadow-lg shadow-primary/20"><Save className="mr-2 h-4 w-4" /> POLİTİKAYI KAYDET</Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-sm bg-primary/5 border border-primary/10">
              <CardHeader>
                <div className="p-2 bg-primary/10 rounded-xl w-fit mb-2"><CheckCircle2 className="h-5 w-5 text-primary" /></div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Kullanıcı Deneyimi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-primary/10 space-y-4 shadow-sm">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">ÖNİZLEME (MOBİL UYGULAMA)</p>
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                    <p className="text-xs font-bold text-rose-900">⚠️ İPTAL UYARISI</p>
                    <p className="text-[10px] text-rose-800 font-medium mt-1">Dersin başlamasına 12 saatten az süre kalmıştır. Bu iptal işleminde krediniz iade edilmeyecektir. Devam etmek istiyor musunuz?</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Permission Matrix (PD-194) */}
        <TabsContent value="permissions" className="mt-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Personel ve Yetki Matrisi</CardTitle>
                <CardDescription className="font-medium">Rollerin hangi sayfalara ve verilere erişebileceğini belirleyin.</CardDescription>
              </div>
              <Button size="sm" className="font-bold"><Users className="mr-2 h-4 w-4" /> PERSONEL EKLE</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest px-6">Modül / Sayfa</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Owner</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Front Desk</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Instructor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { module: "Finansal Raporlar", owner: true, staff: false, instructor: false },
                    { module: "Kasa / POS Satış", owner: true, staff: true, instructor: false },
                    { module: "Üye Listesi & CRM", owner: true, staff: true, instructor: true },
                    { module: "Takvim / Ders Yönetimi", owner: true, staff: true, instructor: "Sadece Kendi" },
                    { module: "Sistem Ayarları", owner: true, staff: false, instructor: false },
                  ].map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="px-6 font-bold text-sm">{row.module}</TableCell>
                      <TableCell className="text-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof row.staff === 'boolean' ? (
                          row.staff ? <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" /> : <Lock className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                        ) : <span className="text-[10px] font-bold text-primary uppercase">{row.staff}</span>}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof row.instructor === 'boolean' ? (
                          row.instructor ? <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" /> : <Lock className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                        ) : <span className="text-[10px] font-bold text-primary uppercase">{row.instructor}</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contracts (PD-192) */}
        <TabsContent value="contracts" className="mt-6">
          <div className="grid gap-6">
            <Card className={`border-none shadow-sm transition-all ${isContractSigned ? 'bg-emerald-50/50 border border-emerald-100' : 'bg-amber-50 border border-amber-100'}`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${isContractSigned ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black tracking-tight uppercase">İş Ortağı Ticari Sözleşmesi</CardTitle>
                    <CardDescription className="font-bold text-[10px] uppercase opacity-70 tracking-widest">VERSİYON: 2024/V2 - SON GÜNCELLEME: 12 ARALIK</CardDescription>
                  </div>
                </div>
                <Badge variant={isContractSigned ? "default" : "outline"} className={`font-black text-[10px] uppercase px-4 py-1 ${isContractSigned ? 'bg-emerald-600' : 'text-amber-700 border-amber-300'}`}>
                  {isContractSigned ? "ONAYLANDI" : "ONAY BEKLİYOR"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-muted shadow-inner max-h-[300px] overflow-auto">
                  <h3 className="font-black text-sm mb-4 uppercase">1. TARAFLAR VE KONU</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    İşbu sözleşme, Fylexa Platformu (bundan sonra "PLATFORM" olarak anılacaktır) ile yukarıda bilgileri yer alan Stüdyo İşletmesi (bundan sonra "İŞ ORTAĞI" olarak anılacaktır) arasında akdedilmiştir.
                    <br /><br />
                    İŞ ORTAĞI, PLATFORM üzerinden gerçekleştirilen her bir başarılı rezervasyon ve satış işlemi için %20 (Yirmi) oranında hizmet komisyonu ödemeyi kabul ve taahhüt eder.
                    <br /><br />
                    Hakediş ödemeleri, fatura ibrazını takip eden her ayın 1. ve 16. günlerinde İŞ ORTAĞI'nın beyan ettiği banka hesabına transfer edilir.
                  </p>
                </div>

                {!isContractSigned && (
                  <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-amber-500/5 rounded-2xl border border-dashed border-amber-200 gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-full shadow-sm"><Fingerprint className="h-6 w-6 text-amber-600" /></div>
                      <div>
                        <p className="font-bold text-amber-900">Dijital Onay Süreci</p>
                        <p className="text-xs text-amber-800 font-medium leading-relaxed">Kargo ile uğraşmanıza gerek yok. Sözleşmeyi okuyup onaylayarak süreci hemen tamamlayabilirsiniz.</p>
                      </div>
                    </div>
                    <Button className="font-black bg-amber-600 hover:bg-amber-700 h-12 px-8 shadow-lg shadow-amber-200" onClick={handleSignContract}>DİJİTAL OLARAK İMZALA</Button>
                  </div>
                )}

                {isContractSigned && (
                  <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <p className="text-sm font-bold text-emerald-900">Sözleşme 23 Aralık 2024 tarihinde Mehmet Demir tarafından dijital olarak onaylanmıştır.</p>
                    </div>
                    <Button variant="ghost" className="font-black text-[10px] uppercase text-emerald-700 tracking-widest"><Download className="mr-2 h-3 w-3" /> PDF İNDİR</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">İşletme Bilgileri</CardTitle>
              <CardDescription className="font-medium">Fatura ve iletişim bilgilerinizi güncelleyin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Ticari Ünvan</Label>
                  <Input defaultValue="Mehmet Demir Şahis Şti." className="font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Vergi No / TCKN</Label>
                  <Input defaultValue="1234567890" className="font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Vergi Dairesi</Label>
                  <Input defaultValue="Beşiktaş" className="font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">İletişim E-postası</Label>
                  <Input defaultValue="finans@studyo.com" className="font-bold" />
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Banka Hesap Bilgisi (IBAN)</Label>
                <div className="relative">
                  <Input defaultValue="TR00 0000 0000 0000 0000 0000 00" className="font-black tracking-widest pl-10 h-12" />
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button className="font-black px-12 shadow-lg shadow-primary/20 uppercase">DEĞİŞİKLİKLERİ KAYDET</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


