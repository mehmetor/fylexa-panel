"use client"

import { useState } from "react"
import { 
  Megaphone, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  X, 
  Smartphone, 
  Upload, 
  Users, 
  Eye, 
  Clock, 
  Send,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  ShieldCheck,
  Layout
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MarketingPage() {
  const [campaign, setCampaign] = useState({
    title: "Yaza Merhaba İndirimi!",
    body: "Tüm 10'lu paketlerde %20 indirim fırsatını kaçırmayın. Sınırlı kontenjan!",
    image: null as string | null
  })

  const [reviews, setReviews] = useState([
    { id: 1, user: "Ahmet Y.", rating: 5, comment: "Zeynep hoca harika, dersler çok keyifli geçiyor. Stüdyo tertemiz.", class: "Hatha Yoga", status: "PENDING" },
    { id: 2, user: "Selin D.", rating: 2, comment: "Ders saati 15 dk geç başladı, beklemekten yoruldum.", class: "Reformer Pilates", status: "PENDING" },
    { id: 3, user: "Burak K.", rating: 4, comment: "Ekipmanlar yeni ve kaliteli. Tavsiye ederim.", class: "Mat Pilates", status: "APPROVED" },
  ])

  const handleReviewAction = (id: number, status: "APPROVED" | "HIDDEN") => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status } : r))
    toast.success(status === 'APPROVED' ? "Yorum Onaylandı" : "Yorum Gizlendi")
  }

  const handleSendCampaign = () => {
    toast.success("Kampanya Yayında!", {
      description: "Duyuru sadece KVKK izni olan 450 üyeye başarıyla gönderildi."
    })
  }

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Pazarlama ve Müşteri Deneyimi</h1>
        <p className="text-muted-foreground mt-1 font-medium">Marka imajınızı yönetin ve üyelerinizle etkileşim kurun.</p>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none p-0 gap-8">
          <TabsTrigger value="campaigns" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Kampanya Sihirbazı</TabsTrigger>
          <TabsTrigger value="reviews" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">Yorum Moderasyonu</TabsTrigger>
          <TabsTrigger value="consent" className="h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black text-xs uppercase tracking-widest px-0">İzin Yönetimi (KVKK)</TabsTrigger>
        </TabsList>

        {/* Campaign Builder (PD-198) */}
        <TabsContent value="campaigns" className="mt-6">
          <div className="grid lg:grid-cols-[1fr_350px] gap-12">
            <div className="space-y-8">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Yeni Kampanya Oluştur</CardTitle>
                  <CardDescription className="font-medium">Üyelerinize anlık bildirim ve SMS gönderin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Kampanya Başlığı</Label>
                    <Input 
                      value={campaign.title} 
                      onChange={(e) => setCampaign({...campaign, title: e.target.value})}
                      placeholder="Dikkat çekici bir başlık yazın..." 
                      className="h-12 font-bold text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Duyuru Metni</Label>
                    <Textarea 
                      value={campaign.body}
                      onChange={(e) => setCampaign({...campaign, body: e.target.value})}
                      placeholder="Üyelerinize ne söylemek istersiniz?" 
                      className="min-h-[120px] font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Görsel (Opsiyonel)</Label>
                    <div className="h-32 border-2 border-dashed border-muted-foreground/20 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/30 transition-all group">
                      <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-[10px] font-black text-muted-foreground uppercase">Görsel Yükle</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-primary/5 border border-primary/10">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-tight">Hedef Kitle Seçimi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-primary/10 space-y-1">
                      <p className="text-[10px] font-black text-muted-foreground uppercase">POTANSİYEL ERİŞİM</p>
                      <p className="text-2xl font-black text-primary">450 Üye</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-primary/10 space-y-1 opacity-50">
                      <p className="text-[10px] font-black text-muted-foreground uppercase">İZİN VERMEYENLER</p>
                      <p className="text-2xl font-black text-rose-600">62 Üye</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg"><ShieldCheck className="h-4 w-4 text-emerald-600" /></div>
                      <p className="text-xs font-bold text-emerald-900 leading-tight uppercase tracking-tighter">Sadece KVKK İzinli Üyelere Gönderilir</p>
                    </div>
                    <Badge className="bg-emerald-500 text-white font-black text-[9px] uppercase">GÜVENLİ</Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-primary/10 pt-6">
                  <Button className="w-full h-14 text-lg font-black shadow-xl shadow-primary/20 uppercase" onClick={handleSendCampaign}>
                    KAMPANYAYI YAYINLA <Send className="ml-2 h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Phone Mock Preview (PD-198) */}
            <div className="relative sticky top-24">
              <p className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">CANLI ÖNİZLEME (Müşteri Telefonu)</p>
              <div className="mx-auto w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden ring-4 ring-slate-800/50">
                {/* Status Bar */}
                <div className="h-6 w-full bg-slate-900 flex justify-between px-8 pt-2 items-center">
                  <span className="text-[8px] text-white font-bold">09:41</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 rounded-full border border-white/50" />
                    <div className="w-3 h-1.5 bg-white rounded-sm" />
                  </div>
                </div>
                {/* Screen Content */}
                <div className="p-4 flex flex-col gap-4">
                  {/* Notification Mock */}
                  <div className="bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl animate-in slide-in-from-top-12 duration-1000">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center text-[8px] font-black italic">F</div>
                      <span className="text-[10px] font-black text-slate-900">FYLEXA</span>
                      <span className="text-[8px] text-slate-500 font-bold ml-auto text-right">ŞİMDİ</span>
                    </div>
                    <p className="text-[11px] font-black text-slate-900">{campaign.title || "Başlık Yazılıyor..."}</p>
                    <p className="text-[10px] text-slate-600 font-medium leading-relaxed mt-0.5">{campaign.body || "Metin yazılıyor..."}</p>
                  </div>
                  {/* App Screen Mock */}
                  <div className="mt-4 bg-slate-100/10 rounded-2xl h-[400px] border border-white/5 flex flex-col items-center justify-center text-center p-8">
                    <Layout className="h-8 w-8 text-white/20 mb-2" />
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Uygulama İçerik Alanı</p>
                  </div>
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Review Moderation (PD-196) */}
        <TabsContent value="reviews" className="mt-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black uppercase tracking-tight">Onay Bekleyen Yorumlar</h2>
                <Badge variant="outline" className="font-bold text-xs uppercase px-3 py-1 bg-amber-500/5 text-amber-600 border-amber-200">
                  {reviews.filter(r => r.status === 'PENDING').length} Yeni Yorum
                </Badge>
              </div>

              <div className="grid gap-4">
                {reviews.filter(r => r.status === 'PENDING').map((review) => (
                  <Card key={review.id} className="border-none shadow-sm overflow-hidden group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
                            <AvatarFallback className="font-black bg-primary/5 text-primary">{review.user.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-base">{review.user}</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs font-bold text-primary uppercase tracking-widest">{review.class} Üyesi</p>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed mt-2 italic">"{review.comment}"</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 font-black h-10 px-6 shadow-lg shadow-emerald-200" onClick={() => handleReviewAction(review.id, "APPROVED")}>ONAYLA</Button>
                          <Button variant="ghost" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold h-10 uppercase text-[10px] tracking-widest" onClick={() => handleReviewAction(review.id, "HIDDEN")}>GİZLE</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-xl font-black uppercase tracking-tight pt-8 border-t">Yayınlanan Yorumlar</h2>
              <div className="grid gap-4 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                {reviews.filter(r => r.status === 'APPROVED').map((review) => (
                  <Card key={review.id} className="border-none shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-2.5 w-2.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
                          ))}
                        </div>
                        <span className="text-xs font-bold">{review.user}:</span>
                        <span className="text-xs font-medium italic text-muted-foreground">"{review.comment.substring(0, 40)}..."</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter">YAYINDA</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Rating Distribution (PD-196) */}
            <div className="space-y-6">
              <Card className="border-none shadow-sm bg-card overflow-hidden">
                <CardHeader className="bg-muted/30 pb-6 text-center">
                  <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Ortalama Puan</CardTitle>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-6xl font-black text-slate-900 tracking-tighter">4.8</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-2">Toplam 124 Yorum</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-muted-foreground w-4">{star}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : 5}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground w-8 text-right">{star === 5 ? '85%' : star === 4 ? '10%' : '5%'}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-emerald-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-20"><ThumbsUp className="h-16 w-16" /></div>
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest opacity-80">Kalite Karnesi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pb-6">
                  <p className="text-3xl font-black">MÜKEMMEL</p>
                  <p className="text-xs font-medium leading-relaxed opacity-90">
                    Üyeleriniz stüdyo temizliğinden ve Zeynep Hoca'nın anlatımından çok memnunlar. Bu hafta negatif yorum oranı %0!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Consent Management (PD-211) */}
        <TabsContent value="consent" className="mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">KVKK ve İzin Yönetimi</CardTitle>
              <CardDescription className="font-medium">Üyelerinizin pazarlama izinlerini buradan takip edebilirsiniz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="p-6 bg-muted/30 rounded-2xl border flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-sm leading-tight">Otomatik SMS Filtresi</p>
                  <p className="text-xs text-muted-foreground font-medium">İzni olmayan üyelere sistem üzerinden SMS gönderimi otomatik olarak engellenir.</p>
                </div>
                <Badge className="bg-emerald-600 font-black text-[10px] uppercase px-4 py-1">AKTİF</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 bg-white rounded-2xl border border-muted shadow-sm space-y-2">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">TOPLAM ÜYE</p>
                  <p className="text-3xl font-black">512</p>
                </div>
                <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-100 shadow-sm space-y-2">
                  <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">İLETİŞİM İZNİ VAR</p>
                  <p className="text-3xl font-black text-emerald-600">450</p>
                </div>
                <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-100 shadow-sm space-y-2">
                  <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest">İLETİŞİM İZNİ YOK</p>
                  <p className="text-3xl font-black text-rose-600">62</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button variant="outline" className="font-bold text-xs uppercase tracking-widest">İZİN LİSTESİNİ DIŞA AKTAR (CSV)</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


