import HeartIcon from './HeartIcon'

// Displays the selected meal in a full-screen modal with a loading state while API details finish loading.
function MealDetailModal({ meal, isFavorite, onClose, onToggleFavorite }) {
  if (!meal || !meal.idMeal) return null

  const isLoading = Boolean(meal.loading)

  const ingredientItems = []
  for (let i = 1; i <= 20; i += 1) {
    const name = meal?.[`strIngredient${i}`]
    const amount = meal?.[`strMeasure${i}`]
    if (name && name.trim()) {
      ingredientItems.push({
        id: `${meal.idMeal}-${i}`,
        text: `${amount ? `${amount} ` : ''}${name}`.trim(),
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)]">
        <button
          type="button"
          className="absolute right-2 top-2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-2xl font-light text-white shadow-lg shadow-orange-300/40 transition hover:scale-105 hover:bg-orange-600"
          aria-label="Close detail"
          onClick={onClose}
        >
          ×
        </button>

        <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-7">
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-[26px]">
              <img src={meal?.strMealThumb || ''} alt={meal?.strMeal || 'Meal'} className="h-64 w-full object-cover sm:h-80" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {meal?.strArea || 'Global'}
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur-sm">
                    {meal?.strCategory || 'Meal'}
                  </span>
                </div>

                <h2 id="modalTitle" className="max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {meal?.strMeal || 'Loading meal...'}
                </h2>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-65 items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
                <p className="text-sm font-medium text-slate-600">Loading meal details...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <span className="text-lg">🥕</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Ingredients</h3>
                    <p className="text-sm text-slate-500">Everything you need</p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {ingredientItems.length ? (
                    ingredientItems.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                        <span className="text-sm font-medium text-slate-700">{item.text}</span>
                      </li>
                    ))
                  ) : (
                    <li className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">No ingredients listed.</li>
                  )}
                </ul>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <span className="text-lg">👨‍🍳</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Instructions</h3>
                    <p className="text-sm text-slate-500">Follow these steps to prepare the dish</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5 sm:p-6">
                  <p className="whitespace-pre-line text-[15px] leading-7 text-slate-700">
                    {meal?.strInstructions ? meal.strInstructions.replace(/\s+/g, ' ').trim() : 'No instructions available.'}
                  </p>
                </div>
              </section>

              <div className="border-t border-slate-100 pt-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200/50 transition hover:bg-orange-600 hover:shadow-orange-300/50"
                  onClick={() => onToggleFavorite(meal)}
                >
                  <HeartIcon isSaved={isFavorite} extraClass="h-5 w-5" />
                  {isFavorite ? 'Favourite' : 'Make Favourite'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MealDetailModal
