import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import { Toaster } from "./components/ui/toaster"
import { ThemeProvider } from "./components/ThemeProvider"
import { MainLayout } from "./components/layouts/MainLayout"
import { useTranslation } from "react-i18next"
import ProtectedRoute from "./components/auth/ProtectedRoute"

// Lazy load pages for code splitting
const LoginPage = lazy(() => import("./pages/LoginPage"))
const HomePage = lazy(() => import("./pages/HomePage"))
const SubscriptionsPage = lazy(() => import("./pages/SubscriptionsPage").then(module => ({ default: module.SubscriptionsPage })))
const SettingsPage = lazy(() => import("./pages/SettingsPage").then(module => ({ default: module.SettingsPage })))
const ExpenseReportsPage = lazy(() => import("./pages/ExpenseReportsPage").then(module => ({ default: module.ExpenseReportsPage })))
const NotificationHistoryPage = lazy(() => import("./pages/NotificationHistoryPage").then(module => ({ default: module.NotificationHistoryPage })))


function App() {
  const { t } = useTranslation()
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <Suspense fallback={<div className="flex items-center justify-center h-64">{t('loading')}</div>}>
                  <HomePage />
                </Suspense>
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/subscriptions" element={
            <ProtectedRoute>
              <MainLayout>
                <Suspense fallback={<div className="flex items-center justify-center h-64">{t('loading')}</div>}>
                  <SubscriptionsPage />
                </Suspense>
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/expense-reports" element={
            <ProtectedRoute>
              <MainLayout>
                <Suspense fallback={<div className="flex items-center justify-center h-64">{t('loading')}</div>}>
                  <ExpenseReportsPage />
                </Suspense>
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <MainLayout>
                <Suspense fallback={<div className="flex items-center justify-center h-64">{t('loading')}</div>}>
                  <NotificationHistoryPage />
                </Suspense>
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <MainLayout>
                <Suspense fallback={<div className="flex items-center justify-center h-64">{t('loading')}</div>}>
                  <SettingsPage />
                </Suspense>
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App