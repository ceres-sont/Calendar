"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import type { Note } from "@/app/types"

interface WeekViewProps {
  currentDate: Date
  onSelectDate: (date: Date) => void
  notes: Note[]
}

export default function WeekView({ currentDate, onSelectDate, notes }: WeekViewProps) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const weekDays = useMemo(() => {
    const result = []
    const date = new Date(currentDate)
    const day = date.getDay()

    date.setDate(date.getDate() - day)

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(date)
      result.push(dayDate)
      date.setDate(date.getDate() + 1)
    }

    return result
  }, [currentDate])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getNotesForDate = (date: Date) => {
    return notes.filter((note) => {
      const noteDate = new Date(note.date)
      return (
        noteDate.getDate() === date.getDate() &&
        noteDate.getMonth() === date.getMonth() &&
        noteDate.getFullYear() === date.getFullYear()
      )
    })
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="grid grid-cols-8 gap-px border-b">
        <div className="p-3 text-center text-sm font-medium">Hour</div>
        {weekDays.map((date, index) => {
          const isToday = date.getTime() === today.getTime()
          const dateStr = date.getDate()

          return (
            <div
              key={index}
              className={cn(
                "p-3 text-center text-sm font-medium cursor-pointer hover:bg-muted/50",
                isToday && "bg-primary/10",
              )}
              onClick={() => onSelectDate(date)}
            >
              <div>{days[index].substring(0, 3)}</div>
              <div
                className={cn(
                  "mx-auto mt-1 flex h-6 w-6 items-center justify-center rounded-full",
                  isToday && "bg-primary text-primary-foreground",
                )}
              >
                {dateStr}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-8 gap-px">
        {hours.map((hour) => (
          <>
            <div key={`hour-${hour}`} className="border-r p-2 text-xs text-muted-foreground">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>

            {weekDays.map((date, dayIndex) => {
              const dayNotes = getNotesForDate(date)

              return (
                <div
                  key={`${hour}-${dayIndex}`}
                  className="min-h-[50px] border-t p-1 hover:bg-muted/50"
                  onClick={() => {
                    const newDate = new Date(date)
                    newDate.setHours(hour)
                    onSelectDate(newDate)
                  }}
                >
                  {dayNotes.map((note) => {
                    const noteHour = new Date(note.date).getHours()
                    if (noteHour === hour) {
                      return (
                        <div
                          key={note.id}
                          className="truncate rounded bg-primary/10 px-1 py-0.5 text-xs"
                          title={note.content}
                        >
                          {note.content.length > 15 ? `${note.content.substring(0, 15)}...` : note.content}
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}
