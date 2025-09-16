# 🏛️ مدرسة الشمامسة - Backend API

Backend API مبني بـ NestJS و PostgreSQL لنظام إدارة مدرسة الشمامسة.

## 🚀 المميزات

- **🔐 نظام مصادقة متكامل** - JWT مع أدوار المستخدمين
- **👥 إدارة المستخدمين** - شمامسة، خدام، أولياء أمور، مديرين
- **📚 إدارة الدروس** - إنشاء وتنظيم المحتوى التعليمي
- **📊 تتبع التقدم** - مراقبة أداء الطلاب
- **✅ نظام الحضور** - تسجيل ومتابعة الحضور
- **🔔 الإشعارات** - نظام إشعارات متقدم
- **📖 وثائق API** - Swagger UI متكامل
- **🛡️ الأمان** - حماية شاملة مع معدل التحكم

## 🛠️ التقنيات المستخدمة

- **NestJS** - إطار عمل Node.js متقدم
- **TypeORM** - ORM لـ TypeScript
- **PostgreSQL** - قاعدة بيانات قوية
- **JWT** - مصادقة آمنة
- **Swagger** - توثيق API
- **bcryptjs** - تشفير كلمات المرور
- **class-validator** - التحقق من البيانات

## 📋 المتطلبات

- Node.js 18+
- PostgreSQL 13+
- npm أو yarn

## ⚡ التثبيت والتشغيل

### 1. تثبيت المتطلبات
```bash
npm install
```

### 2. إعداد قاعدة البيانات
```bash
# إنشاء قاعدة البيانات
createdb deacons_school

# نسخ ملف البيئة
cp .env.example .env
```

### 3. تحديث متغيرات البيئة
```bash
# تحديث .env بمعلومات قاعدة البيانات الخاصة بك
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=deacons_school
```

### 4. تشغيل المشروع
```bash
# تطوير
npm run start:dev

# إنتاج
npm run build
npm run start:prod
```

### 5. إضافة البيانات التجريبية
```bash
npm run seed
```

## 📚 وثائق API

بعد تشغيل الخادم، يمكنك الوصول لوثائق API على:
```
http://localhost:3001/api/docs
```

## 🔑 بيانات تسجيل الدخول التجريبية

| الدور | البريد الإلكتروني | كلمة المرور |
|-------|------------------|-------------|
| مدير | admin@deacons.com | password |
| خادم | servant@deacons.com | password |
| ولي أمر | parent@deacons.com | password |
| شماس | deacon1@deacons.com | password |

## 🏗️ هيكل المشروع

```
src/
├── common/           # المكونات المشتركة
│   ├── decorators/   # الديكوريتر
│   ├── enums/        # التعدادات
│   └── guards/       # الحراس
├── config/           # إعدادات التطبيق
├── modules/          # وحدات التطبيق
│   ├── auth/         # المصادقة
│   ├── users/        # المستخدمون
│   ├── lessons/      # الدروس
│   ├── progress/     # التقدم
│   ├── attendance/   # الحضور
│   └── notifications/ # الإشعارات
└── database/         # قاعدة البيانات
    └── seeds/        # البيانات التجريبية
```

## 🔐 الأدوار والصلاحيات

### 👑 المدير (Admin)
- إدارة جميع المستخدمين
- إدارة النظام بالكامل
- عرض جميع التقارير والإحصائيات

### 👨‍🏫 الخادم (Servant)
- إنشاء وإدارة الدروس
- تسجيل الحضور
- متابعة تقدم الشمامسة
- إرسال الإشعارات

### 👨‍👩‍👧 ولي الأمر (Parent)
- متابعة تقدم الطفل
- عرض سجل الحضور
- استقبال التقارير

### 🎓 الشماس (Deacon)
- الوصول للدروس
- تسجيل التقدم
- عرض النتائج الشخصية

## 📊 نقاط النهاية الرئيسية

### المصادقة
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/register` - إنشاء حساب
- `POST /api/auth/profile` - الملف الشخصي

### المستخدمون
- `GET /api/users` - عرض المستخدمين
- `GET /api/users/profile` - الملف الشخصي
- `PATCH /api/users/profile` - تحديث الملف

### الدروس
- `GET /api/lessons` - عرض الدروس
- `POST /api/lessons` - إنشاء درس
- `GET /api/lessons/:id` - عرض درس محدد

### التقدم
- `GET /api/progress/my-progress` - تقدمي
- `GET /api/progress/my-stats` - إحصائياتي
- `POST /api/progress` - تسجيل تقدم

### الحضور
- `GET /api/attendance/my-attendance` - حضوري
- `POST /api/attendance` - تسجيل حضور
- `GET /api/attendance/my-stats` - إحصائيات الحضور

## 🧪 الاختبارات

```bash
# اختبارات الوحدة
npm run test

# اختبارات التكامل
npm run test:e2e

# تغطية الكود
npm run test:cov
```

## 🚀 النشر

```bash
# بناء المشروع
npm run build

# تشغيل الإنتاج
npm run start:prod
```

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push للفرع
5. إنشاء Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## 📞 الدعم

للدعم والاستفسارات، يرجى التواصل معنا على:
- البريد الإلكتروني: support@deacons-school.com
- الموقع: https://deacons-school.com

---

صُنع بـ ❤️ لخدمة مدرسة الشمامسة