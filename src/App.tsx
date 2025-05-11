import { Routes, Route } from 'react-router'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import LabelSetting from './pages/Settings/LabelSetting'
import Task from './pages/Activity/Tast'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/setting-label" element={<LabelSetting />} />
      <Route path="/task" element={<Task />} />
    </Routes>
  )
}

export default App