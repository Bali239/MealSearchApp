import { Link } from 'react-router-dom'
import MealCard from '../components/MealCard'
import SearchInput from '../components/SearchInput'
import { useMeals } from '../context/MealContext'

// Favorites page shows meals saved by the user and links back to the main search view.
function FavoritesPage() {
  const { favorites, toggleFavorite, openMeal, isFavorite } = useMeals()

  return (
    <main className="space-y-5">
      <header className="mb-7 flex flex-col gap-4 rounded-[28px] border border-orange-100 bg-white/70 p-5 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-500">Saved meals</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Your favourites</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value=""
            placeholder="Search favorites..."
            onChange={() => {}}
            className="w-full rounded-2xl border border-orange-100 bg-orange-50/80 py-3 pl-4 pr-12 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-200 sm:w-[240px]"
          />

          <Link
            to="/"
            className="rounded-full border border-orange-200 bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Home
          </Link>
        </div>
      </header>

      <div className="rounded-[30px] border border-orange-100 bg-white/75 p-4 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-500">Saved meals</p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Your favourites</h2>
          </div>
          <span className="rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold text-orange-700">
            {favorites.length} saved
          </span>
        </div>
      </div>
      {/* If there are no favorites, show a message. Otherwise, show the grid of favorite meals. */}
      {favorites.length === 0 ? (
        <div className="flex min-h-60 flex-col items-center justify-center rounded-[28px] border border-dashed border-orange-200 bg-orange-50/60 p-6 text-center shadow-soft">
          <h3 className="mb-2 text-xl font-bold text-slate-900">No favourites yet</h3>
          <p className="text-sm text-slate-600">Save meals from the main menu to see them here.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              isFavorite={isFavorite(meal.idMeal)}
              onViewDetails={openMeal}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default FavoritesPage
