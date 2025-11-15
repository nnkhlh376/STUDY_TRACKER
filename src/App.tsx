import { StudyTracker } from "./components/StudyTracker";
import { LoginPage } from "./components/LoginPage";
import { useAuth } from "./context/AuthContext";
import { UserMenu } from "./components/UserMenu";

export default function App() {
  const { user, loading, signOut } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Đang tải...</div>
      </div>
    );
  }

  // If user is not logged in, show login page
  if (!user) {
    return <LoginPage />;
  }

  // If user is logged in, show the study tracker
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Professional Header Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-semibold">📚</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Study Tracker</h1>
                <p className="text-xs text-gray-500">Track your learning journey</p>
              </div>
            </div>

            {/* Right: User Profile */}
            <UserMenu user={user} onSignOut={signOut} />
          </div>
        </div>
      </header>
      
      <StudyTracker />
    </div>
  );
}
