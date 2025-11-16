import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft w-full max-w-full md:max-w-[420px]", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-text-muted font-light mb-2 truncate">{title}</p>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1 break-words">{value}</p>
          {trend && (
            <p className="text-xs text-text-muted truncate">{trend}</p>
          )}
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};
