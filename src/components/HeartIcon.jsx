// Small reusable icon that shows whether a meal is saved as a favorite.
function HeartIcon({ isSaved, extraClass = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${extraClass} ${isSaved ? 'fill-orange-500 text-orange-500 ' : 'fill-none text-slate-500'}`}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7.5-4.35-9.75-8.25C.7 10.25 2.18 5 6.5 5c2.2 0 3.56 1.05 4.16 2.05C11.26 6.05 12.62 5 14.82 5c4.32 0 5.8 5.25 4.25 7.75C19.5 16.65 12 21 12 21Z" />
    </svg>
  )
}

export default HeartIcon
