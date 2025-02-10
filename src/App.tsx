import { Routes, Route } from 'react-router'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import LabelSetting from './pages/Settings/LabelSetting'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/setting-label" element={<LabelSetting />} />
    </Routes>
  )
}

export default App