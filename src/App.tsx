import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import { Suspense, lazy, useState } from "react"
import LoginPage from "./pages/LoginPage"
import { Toaster } from "./components/ui/toaster"
import { ThemeProvider } from "./components/ThemeProvider"
import { MainLayout } from "./components/layouts/MainLayout"
import { useTranslation } from "react-i18next"

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"))
const SubscriptionsPage = lazy(() => import("./pages/SubscriptionsPage").then(module => ({ default: module.SubscriptionsPage })))
const SettingsPage = lazy(() => import("./pages/SettingsPage").then(module => ({ default: module.SettingsPage })))
const ExpenseReportsPage = lazy(() => import("./pages/ExpenseReportsPage").then(module => ({ default: module.ExpenseReportsPage })))
const NotificationHistoryPage = lazy(() => import("./pages/NotificationHistoryPage").then(module => ({ default: module.NotificationHistoryPage })))


function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 检查后端 session 状态
  const checkLogin = async () => {
    try {
      const res = await fetch('/api/health', { credentials: 'include' });
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  };
  // 登录后刷新 session 状态
  const login = () => {
    setIsLoggedIn(true);
    checkLogin();
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  // 首次挂载时检查登录状态
  React.useEffect(() => {
    checkLogin();
  }, []);
  return { isLoggedIn, login, logout };
}

function App() {
  const { t } = useTranslation();
  const { isLoggedIn, login } = useAuth();
  const location = useLocation();
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Suspense fallback={<div className="flex items-center justify-center h-64">{t('loading')}</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={login} />} />
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/expense-reports" element={<ExpenseReportsPage />} />
                    <Route path="/notifications" element={<NotificationHistoryPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </MainLayout>
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          />
        </Routes>
      </Suspense>
      <Toaster />
    </ThemeProvider>
  );
}

export default App