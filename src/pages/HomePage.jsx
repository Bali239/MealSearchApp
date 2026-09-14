import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MealCard from '../components/MealCard'
import SearchInput from '../components/SearchInput'
import { useMeals } from '../context/MealContext'

// Home page contains the search UI, result list, and navigation to favorites.
function HomePage() {
  const {
    query,
    setQuery,
    loading,
    error,
    page,
    setPage,
    totalPages,
    visibleMeals,
    isFavorite,
    toggleFavorite,
    openMeal,
  } = useMeals()

  const [inputValue, setInputValue] = useState(query)

  useEffect(() => {
    setInputValue(query)
  }, [query])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      setQuery(inputValue)
    }, 1000)

    return () => clearTimeout(timer)
  }, [inputValue, setPage, setQuery])

  return (
    <main className="space-y-5">
      {/* Header with title, search input, and favorites link */}
      <header className="mb-7 flex flex-col gap-4 rounded-[28px] border border-orange-100 bg-white/70 p-5 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-500">Kitchen Explorer</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">Meal Finder</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={inputValue}
            placeholder="Search all meals..."
            onChange={(event) => setInputValue(event.target.value)}
            className="w-full rounded-2xl border border-orange-100 bg-orange-50/80 py-3.5 pl-4 pr-12 text-base text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-200 sm:w-[280px]"
          />

          <Link
            to="/favorites"
            className="rounded-full border border-orange-200 bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Favorites
          </Link>
        </div>
      </header>
      {/* Results Section */}
      <section className="space-y-5">
        <div className="rounded-[28px] border border-orange-100 bg-white/60 p-4 shadow-soft backdrop-blur-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-600">{visibleMeals.length} results found</p>
            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full border border-orange-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition enabled:hover:-translate-y-0.5 enabled:hover:border-orange-300 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Previous
              </button>
              <span className="min-w-14 text-center text-sm font-semibold text-slate-600">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                className="rounded-full border border-orange-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition enabled:hover:-translate-y-0.5 enabled:hover:border-orange-300 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page >= totalPages}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Loading State */}
        {loading && (
          <div id="loadingState" class="flex min-h-55 items-center justify-center">
          <div class="flex flex-col items-center gap-4">
            
            <div class="flex items-center gap-2 text-sm font-semibold tracking-[0.25em] text-orange-500 uppercase">
              <span class="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.2s]"></span>
              <span class="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.1s]"></span>
              <span class="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-300"></span>
            </div>
            <p class="text-sm font-medium text-slate-600">Looking for recipes...</p>
          </div>
        </div>
        )}
        {/* Error State */}
        {!loading && error && (
          <div className="flex min-h-55 flex-col items-center justify-center rounded-[28px] border border-red-200 bg-red-50 p-6 text-center shadow-soft">
            <p className="text-base font-semibold text-red-700">{error}</p>
          </div>
        )}
        {/* Empty State */}
        {!loading && !error && visibleMeals.length === 0 && (
          <div className="flex min-h-55 flex-col items-center justify-center rounded-[28px] border border-orange-100 bg-white/60 p-6 text-center shadow-soft">
            <h3 className="mb-2 text-xl font-bold text-slate-900">No meals found</h3>
            <p className="text-sm text-slate-600">Try another ingredient or a broader search term.</p>
          </div>
        )}
        {/* Display the grid of visible meals if there are any */}
        {!loading && !error && visibleMeals.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleMeals.map((meal) => (
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
      </section>
    </main>
  )
}

export default HomePage
