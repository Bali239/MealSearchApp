// Reusable search field used in both the Home and Favorites screens.
function SearchInput({ value, placeholder, onChange, className }) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        className={className}
      />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl text-orange-500">⌕</span>
    </div>
  )
}

export default SearchInput
