export default function SearchBar() {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Search articles (coming in Phase 3)..."
        disabled
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
      />
    </div>
  )
}
