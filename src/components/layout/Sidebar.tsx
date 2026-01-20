import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { navigationItems } from '@/lib/mockData';
import logo from '@/assets/aifarm-logo.png';
import {
  LayoutDashboard,
  Upload,
  History,
  Map,
  Landmark,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Upload,
  History,
  Map,
  Landmark,
  Users,
  Settings,
};

const Sidebar: React.FC = () => {
  const { 
    currentUser, 
    hasRole, 
    sidebarCollapsed, 
    setSidebarCollapsed,
    activeNavItem,
    setActiveNavItem 
  } = useApp();
  const { t } = useLanguage();

  // Filter navigation items based on user role
  const visibleNavItems = navigationItems.filter(item => hasRole(item.roles));

  // Get translated label for nav item
  const getNavLabel = (labelKey: string): string => {
    return t.nav[labelKey as keyof typeof t.nav] || labelKey;
  };

  // Get translated role
  const getRoleLabel = (role: string): string => {
    return t.roles[role as keyof typeof t.roles] || role;
  };

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-smooth',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn('flex flex-col items-center gap-1 w-full', sidebarCollapsed && 'justify-center')}>
          <img src={logo} alt="AIFARM" className={cn('object-contain', sidebarCollapsed ? 'h-10 w-10' : 'h-16 w-auto')} />
          {!sidebarCollapsed && (
            <div className="text-center">
              <p className="text-sm font-bold text-sidebar-foreground">VISTA Agent</p>
              <p className="text-xs text-sidebar-foreground/70">농작물 지능형 시스템</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-foreground transition-smooth absolute top-4 right-2"
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = activeNavItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveNavItem(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                sidebarCollapsed && 'justify-center px-2'
              )}
            >
              <Icon size={20} />
              {!sidebarCollapsed && <span>{getNavLabel(item.label)}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-sidebar-border">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-lg',
            sidebarCollapsed && 'justify-center'
          )}
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-medium">
            {currentUser?.name.charAt(0) || 'U'}
          </div>
          
          {!sidebarCollapsed && currentUser && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-sidebar-foreground/50 capitalize">
                {getRoleLabel(currentUser.role)}
              </p>
            </div>
          )}
          
          {!sidebarCollapsed && (
            <button className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-foreground transition-smooth">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
