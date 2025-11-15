import { Calendar, Clock, TrendingUp } from "lucide-react";
import { StudySession } from "./StudyTracker";

interface StudyStatsProps {
  todayTotal: number;
  sessions: StudySession[];
}

export function StudyStats({ todayTotal, sessions }: StudyStatsProps) {
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getWeekTotal = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return sessions
      .filter((s) => new Date(s.date) >= weekAgo)
      .reduce((total, s) => total + s.duration, 0);
  };

  const getTodaySessions = () => {
    const today = new Date().toISOString().split("T")[0];
    return sessions.filter((s) => s.date === today).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Hôm nay</p>
            <p className="text-2xl text-purple-400">{formatDuration(todayTotal)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Calendar className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">7 ngày qua</p>
            <p className="text-2xl text-pink-400">{formatDuration(getWeekTotal())}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Phiên hôm nay</p>
            <p className="text-2xl text-blue-400">{getTodaySessions()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}