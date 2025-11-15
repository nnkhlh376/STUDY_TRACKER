# 🔥 Hướng dẫn Setup Firebase Authentication

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** (hoặc "Thêm dự án")
3. Đặt tên project: `study-tracker-mini`
4. Tắt Google Analytics (không cần thiết)
5. Click **"Create project"**

## Bước 2: Thêm Web App

1. Trong Firebase Console, click vào icon **Web** (`</>`)
2. Đặt tên app: `Study Tracker`
3. **KHÔNG** chọn "Firebase Hosting"
4. Click **"Register app"**
5. Copy đoạn config (giống như dưới đây):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "study-tracker-mini.firebaseapp.com",
  projectId: "study-tracker-mini",
  storageBucket: "study-tracker-mini.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:..."
};
```

## Bước 3: Bật Google Sign-In

1. Trong Firebase Console, vào **Authentication**
2. Click tab **"Sign-in method"**
3. Click vào **"Google"**
4. Bật **Enable**
5. Chọn email hỗ trợ (email của bạn)
6. Click **"Save"**

## Bước 4: Paste Config vào Code

1. Mở file: `src/config/firebase.ts`
2. Thay thế đoạn config (dòng 6-12) bằng config bạn vừa copy
3. Save file

**Trước:**
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  // ...
};
```

**Sau:**
```typescript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "study-tracker-mini.firebaseapp.com",
  projectId: "study-tracker-mini",
  storageBucket: "study-tracker-mini.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:..."
};
```

## Bước 5: Test thử!

1. Refresh browser: `http://localhost:3000`
2. Bạn sẽ thấy trang **Login với Google**
3. Click nút **"Đăng nhập với Google"**
4. Chọn tài khoản Google
5. Đăng nhập thành công! 🎉

---

## ✨ Tính năng đã có:

- ✅ Đăng nhập bằng Google
- ✅ Hiển thị thông tin user (ảnh, tên, email)
- ✅ Nút đăng xuất
- ✅ Bảo vệ Study Tracker (chỉ user đã login mới xem được)
- ✅ Tự động kiểm tra trạng thái đăng nhập

---

## 🔒 Bảo mật:

- Config của Firebase có thể public (không sao)
- Firebase tự động bảo vệ data với Security Rules
- Chỉ user đã đăng nhập mới truy cập được app

---

## 📝 Notes:

- Sau này nếu muốn lưu dữ liệu lên Firebase Firestore thay vì localStorage, em sẽ giúp bạn setup thêm nha! (˶ᵔ ᵕ ᵔ˶)
