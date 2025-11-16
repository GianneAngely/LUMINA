import { trustProfileData } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TrustProfile = () => {
  const trustScore = 83;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto safe-zone py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-responsive-h1 font-heading font-semibold text-foreground">
            Trust Profile
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            Keandalan pengguna berdasarkan perilaku transaksi.
          </p>
        </div>

        {/* Trust Score Card */}
        <Card className="p-6 md:p-10 border-border shadow-soft text-center">
          <div className="max-w-md mx-auto space-y-4 md:space-y-6">
            <div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx={window.innerWidth >= 768 ? "80" : "64"}
                    cy={window.innerWidth >= 768 ? "80" : "64"}
                    r={window.innerWidth >= 768 ? "70" : "56"}
                    stroke="currentColor"
                    strokeWidth={window.innerWidth >= 768 ? "12" : "10"}
                    fill="none"
                    className="text-secondary"
                  />
                  <circle
                    cx={window.innerWidth >= 768 ? "80" : "64"}
                    cy={window.innerWidth >= 768 ? "80" : "64"}
                    r={window.innerWidth >= 768 ? "70" : "56"}
                    stroke="currentColor"
                    strokeWidth={window.innerWidth >= 768 ? "12" : "10"}
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * (window.innerWidth >= 768 ? 70 : 56)}`}
                    strokeDashoffset={`${2 * Math.PI * (window.innerWidth >= 768 ? 70 : 56) * (1 - trustScore / 100)}`}
                    className="text-primary transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-3xl md:text-5xl font-heading font-semibold text-foreground">{trustScore}</div>
                    <div className="text-xs md:text-sm text-text-muted">/100</div>
                  </div>
                </div>
              </div>
              <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-success/10 text-success rounded-full text-xs md:text-sm font-medium border border-success/20">
                Stabil
              </div>
            </div>
            <p className="text-xs md:text-sm text-text-secondary">
              Skor kepercayaan berdasarkan analisis perilaku transaksi historis
            </p>
          </div>
        </Card>

        {/* Behavior Metrics */}
        <div>
          <h2 className="text-responsive-h2 font-heading font-medium mb-4 text-foreground">
            Metrik Perilaku
          </h2>
          <div className="responsive-grid-2">
            <Card className="p-6 border-border shadow-soft">
              <h3 className="text-sm font-medium text-text-muted mb-3">Keteraturan Transaksi</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Konsistensi</span>
                  <span className="font-medium text-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </Card>
            <Card className="p-6 border-border shadow-soft">
              <h3 className="text-sm font-medium text-text-muted mb-3">Pola Waktu</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Prediktabilitas</span>
                  <span className="font-medium text-foreground">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
            </Card>
            <Card className="p-6 border-border shadow-soft">
              <h3 className="text-sm font-medium text-text-muted mb-3">Pengulangan Anomali</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Stabilitas</span>
                  <span className="font-medium text-foreground">79%</span>
                </div>
                <Progress value={79} className="h-2" />
              </div>
            </Card>
            <Card className="p-6 border-border shadow-soft">
              <h3 className="text-sm font-medium text-text-muted mb-3">Konsistensi Nominal</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Reliabilitas</span>
                  <span className="font-medium text-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </Card>
          </div>
        </div>

        {/* Behavior Log */}
        <div>
          <h2 className="text-responsive-h2 font-heading font-medium mb-4 text-foreground">
            Log Perilaku
          </h2>
          <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full min-w-[700px]">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Aktivitas
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Konsistensi
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Deviasi
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden md:table-cell">
                      Dampak
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {trustProfileData.map((entry, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 md:px-6 py-4 text-sm text-foreground">
                        {entry.activity}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        {entry.consistency}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        {entry.deviation}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium hidden md:table-cell">
                        <span className={entry.impact.startsWith('+') ? 'text-success' : 'text-destructive'}>
                          {entry.impact}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={entry.status} variant="trust" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustProfile;
