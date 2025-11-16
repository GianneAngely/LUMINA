import { useState } from "react";
import { secureExchangeData } from "@/lib/data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const currencies = [
  { code: "IDR", name: "Rupiah Indonesia" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "GBP", name: "British Pound" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "KRW", name: "Korean Won" },
  { code: "THB", name: "Thai Baht" },
];

const SecureExchange = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("IDR");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<string>("");
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const handleSimulation = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Masukkan nominal yang valid");
      return;
    }

    const amountNum = parseFloat(amount);
    let risk = "Rendah";
    let result = "Disetujui";
    let vaultCheck = "Aman";

    if (amountNum > 10000000) {
      risk = "Tinggi";
      result = "Ditolak";
      vaultCheck = "Flagged";
    } else if (amountNum > 5000000) {
      risk = "Sedang";
      result = "Perlu Review";
      vaultCheck = "Verifikasi";
    }

    setSimulationResult({
      pair: `${fromCurrency} → ${toCurrency}`,
      amount: amountNum.toLocaleString('id-ID'),
      risk,
      result,
      vault: vaultCheck,
      trustScore: risk === "Tinggi" ? "68/100" : risk === "Sedang" ? "76/100" : "84/100",
      hash: `0x${Math.random().toString(36).substring(2, 12)}...`,
    });

    toast.success("Simulasi berhasil dijalankan");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto safe-zone py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-responsive-h1 font-heading font-semibold text-foreground">
            Secure Exchange
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            Transaksi valas dengan perlindungan AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Simulation Form */}
          <Card className="p-4 md:p-8 border-border shadow-soft">
            <h2 className="text-responsive-h2 font-heading font-medium mb-4 md:mb-6 text-foreground">
              Simulasi Transaksi
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div>
                <Label htmlFor="fromCurrency" className="text-sm font-medium text-foreground mb-2">
                  Mata Uang Asal
                </Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger id="fromCurrency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="toCurrency" className="text-sm font-medium text-foreground mb-2">
                  Mata Uang Tujuan
                </Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger id="toCurrency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount" className="text-sm font-medium text-foreground mb-2">
                  Nominal
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Masukkan nominal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Button
                onClick={handleSimulation}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 md:h-12 touch-target"
              >
                <Shield className="w-4 h-4 mr-2" />
                Cek Keamanan AI
              </Button>
            </div>
          </Card>

          {/* Simulation Result */}
          {simulationResult && (
            <Card className="p-4 md:p-6 lg:p-8 border-border shadow-soft">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <h2 className="text-responsive-h2 font-heading font-medium text-foreground">
                  Hasil Simulasi
                </h2>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center p-3 md:p-4 bg-muted rounded-lg gap-2">
                  <span className="text-xs md:text-sm text-text-secondary">Pasangan Mata Uang</span>
                  <span className="font-medium text-xs md:text-sm text-foreground break-words text-right">{simulationResult.pair}</span>
                </div>
                <div className="flex justify-between items-center p-3 md:p-4 bg-muted rounded-lg gap-2">
                  <span className="text-xs md:text-sm text-text-secondary">Nominal</span>
                  <span className="font-medium text-xs md:text-sm text-foreground break-words text-right">Rp {simulationResult.amount}</span>
                </div>
                <div className="flex justify-between items-center p-3 md:p-4 bg-muted rounded-lg gap-2">
                  <span className="text-xs md:text-sm text-text-secondary">Tingkat Risiko</span>
                  <StatusBadge status={simulationResult.risk} variant="watch" />
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm text-text-secondary">Hasil Verifikasi</span>
                  <span className={`font-medium ${
                    simulationResult.result === "Disetujui" ? "text-success" :
                    simulationResult.result === "Perlu Review" ? "text-warning" :
                    "text-destructive"
                  }`}>
                    {simulationResult.result}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm text-text-secondary">Vault Check</span>
                  <span className="font-medium text-foreground">{simulationResult.vault}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm text-text-secondary">Trust Profile Score</span>
                  <span className="font-semibold text-primary">{simulationResult.trustScore}</span>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-text-muted mb-1">Hash Blockchain:</p>
                  <p className="text-xs font-mono text-foreground">{simulationResult.hash}</p>
                </div>
                {simulationResult.risk === "Tinggi" && (
                  <div className="flex gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-destructive">
                      <p className="font-medium mb-1">Transaksi Ditolak</p>
                      <p className="text-xs opacity-90">
                        Nominal terlalu besar dan memerlukan verifikasi tambahan. Silakan hubungi tim audit.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Exchange Log */}
        <div>
          <h2 className="text-xl font-heading font-medium mb-4 text-foreground">
            Riwayat Exchange
          </h2>
          <div className="bg-card border border-border rounded-xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Pair
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden md:table-cell">
                      Amount
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Risk
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Result
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider hidden lg:table-cell">
                      Vault
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {secureExchangeData.map((entry, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {entry.pair}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-text-secondary hidden md:table-cell">
                        {entry.amount}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={entry.risk} variant="watch" />
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                        <span className={
                          entry.result === "Disetujui" ? "text-success" :
                          entry.result.includes("Review") ? "text-warning" :
                          "text-destructive"
                        }>
                          {entry.result}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-text-secondary hidden lg:table-cell">
                        {entry.vault}
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

export default SecureExchange;
