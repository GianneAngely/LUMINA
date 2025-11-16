import { Home, BookOpen, Star, Eye, BarChart3, RefreshCw } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Vault", path: "/integrity-vault", icon: BookOpen },
  { name: "Trust", path: "/trust-profile", icon: Star },
  { name: "Watch", path: "/silent-watch", icon: Eye },
  { name: "Board", path: "/insight-board", icon: BarChart3 },
  { name: "Exchange", path: "/secure-exchange", icon: RefreshCw },
];

export const TopNav = () => {
  return (
    <nav className="hidden md:flex items-center space-x-1 border-b border-border bg-background px-6 lg:px-12">
      <div className="flex items-center space-x-2 py-4 mr-4 lg:mr-8">
        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-primary flex items-center justify-center">
          <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white rounded" />
        </div>
        <span className="text-lg lg:text-xl font-heading font-semibold text-primary">LUMINA</span>
      </div>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className="px-3 lg:px-4 py-4 text-xs lg:text-sm text-text-secondary hover:text-primary transition-colors border-b-2 border-transparent whitespace-nowrap"
          activeClassName="text-primary border-primary font-medium"
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className="flex flex-col items-center justify-center space-y-1 text-text-muted"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive && "fill-current")} />
                <span className="text-xs font-light">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
