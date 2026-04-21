# Docker setup for payment-service

حطي هذه الملفات داخل فولدر المشروع `payment-service`.

## 1) اعملي package للمشروع
من داخل فولدر `payment-service`:
```bash
.\mvnw clean package
```

## 2) شغلي Docker
```bash
docker compose up --build
```

## 3) الروابط
- Payment service:
  http://localhost:8083/api/payments
- MySQL داخل Docker:
  - host: localhost
  - port: 3307
  - user: root
  - password: root
  - database: payment_db

## 4) ملاحظات
- `docker-compose.yml` بيعطّل Eureka مؤقتًا عشان `payment-service` يشتغل لوحده.
- لو عايزة تشغلي Eureka بعدين داخل Docker، استخدمي السطور المعلّقة داخل `docker-compose.yml`.
- لو الـ endpoints محمية بـ JWT، لازم تبعتي token حقيقي.

## 5) إيقاف التشغيل
```bash
docker compose down
```

## 6) مسح بيانات MySQL
```bash
docker compose down -v
```
