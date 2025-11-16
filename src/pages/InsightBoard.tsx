import { useState } from "react";
import { insightBoardData } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InsightBoard = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const getFilteredData = () => {
    if (activeTab === "all") return insightBoardData;
    return insightBoardData.filter(item => {
      if (activeTab === "clean") return item.status === "Bersih";
      if (activeTab === "review") return item.status === "Perlu Review";
      if (activeTab === "flagged") return item.status === "Terindikasi";
      return true;
    });
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto safe-zone py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-responsive-h1 font-heading font-semibold text-foreground">
            Insight Board
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            Ringkasan transaksi real-time.
          </p>
        </div>

        {/* Status Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex gap-1">
            <TabsTrigger value="all" className="text-xs md:text-sm touch-target">
              Semua ({insightBoardData.length})
            </TabsTrigger>
            <TabsTrigger value="clean" className="text-xs md:text-sm touch-target">
              Bersih ({insightBoardData.filter(i => i.status === "Bersih").length})
            </TabsTrigger>
            <TabsTrigger value="review" className="text-xs md:text-sm touch-target">
              Review ({insightBoardData.filter(i => i.status === "Perlu Review").length})
            </TabsTrigger>
            <TabsTrigger value="flagged" className="text-xs md:text-sm touch-target">
              Terindikasi ({insightBoardData.filter(i => i.status === "Terindikasi").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-muted border-b border-border sticky top-0">
                    <tr>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                        Kode
                      </th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                        Bukti
                      </th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                        Penjelasan
                      </th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                        Tindakan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredData.map((entry) => (
                      <tr
                        key={entry.code}
                        className="hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedTransaction(entry)}
                      >
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {entry.code}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge status={entry.status} variant="board" />
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-text-secondary hidden md:table-cell">
                          {entry.evidence} bukti
                        </td>
                        <td className="px-4 md:px-6 py-4 text-sm text-text-secondary hidden lg:table-cell">
                          <span className="line-clamp-1">{entry.reason}</span>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          {entry.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Transaction Detail Modal */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Transaksi: {selectedTransaction?.code}</DialogTitle>
            <DialogDescription>
              Analisis lengkap transaksi dan rekomendasi tindakan
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">Status</p>
                  <StatusBadge status={selectedTransaction.status} variant="board" />
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">Jumlah Bukti</p>
                  <p className="text-sm font-medium">{selectedTransaction.evidence} bukti ditemukan</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-2">Penjelasan</p>
                <p className="text-sm text-text-secondary bg-muted p-4 rounded-lg">
                  {selectedTransaction.reason}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-2">Riwayat Transaksi</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-text-secondary">Waktu Tercatat</span>
                    <span className="font-medium">2025-02-01 14:23</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-text-secondary">Nominal</span>
                    <span className="font-medium">Rp 2.450.000</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-text-secondary">Kategori</span>
                    <span className="font-medium">Transfer Antar Bank</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-2">Trust Profile Cross-Check</p>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <span className="text-sm text-text-secondary">Skor Kepercayaan Pengguna</span>
                  <span className="text-lg font-semibold text-primary">
                    {selectedTransaction.status === "Terindikasi" ? "67/100" :
                     selectedTransaction.status === "Perlu Review" ? "75/100" :
                     "85/100"}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-2">Referensi Vault</p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs font-mono text-text-secondary mb-1">Hash:</p>
                  <p className="text-xs font-mono">0x{Math.random().toString(36).substring(2, 15)}...</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-text-muted mb-2">Rekomendasi Tindakan</p>
                <p className="text-sm font-medium text-primary">{selectedTransaction.action}</p>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Tandai Selesai
                </Button>
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/5">
                  Eskalasi ke Senior
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsightBoard;
