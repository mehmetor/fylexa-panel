"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  RotateCcw,
  Check,
  AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const STEPS = ["Dosya Yükleme", "Veri Eşleştirme", "Aktarım Önizleme", "Sonuç"]

const DB_FIELDS = [
  { value: "first_name", label: "Ad" },
  { value: "last_name", label: "Soyad" },
  { value: "email", label: "E-posta" },
  { value: "phone", label: "Telefon" },
  { value: "balance", label: "Kredi Bakiyesi" },
  { value: "notes", label: "Notlar" },
]

export default function BulkImportPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [importResults, setImportResults] = useState<{ success: number; fail: number; errors: any[] } | null>(null)

  const handleFileUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setCurrentStep(2)
      toast.success("Dosya başarıyla yüklendi", { description: "Sütunları eşleştirmeye başlayabilirsiniz." })
    }, 1500)
  }

  const handleStartImport = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setImportResults({
        success: 490,
        fail: 10,
        errors: [
          { row: 5, error: "Geçersiz e-posta formatı" },
          { row: 12, error: "Eksik telefon numarası" },
          { row: 89, error: "Mükerrer e-posta kaydı" }
        ]
      })
      setCurrentStep(4)
      toast.success("Aktarım Tamamlandı")
    }, 2000)
  }

  const handleUndo = () => {
    toast.warning("İşlem Geri Alınıyor", { description: "Eklenen tüm üyeler sistemden temizleniyor..." })
    setTimeout(() => {
      setCurrentStep(1)
      setImportResults(null)
      toast.success("Geri Alma Başarılı", { description: "Sistem eski haline döndürüldü." })
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Toplu Veri Aktarımı</h1>
        <p className="text-muted-foreground">Eski sisteminizdeki üyeleri Excel/CSV yoluyla hızlıca içeri aktarın.</p>
      </div>

      {/* Progress Tracker */}
      <div className="flex items-center justify-between px-4">
        {STEPS.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currentStep > idx + 1 ? "bg-primary text-primary-foreground" : currentStep === idx + 1 ? "border-2 border-primary text-primary" : "bg-muted text-muted-foreground"}`}>
              {currentStep > idx + 1 ? <Check className="h-4 w-4" /> : idx + 1}
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-wider ${currentStep === idx + 1 ? "text-primary" : "text-muted-foreground"}`}>{step}</span>
          </div>
        ))}
      </div>

      {currentStep === 1 && (
        <div className="grid gap-6 animate-in fade-in duration-500">
          <Card className="border-dashed border-2 bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <FileSpreadsheet className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">Excel veya CSV dosyasını sürükleyin</p>
                <p className="text-sm text-muted-foreground mt-1">Veya bilgisayarınızdan seçmek için tıklayın</p>
              </div>
              <Button onClick={handleFileUpload} disabled={isUploading} className="mt-4">
                {isUploading ? "Yükleniyor..." : "Dosya Seç"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Örnek Şablon</CardTitle>
                <CardDescription>Sisteme uyumlu veri formatı için şablonu kullanın.</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Şablonu İndir (.xlsx)
              </Button>
            </CardHeader>
          </Card>
        </div>
      )}

      {currentStep === 2 && (
        <Card className="animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle>Sütun Eşleştirme (Mapping)</CardTitle>
            <CardDescription>Excel'deki başlıkları sistemdeki alanlarla eşleştirin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { excel: "Adı Soyadı", suggested: "first_name" },
              { excel: "E-mail", suggested: "email" },
              { excel: "GSM", suggested: "phone" },
              { excel: "Bakiye", suggested: "balance" },
            ].map((mapping, idx) => (
              <div key={idx} className="flex items-center gap-8 p-4 rounded-lg bg-muted/50 border">
                <div className="flex-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Excel Başlığı</span>
                  <p className="font-bold">{mapping.excel}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sistem Alanı</span>
                  <Select defaultValue={mapping.suggested}>
                    <SelectTrigger className="h-9 font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DB_FIELDS.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="ghost" onClick={() => setCurrentStep(1)}>Geri</Button>
            <Button onClick={() => setCurrentStep(3)}>Önizlemeye Geç</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <Card>
            <CardHeader>
              <CardTitle>Mükerrer Kayıt Stratejisi</CardTitle>
              <CardDescription>Eğer bir e-posta adresi zaten sistemde varsa ne yapılmalı?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="skip" className="grid gap-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="skip" id="skip" className="mt-1" />
                  <Label htmlFor="skip" className="grid gap-1.5 cursor-pointer">
                    <span className="font-bold text-sm leading-none">Hata ver ve atla (Önerilen)</span>
                    <span className="text-xs text-muted-foreground leading-snug">Mevcut kayda dokunulmaz, aktarım sırasında hata olarak raporlanır.</span>
                  </Label>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="update" id="update" className="mt-1" />
                  <Label htmlFor="update" className="grid gap-1.5 cursor-pointer">
                    <span className="font-bold text-sm leading-none">Üzerine yaz ve güncelle</span>
                    <span className="text-xs text-muted-foreground leading-snug">Excel'deki veriler mevcut kaydı günceller (Bakiye, telefon vb.).</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setCurrentStep(2)}>Geri</Button>
            <Button onClick={handleStartImport} disabled={isUploading} className="min-w-[150px]">
              {isUploading ? "Aktarılıyor..." : "Aktarımı Başlat (500 Kayıt)"}
            </Button>
          </div>
        </div>
      )}

      {currentStep === 4 && importResults && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500 rounded-full text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-emerald-600">{importResults.success}</p>
                    <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Başarılı Kayıt</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-rose-500/20 bg-rose-500/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-rose-500 rounded-full text-white">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-rose-600">{importResults.fail}</p>
                    <p className="text-sm font-bold text-rose-800 uppercase tracking-widest">Hatalı Kayıt</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hata Raporu</CardTitle>
              <CardDescription>Lütfen aşağıdaki hataları Excel dosyanızda düzelterek tekrar yükleyin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y border rounded-lg">
                {importResults.errors.map((err, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 text-sm">
                    <span className="font-bold text-muted-foreground">Satır {err.row}</span>
                    <span className="text-rose-600 font-medium">{err.error}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between p-6 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold text-amber-900">Bir şeyler ters mi gitti?</p>
                <p className="text-sm text-amber-800">Yanlış verileri mi aktardınız? Endişelenmeyin, bu aktarımı tek tıkla geri alabilirsiniz.</p>
              </div>
            </div>
            <Button variant="outline" className="border-amber-300 hover:bg-amber-100 text-amber-900 font-bold" onClick={handleUndo}>
              <RotateCcw className="mr-2 h-4 w-4" /> Aktarımı Geri Al
            </Button>
          </div>

          <div className="flex justify-center pt-4">
            <Button size="lg" className="px-12 font-bold" onClick={() => router.push("/members")}>Üyeler Listesine Git</Button>
          </div>
        </div>
      )}
    </div>
  )
}


