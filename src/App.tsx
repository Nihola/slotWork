import { Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import EmployerCoveragePage from './pages/EmployerCoveragePage'
import { SeekerProvider } from './context/SeekerContext'
import { ToastProvider } from './context/ToastContext'
export default function App() {
  return (
    <ToastProvider><SeekerProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<JobsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/employer" element={<EmployerCoveragePage />} />
          <Route path="/employer/jobs/:id" element={<EmployerCoveragePage />} />
        </Route>
      </Routes>
    </SeekerProvider></ToastProvider>
  )
}
