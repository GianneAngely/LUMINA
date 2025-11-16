import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "vault" | "trust" | "watch" | "board";
}

export const StatusBadge = ({ status, variant = "vault" }: StatusBadgeProps) => {
  const getVariantStyles = () => {
    if (variant === "vault") {
      switch (status) {
        case "Clean":
        case "Bersih":
          return "bg-success/10 text-success border-success/20";
        case "Modified":
          return "bg-warning/10 text-warning border-warning/20";
        case "Flagged":
          return "bg-destructive/10 text-destructive border-destructive/20";
        default:
          return "bg-muted text-text-muted border-border";
      }
    }
    
    if (variant === "trust") {
      switch (status) {
        case "Stabil":
        case "Normal":
          return "bg-success/10 text-success border-success/20";
        case "Perlu Perhatian":
        case "Perlu Review":
        case "Aneh":
        case "Awas":
          return "bg-warning/10 text-warning border-warning/20";
        case "Risiko Tinggi":
        case "Abnormal":
          return "bg-destructive/10 text-destructive border-destructive/20";
        default:
          return "bg-muted text-text-muted border-border";
      }
    }
    
    if (variant === "watch") {
      switch (status) {
        case "Rendah":
          return "bg-success/10 text-success border-success/20";
        case "Sedang":
          return "bg-warning/10 text-warning border-warning/20";
        case "Tinggi":
          return "bg-destructive/10 text-destructive border-destructive/20";
        default:
          return "bg-muted text-text-muted border-border";
      }
    }
    
    if (variant === "board") {
      switch (status) {
        case "Bersih":
          return "bg-success/10 text-success border-success/20";
        case "Perlu Review":
          return "bg-warning/10 text-warning border-warning/20";
        case "Terindikasi":
          return "bg-destructive/10 text-destructive border-destructive/20";
        default:
          return "bg-muted text-text-muted border-border";
      }
    }
    
    return "bg-muted text-text-muted border-border";
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
      getVariantStyles()
    )}>
      {status}
    </span>
  );
};
