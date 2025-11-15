# Study Time Tracker 📚

A modern, minimalist study tracking application built with React, TypeScript, and Firebase.

## ✨ Features

- ⏱️ **Time Tracking** - Track your daily study sessions with an intuitive timer
- 📝 **Note Workspace** - Create and manage study notes with a Notion-like interface
- 📊 **Statistics** - View your study progress and statistics
- 🔐 **Google Authentication** - Secure login with Google account
- 💾 **Data Persistence** - All data saved locally (localStorage)
- 🎨 **Beautiful UI** - Clean, professional design with Cambria font
- 📱 **Responsive** - Works on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Authentication**: Firebase Auth
- **UI Components**: Radix UI + Lucide Icons
- **State Management**: React Hooks

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/study-tracker-mini.git
cd study-tracker-mini
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Google Authentication
   - Copy your Firebase config
   - Update `src/config/firebase.ts` with your config

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 🔧 Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication > Sign-in method > Google
4. Add a web app and copy the config
5. Update `src/config/firebase.ts`

See `FIREBASE_SETUP.md` for detailed instructions.

## 📁 Project Structure

```
study-tracker-mini/
├── src/
│   ├── components/        # React components
│   │   ├── LoginPage.tsx
│   │   ├── StudyTracker.tsx
│   │   ├── Timer.tsx
│   │   ├── NotesWorkspace.tsx
│   │   ├── StudyStats.tsx
│   │   └── UserMenu.tsx
│   ├── config/           # Configuration files
│   │   └── firebase.ts
│   ├── context/          # React Context
│   │   └── AuthContext.tsx
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── vite.config.ts
└── package.json
```

## 🎨 Customization

### Change Font
Edit `src/index.css` line 53:
```css
--font-sans: Cambria, "Cambria Math", Georgia, serif;
```

### Change Colors
Edit color classes in components or update Tailwind theme in `src/index.css`

### Change User Menu Icon
Edit `src/components/UserMenu.tsx`:
```tsx
import { Heart } from "lucide-react"; // Change icon here
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👤 Author

Linh Nguyên Khánh
- Email: linh8251025@gmail.com

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Authentication by [Firebase](https://firebase.google.com/)

---

Made with ❤️ for students everywhere

  