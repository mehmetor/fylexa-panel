"use client"

import { useState } from "react"
import { 
  ShoppingBag, 
  CreditCard, 
  Banknote, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  Package, 
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  Wallet,
  Store,
  ChevronRight,
  Upload,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const PRODUCTS = [
  { id: 1, name: "10'lu Reformer Pilates", price: 4500, category: "Ders Paketi", stock: null, type: "Package" },
  { id: 2, name: "Aylık Sınırsız Yoga", price: 2800, category: "Ders Paketi", stock: null, type: "Membership" },
  { id: 3, name: "Tekil Özel Ders (PT)", price: 1200, category: "Özel Ders", stock: null, type: "PT" },
  { id: 4, name: "Doğal Kaynak Suyu (500ml)", price: 20, category: "Ürün", stock: 45, type: "Goods" },
  { id: 5, name: "Protein Bar (Çikolatalı)", price: 85, category: "Ürün", stock: 12, type: "Goods" },
  { id: 6, name: "Yoga Matı (Kaydırmaz)", price: 1250, category: "Ekipman", stock: 3, type: "Goods" },
]

export default function PosPage() {
  const [cart, setCart] = useState<any[]>([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  const [paymentType, setPaymentStepType] = useState<"SINGLE" | "PARTIAL" | "IBAN">("SINGLE")
  
  // Partial Payment State
  const [cashAmount, setCashAmount] = useState("")
  const [cardAmount, setCardAmount] = useState("")

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
    toast.success(`${product.name} sepete eklendi.`)
  }

  const updateQty = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta)
        return { ...item, qty: newQty }
      }
      return item
    }))
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)

  const handleCompleteSale = () => {
    toast.success("Satış Tamamlandı!", {
      description: "Tahsilat kaydedildi ve stoklar güncellendi."
    })
    setCart([])
    setIsCheckoutOpen(false)
    setPaymentStep(1)
  }

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-8 h-[calc(100vh-120px)]">
      
      {/* Product Catalog */}
      <div className="flex flex-col gap-6 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Kasa ve Satış (POS)</h1>
            <p className="text-muted-foreground mt-1 font-medium">Hızlıca ürün satın veya paket yüklemesi yapın.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Ürün veya kategori ara..." className="pl-10 h-11 border-none bg-muted/50" />
          </div>
        </div>

        <Tabs defaultValue="all" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="w-fit h-11 p-1 bg-muted/50 border mb-4">
            <TabsTrigger value="all" className="font-bold">Tümü</TabsTrigger>
            <TabsTrigger value="classes" className="font-bold">Dersler</TabsTrigger>
            <TabsTrigger value="goods" className="font-bold">Ürünler</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
              {PRODUCTS.map((product) => (
                <Card 
                  key={product.id} 
                  className="group cursor-pointer hover:shadow-xl hover:border-primary/30 transition-all border-none shadow-sm flex flex-col"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-4 flex-1 flex flex-col gap-3">
                    <div className="aspect-square rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/5 transition-colors relative overflow-hidden">
                      {product.stock !== null && (
                        <Badge className="absolute top-2 right-2 bg-white/80 text-foreground border-none font-bold text-[10px]">Stok: {product.stock}</Badge>
                      )}
                      {product.type === 'Package' ? <Package className="h-10 w-10 text-primary opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" /> : <Store className="h-10 w-10 text-primary opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{product.category}</p>
                      <p className="font-bold text-sm leading-tight mt-1">{product.name}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-lg font-black text-primary">₺{product.price.toLocaleString()}</span>
                      <div className="p-1.5 rounded-lg bg-primary text-white shadow-lg shadow-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Shopping Cart Sidebar */}
      <Card className="flex flex-col border-none shadow-2xl bg-card overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-xl text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-black tracking-tight uppercase">Sipariş Özeti</CardTitle>
              <CardDescription className="font-bold text-[10px] uppercase">Sepetinizdeki Ürünler</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-30 grayscale">
              <ShoppingBag className="h-16 w-16 mb-4" />
              <p className="font-bold text-lg leading-tight uppercase">Sepetiniz Boş</p>
              <p className="text-xs font-medium mt-2 leading-relaxed">Sol taraftan ürün seçerek satışa başlayabilirsiniz.</p>
            </div>
          ) : (
            <ScrollArea className="flex-1">
              <div className="divide-y p-4">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex-1 space-y-1">
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs font-black text-primary">₺{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border rounded-lg bg-muted/30 p-0.5">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQty(item.id, -1)}><Minus className="h-3 w-3" /></Button>
                        <span className="w-8 text-center text-xs font-black">{item.qty}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQty(item.id, 1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                      <button className="text-rose-500 hover:text-rose-600" onClick={() => removeFromCart(item.id)}><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>

        <CardFooter className="flex flex-col p-6 bg-muted/30 border-t gap-4">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-muted-foreground font-bold text-xs uppercase tracking-widest">
              <span>Ara Toplam</span>
              <span>₺{(total * 0.8).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground font-bold text-xs uppercase tracking-widest">
              <span>KDV (%20)</span>
              <span>₺{(total * 0.2).toLocaleString()}</span>
            </div>
            <Separator className="bg-muted-foreground/10" />
            <div className="flex items-center justify-between">
              <span className="text-lg font-black uppercase tracking-tight">Genel Toplam</span>
              <span className="text-2xl font-black text-primary">₺{total.toLocaleString()}</span>
            </div>
          </div>
          <Button className="w-full h-14 text-lg font-black shadow-xl shadow-primary/20" disabled={cart.length === 0} onClick={() => setIsCheckoutOpen(true)}>
            ÖDEMEYE GEÇ <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>

      {/* Checkout Wizard (PD-184, 213) */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-xl p-0 border-none overflow-hidden shadow-2xl">
          <div className="flex h-[500px]">
            {/* Steps Sidebar */}
            <div className="w-48 bg-primary p-6 text-primary-foreground flex flex-col gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase opacity-60">ÖDEME ADIMLARI</p>
                <div className="flex flex-col gap-4 mt-4">
                  {[
                    { id: 1, label: "Üye Seçimi", icon: User },
                    { id: 2, label: "Yöntem", icon: CreditCard },
                    { id: 3, label: "Onay", icon: CheckCircle2 },
                  ].map(step => (
                    <div key={step.id} className={`flex items-center gap-3 transition-opacity ${paymentStep === step.id ? 'opacity-100' : 'opacity-40'}`}>
                      <step.icon className="h-4 w-4" />
                      <span className="text-xs font-bold">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="text-[10px] font-bold opacity-60 uppercase">TOPLAM TUTAR</p>
                <p className="text-2xl font-black">₺{total.toLocaleString()}</p>
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 bg-background p-8 flex flex-col">
              {paymentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight">Üye Seçin</h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Siparişin kaydedileceği üyeyi belirleyin.</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="İsim veya telefon..." className="pl-10 h-12 font-bold" />
                  </div>
                  <div className="grid gap-2">
                    {[
                      { name: "Ahmet Yılmaz", phone: "0532 123 45 67" },
                      { name: "Selin Demir", phone: "0544 987 65 43" }
                    ].map((u, i) => (
                      <button key={i} className="flex items-center justify-between p-4 rounded-xl border-2 border-transparent bg-muted/30 hover:border-primary/50 transition-all text-left">
                        <div>
                          <p className="font-bold text-sm">{u.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{u.phone}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                    <button className="flex items-center gap-2 p-4 text-primary font-bold text-xs uppercase hover:underline">
                      <Plus className="h-4 w-4" /> YENİ ÜYE KAYDET
                    </button>
                  </div>
                  <Button className="w-full mt-auto h-12 font-bold" onClick={() => setPaymentStep(2)}>Devam Et</Button>
                </div>
              )}

              {paymentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight">Ödeme Yöntemi</h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Nasıl tahsil edilecek?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant={paymentType === 'SINGLE' ? 'default' : 'outline'} className="h-20 flex flex-col gap-2 font-black uppercase text-[10px]" onClick={() => setPaymentStepType('SINGLE')}>
                      <div className="flex gap-1">
                        <Banknote className="h-4 w-4" />
                        <CreditCard className="h-4 w-4" />
                      </div>
                      Tek Yöntem (Nakit/Kart)
                    </Button>
                    <Button variant={paymentType === 'PARTIAL' ? 'default' : 'outline'} className="h-20 flex flex-col gap-2 font-black uppercase text-[10px]" onClick={() => setPaymentStepType('PARTIAL')}>
                      <Wallet className="h-4 w-4" />
                      Parçalı Ödeme
                    </Button>
                    <Button variant={paymentType === 'IBAN' ? 'default' : 'outline'} className="h-20 flex flex-col gap-2 font-black uppercase text-[10px] col-span-2" onClick={() => setPaymentStepType('IBAN')}>
                      <Store className="h-4 w-4" />
                      IBAN / Havale (Dekontlu)
                    </Button>
                  </div>

                  {paymentType === 'PARTIAL' && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl animate-in zoom-in-95 duration-300">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase">NAKİT TUTAR</Label>
                        <Input placeholder="0.00" value={cashAmount} onChange={e => setCashAmount(e.target.value)} className="font-bold" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase">KART TUTAR</Label>
                        <Input placeholder="0.00" value={cardAmount} onChange={e => setCardAmount(e.target.value)} className="font-bold" />
                      </div>
                    </div>
                  )}

                  {paymentType === 'IBAN' && (
                    <div className="space-y-4 p-4 bg-amber-50 border border-amber-100 rounded-xl animate-in zoom-in-95 duration-300">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg"><Info className="h-4 w-4 text-amber-600" /></div>
                        <p className="text-[10px] font-bold text-amber-900 leading-tight uppercase">Lütfen ödeme dekontunu sisteme yükleyin veya referans numarasını girin.</p>
                      </div>
                      <div className="h-24 border-2 border-dashed border-amber-200 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-amber-100 transition-colors">
                        <Upload className="h-5 w-5 text-amber-600" />
                        <span className="text-[10px] font-black text-amber-700 uppercase">Dekont Yükle (PDF/JPG)</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-auto">
                    <Button variant="ghost" className="flex-1 font-bold" onClick={() => setPaymentStep(1)}>Geri</Button>
                    <Button className="flex-[2] font-black h-12 shadow-lg shadow-primary/20 uppercase" onClick={() => setPaymentStep(3)}>ÖDEMEYİ ONAYLA</Button>
                  </div>
                </div>
              )}

              {paymentStep === 3 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center relative">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 animate-ping opacity-20" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">Harika!</h2>
                    <p className="text-sm font-medium text-muted-foreground max-w-[250px] mx-auto leading-relaxed">
                      İşlem başarıyla tamamlandı. Üye profiline paket tanımlandı ve stoklar güncellendi.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full pt-4">
                    <Button variant="outline" className="font-bold">MAKBUZ YAZDIR</Button>
                    <Button variant="outline" className="font-bold">E-FATURA GÖNDER</Button>
                  </div>
                  <Button className="w-full h-12 font-black text-lg" onClick={handleCompleteSale}>KAPAT</Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


