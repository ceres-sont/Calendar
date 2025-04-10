"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Pencil } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useNotes } from "@/app/hooks/use-notes"
import { cn } from "@/lib/utils"

interface NoteDialogProps {
  date: Date
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NoteDialog({ date, open, onOpenChange }: NoteDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(date)
  const [content, setContent] = useState("")
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const { notes, addNote, deleteNote, editNote } = useNotes()

  // Find existing notes for this date
  const existingNotes = notes.filter((note) => {
    const noteDate = new Date(note.date)
    return (
      noteDate.getDate() === selectedDate.getDate() &&
      noteDate.getMonth() === selectedDate.getMonth() &&
      noteDate.getFullYear() === selectedDate.getFullYear()
    )
  })

  useEffect(() => {
    setSelectedDate(date)
  }, [date])

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setContent("")
      setEditingNoteId(null)
    }
  }, [open])

  const handleSave = () => {
    if (content.trim()) {
      if (editingNoteId) {
        // Edit existing note
        editNote(editingNoteId, content.trim())
        setEditingNoteId(null)
      } else {
        // Add new note
        addNote({
          id: Date.now().toString(),
          date: selectedDate.toISOString(),
          content: content.trim(),
        })
      }
      setContent("")
    }
  }

  const handleEdit = (id: string, noteContent: string) => {
    setEditingNoteId(id)
    setContent(noteContent)
  }

  const handleDelete = (id: string) => {
    deleteNote(id)
    if (id === editingNoteId) {
      setEditingNoteId(null)
      setContent("")
    }
  }

  const handleCancel = () => {
    setEditingNoteId(null)
    setContent("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Notes for {format(selectedDate, "MMMM d, yyyy")}</DialogTitle>
          <DialogDescription>Add or manage notes for this date.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("justify-start text-left font-normal")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Textarea
              placeholder={editingNoteId ? "Edit note..." : "Add a new note..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {existingNotes.length > 0 && (
            <div className="grid gap-2">
              <h3 className="text-sm font-medium">Existing Notes</h3>
              <div className="max-h-[200px] space-y-2 overflow-y-auto">
                {existingNotes.map((note) => (
                  <div key={note.id} className="flex items-start justify-between rounded-md border p-3">
                    <p className="text-sm">{note.content}</p>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(note.id, note.content)}
                        className="h-auto px-2 py-1 text-xs"
                      >
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(note.id)}
                        className="h-auto px-2 py-1 text-xs text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {editingNoteId ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!content.trim()}>
                Update Note
              </Button>
            </div>
          ) : (
            <Button onClick={handleSave} disabled={!content.trim()}>
              Save Note
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
