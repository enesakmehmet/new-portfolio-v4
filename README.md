# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Vite Projesi - GIF ve Video Ekleme Kılavuzu

Bu belge, projenize GIF ve video dosyaları ekleme konusunda rehberlik sağlar.

## GIF ve Video Dosyalarını Ekleme

Projenize GIF ve video dosyaları eklemek için iki yöntem kullanabilirsiniz:

### 1. Import Yöntemi (Önerilen)

Bu yöntemde, medya dosyalarınızı `src/assets` klasörüne ekleyip import ederek kullanabilirsiniz:

1. GIF dosyalarınızı `src/assets/images` klasörüne ekleyin
2. Video dosyalarınızı `src/assets/videos` klasörüne ekleyin
3. Dosyaları `Projects.jsx` içinde import edin:

```jsx
import ecommerceGif from '../assets/images/ecommerce.gif'
import portfolioVideo from '../assets/videos/portfolio.mp4'
```

4. Import edilen dosyaları proje verilerinde kullanın:

```jsx
{
  // ...
  mediaType: "gif",
  mediaSrc: ecommerceGif,
  // ...
}
```

Bu yöntem, Vite'ın dosya işleme ve optimizasyon özelliklerinden yararlanmanızı sağlar.

### 2. Public Klasörü Yöntemi

Daha büyük medya dosyaları için public klasörünü kullanabilirsiniz:

1. GIF dosyalarınızı `public/gifs` klasörüne ekleyin
2. Video dosyalarınızı `public/videos` klasörüne ekleyin
3. Dosyalara doğrudan URL ile erişin:

```jsx
{
  // ...
  mediaType: "gif",
  mediaSrc: "/gifs/ecommerce.gif",
  // ...
}
```

## Desteklenen Medya Türleri

Projede üç tür medya desteklenmektedir:

- `image`: JPEG, PNG gibi statik görseller
- `gif`: Animasyonlu GIF dosyaları
- `video`: MP4, WebM gibi video dosyaları

## Video Özellikleri

Videolar otomatik olarak:
- Sessiz çalışır (`muted`)
- Otomatik başlar (`autoPlay`)
- Sürekli döngüde oynar (`loop`)
- Mobil cihazlarda inline oynatılır (`playsInline`)

## Dosya Boyutu Önerileri

- GIF dosyaları: Optimum performans için 2MB'den küçük olmalıdır
- Video dosyaları: 5-10MB arası önerilir, daha büyük dosyalar için sıkıştırma yapılmalıdır

## Sorun Giderme

### Medya Dosyaları Görüntülenmiyorsa

1. Dosya yollarının doğru olduğundan emin olun
2. Dosya formatının desteklendiğinden emin olun
3. Tarayıcı konsolunda hata mesajlarını kontrol edin

### 500 (Internal Server Error) Hatası

Bu hata genellikle şu durumlarda ortaya çıkar:

1. **Import edilen dosya bulunamadı**: 
   - Hata: `Failed to load resource: the server responded with a status of 500 (Internal Server Error)`
   - Çözüm: Import edilen dosyanın doğru konumda olduğundan emin olun
   - Geçici çözüm: Import satırını yorum satırına alın ve alternatif bir medya kaynağı kullanın

2. **Dosya formatı uyumsuz**:
   - Çözüm: Dosya formatının tarayıcınız tarafından desteklendiğinden emin olun
   - Video dosyaları için MP4 formatı en geniş uyumluluğa sahiptir

3. **Dosya boyutu çok büyük**:
   - Çözüm: GIF ve video dosyalarını optimize edin
   - GIF'ler için [ezgif.com](https://ezgif.com/optimize) gibi araçlar kullanabilirsiniz
   - Videolar için [handbrake.fr](https://handbrake.fr/) gibi sıkıştırma araçları kullanabilirsiniz

4. **Vite yapılandırma sorunu**:
   - Çözüm: Vite'ın medya dosyalarını doğru şekilde işlediğinden emin olun
   - `vite.config.js` dosyasında gerekli ayarları yapın:

```js
// vite.config.js
export default {
  assetsInclude: ['**/*.gif', '**/*.mp4'],
  // diğer ayarlar...
}
```

### Örnek Kullanım

Projenizde GIF ve video kullanımını test etmek için:

1. Örnek GIF dosyalarını `public/gifs/examples` klasöründen kullanabilirsiniz
2. Örnek video dosyalarını `public/videos/examples` klasöründen kullanabilirsiniz

```jsx
// Örnek GIF kullanımı
{
  mediaType: "gif",
  mediaSrc: "/gifs/examples/example.gif"
}

// Örnek video kullanımı
{
  mediaType: "video",
  mediaSrc: "/videos/examples/example.mp4"
}
```
//////////////////////////////////////////////

