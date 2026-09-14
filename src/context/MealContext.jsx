import { createContext, useContext, useEffect, useMemo, useCallback, useState, useRef } from 'react'

const MealContext = createContext(null)
const FAVORITES_KEY = 'meal-finder-favorites'
const API_BASE = 'https://www.themealdb.com/api/json/v1/1'
const PAGE_SIZE = 6

const getPageRange = (pageNumber) => ({
  start: (pageNumber - 1) * PAGE_SIZE + 1,
  end: pageNumber * PAGE_SIZE,
})

function loadFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function MealProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites)
  const [meals, setMeals] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [page, setPage] = useState(1)
  const requestIdRef = useRef(0)

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (!selectedMeal) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedMeal(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedMeal])

  const fetchMealById = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/lookup.php?i=${id}`)
      if (!response.ok) {
        throw new Error('Meal details could not be loaded.')
      }
      const data = await response.json()
      return data.meals?.[0] || null
    } catch {
      return null
    }
  }

  const fetchMeals = useCallback(async (searchText = '', start = 1, end = PAGE_SIZE, signal) => {
    const text = (searchText || '').trim()
    const query = text ? `s=${encodeURIComponent(text)}` : 's='
    const safeStart = Math.max(1, start)
    const safeEnd = Math.max(safeStart, end)
    const requestId = ++requestIdRef.current

    if (signal?.aborted) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE}/search.php?${query}`, signal ? { signal } : undefined)
      if (signal?.aborted || requestId !== requestIdRef.current) {
        return
      }

      if (!response.ok) {
        throw new Error('The recipe service is unavailable right now.')
      }

      const data = await response.json()
      if (signal?.aborted || requestId !== requestIdRef.current) {
        return
      }

      const nextMeals = data.meals || []
      const totalPages = Math.max(1, Math.ceil(nextMeals.length / PAGE_SIZE))
      const requestedPage = Math.min(Math.max(1, Math.ceil(safeStart / PAGE_SIZE)), totalPages)
      const pageSlice = nextMeals.slice(safeStart - 1, safeEnd)

      setMeals(nextMeals)
      setPage(requestedPage)
      setSelectedMeal((current) => (current && current.idMeal ? current : current))
      if (pageSlice.length === 0 && nextMeals.length > 0) {
        return
      }
    } catch (fetchError) {
      if (signal?.aborted || fetchError.name === 'AbortError') {
        return
      }

      setMeals([])
      setError(fetchError.message || 'Something went wrong while searching.')
    } finally {
      if (requestId === requestIdRef.current && !signal?.aborted) {
        setLoading(false)
      }
    }
  }, [])

  const isFavorite = (mealId) => favorites.some((item) => item.idMeal === mealId)

  const toggleFavorite = (meal) => {
    const exists = isFavorite(meal.idMeal)
    setFavorites((current) =>
      exists ? current.filter((item) => item.idMeal !== meal.idMeal) : [meal, ...current],
    )
  }

  const openMeal = async (mealOrId) => {
    if (!mealOrId) return

    const meal = typeof mealOrId === 'object' ? mealOrId : null
    const mealId = meal ? meal.idMeal : mealOrId

    if (!mealId) return

    const loadingMeal = {
      ...meal,
      idMeal: mealId,
      strMeal: meal?.strMeal || 'Loading meal...',
      strMealThumb: meal?.strMealThumb || '',
      strArea: meal?.strArea || 'Global',
      strCategory: meal?.strCategory || 'Meal',
      loading: true,
    }

    setSelectedMeal(loadingMeal)

    const details = await fetchMealById(mealId)
    if (details) {
      setSelectedMeal({ ...details, loading: false })
      return
    }

    setSelectedMeal({
      ...loadingMeal,
      loading: false,
      strInstructions: 'No instructions available.',
    })
  }

  useEffect(() => {
    const controller = new AbortController()
    const { start, end } = getPageRange(page)

    fetchMeals(query, start, end, controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchMeals, query, page])

  const visibleMeals = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return meals.slice(start, start + PAGE_SIZE)
  }, [meals, page])

  const totalPages = Math.max(1, Math.ceil(meals.length / PAGE_SIZE))

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const value = {
    meals,
    query,
    setQuery,
    loading,
    error,
    page,
    setPage,
    totalPages,
    visibleMeals,
    favorites,
    toggleFavorite,
    isFavorite,
    fetchMeals,
    openMeal,
    selectedMeal,
    setSelectedMeal,
    fetchMealById,
  }

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>
}

export function useMeals() {
  const context = useContext(MealContext)

  if (!context) {
    throw new Error('useMeals must be used inside MealProvider')
  }

  return context
}
