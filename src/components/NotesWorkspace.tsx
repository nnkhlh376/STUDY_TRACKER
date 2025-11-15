import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Plus, Trash2, FileText, StickyNote } from "lucide-react";
import { Textarea } from "./ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export function NotesWorkspace() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("studyNotes");
    if (saved) {
      const loadedNotes = JSON.parse(saved);
      setNotes(loadedNotes);
      if (loadedNotes.length > 0) {
        setActiveNote(loadedNotes[0]);
      }
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("studyNotes", JSON.stringify(notes));
    }
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Ghi chú mới",
      content: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const updateNote = (field: "title" | "content", value: string) => {
    if (!activeNote) return;

    const updatedNote = {
      ...activeNote,
      [field]: value,
      updatedAt: Date.now(),
    };

    setActiveNote(updatedNote);
    setNotes(notes.map((n) => (n.id === activeNote.id ? updatedNote : n)));
  };

  const deleteNote = (id: string) => {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    if (activeNote?.id === id) {
      setActiveNote(filtered.length > 0 ? filtered[0] : null);
    }
    localStorage.setItem("studyNotes", JSON.stringify(filtered));
  };

  const confirmDelete = (id: string) => {
    setNoteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
      setNoteToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-pink-400" />
          <h2>Workspace Ghi chú</h2>
        </div>
        <Button onClick={createNewNote} size="sm" className="gap-2 bg-pink-300 hover:bg-pink-400 text-pink-900">
          <Plus className="w-4 h-4" />
          Tạo mới
        </Button>
      </div>

      <div className="flex-1 flex gap-4 min-h-[500px]">
        {/* Notes List */}
        <div className="w-48 border-r pr-4 space-y-2 overflow-y-auto">
          {notes.length === 0 ? (
            <div className="text-center text-gray-400 text-sm mt-8">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              Chưa có ghi chú
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className={`group p-3 rounded-lg cursor-pointer transition-colors ${
                  activeNote?.id === note.id
                    ? "bg-purple-50 border border-purple-200"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
                onClick={() => setActiveNote(note)}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm truncate flex-1">
                    {note.title || "Không có tiêu đề"}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(note.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(note.updatedAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Note Editor */}
        <div className="flex-1 flex flex-col gap-4">
          {activeNote ? (
            <>
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote("title", e.target.value)}
                className="text-2xl border-none outline-none bg-transparent"
                placeholder="Tiêu đề..."
              />
              <Textarea
                value={activeNote.content}
                onChange={(e) => updateNote("content", e.target.value)}
                placeholder="Bắt đầu viết ghi chú của bạn..."
                className="flex-1 resize-none min-h-[400px] border-gray-200"
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Chọn hoặc tạo một ghi chú mới</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa ghi chú này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-pink-400 hover:bg-pink-500">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}