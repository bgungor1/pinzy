# Sosyal Medya Mobil Uygulaması

Sosyal Medya Mobil Uygulaması projesine hoş geldiniz! Bu uygulama, kullanıcıların gönderi paylaşmasına ve harita üzerinde favori konumları işaretlemesine olanak tanır, zengin bir sosyal deneyim sunar.

## İçerik Tablosu

- [Sosyal Medya Mobil Uygulaması](#sosyal-medya-mobil-uygulaması)
  - [İçerik Tablosu](#i̇çerik-tablosu)
  - [English Version](#english-version)
  - [Proje Genel Bakış](#proje-genel-bakış)
  - [Özellikler](#özellikler)
  - [Backend Kurulumu](#backend-kurulumu)
    - [Backend Ön Koşullar](#backend-ön-koşullar)
    - [Backend Kurulum](#backend-kurulum)
    - [Backend API Uç Noktalarını Test Etme](#backend-api-uç-noktalarını-test-etme)
  - [Mobil Uygulama Kurulumu](#mobil-uygulama-kurulumu)
    - [Mobil Uygulama Ön Koşullar](#mobil-uygulama-ön-koşullar)
    - [Mobil Uygulama Kurulum](#mobil-uygulama-kurulum)
    - [Uygulamayı Çalıştırma](#uygulamayı-çalıştırma)
  - [Proje Yapısı](#proje-yapısı)
  - [Kimlik Doğrulama](#kimlik-doğrulama)
    - [JWT Token Entegrasyonu](#jwt-token-entegrasyonu)
      - [Güvenli Token Depolama (`utils/use-secure-value.ts`)](#güvenli-token-depolama-utilsuse-secure-valuets)
  - [Gönderiler Modülü](#gönderiler-modülü)
  - [Harita Pinleri Modülü](#harita-pinleri-modülü)
  - [UI/UX Tasarımı](#uiux-tasarımı)
  - [Katkıda Bulunma](#katkıda-bulunma)
  - [Lisans](#lisans)

## English Version

[Click here for English Version](README.md)

## Proje Genel Bakış

Bu proje, aşağıdaki temel işlevlere sahip bir sosyal medya uygulaması oluşturmayı amaçlamaktadır:
*   Kullanıcı kimlik doğrulaması (Giriş, Kayıt)
*   Gönderi paylaşımı
*   Harita üzerinde favori konumları işaretleme
*   Kullanıcı profilleri
*   Drawer Navigasyon ile etkileşimli kullanıcı arayüzü

## Özellikler

*   **Kimlik Doğrulama:** JWT tokenları ile güvenli kullanıcı kaydı ve girişi.
*   **Gönderi Yönetimi:** Gönderi oluşturma, okuma, güncelleme ve silme. Tüm gönderileri, kullanıcının kendi gönderilerini ve diğer kullanıcıların filtrelenmiş gönderilerini görüntüleme.
*   **Harita Entegrasyonu:** Başlık ve açıklama ile harita pinlerini görüntüleme ve ekleme. Pinleri tüm kullanıcılara, mevcut kullanıcıya veya belirli kullanıcı kimliklerine göre filtreleme. Pin listeleme ve gezinme için etkileşimli alt sayfa (bottom sheet).
*   **Kullanıcı Profili:** Kullanıcı bilgilerini görüntüleme ve gönderilerini yönetme.
*   **Navigasyon:** Sorunsuz ekran geçişleri için sezgisel Drawer Navigator.

## Backend Kurulumu

Bu proje ayrı bir backend API kullanmaktadır. Öncelikle backend projesini kurmanız ve çalıştırmanız gerekmektedir.

### Backend Ön Koşullar

*   Node.js (LTS sürümü önerilir)
*   npm veya Yarn

### Backend Kurulum

1.  **Backend proje dizinine gidin:**
    Backend projenizin mobil projenizin yanında bir dizinde bulunduğunu varsayın.
    `cd ../your-backend-project-folder`

2.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **Backend sunucusunu başlatın:**
    ```bash
    npm start
    # veya
    yarn start
    ```
    Backend sunucusu şimdi çalışıyor olmalı, genellikle `http://localhost:3000` adresinde (veya kendi `README.md` dosyasında belirtildiği gibi).

### Backend API Uç Noktalarını Test Etme

Mobil uygulamaya devam etmeden önce, bazı API uç noktalarını test ederek backend'in doğru çalıştığından emin olun. Postman, Insomnia gibi araçları veya basit bir `curl` komutunu kullanabilirsiniz. Mevcut uç noktalar için backend projesinin `README.md` dosyasına bakın.

## Mobil Uygulama Kurulumu

### Mobil Uygulama Ön Koşullar

*   Node.js (LTS sürümü önerilir)
*   npm veya Yarn
*   Expo CLI (`npm install -g expo-cli`)
*   Test için fiziksel bir cihaz veya emülatör/simülatör.

### Mobil Uygulama Kurulum

1.  **Mobil uygulama proje dizinine gidin:**
    `cd MA-8156` (proje klasörünüzün bu olduğunu varsayarak)

2.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **`react-native-keychain` kurulumu:**
    ```bash
    expo install react-native-keychain
    ```
    Bu paket, JWT tokenlarını güvenli bir şekilde depolamak için gereklidir.

4.  **`react-native-maps` kurulumu:**
    ```bash
    expo install react-native-maps
    ```
    Bu paket, harita işlevsellikleri için gereklidir.

### Uygulamayı Çalıştırma

Expo geliştirme sunucusunu başlatmak için:

```bash
expo start
```

Bu, tarayıcınızda Expo Geliştirici Araçları ile yeni bir sekme açacaktır. Ardından şunları yapabilirsiniz:
*   Fiziksel bir cihazda Expo Go uygulamasıyla QR kodu tarayın.
*   Bir Android emülatöründe çalıştırın.
*   Bir iOS simülatöründe çalıştırın (yalnızca macOS).

## Proje Yapısı

Proje, daha iyi organizasyon ve ölçeklenebilirlik için modüler ve özellik odaklı bir dizin yapısını takip eder.

```
.
├── src/                 
│   ├── assets/             // Resimler, fontlar, ikonlar
│   ├── components/         // Yeniden kullanılabilir UI bileşenleri (common, auth, posts, map)
│   ├── navigation/         // React Navigation kurulumu
│   ├── screens/            // Uygulamanın ana ekranları/sayfaları
│   ├── services/           // API servis çağrıları
│   ├── contexts/           // Global durum için React Context API
│   ├── hooks/              // Özel React Hook'ları
│   ├── utils/              // Yardımcı fonksiyonlar, sabitler, güvenli depolama
│   ├── themes/             // Stil (renkler, tipografi)
│   ├── App.tsx             // Ana uygulama bileşeni
│   └── index.ts            // Giriş noktası
└── ... (diğer yapılandırma dosyaları)
```

## Kimlik Doğrulama

Uygulama sağlam bir kimlik doğrulama sistemine sahiptir:

*   **Giriş ve Kayıt:** Kullanıcı kimlik doğrulaması için backend API'ına bağlanır.
*   **JWT Token Entegrasyonu:** Güvenli API iletişimi için `access_token` ve `refresh_token`'ı yönetir.
*   **Güvenli Token Depolama:** JWT tokenlarını güvenli bir şekilde depolamak için `react-native-keychain` kullanır.

### JWT Token Entegrasyonu

Backend API'dan giriş/kayıt sırasında alınan JWT tokenları (access ve refresh tokenlar), `react-native-keychain` kullanılarak güvenli bir şekilde depolanacaktır.

#### Güvenli Token Depolama (`utils/use-secure-value.ts`)

Güvenli depolama işlemlerini gerçekleştirmek için sağlanan GitHub Gist örneğine dayanarak `src/utils/use-secure-value.ts` dosyasında özel bir hook/yardımcı fonksiyon uygulayacaksınız:

```typescript
// src/utils/use-secure-value.ts
// ... (react-native-keychain için sağlanan GitHub Gist içeriği)

// Backend yanıtından sonra örnek kullanım:
// await setSecureValue("jwt-at", "ERİŞİM_TOKENINIZ_BURAYA_GELECEK");
// await setSecureValue("jwt-rt", "YENİLEME_TOKENINIZ_BURAYA_GELECEK");

// Tokenları almak için örnek kullanım:
// const accessToken = await getSecureValue("jwt-at");
// const refreshToken = await getSecureValue("jwt-rt");

// Çıkış yapmak için örnek kullanım:
// await removeSecureValue("jwt-at");
// await removeSecureValue("jwt-rt");
```

## Gönderiler Modülü

Gönderiler modülü, backend API ile entegre edilmiş, kullanıcı gönderileri için tam CRUD (Oluşturma, Okuma, Güncelleme, Silme) işlevselliği sunar.

*   **Tüm Gönderileri Listele:** Sistemdeki tüm gönderileri görüntüler.
*   **Gönderi Oluştur:** "Tüm Gönderiler" ekranındaki bir Yüzen Eylem Düğmesi (FAB), gönderi oluşturma ekranına yönlendirecektir.
*   **Kullanıcının Kendi Gönderilerini Listele:** Profil ekranından erişilebilir, bu, mevcut oturum açmış kullanıcıya ait gönderileri listeler (`userId` sorgu dizesiyle filtrelenir).
*   **Başka Bir Kullanıcının Gönderilerini Listele:** "Tüm Gönderiler" ekranındaki bir filtre aracılığıyla erişilebilir, belirli bir `userId` sorgu dizesine göre filtreleme sağlar.
*   **Gönderiyi Düzenle:** Mevcut gönderileri değiştirmek için özel bir ekran.
*   **Yetkilendirme:** Frontend yetkilendirme kontrolleri, kullanıcıların yalnızca kendi gönderilerini düzenlemesini veya silmesini sağlayacaktır.

## Harita Pinleri Modülü

Bu modül, kullanıcıların konumlarla etkileşime girmesine olanak tanıyan `react-native-maps` kullanarak harita işlevselliklerini entegre eder.

*   **Harita Görüntüleme:** Drawer Navigator aracılığıyla erişilebilen bir harita ekranı, tüm harita pinlerini görüntüler.
*   **Harita Pini Ekle:** Haritada herhangi bir yere dokunmak, bir başlık ve açıklama girmek için bir iletişim kutusu açar. Kaydetmek, dokunulan koordinatlarla yeni bir pin oluşturur.
*   **Pinleri Görüntüle:** Tüm kullanıcıların pinleri görünürdür. Mevcut oturum açmış kullanıcının pinleri farklı bir renkte görüntülenir.
*   **Pin Detayları ve Düzenleme:** Bir pine dokunmak, başlığını ve açıklamasını gösteren bir iletişim kutusu açar. Pin mevcut kullanıcıya veya bir yöneticiye aitse, düzenlenebilir ve bir silme seçeneği mevcuttur.
*   **Alt Sayfa (Bottom Sheet):** Bir alt sayfa, tüm harita pinlerini listeler. Bir liste öğesine dokunmak, haritayı o pine ortalar. Bir liste öğesini yana kaydırmak, bir düzenleme düğmesini ortaya çıkarır.
*   **Pin Filtreleme:**
    *   Filtre seçenekleri: "Tüm Pinler", "Benim Pinlerim".
    *   Üçüncü bir seçenek: "Başka Kullanıcı...", pinleri filtrelemek için bir `userId` girmek üzere bir iletişim kutusu açar. Filtrelenen `userId` görüntülenir.

## UI/UX Tasarımı

Uygulama, temiz ve sezgisel bir kullanıcı arayüzünü vurgular:

*   **Giriş ve Kayıt Ekranları:** Seçilen modern bir UI konseptine göre tasarlanmıştır.
*   **Drawer Navigator:** "Karşılama Ekranı", "Gönderiler", "Harita" ve "Profil" gibi temel özelliklere kolay erişim sağlar.
*   **Yüzen Eylem Düğmesi (FAB):** Hızlı gönderi oluşturma için.
*   **İletişim Kutuları ve Alt Sayfalar (Dialogs & Bottom Sheets):** Pin ekleme/düzenleme ve filtreleme gibi etkileşimli öğeler için.
*   **SafeArea ve KeyboardAvoidingView:** Sorunsuz bir kullanıcı deneyimi için ekran güvenli alanlarının ve klavye etkileşimlerinin doğru şekilde ele alınması.

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen şu adımları izleyin:
1.  Depoyu forklayın.
2.  Yeni bir dal oluşturun (`git checkout -b feature/your-feature-name`).
3.  Değişikliklerinizi yapın.
4.  Değişikliklerinizi commit edin (`git commit -m 'feat: Yeni özellik ekle'`).
5.  Dala push edin (`git push origin feature/your-feature-name`).
6.  Bir Çekme İsteği (Pull Request) açın.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.
