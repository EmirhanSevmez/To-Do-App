# To-Do Uygulaması

Bu proje, Yavuzlar görevi kapsamında geliştirilmiş bir To-Do uygulamasıdır.

## Kullanılan Teknolojiler
Projenin backend altyapısında **Go** programlama dili ve yüksek performanslı **Gin** web framework'ü kullanılmıştır. Veri yönetimi ve kalıcılığı **PostgreSQL** veritabanı ile sağlanmıştır. Frontend tarafında ise herhangi bir harici kütüphane veya framework tercih edilmemiş; arayüz geliştirmeleri saf **HTML, CSS ve JavaScript** kullanılarak gerçekleştirilmiştir.

## Kurulum ve Çalıştırma
Uygulamanın çalıştırılabilmesi için Docker ortamının hazır bulunması gerekmektedir.

1. Terminal üzerinden proje dizinine erişim sağlanmalıdır.
2. Aşağıdaki komut kullanılarak servisler ayağa kaldırılmalıdır:
   ```bash
   docker-compose up --build
   ```
3. Konteynerler başarılı bir şekilde başlatıldıktan sonra, uygulamanın arayüzüne `http://localhost` adresi üzerinden erişilebilir.

## Temel Özellikler
- **Kimlik Doğrulama:** JWT tabanlı güvenli kullanıcı kaydı ve giriş sistemi entegre edilmiştir.
- **Görev Yönetimi:** Görev ekleme, listeleme, güncelleme ve silme (CRUD) işlemleri eksiksiz olarak desteklenmektedir.
- **Kullanıcı Arayüzü:** Sade ve işlevsel bir kullanıcı deneyimi sunan arayüz tasarımı uygulanmıştır.
