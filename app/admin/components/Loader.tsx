export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin" />
      </div>
      <p className="text-gray-400 text-sm animate-pulse">Loading data...</p>
    </div>
  )
}
