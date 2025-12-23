# Fylexa İş Ortağı Paneli

Bu proje, stüdyo işletmecileri ve personeli için geliştirilmiş, kapsamlı bir yönetim paneli arayüzüdür. Proje, Linear üzerindeki iş maddelerine tam sadık kalınarak, yüksek sadakatli (high-fidelity) UI/UX deneyimi sunmak üzere tasarlanmıştır.

## 🚀 Özellikler

Uygulama, bir spor stüdyosunun tüm operasyonel ve finansal süreçlerini dijitalleştiren 12 ana modülden oluşmaktadır:

### 1. Kimlik ve Onboarding
- **Rol Bazlı Giriş:** `OWNER` ve `STAFF` rolleri için özelleştirilmiş yönlendirme mantığı.
- **Stüdyo Kurulum Sihirbazı:** 4 adımlı, logo önizlemeli ve harita simülasyonlu kurulum ekranı.
- **Toplu Veri Aktarımı:** Eski sistemlerdeki üyeleri Excel/CSV üzerinden mapping (eşleştirme) yaparak içeri aktarma sihirbazı.

### 2. Dashboard ve Karar Destek
- **KPI Kartları:** Günlük ciro, doluluk oranları ve bekleyen işlerin anlık takibi.
- **AI Smart Insight:** Düşük doluluklu dersler için yapay zeka destekli fiyat ve kampanya önerileri.

### 3. Akıllı Takvim (Scheduler)
- **Duyarlı Takvim:** Desktop'ta haftalık blok, mobilde ajanda listesi görünümü.
- **Ders Yönetimi:** Kontenjan kuralları, eğitmen blokajları ve bekleme listesi takibi.

### 4. Operasyon ve Yoklama
- **QR Yoklama:** Kamera simülasyonu ile hızlı check-in ve doğrulama.
- **İnisiyatifli İptal:** Ceza süresi dolmuş rezervasyonlar için yönetici onaylı kredi iade süreci.

### 5. CRM (Üye Yönetimi)
- **360° Üye Profili:** İletişim, bakiye, ders geçmişi ve sağlık notlarının tek ekranda yönetimi.
- **Üyelik Dondurma:** Otomatik bitiş tarihi hesaplamalı dondurma akışı.

### 6. Kasa ve POS Satış
- **Ürün Kataloğu:** Stok takibi ve sepet yönetimi.
- **Gelişmiş Ödeme:** Parçalı ödeme (Nakit+Kart) ve IBAN/EFT dekont yükleme desteği.

### 7. Finans ve Hakediş
- **İşlem Dökümü (Ledger):** Satır satır hakediş ve komisyon takibi.
- **Ödeme Takvimi:** Fylexa hakediş ödemeleri için kargo takip stili durum çubuğu ve fatura yükleme UI.

### 8. Pazarlama ve İtibar
- **Kampanya Sihirbazı:** Müşteri telefonunda nasıl görüneceğini gösteren "Live Preview" (Canlı Önizleme) özelliği.
- **Yorum Moderasyonu:** Onay/Gizle mekanizması ve stüdyo kalite karnesi.

### 9. Destek ve Bildirimler
- **Bildirim Merkezi:** Kritik, Aksiyon ve Bilgi kategorilerinde renk kodlu uyarılar.
- **Yardım Merkezi:** Bilgi bankası (SSS) ve WhatsApp stili destek talebi sohbeti.

## 🛠️ Teknoloji Yığını

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Calendar:** [FullCalendar](https://fullcalendar.io/)
- **Notifications:** [Sonner](https://sonner.stevenly.me/)
- **State Management:** React Hooks & Context
- **Validation:** Zod & React Hook Form

## 💻 Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
pnpm install

# Geliştirme sunucusunu başlatın
pnpm dev
```

Ardından tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini ziyaret edin.

## 🎨 UI/UX Yaklaşımı

Bu proje, bir "Proof of Concept" (Kavram Kanıtlama) çalışmasıdır. API çağrıları yerine mock veriler kullanılarak, son kullanıcının gerçek bir uygulamada deneyimleyeceği tüm geçişler, hata mesajları ve başarılı işlem durumları UI üzerinde simüle edilmiştir.
