import Calendar from "@/app/components/calendar"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Calendar App</h1>
        <Calendar />
      </div>
    </main>
  )
}
