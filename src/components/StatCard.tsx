import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "primary" | "destructive" | "warning" | "accent";

const ACCENTS: Record<Accent, { chip: string; icon: string; dot: string }> = {
  primary: { chip: "bg-primary/10", icon: "text-primary", dot: "bg-primary" },
  destructive: { chip: "bg-destructive/10", icon: "text-destructive", dot: "bg-destructive" },
  warning: { chip: "bg-warning/20", icon: "text-warning", dot: "bg-warning" },
  accent: { chip: "bg-accent/20", icon: "text-accent", dot: "bg-accent" },
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  accent?: Accent;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  accent = "primary",
  className,
}: StatCardProps) => {
  const a = ACCENTS[accent];
  return (
    <div
      className={cn(
        "card-lift bg-card border border-border rounded-xl p-5 md:p-6 shadow-soft hover:border-primary/20",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-muted">
          {title}
        </p>
        <div
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg",
            a.chip
          )}
        >
          <Icon className={cn("h-[18px] w-[18px]", a.icon)} strokeWidth={2} />
        </div>
      </div>
      <p className="tnum mt-3 text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl">
        {value}
      </p>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} />
          <span className="text-xs text-text-secondary">{trend}</span>
        </div>
      )}
    </div>
  );
};
