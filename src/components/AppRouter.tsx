import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './pages/CartPage'
import Catalog from './pages/CatalogPage'
import ItemPage from './pages/ItemPage'
import AdminPage from './pages/AdminPage'

const AppRouter = () => {
  return (
      <Routes>
          <Route key='/catalog' path='/catalog' element={<Catalog />} />
          <Route key='/catalog/:id' path='/catalog/:id' element={<ItemPage />} />
          <Route key='/cart' path='/cart' element={<Cart />} />
          <Route key='/admin' path='/admin' element={<AdminPage />} />
          <Route
              path="*"
              element={<Navigate to="/catalog" replace />}
          />
      </Routes> 
  )
}

export default AppRouter