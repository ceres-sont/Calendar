"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import type { Note } from "@/app/types"

interface MonthViewProps {
  currentDate: Date
  onSelectDate: (date: Date) => void
  notes: Note[]
}

export default function MonthView({ currentDate, onSelectDate, notes }: MonthViewProps) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    // Previous month days to show
    const prevMonthDays = []
    if (startingDayOfWeek > 0) {
      const prevMonth = new Date(year, month, 0)
      const prevMonthDaysCount = prevMonth.getDate()

      for (let i = prevMonthDaysCount - startingDayOfWeek + 1; i <= prevMonthDaysCount; i++) {
        prevMonthDays.push({
          date: new Date(year, month - 1, i),
          isCurrentMonth: false,
        })
      }
    }

    // Current month days
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // Next month days to show
    const nextMonthDays = []
    const totalDaysShown = prevMonthDays.length + currentMonthDays.length
    const remainingDays = 42 - totalDaysShown // 6 rows of 7 days

    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
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
      <div className="grid grid-cols-7 gap-px border-b">
        {days.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {calendarDays.map(({ date, isCurrentMonth }) => {
          const isToday = date.getTime() === today.getTime()
          const dateNotes = getNotesForDate(date)

          return (
            <div
              key={date.toISOString()}
              className={cn(
                "min-h-[100px] p-2 transition-colors hover:bg-muted/50",
                !isCurrentMonth && "text-muted-foreground opacity-50",
              )}
              onClick={() => onSelectDate(date)}
            >
              <div className="flex justify-between">
                <span
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                    isToday && "bg-primary text-primary-foreground font-semibold",
                  )}
                >
                  {date.getDate()}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                {dateNotes.slice(0, 3).map((note) => (
                  <div
                    key={note.id}
                    className="truncate rounded bg-primary/10 px-1 py-0.5 text-xs"
                    title={note.content}
                  >
                    {note.content.length > 20 ? `${note.content.substring(0, 20)}...` : note.content}
                  </div>
                ))}
                {dateNotes.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{dateNotes.length - 3} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
