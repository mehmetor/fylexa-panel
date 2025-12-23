"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
  Timer,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Loader2,
  RefreshCcw
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isZeroState, setIsZeroState] = useState(false)
  const [insightApplied, setInsightApplied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleApplyInsight = () => {
    toast.success("Fiyat Önerisi Uygulandı", {
      description: "İndirim sadece bugün saat 14:00'teki Yoga dersi için geçerlidir. Gelecek haftaki program bozulmadı."
    })
    setInsightApplied(true)
  }

  const toggleZeroState = () => {
    setIsLoading(true)
    setIsZeroState(!isZeroState)
    setTimeout(() => setIsLoading(false), 800)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <div className="grid gap-4 md:grid-cols-7">
          <Skeleton className="col-span-4 h-[400px]" />
          <Skeleton className="col-span-3 h-[400px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Günaydın, Mehmet Bey</h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Stüdyonuzun bugünkü operasyonel ve finansal durumu aşağıdadır.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={toggleZeroState} className="font-semibold">
            <RefreshCcw className="mr-2 h-4 w-4" />
            {isZeroState ? "Verileri Göster" : "Sıfır Veri Simüle Et"}
          </Button>
          <Button className="font-bold">
            <DollarSign className="mr-2 h-4 w-4" />
            Hızlı Satış
          </Button>
        </div>
      </div>

      {/* KPI Cards (PD-172) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Günlük Ciro</CardTitle>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-black ${isZeroState ? "text-muted-foreground" : ""}`}>
              {isZeroState ? "₺0" : "₺12.450"}
            </div>
            {!isZeroState && (
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1 font-medium">
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500 font-bold">+12.5%</span> düne göre
              </p>
            )}
            {isZeroState && <p className="text-xs text-muted-foreground mt-2">Henüz işlem yapılmadı</p>}
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Doluluk Oranı</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-black ${isZeroState ? "text-muted-foreground" : ""}`}>
              {isZeroState ? "%0" : "%78"}
            </div>
            {!isZeroState && (
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1 font-medium">
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500 font-bold">+5.2%</span> geçen haftaya göre
              </p>
            )}
            {isZeroState && <p className="text-xs text-muted-foreground mt-2 font-medium">Tüm kontenjanlar boş</p>}
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bekleyen İşler</CardTitle>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Timer className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-black ${isZeroState ? "text-muted-foreground" : ""}`}>
              {isZeroState ? "0" : "24"}
            </div>
            {!isZeroState && (
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1 font-medium">
                <ArrowDownRight className="h-3 w-3 text-rose-500" />
                <span className="text-rose-500 font-bold">-2</span> son 1 saatte
              </p>
            )}
            {isZeroState && <p className="text-xs text-muted-foreground mt-2 font-medium">İşlem beklenmiyor</p>}
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Aktif Üyeler</CardTitle>
            <div className="p-2 bg-violet-500/10 rounded-lg">
              <Users className="h-4 w-4 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-black ${isZeroState ? "text-muted-foreground" : ""}`}>
              {isZeroState ? "-" : "512"}
            </div>
            {!isZeroState && (
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1 font-medium">
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500 font-bold">+8</span> bu ay
              </p>
            )}
            {isZeroState && <p className="text-xs text-muted-foreground mt-2 font-medium">İlk üyelerinizi bekliyoruz</p>}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          {/* AI Smart Insight (PD-173) */}
          {!isZeroState && !insightApplied && (
            <Card className="bg-primary/5 border-primary/20 shadow-none overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="h-24 w-24 text-primary" />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5 fill-primary" />
                  <CardTitle className="text-lg font-bold">Yapay Zeka Önerisi</CardTitle>
                </div>
                <CardDescription className="text-primary/70 font-medium">
                  Düşük doluluk oranına sahip dersleriniz için satış artırıcı bir fırsat!
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">14:00</div>
                    <div>
                      <p className="font-bold text-sm">Hatha Yoga (Grup Dersi)</p>
                      <p className="text-xs text-muted-foreground font-medium">Mevcut Doluluk: %15 (3/20 Kişi)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-l pl-4 border-dashed">
                    <div className="text-right">
                      <p className="text-xs font-bold text-muted-foreground uppercase">Önerilen İndirim</p>
                      <p className="text-xl font-black text-emerald-600">%40 İNDİRİM</p>
                    </div>
                    <Button onClick={handleApplyInsight} className="font-bold shadow-lg shadow-primary/20">Uygula</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-none shadow-sm h-[400px]">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Performans Grafiği</CardTitle>
              <CardDescription className="font-medium">Haftalık bazda rezervasyon ve gelir dağılımı.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] w-full bg-muted/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <p className="text-muted-foreground font-bold italic opacity-50">Grafik Bileşeni (Simülasyon)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Son Aktiviteler</CardTitle>
            <CardDescription className="font-medium">Stüdyodaki son işlemler.</CardDescription>
          </CardHeader>
          <CardContent>
            {isZeroState ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-center opacity-40 grayscale">
                <Activity className="h-12 w-12 mb-4" />
                <p className="font-bold">Henüz Aktivite Yok</p>
                <p className="text-xs">İşlemler burada listelenecek.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {[
                  { type: "Satış", desc: "10'lu Reformer Paketi", time: "2dk önce", user: "Ayşe Y.", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                  { type: "Check-in", desc: "Yoga - Giriş", time: "15dk önce", user: "Can D.", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
                  { type: "İptal", desc: "Pilates - İptal", time: "45dk önce", user: "Elif S.", icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
                  { type: "Yeni Üye", desc: "Kayıt Tamamlandı", time: "1saat önce", user: "Mert A.", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                    <div className={`p-2.5 rounded-xl ${activity.bg} ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold leading-none">{activity.user}</p>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{activity.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">{activity.desc}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full mt-4 font-bold text-xs uppercase tracking-widest text-muted-foreground hover:text-primary" size="sm">
                  Tümünü Gör <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
