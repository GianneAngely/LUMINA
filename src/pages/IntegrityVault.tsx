import { useState } from "react";
import { integrityVaultData } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

const IntegrityVault = () => {
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [riskFilter, setRiskFilter] = useState<string>("all");

  const filteredData = riskFilter === "all" 
    ? integrityVaultData 
    : integrityVaultData.filter(item => item.risk === riskFilter);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto safe-zone py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-responsive-h1 font-heading font-semibold text-foreground">
            Integrity Vault
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            Deteksi perubahan data secara transparan.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
            <Input
              placeholder="Cari Ledger ID atau Hash..."
              className="pl-10 h-11 md:h-10 touch-target"
            />
          </div>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-full md:w-48 h-11 md:h-10 touch-target">
              <SelectValue placeholder="Filter Risiko" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Risiko</SelectItem>
              <SelectItem value="Low">Rendah</SelectItem>
              <SelectItem value="Medium">Sedang</SelectItem>
              <SelectItem value="High">Tinggi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full min-w-[800px]">
              <thead className="bg-muted border-b border-border sticky top-0">
                <tr>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    Ledger ID
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    Timestamp
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    Aksi Awal
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    Aksi Baru
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    Risiko
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    Hash
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-muted/50 cursor-pointer transition-colors touch-target"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-foreground">
                      {entry.id}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-text-secondary">
                      {entry.timestamp}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-text-secondary">
                      {entry.original}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-text-secondary">
                      {entry.new}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">
                      <StatusBadge status={entry.risk} variant="watch" />
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-text-muted font-mono">
                      {entry.hash}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">
                      <StatusBadge status={entry.status} variant="vault" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Ledger: {selectedEntry?.id}</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang perubahan data
            </DialogDescription>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">Timestamp</p>
                  <p className="text-sm font-medium">{selectedEntry.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">Status</p>
                  <StatusBadge status={selectedEntry.status} variant="vault" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">Aksi Awal</p>
                  <p className="text-sm font-medium">{selectedEntry.original}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">Aksi Baru</p>
                  <p className="text-sm font-medium">{selectedEntry.new}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">Hash Blockchain</p>
                <p className="text-sm font-mono bg-muted p-3 rounded-lg">{selectedEntry.hash}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">Level Risiko</p>
                <StatusBadge status={selectedEntry.risk} variant="watch" />
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">Dampak & Saran</p>
                <p className="text-sm text-text-secondary">
                  {selectedEntry.status === "Flagged" && 
                    "Perubahan signifikan terdeteksi. Audit manual diperlukan segera untuk memverifikasi legitimasi transaksi."}
                  {selectedEntry.status === "Modified" && 
                    "Perubahan kecil terdeteksi. Monitoring berkelanjutan disarankan untuk memastikan tidak ada pola mencurigakan."}
                  {selectedEntry.status === "Clean" && 
                    "Tidak ada perubahan terdeteksi. Transaksi aman dan sesuai dengan pola historis."}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrityVault;
