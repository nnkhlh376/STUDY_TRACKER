import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, Timer as TimerIcon } from "lucide-react";
import { StudySession } from "./StudyTracker";

interface TimerProps {
  onStart: () => void;
  onEnd: (duration: number) => void;
  currentSession: StudySession | null;
}

export function Timer({ onStart, onEnd, currentSession }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning && !currentSession) {
      onStart();
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (time > 0) {
      onEnd(time);
    }
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <TimerIcon className="w-6 h-6 text-purple-400" />
          <h2 className="text-center">Bộ đếm thời gian</h2>
        </div>
        <div className="text-6xl font-mono text-purple-400">
          {formatTime(time)}
        </div>
      </div>

      <div className="flex gap-4">
        {!isRunning ? (
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-purple-300 hover:bg-purple-400 text-purple-900 gap-2"
          >
            <Play className="w-5 h-5" />
            Bắt đầu
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            size="lg"
            variant="outline"
            className="gap-2 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Pause className="w-5 h-5" />
            Tạm dừng
          </Button>
        )}

        <Button
          onClick={handleReset}
          size="lg"
          variant="outline"
          className="gap-2 border-pink-300 text-pink-600 hover:bg-pink-50"
          disabled={time === 0}
        >
          <RotateCcw className="w-5 h-5" />
          Đặt lại
        </Button>
      </div>

      {time > 0 && (
        <div className="text-center text-gray-600">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
            {isRunning ? (
              <>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <p className="text-sm">Đang học...</p>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                <p className="text-sm">Đã tạm dừng</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}