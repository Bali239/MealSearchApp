import { Route, Routes } from 'react-router-dom'
import './App.css'
import MealDetailModal from './components/MealDetailModal'
import { MealProvider, useMeals } from './context/MealContext'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'

// The layout owns the route-based screens and the shared modal window.
function AppLayout() {
  const { selectedMeal, setSelectedMeal, isFavorite, toggleFavorite } = useMeals()

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>

      {selectedMeal && (
        <MealDetailModal
          meal={selectedMeal}
          isFavorite={isFavorite(selectedMeal.idMeal)}
          onClose={() => setSelectedMeal(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}

// App root wraps everything in the shared meal state provider.
function App() {
  return (
    <MealProvider>
      <AppLayout />
    </MealProvider>
  )
}

export default App
