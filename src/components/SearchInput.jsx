export default function SearchInput({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="🔍 Buscar por autor o tarea..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 mb-6 border-2 border-yellow-600 rounded-lg bg-neutral-900 text-gray-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
    />
  )
}
