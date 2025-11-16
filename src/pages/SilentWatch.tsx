import { useState } from "react";
import { silentWatchData } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Clock, TrendingUp } from "lucide-react";

const SilentWatch = () => {
  const [selectedPattern, setSelectedPattern] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto safe-zone py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-responsive-h1 font-heading font-semibold text-foreground">
            Silent Watch
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            Pengawasan etis tanpa pelanggaran privasi.
          </p>
        </div>

        {/* Pattern Cards Grid */}
        <div className="responsive-grid-3">
          {silentWatchData.map((pattern, index) => (
            <Card
              key={index}
              className="p-4 md:p-6 border-border shadow-soft hover:shadow-modal transition-all cursor-pointer touch-target"
              onClick={() => setSelectedPattern(pattern)}
            >
              <div className="flex items-start justify-between mb-3">
                <AlertTriangle className={`w-5 h-5 ${
                  pattern.severity === "Tinggi" ? "text-destructive" :
                  pattern.severity === "Sedang" ? "text-warning" :
                  "text-success"
                }`} />
                <StatusBadge status={pattern.severity} variant="watch" />
              </div>
              <h3 className="text-xs md:text-sm font-medium text-foreground mb-2 line-clamp-2 break-words">
                {pattern.pattern}
              </h3>
              <div className="space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="break-words">{pattern.window}</span>
                </div>
                <p className="line-clamp-2 break-words">{pattern.summary}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-primary">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">{pattern.action}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Timeline Section */}
        <div>
          <h2 className="text-responsive-h2 font-heading font-medium mb-4 text-foreground">
            Timeline Deteksi
          </h2>
          <Card className="p-4 md:p-6 border-border shadow-soft">
            <div className="space-y-4">
              {silentWatchData.slice(0, 10).map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-20 text-xs text-text-muted pt-1">
                    {event.window}
                  </div>
                  <div className="flex-shrink-0 w-2 relative">
                    <div className={`w-2 h-2 rounded-full ${
                      event.severity === "Tinggi" ? "bg-destructive" :
                      event.severity === "Sedang" ? "bg-warning" :
                      "bg-success"
                    }`} />
                    {index < 9 && (
                      <div className="absolute top-2 left-1/2 w-px h-full -translate-x-1/2 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {event.pattern}
                    </p>
                    <p className="text-xs text-text-secondary mb-2">
                      {event.summary}
                    </p>
                    <StatusBadge status={event.severity} variant="watch" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Pattern Detail Modal */}
      <Dialog open={!!selectedPattern} onOpenChange={() => setSelectedPattern(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pola: {selectedPattern?.pattern}</DialogTitle>
            <DialogDescription>
              Analisis lengkap pola mencurigakan terdeteksi
            </DialogDescription>
          </DialogHeader>
          {selectedPattern && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">Tingkat Keparahan</p>
                  <StatusBadge status={selectedPattern.severity} variant="watch" />
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">Jendela Waktu</p>
                  <p className="text-sm font-medium">{selectedPattern.window}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-2">Deskripsi Pola</p>
                <p className="text-sm text-text-secondary bg-muted p-4 rounded-lg">
                  {selectedPattern.summary}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-2">Jumlah Bukti</p>
                <p className="text-sm font-medium">
                  {selectedPattern.severity === "Tinggi" ? "8-12 kejadian" :
                   selectedPattern.severity === "Sedang" ? "4-7 kejadian" :
                   "1-3 kejadian"}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-2">Dampak Potensial</p>
                <p className="text-sm text-text-secondary">
                  {selectedPattern.severity === "Tinggi" && 
                    "Risiko tinggi terhadap integritas sistem. Dapat mengindikasikan aktivitas fraud atau manipulasi data sistematis."}
                  {selectedPattern.severity === "Sedang" && 
                    "Risiko sedang yang memerlukan perhatian. Mungkin indikasi awal dari perilaku tidak biasa yang perlu dimonitor."}
                  {selectedPattern.severity === "Rendah" && 
                    "Risiko rendah namun tetap dicatat. Kemungkinan variasi normal dalam perilaku pengguna."}
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-text-muted mb-2">Rekomendasi Tindakan</p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span>{selectedPattern.action}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SilentWatch;
