import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, PlusCircle, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const navLinks = [
    { title: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { title: 'Orders', path: '/orders', icon: <ShoppingBag size={20} /> },
    { title: 'New Order', path: '/orders/new', icon: <PlusCircle size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col hidden md:flex transition-colors duration-200">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="font-bold text-xl text-primary flex items-center gap-2">
            <span className="text-2xl">✨</span> LaundryManager
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                location.pathname === link.path 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium truncate flex-1 pl-1">
              {user.username}
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button 
                onClick={logout}
                className="p-2 text-muted-foreground hover:bg-muted rounded-md transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 md:hidden transition-colors duration-200">
            <div className="font-bold text-xl text-primary">✨ LaundryManager</div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button onClick={logout} className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
                 <LogOut size={20} />
              </button>
            </div>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-8 bg-muted/30">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
