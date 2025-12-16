export default function SearchInput({ search, setSearch }) {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="🔍 Buscar por autor o tarea..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-4 mb-6 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
      />
    </div>
  )
}
