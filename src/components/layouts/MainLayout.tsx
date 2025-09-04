import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  Settings,
  BarChart3,
  CreditCard,
  History,
  LogOut,
  User,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ModeToggle'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/services/authApi'
import { useToast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation('navigation')
  const { user, logout } = useAuthStore()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await authApi.logout()
      logout()
      toast({
        title: '登出成功',
        description: '您已成功登出系统',
      })
      navigate('/login')
    } catch (error) {
      toast({
        title: '登出失败',
        description: '登出过程中出现错误',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4 px-4 sm:px-6">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-lg sm:text-xl">SubManager</span>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/">
              <Button variant={location.pathname === '/' ? "default" : "ghost"} size="sm" className="px-2 sm:px-3">
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('dashboard')}</span>
              </Button>
            </Link>

            <Link to="/subscriptions">
              <Button variant={location.pathname === '/subscriptions' ? "default" : "ghost"} size="sm" className="px-2 sm:px-3">
                <CreditCard className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('subscriptions')}</span>
              </Button>
            </Link>

            <Link to="/expense-reports">
              <Button variant={location.pathname === '/expense-reports' ? "default" : "ghost"} size="sm" className="px-2 sm:px-3">
                <BarChart3 className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('reports')}</span>
              </Button>
            </Link>

            <Link to="/notifications">
              <Button variant={location.pathname === '/notifications' ? "default" : "ghost"} size="sm" className="px-2 sm:px-3">
                <History className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('notifications')}</span>
              </Button>
            </Link>

            <Link to="/settings">
              <Button variant={location.pathname === '/settings' ? "default" : "ghost"} size="sm" className="px-2 sm:px-3">
                <Settings className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('settings')}</span>
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ModeToggle />
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-2 sm:px-3">
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">{user?.username || '用户'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>登出</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container py-4 sm:py-6 px-4 sm:px-6 flex-grow">{children}</main>
      
      <footer className="border-t py-4 sm:py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6 px-4 sm:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} SubManager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
