import { AlertCircle, Shield, Eye, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto safe-zone py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-responsive-h1 font-heading font-semibold text-foreground">
            LUMINA Dashboard
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            Audit cerdas, etis, dan transparan.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Perubahan Terdeteksi"
            value={14}
            icon={AlertCircle}
            trend="Integrity Vault"
          />
          <StatCard
            title="Skor Kepercayaan Rata-rata"
            value="82/100"
            icon={Shield}
            trend="Trust Profile"
          />
          <StatCard
            title="Pola Mencurigakan"
            value={7}
            icon={Eye}
            trend="Silent Watch"
          />
          <StatCard
            title="Transaksi Real-time"
            value={243}
            icon={TrendingUp}
            trend="Insight Board"
          />
        </div>

        {/* AI Summary Section */}
        <Card className="p-4 md:p-6 lg:p-8 border-border shadow-soft">
          <h2 className="text-responsive-h2 font-heading font-medium mb-4 text-foreground">
            Ringkasan AI
          </h2>
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-xs md:text-sm font-medium text-primary mb-2">Alert Terbaru - Integrity Vault</h3>
              <ul className="space-y-2 text-xs md:text-sm text-text-secondary">
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span className="break-words">IV-003: Perubahan drastis Rp 5.000.000 → Rp 4.200.000 (Risiko Tinggi)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span className="break-words">IV-009: Penurunan Rp 9.000.000 → Rp 7.000.000 (Flagged)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span className="break-words">IV-016: Anomali Rp 8.000.000 → Rp 7.200.000 (Perlu Audit)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-primary mb-2">Anomali Terbaru - Silent Watch</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Pola frekuensi tinggi mendadak jam 03.00-04.00 (Audit Manual)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Kecocokan pola fraud kartu kredit terdeteksi (Audit Segera)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Duplikasi transaksi ditemukan (Investigasi)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-primary mb-2">Transaksi Review - Insight Board</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>TX-103: Mirip pola fraud OJK 2024 (7 bukti, Audit Manual)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>TX-111: Anomali jam + frekuensi (8 bukti, Investigasi)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>TX-118: Risiko tinggi silang (10 bukti, Audit Penuh)</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-responsive-h2 font-heading font-medium mb-4 text-foreground">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Button
              onClick={() => navigate("/integrity-vault")}
              className="h-auto py-5 md:py-6 px-4 md:px-6 bg-primary hover:bg-primary/90 text-primary-foreground justify-start touch-target"
            >
              <div className="text-left">
                <div className="font-medium text-sm md:text-base mb-1">Buka Integrity Vault</div>
                <div className="text-xs md:text-sm opacity-90 font-light">Deteksi perubahan data</div>
              </div>
            </Button>
            <Button
              onClick={() => navigate("/trust-profile")}
              variant="outline"
              className="h-auto py-5 md:py-6 px-4 md:px-6 justify-start border-primary text-primary hover:bg-primary/5 touch-target"
            >
              <div className="text-left">
                <div className="font-medium text-sm md:text-base mb-1">Lihat Trust Profile</div>
                <div className="text-xs md:text-sm opacity-80 font-light">Analisa keandalan pengguna</div>
              </div>
            </Button>
            <Button
              onClick={() => navigate("/silent-watch")}
              variant="outline"
              className="h-auto py-5 md:py-6 px-4 md:px-6 justify-start border-primary text-primary hover:bg-primary/5 touch-target"
            >
              <div className="text-left">
                <div className="font-medium text-sm md:text-base mb-1">Pantau Silent Watch</div>
                <div className="text-xs md:text-sm opacity-80 font-light">Pengawasan pola etis</div>
              </div>
            </Button>
            <Button
              onClick={() => navigate("/insight-board")}
              variant="outline"
              className="h-auto py-5 md:py-6 px-4 md:px-6 justify-start border-primary text-primary hover:bg-primary/5 touch-target"
            >
              <div className="text-left">
                <div className="font-medium text-sm md:text-base mb-1">Masuk Insight Board</div>
                <div className="text-xs md:text-sm opacity-80 font-light">Pusat kerja auditor</div>
              </div>
            </Button>
            <Button
              onClick={() => navigate("/secure-exchange")}
              variant="outline"
              className="h-auto py-5 md:py-6 px-4 md:px-6 justify-start border-primary text-primary hover:bg-primary/5 touch-target"
            >
              <div className="text-left">
                <div className="font-medium text-sm md:text-base mb-1">Coba Secure Exchange</div>
                <div className="text-xs md:text-sm opacity-80 font-light">Simulasi valas aman</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
