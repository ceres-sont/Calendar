"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MonthView from "./month-view"
import WeekView from "./week-view"
import NoteDialog from "./note-dialog"
import { useNotes } from "@/app/hooks/use-notes"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)
  const [view, setView] = useState<"month" | "week">("month")
  const { notes } = useNotes()

  const handlePrevious = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() - 7)
      setCurrentDate(newDate)
    }
  }

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() + 7)
      setCurrentDate(newDate)
    }
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsNoteDialogOpen(true)
  }

  const getHeaderText = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    }

    if (view === "week") {
      const startOfWeek = new Date(currentDate)
      const day = currentDate.getDay()
      startOfWeek.setDate(currentDate.getDate() - day)

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      const startMonth = startOfWeek.toLocaleDateString("default", { month: "short" })
      const endMonth = endOfWeek.toLocaleDateString("default", { month: "short" })

      return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${currentDate.getFullYear()}`
    }

    return currentDate.toLocaleDateString("default", options)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">{getHeaderText()}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week")}>
        <TabsList>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
        </TabsList>
        <TabsContent value="month">
          <MonthView currentDate={currentDate} onSelectDate={handleDateSelect} notes={notes} />
        </TabsContent>
        <TabsContent value="week">
          <WeekView currentDate={currentDate} onSelectDate={handleDateSelect} notes={notes} />
        </TabsContent>
      </Tabs>

      {selectedDate && <NoteDialog date={selectedDate} open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen} />}
    </div>
  )
}
