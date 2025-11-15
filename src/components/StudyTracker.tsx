import { useState, useEffect } from "react";
import { Timer } from "./Timer";
import { NotesWorkspace } from "./NotesWorkspace";
import { StudyStats } from "./StudyStats";
import { Clock } from "lucide-react";

export interface StudySession {
  id: string;
  startTime: number;
  endTime?: number;
  duration: number;
  date: string;
}

export function StudyTracker() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);

  // Load sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("studySessions");
    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("studySessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  const startSession = () => {
    const newSession: StudySession = {
      id: Date.now().toString(),
      startTime: Date.now(),
      duration: 0,
      date: new Date().toISOString().split("T")[0],
    };
    setCurrentSession(newSession);
  };

  const endSession = (duration: number) => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        endTime: Date.now(),
        duration,
      };
      setSessions([completedSession, ...sessions]);
      setCurrentSession(null);
    }
  };

  const getTodayTotalTime = () => {
    const today = new Date().toISOString().split("T")[0];
    return sessions
      .filter((s) => s.date === today)
      .reduce((total, s) => total + s.duration, 0);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-purple-400" />
            <h1>Study Tracker</h1>
          </div>
          <p className="text-gray-600">Theo dõi thời gian học tập và ghi chú của bạn</p>
        </div>

        {/* Stats */}
        <StudyStats todayTotal={getTodayTotalTime()} sessions={sessions} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Timer Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Timer
              onStart={startSession}
              onEnd={endSession}
              currentSession={currentSession}
            />
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <NotesWorkspace />
          </div>
        </div>
      </div>
    </div>
  );
}