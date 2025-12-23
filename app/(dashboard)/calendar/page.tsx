"use client"

import { useState, useRef, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  MapPin, 
  User,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Info,
  ClipboardCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

const INITIAL_EVENTS = [
  {
    id: "1",
    title: "Hatha Yoga",
    start: new Date().toISOString().split("T")[0] + "T10:00:00",
    end: new Date().toISOString().split("T")[0] + "T11:00:00",
    extendedProps: {
      instructor: "Zeynep H.",
      capacity: 20,
      enrolled: 18,
      waitlist: 0,
      type: "Group",
      color: "#6366f1"
    }
  },
  {
    id: "2",
    title: "Reformer Pilates",
    start: new Date().toISOString().split("T")[0] + "T12:00:00",
    end: new Date().toISOString().split("T")[0] + "T13:00:00",
    extendedProps: {
      instructor: "Mert A.",
      capacity: 5,
      enrolled: 5,
      waitlist: 3,
      type: "Group",
      color: "#ec4899"
    }
  },
  {
    id: "3",
    title: "Mert Hoca İzinli",
    start: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T09:00:00",
    end: new Date(Date.now() + 86400000).toISOString().split("T")[0] + "T18:00:00",
    display: "background",
    color: "#e2e8f0",
    extendedProps: { type: "Blockage" }
  }
]

export default function CalendarPage() {
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const calendarRef = useRef<any>(null)

  // Create Form State
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    capacity: "15",
    quota: "5",
    start: "",
    end: "",
    repeat: false
  })

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg)
    setFormData(prev => ({
      ...prev,
      start: arg.dateStr.includes("T") ? arg.dateStr : arg.dateStr + "T09:00:00",
      end: arg.dateStr.includes("T") ? arg.dateStr : arg.dateStr + "T10:00:00"
    }))
    setIsCreateModalOpen(true)
  }

  const handleEventClick = (arg: any) => {
    setSelectedEvent(arg.event)
    setIsDetailModalOpen(true)
  }

  const handleCreateEvent = () => {
    if (parseInt(formData.quota) > parseInt(formData.capacity)) {
      toast.error("Geçersiz Kota", { description: "Fylexa kotası toplam kapasiteden büyük olamaz." })
      return
    }

    const newEvent = {
      id: Math.random().toString(),
      title: formData.title || "Yeni Ders",
      start: formData.start,
      end: formData.end,
      extendedProps: {
        instructor: formData.instructor || "Atanmamış",
        capacity: parseInt(formData.capacity),
        enrolled: 0,
        waitlist: 0,
        type: "Group",
        color: "#10b981"
      }
    }

    setEvents(prev => [...prev, newEvent])
    setIsCreateModalOpen(false)
    toast.success("Ders Oluşturuldu", { 
      description: formData.repeat ? "Ders her hafta tekrarlanacak şekilde eklendi." : "Ders takvime başarıyla eklendi." 
    })
  }

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Akıllı Takvim</h1>
          <p className="text-muted-foreground mt-1">Stüdyo envanterini ve ders programını yönetin.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg overflow-hidden bg-muted/50 p-1 mr-4">
            <Button variant="ghost" size="sm" className="h-8 text-xs font-bold px-4" onClick={() => calendarRef.current?.getApi().changeView("timeGridWeek")}>Haftalık</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-bold px-4" onClick={() => calendarRef.current?.getApi().changeView("dayGridMonth")}>Aylık</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-bold px-4 md:hidden" onClick={() => calendarRef.current?.getApi().changeView("listDay")}>Liste</Button>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Yeni Ders
          </Button>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden border-none shadow-xl">
        <CardContent className="p-0 h-full">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={false}
            events={events}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            nowIndicator={true}
            slotMinTime="07:00:00"
            slotMaxTime="23:00:00"
            allDaySlot={false}
            height="100%"
            locale="tr"
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={(eventInfo) => {
              const props = eventInfo.event.extendedProps
              if (props.type === "Blockage") {
                return (
                  <div className="flex items-center justify-center h-full w-full opacity-50 bg-slate-200 border-l-4 border-slate-400">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">İzinli / Blokaj</span>
                  </div>
                )
              }
              const isFull = props.enrolled >= props.capacity
              return (
                <div className="p-1.5 h-full border-l-4 overflow-hidden" style={{ borderLeftColor: props.color || "#ccc", backgroundColor: `${props.color}15` }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-black uppercase truncate text-foreground">{eventInfo.event.title}</p>
                    {isFull && <Badge variant="destructive" className="h-3 text-[8px] px-1 font-black uppercase">DOLU</Badge>}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground">
                      <User className="h-2 w-2" /> {props.instructor}
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground">
                      <Users className="h-2 w-2" /> {props.enrolled}/{props.capacity} 
                      {props.waitlist > 0 && <span className="text-primary"> (+{props.waitlist})</span>}
                    </div>
                  </div>
                </div>
              )
            }}
          />
        </CardContent>
      </Card>

      {/* Create Modal (PD-176) */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Yeni Ders Oluştur</DialogTitle>
            <DialogDescription>Ders bilgilerini ve kontenjan kurallarını belirleyin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label>Ders Adı</Label>
              <Input placeholder="Örn: Akış Yoga" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Eğitmen</Label>
                <Select value={formData.instructor} onValueChange={v => setFormData({...formData, instructor: v})}>
                  <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Zeynep H.">Zeynep H.</SelectItem>
                    <SelectItem value="Mert A.">Mert A.</SelectItem>
                    <SelectItem value="Selin Y.">Selin Y.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ders Tipi</Label>
                <Select defaultValue="group">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group">Grup Dersi</SelectItem>
                    <SelectItem value="pt">Özel Ders (PT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Toplam Kapasite</Label>
                <Input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Fylexa Kotası</Label>
                <Input type="number" value={formData.quota} onChange={e => setFormData({...formData, quota: e.target.value})} />
                {parseInt(formData.quota) > parseInt(formData.capacity) && (
                  <p className="text-[10px] text-destructive font-bold">Kapasiteyi aşamaz!</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">Haftalık Tekrarla</Label>
                <p className="text-xs text-muted-foreground font-medium">Bu ders her hafta aynı saatte oluşturulur.</p>
              </div>
              <Switch checked={formData.repeat} onCheckedChange={v => setFormData({...formData, repeat: v})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>İptal</Button>
            <Button onClick={handleCreateEvent} className="font-bold">Dersi Yayınla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Modal (PD-175, 206) */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        {selectedEvent && (
          <DialogContent className="max-w-md overflow-hidden p-0 border-none shadow-2xl">
            <div className="h-32 w-full relative" style={{ backgroundColor: selectedEvent.extendedProps.color }}>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20" onClick={() => setIsDetailModalOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
              <div className="absolute -bottom-6 left-6 p-1 bg-background rounded-2xl shadow-lg">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-black" style={{ backgroundColor: selectedEvent.extendedProps.color }}>
                  {selectedEvent.title.substring(0, 1)}
                </div>
              </div>
            </div>
            <div className="p-6 pt-10 space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">{selectedEvent.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="font-bold">{selectedEvent.extendedProps.type}</Badge>
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 60 Dakika
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-muted/30">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Eğitmen</span>
                  <span className="text-sm font-bold flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" /> {selectedEvent.extendedProps.instructor}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-muted/30">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Katılım</span>
                  <span className="text-sm font-bold flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" /> 
                    {selectedEvent.extendedProps.enrolled} / {selectedEvent.extendedProps.capacity}
                    {selectedEvent.extendedProps.waitlist > 0 && (
                      <span className="text-primary text-[10px]"> (+{selectedEvent.extendedProps.waitlist} Yedek)</span>
                    )}
                  </span>
                </div>
              </div>

              {selectedEvent.extendedProps.waitlist > 0 && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                  <Info className="h-5 w-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    Bu ders şu an dolu. Bir üye iptal ettiği an sistem sıradaki 1. yedek üyeyi otomatik olarak derse dahil edecektir.
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 font-bold">
                  <Edit className="mr-2 h-4 w-4" /> Düzenle
                </Button>
                <Button variant="outline" className="flex-1 font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                  <Trash2 className="mr-2 h-4 w-4" /> İptal Et
                </Button>
              </div>
              <Button className="w-full font-bold h-12 text-lg">
                <ClipboardCheck className="mr-2 h-5 w-5" /> Yoklama Listesine Git
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}


