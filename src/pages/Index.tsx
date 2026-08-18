import { AlertCircle, Shield, Eye, TrendingUp, type LucideIcon } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

type Severity = "high" | "medium";

const SEV_BADGE: Record<Severity, string> = {
  high: "bg-destructive/12 text-[#B4232F]",
  medium: "bg-warning/25 text-[#8A5B00]",
};
const SEV_DOT: Record<Severity, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
};

const AI_SUMMARY: {
  module: string;
  icon: LucideIcon;
  items: { id?: string; text: string; tag: string; sev: Severity }[];
}[] = [
  {
    module: "Alert Terbaru — Integrity Vault",
    icon: AlertCircle,
    items: [
      { id: "IV-003", text: "Perubahan drastis Rp 5.000.000 → Rp 4.200.000", tag: "Risiko Tinggi", sev: "high" },
      { id: "IV-009", text: "Penurunan Rp 9.000.000 → Rp 7.000.000", tag: "Flagged", sev: "high" },
      { id: "IV-016", text: "Anomali Rp 8.000.000 → Rp 7.200.000", tag: "Perlu Audit", sev: "medium" },
    ],
  },
  {
    module: "Anomali Terbaru — Silent Watch",
    icon: Eye,
    items: [
      { text: "Pola frekuensi tinggi mendadak jam 03.00–04.00", tag: "Audit Manual", sev: "medium" },
      { text: "Kecocokan pola fraud kartu kredit terdeteksi", tag: "Audit Segera", sev: "high" },
      { text: "Duplikasi transaksi ditemukan", tag: "Investigasi", sev: "medium" },
    ],
  },
  {
    module: "Transaksi Review — Insight Board",
    icon: TrendingUp,
    items: [
      { id: "TX-103", text: "Mirip pola fraud OJK 2024 · 7 bukti", tag: "Audit Manual", sev: "medium" },
      { id: "TX-111", text: "Anomali jam + frekuensi · 8 bukti", tag: "Investigasi", sev: "medium" },
      { id: "TX-118", text: "Risiko tinggi silang · 10 bukti", tag: "Audit Penuh", sev: "high" },
    ],
  },
];

const QUICK_ACTIONS: { label: string; sub: string; path: string; primary?: boolean }[] = [
  { label: "Buka Integrity Vault", sub: "Deteksi perubahan data", path: "/integrity-vault", primary: true },
  { label: "Lihat Trust Profile", sub: "Analisa keandalan pengguna", path: "/trust-profile" },
  { label: "Pantau Silent Watch", sub: "Pengawasan pola etis", path: "/silent-watch" },
  { label: "Masuk Insight Board", sub: "Pusat kerja auditor", path: "/insight-board" },
  { label: "Coba Secure Exchange", sub: "Simulasi valas aman", path: "/secure-exchange" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="mx-auto max-w-7xl safe-zone space-y-8 py-6 md:py-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1.5">
            <h1 className="text-responsive-h1 font-heading font-semibold tracking-[-0.01em] text-foreground">
              LUMINA Dashboard
            </h1>
            <p className="text-sm text-text-secondary md:text-base">
              Audit cerdas, etis, dan transparan.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Pemantauan aktif
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          <StatCard title="Perubahan Terdeteksi" value={14} icon={AlertCircle} trend="Integrity Vault" accent="warning" />
          <StatCard title="Skor Kepercayaan Rata-rata" value="82/100" icon={Shield} trend="Trust Profile" accent="primary" />
          <StatCard title="Pola Mencurigakan" value={7} icon={Eye} trend="Silent Watch" accent="destructive" />
          <StatCard title="Transaksi Real-time" value={243} icon={TrendingUp} trend="Insight Board" accent="accent" />
        </div>

        {/* AI Summary */}
        <Card className="border-border p-5 shadow-soft md:p-7 lg:p-8">
          <div className="mb-5 flex items-center gap-2.5">
            <h2 className="font-heading text-lg font-medium text-foreground md:text-xl">
              Ringkasan AI
            </h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              9 temuan
            </span>
          </div>

          <div className="grid gap-x-8 gap-y-7 lg:grid-cols-3">
            {AI_SUMMARY.map((group) => {
              const Icon = group.icon;
              return (
                <section key={group.module}>
                  <h3 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">
                    <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                    {group.module}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 border-b border-border/60 pb-2.5 last:border-0 last:pb-0"
                      >
                        <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${SEV_DOT[item.sev]}`} />
                        <div className="min-w-0 flex-1">
                          <p className="tnum text-sm leading-snug text-text-secondary">
                            {item.id && <span className="font-semibold text-foreground">{item.id} </span>}
                            {item.text}
                          </p>
                          <span
                            className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${SEV_BADGE[item.sev]}`}
                          >
                            {item.tag}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="mb-4 font-heading text-lg font-medium text-foreground md:text-xl">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {QUICK_ACTIONS.map((action) => (
              <Button
                key={action.path}
                onClick={() => navigate(action.path)}
                variant={action.primary ? "default" : "outline"}
                className={
                  action.primary
                    ? "h-auto justify-start px-4 py-5 text-primary-foreground md:px-6 md:py-6"
                    : "h-auto justify-start border-primary/40 px-4 py-5 text-primary hover:bg-primary/5 md:px-6 md:py-6"
                }
              >
                <div className="text-left">
                  <div className="mb-1 text-sm font-medium md:text-base">{action.label}</div>
                  <div className="text-xs font-light opacity-80 md:text-sm">{action.sub}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
