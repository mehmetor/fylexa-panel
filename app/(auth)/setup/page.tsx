"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Camera,
  Wifi,
  Coffee,
  ShowerHead,
  Car,
  Lock,
  Wind,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const STEPS = [
  { id: 1, title: "Temel Bilgiler", description: "Stüdyonuzun adı ve logosu", icon: Building2 },
  { id: 2, title: "Konum", description: "Adres ve ulaşım bilgileri", icon: MapPin },
  { id: 3, title: "Çalışma Saatleri", description: "Açılış ve kapanış zamanları", icon: Clock },
  { id: 4, title: "Olanaklar", description: "Üyelere sunduğunuz imkanlar", icon: CheckCircle2 },
]

const AMENITIES = [
  { id: "wifi", label: "Ücretsiz Wi-Fi", icon: Wifi },
  { id: "coffee", label: "Kafe / Bar", icon: Coffee },
  { id: "shower", label: "Duş & Soyunma Odası", icon: ShowerHead },
  { id: "parking", label: "Otopark", icon: Car },
  { id: "locker", label: "Emanet Kasası", icon: Lock },
  { id: "air", label: "Klima / Havalandırma", icon: Wind },
]

export default function SetupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    openTime: "09:00",
    closeTime: "22:00",
    selectedAmenities: [] as string[]
  })

  // Mock Map Interaction Simulation
  const handleMapPinDrop = () => {
    toast.info("Konum Belirlendi", {
      description: "Harita üzerindeki pinden adres bilgileri otomatik çekildi."
    })
    setFormData(prev => ({
      ...prev,
      city: "İstanbul",
      district: "Beşiktaş",
      address: "Levent Mah. Cömert Sk. No: 1/1"
    }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleAmenity = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(id)
        ? prev.selectedAmenities.filter(a => a !== id)
        : [...prev.selectedAmenities, id]
    }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.name.length > 2 && formData.phone.length > 5
      case 2: return formData.address.length > 5 && formData.city !== ""
      case 3: {
        const [openH, openM] = formData.openTime.split(":").map(Number)
        const [closeH, closeM] = formData.closeTime.split(":").map(Number)
        return (closeH > openH) || (closeH === openH && closeM > openM)
      }
      case 4: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (!isStepValid()) {
      if (currentStep === 3) {
        toast.error("Geçersiz Saat", { description: "Kapanış saati açılış saatinden sonra olmalıdır." })
      } else {
        toast.error("Eksik Bilgi", { description: "Lütfen tüm zorunlu alanları doldurun." })
      }
      return
    }
    if (currentStep < 4) setCurrentStep(prev => prev + 1)
    else handleComplete()
  }

  const handleComplete = () => {
    toast.success("Kurulum Tamamlandı!", {
      description: "Stüdyonuz başarıyla oluşturuldu. Dashboard'a yönlendiriliyorsunuz."
    })
    setTimeout(() => router.push("/"), 1500)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-[280px_1fr] gap-8">
        
        {/* Sidebar Steps */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Kurulum</h2>
            <p className="text-sm text-muted-foreground">Fylexa'ya hoş geldiniz.</p>
          </div>
          <div className="space-y-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              return (
                <div 
                  key={step.id} 
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all ${isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground"}`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold leading-none mb-1 ${isActive ? "text-primary-foreground" : "text-foreground"}`}>
                      {step.title}
                    </p>
                    <p className="text-xs opacity-70 leading-tight">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <Card className="border-none shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between lg:hidden mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Adım {currentStep} / 4</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`h-1.5 w-6 rounded-full ${i <= currentStep ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">{STEPS[currentStep - 1].title}</CardTitle>
            <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>
          
          <CardContent className="min-h-[350px]">
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex flex-col items-center justify-center gap-4 py-4">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-dashed border-muted-foreground/20 flex items-center justify-center overflow-hidden bg-muted group-hover:border-primary/50 transition-colors">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="h-8 w-8 text-muted-foreground opacity-50" />
                      )}
                    </div>
                    <Label htmlFor="logo-upload" className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                      <Camera className="h-4 w-4" />
                      <input id="logo-upload" type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Stüdyo logonuzu yükleyin (Opsiyonel)</p>
                </div>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">İşletme Adı <span className="text-destructive">*</span></Label>
                    <Input id="name" placeholder="Örn: Zen Yoga Stüdyosu" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">İletişim Telefonu <span className="text-destructive">*</span></Label>
                    <Input id="phone" placeholder="05XX XXX XX XX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div 
                  className="h-48 w-full bg-muted rounded-xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors group"
                  onClick={handleMapPinDrop}
                >
                  <MapPin className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-semibold">Haritadan Konum Seç</p>
                  <p className="text-xs text-muted-foreground">Pin bırakmak için tıklayın</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Şehir</Label>
                    <Input value={formData.city} readOnly placeholder="İl" className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>İlçe</Label>
                    <Input value={formData.district} readOnly placeholder="İlçe" className="bg-muted/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Açık Adres <span className="text-destructive">*</span></Label>
                  <Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Mahalle, Sokak, No..." />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 py-4">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Açılış Saati
                    </Label>
                    <Input type="time" value={formData.openTime} onChange={e => setFormData({...formData, openTime: e.target.value})} className="h-14 text-xl font-bold text-center" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      Kapanış Saati
                    </Label>
                    <Input type="time" value={formData.closeTime} onChange={e => setFormData({...formData, closeTime: e.target.value})} className="h-14 text-xl font-bold text-center" />
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Stüdyonuz her gün bu saatler arasında hizmet verecek şekilde takviminizde görünecektir. Özel tatil ve blokajları daha sonra takvimden yönetebilirsiniz.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 py-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {AMENITIES.map(amenity => {
                    const Icon = amenity.icon
                    const isSelected = formData.selectedAmenities.includes(amenity.id)
                    return (
                      <button
                        key={amenity.id}
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all gap-3 ${isSelected ? "border-primary bg-primary/5 shadow-inner" : "border-muted bg-card hover:border-primary/30"}`}
                      >
                        <div className={`p-3 rounded-full ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className={`text-xs font-bold ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                          {amenity.label}
                        </span>
                        {isSelected && <div className="absolute top-2 right-2"><Check className="h-3 w-3 text-primary" /></div>}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Geri
            </Button>
            <Button onClick={handleNext} className="min-w-[120px]">
              {currentStep === 4 ? "Kaydet ve Başla" : "Devam Et"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  )
}


