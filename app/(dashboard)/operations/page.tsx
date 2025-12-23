"use client"

import { useState } from "react"
import { 
  ClipboardCheck, 
  Users, 
  QrCode, 
  Search,
  CheckCircle2,
  Clock,
  User,
  AlertTriangle,
  X,
  UserPlus,
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  Check,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const INITIAL_STUDENTS = [
  { id: 1, name: "Ahmet Yılmaz", phone: "0532 123 45 67", status: "PENDING", credit: 1, reservationTime: "10:00" },
  { id: 2, name: "Selin Demir", phone: "0544 987 65 43", status: "CHECKED_IN", credit: 1, reservationTime: "10:00" },
  { id: 3, name: "Burak Kaya", phone: "0555 111 22 33", status: "PENDING", credit: 1, reservationTime: "10:00" },
  { id: 4, name: "Elif Akın", phone: "0506 555 44 33", status: "CANCELLED", credit: 0, reservationTime: "10:00" },
]

export default function OperationsPage() {
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [qrState, setQrState] = useState<"IDLE" | "SCANNING" | "SUCCESS" | "ERROR">("IDLE")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const handleCheckIn = (id: number) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: "CHECKED_IN" } : s))
    toast.success("Giriş Yapıldı", { description: "Üye statüsü CHECKED_IN olarak güncellendi ve finansal tetikleyici çalıştı." })
  }

  const simulateQrScan = (type: "SUCCESS" | "ERROR") => {
    setQrState("SCANNING")
    setTimeout(() => {
      setQrState(type)
      if (type === "SUCCESS") {
        toast.success("QR Doğrulandı", { description: "Üye derse giriş yaptı." })
      } else {
        toast.error("QR Geçersiz", { description: "Rezervasyon saati uygun değil veya QR formatı hatalı." })
      }
    }, 1500)
  }

  const handleWalkIn = () => {
    toast.warning("Kapasite Uyarısı", { description: "Sınıf dolu ancak yetkili personel olarak kapasite aşımı yapılarak üye ekleniyor..." })
    setTimeout(() => {
      const newStudent = { id: Date.now(), name: "Yeni Üye (Walk-in)", phone: "-", status: "CHECKED_IN", credit: 1, reservationTime: "10:00" }
      setStudents(prev => [...prev, newStudent])
      setIsWalkInModalOpen(false)
      toast.success("Üye Başarıyla Eklendi")
    }, 1000)
  }

  const handleAdminOverrideCancel = () => {
    setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, status: "CANCELLED", credit: 1 } : s))
    setIsCancelModalOpen(false)
    toast.success("İnisiyatifli İptal Yapıldı", { 
      description: "Ceza süresi dolmuş olmasına rağmen kredi üyenin hesabına iade edildi." 
    })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Operasyon ve Yoklama</h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Bugünkü derslerin yoklamasını ve check-in işlemlerini buradan yönetebilirsiniz.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg" className="h-12 border-primary/20 hover:bg-primary/5 font-bold" onClick={() => setIsQrModalOpen(true)}>
            <QrCode className="mr-2 h-5 w-5 text-primary" />
            QR Okut
          </Button>
          <Button size="lg" className="h-12 font-bold shadow-lg shadow-primary/20" onClick={() => setIsWalkInModalOpen(true)}>
            <UserPlus className="mr-2 h-5 w-5" />
            Manuel Ekle (Walk-in)
          </Button>
        </div>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 h-11 p-1 bg-muted/50 border">
          <TabsTrigger value="attendance" className="font-bold">Yoklama Listesi</TabsTrigger>
          <TabsTrigger value="active-classes" className="font-bold">Aktif Dersler</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="mt-6 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex flex-col items-center justify-center text-white font-black">
                    <span className="text-[10px] leading-none opacity-80">SAAT</span>
                    <span className="text-lg leading-none">10:00</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black tracking-tight">Hatha Yoga (Grup Dersi)</CardTitle>
                    <CardDescription className="font-medium text-xs flex items-center gap-2">
                      <User className="h-3 w-3" /> Zeynep Hoca • <Users className="h-3 w-3" /> 18/20 Dolu
                    </CardDescription>
                  </div>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Katılımcı ara..." className="pl-9 h-10 border-none bg-muted/80 font-medium" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${student.status === 'CHECKED_IN' ? 'bg-emerald-500/10 text-emerald-600' : student.status === 'CANCELLED' ? 'bg-rose-500/10 text-rose-600' : 'bg-muted text-muted-foreground'}`}>
                        {student.status === 'CHECKED_IN' ? <CheckCircle2 className="h-5 w-5" /> : student.status === 'CANCELLED' ? <X className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-none">{student.name}</p>
                        <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">{student.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {student.status === 'PENDING' && (
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-9 font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50" onClick={() => { setSelectedStudent(student); setIsCancelModalOpen(true); }}>İptal Et</Button>
                          <Button size="sm" className="h-9 font-bold bg-emerald-600 hover:bg-emerald-700" onClick={() => handleCheckIn(student.id)}>Check-in</Button>
                        </div>
                      )}
                      {student.status === 'CHECKED_IN' && (
                        <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200 text-[10px] font-black uppercase tracking-widest px-3 py-1">GELDİ</Badge>
                      )}
                      {student.status === 'CANCELLED' && (
                        <div className="flex items-center gap-3">
                           {student.credit > 0 && <Badge variant="outline" className="border-amber-200 text-amber-600 font-bold text-[9px] uppercase tracking-tighter">KREDİ İADE EDİLDİ</Badge>}
                           <Badge className="bg-rose-500/10 text-rose-700 border-rose-200 text-[10px] font-black uppercase tracking-widest px-3 py-1">İPTAL EDİLDİ</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active-classes">
          {/* Reuse earlier placeholder but more styled */}
          <div className="grid gap-4 mt-6">
            {[
              { time: "11:30 - 12:30", name: "Reformer Pilates", instructor: "Mert A.", enrolled: "4/5", status: "BAŞLAMAK ÜZERE", color: "text-amber-600" },
              { time: "13:00 - 14:00", name: "Mat Pilates", instructor: "Selin Y.", enrolled: "15/15", status: "DOLU", color: "text-rose-600" },
            ].map((lesson, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:bg-muted/30 cursor-pointer transition-all border-l-4 border-l-primary/20">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-2xl">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-black text-lg leading-tight">{lesson.name}</p>
                      <p className="text-xs text-muted-foreground font-bold mt-1 uppercase tracking-widest">{lesson.time} • {lesson.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm font-black">{lesson.enrolled} Üye</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${lesson.color}`}>{lesson.status}</p>
                    </div>
                    <Button variant="secondary" className="font-bold">Yoklama Al</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* QR Modal Simulation (PD-179) */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-bold text-center">QR Okuyucu</DialogTitle>
            <DialogDescription className="text-center">Kullanıcının QR kodunu kameraya tutun.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-8 gap-6">
            <div className={`w-48 h-48 border-4 rounded-3xl flex items-center justify-center relative overflow-hidden transition-all ${qrState === 'SCANNING' ? 'border-primary animate-pulse' : qrState === 'SUCCESS' ? 'border-emerald-500 bg-emerald-50' : qrState === 'ERROR' ? 'border-rose-500 bg-rose-50' : 'border-dashed border-muted-foreground/30'}`}>
              {qrState === 'IDLE' && <QrCode className="h-20 w-20 text-muted-foreground opacity-20" />}
              {qrState === 'SCANNING' && (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  <p className="text-xs font-bold text-primary animate-bounce">Taranıyor...</p>
                </div>
              )}
              {qrState === 'SUCCESS' && <CheckCircle2 className="h-20 w-20 text-emerald-500 animate-in zoom-in duration-300" />}
              {qrState === 'ERROR' && <AlertTriangle className="h-20 w-20 text-rose-500 animate-in shake duration-500" />}
              
              {/* Scanline simulation */}
              {qrState === 'SCANNING' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)] animate-scan" />
              )}
            </div>
            
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1 font-bold" onClick={() => simulateQrScan("ERROR")} disabled={qrState === 'SCANNING'}>Hata Simüle Et</Button>
              <Button className="flex-1 font-bold bg-emerald-600 hover:bg-emerald-700" onClick={() => simulateQrScan("SUCCESS")} disabled={qrState === 'SCANNING'}>Başarı Simüle Et</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" className="w-full font-bold" onClick={() => { setIsQrModalOpen(false); setQrState("IDLE"); }}>Kapat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Walk-in Modal (PD-178) */}
      <Dialog open={isWalkInModalOpen} onOpenChange={setIsWalkInModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold">Manuel Üye Ekle (Walk-in)</DialogTitle>
            <DialogDescription>Rezervasyonu olmayan bir üyeyi derse dahil edin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-rose-900">Kapasite Aşımı Uyarısı!</p>
                <p className="text-xs text-rose-800">Ders şu an dolu (20/20). Devam ederseniz kapasite aşılacaktır (Inisiyatifli Giriş).</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Üye Seçin</Label>
              <Select defaultValue="new">
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Üye arayın..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Kayıtlı Olmayan Üye (Tek Seferlik)</SelectItem>
                  <SelectItem value="1">Mehmet Öztürk</SelectItem>
                  <SelectItem value="2">Seda Güler</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notlar</Label>
              <Input placeholder="Neden ekleniyor? (Örn: Mat ekleme yapıldı)" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" className="font-bold" onClick={() => setIsWalkInModalOpen(false)}>Vazgeç</Button>
            <Button className="font-bold" onClick={handleWalkIn}>Kapasiteyi Aş ve Ekle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Override Cancel Modal (PD-212) */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <ShieldAlert className="h-6 w-6" />
              <DialogTitle className="font-bold">İnisiyatifli İptal Yönetimi</DialogTitle>
            </div>
            <DialogDescription className="font-medium">
              Üye {selectedStudent?.name} için iptal işlemi yapıyorsunuz.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <p className="text-xs font-bold text-amber-900 flex items-center gap-2 uppercase tracking-widest">
                <Clock className="h-3 w-3" /> CEZA SÜRESİ İÇİNDE!
              </p>
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                Dersin başlamasına 2 saatten az süre kaldığı için sistem kuralı gereği kredi **YANMALIDIR**. 
                Ancak yönetici yetkinizle bu kuralı delebilir ve krediyi iade edebilirsiniz.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="h-12 border-rose-200 text-rose-700 hover:bg-rose-50 font-bold" onClick={() => { setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, status: "CANCELLED", credit: 0 } : s)); setIsCancelModalOpen(false); toast.info("İptal Edildi", { description: "Kredi kural gereği iade edilmedi." }); }}>
                Krediyi YAK ve İptal Et
              </Button>
              <Button className="h-12 bg-amber-600 hover:bg-amber-700 font-black shadow-lg shadow-amber-200" onClick={handleAdminOverrideCancel}>
                Krediyi İADE ET (Admin İnisiyatifi)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
