import HeartIcon from './HeartIcon'

// Shows one meal in the grid and contains the actions for details and favorite toggling.
function MealCard({ meal, isFavorite, onViewDetails, onToggleFavorite }) {
  const handleCardClick = () => {
    onViewDetails(meal)
  }

  const handleFavoriteClick = (event) => {
    event.stopPropagation()
    onToggleFavorite(meal)
  }

  return (
    <article
      className="cursor-pointer overflow-hidden rounded-[26px] border border-orange-100 bg-white/80 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_45px_-25px_rgba(249,115,22,0.65)]"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleCardClick()
        }
      }}
    >
      <img src={meal.strMealThumb} alt={meal.strMeal} className="h-48 w-full object-cover" />

      <div className="space-y-4 p-4">
        <div>
          <h3 className="mb-2 text-lg font-bold text-slate-900">{meal.strMeal}</h3>
          <p className="text-sm text-slate-500">{meal.strArea || 'Global'} • {meal.strCategory || 'Meal'}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className="flex-1 rounded-full bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            onClick={(event) => {
              event.stopPropagation()
              onViewDetails(meal)
            }}
          >
            View details
          </button>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-white text-slate-700 transition hover:border-orange-300 hover:text-orange-600 ${isFavorite ? 'border-orange-300 bg-orange-50 text-orange-600' : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={handleFavoriteClick}
          >
            <HeartIcon isSaved={isFavorite} extraClass="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default MealCard
