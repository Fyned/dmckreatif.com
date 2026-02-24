import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import type {
  StripeSettings,
  PayPalSettings,
  BankSettings,
  PaymentPreferences,
} from "@/types/database";

/* ── Defaults ── */
const DEFAULT_STRIPE: StripeSettings = {
  publishable_key: "",
  secret_key: "",
  webhook_secret: "",
  enabled: false,
};

const DEFAULT_PAYPAL: PayPalSettings = {
  client_id: "",
  secret: "",
  sandbox: true,
  enabled: false,
};

const DEFAULT_BANK: BankSettings = {
  iban: "",
  bic_swift: "",
  bank_name: "",
  account_holder: "",
  enabled: false,
};

const DEFAULT_PREFS: PaymentPreferences = {
  default_method: "bank",
  currency: "EUR",
  tax_rate: 21,
};

/* ── Helpers ── */
function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-2 border-neo-black bg-neo-bg px-4 py-2.5 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
      />
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none group">
      <div
        className={`relative w-12 h-6 border-2 border-neo-black transition-colors ${
          checked ? "bg-neo-lime" : "bg-neo-bg"
        }`}
        onClick={() => onChange(!checked)}
        onKeyDown={(e) => e.key === "Enter" && onChange(!checked)}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-neo-black transition-transform ${
            checked ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </div>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black group-hover:text-neo-black/70 transition-colors">
        {label}
      </span>
    </label>
  );
}

/* ── Main Component ── */
export default function PaymentSettingsPage() {
  const { t } = useTranslation();

  const [stripe, setStripe] = useState<StripeSettings>(DEFAULT_STRIPE);
  const [paypal, setPaypal] = useState<PayPalSettings>(DEFAULT_PAYPAL);
  const [bank, setBank] = useState<BankSettings>(DEFAULT_BANK);
  const [prefs, setPrefs] = useState<PaymentPreferences>(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("*");
    if (data) {
      for (const row of data) {
        const val = row.value as Record<string, unknown>;
        switch (row.key) {
          case "payment_stripe":
            setStripe({ ...DEFAULT_STRIPE, ...val } as unknown as StripeSettings);
            break;
          case "payment_paypal":
            setPaypal({ ...DEFAULT_PAYPAL, ...val } as unknown as PayPalSettings);
            break;
          case "payment_bank":
            setBank({ ...DEFAULT_BANK, ...val } as unknown as BankSettings);
            break;
          case "payment_preferences":
            setPrefs({ ...DEFAULT_PREFS, ...val } as unknown as PaymentPreferences);
            break;
        }
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  async function saveSetting(key: string, value: Record<string, unknown>) {
    setSaving(key);
    const { error } = await supabase
      .from("site_settings")
      .update({ value })
      .eq("key", key);
    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast("Settings saved!");
    }
    setSaving(null);
  }

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="neo-border bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("common.loading", "Loading...")}
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("admin.payments.title", "Payment Settings")} | DMC Kreatif</title>
      </Helmet>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 border-2 border-neo-black bg-neo-lime px-6 py-3 shadow-hard font-mono text-sm font-bold uppercase animate-pulse">
          {toast}
        </div>
      )}

      <section className="py-12 px-6 lg:px-10 max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-10">
          <NeoBadge color="neo-yellow" className="mb-4">
            {t("admin.payments.badge", "PAYMENT CONFIG")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.payments.title", "Payment Settings")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t("admin.payments.subtitle", "Configure payment gateways & banking info")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* ── Stripe ── */}
          <motion.div variants={fadeInUp}>
            <NeoCard color="neo-purple" hover={false} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-space font-bold text-xl uppercase">Stripe</h2>
                <Toggle
                  label={stripe.enabled ? "Active" : "Disabled"}
                  checked={stripe.enabled}
                  onChange={(v) => setStripe((p) => ({ ...p, enabled: v }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <InputField
                  label="Publishable Key"
                  value={stripe.publishable_key}
                  onChange={(v) => setStripe((p) => ({ ...p, publishable_key: v }))}
                  placeholder="pk_live_..."
                />
                <InputField
                  label="Secret Key"
                  value={stripe.secret_key}
                  onChange={(v) => setStripe((p) => ({ ...p, secret_key: v }))}
                  type="password"
                  placeholder="sk_live_..."
                />
              </div>
              <InputField
                label="Webhook Secret"
                value={stripe.webhook_secret}
                onChange={(v) => setStripe((p) => ({ ...p, webhook_secret: v }))}
                type="password"
                placeholder="whsec_..."
              />
              <button
                onClick={() => saveSetting("payment_stripe", stripe as unknown as Record<string, unknown>)}
                disabled={saving === "payment_stripe"}
                className="mt-6 bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
              >
                {saving === "payment_stripe" ? "Saving..." : "Save Stripe"}
              </button>
            </NeoCard>
          </motion.div>

          {/* ── PayPal ── */}
          <motion.div variants={fadeInUp}>
            <NeoCard color="neo-blue" hover={false} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-space font-bold text-xl uppercase">PayPal</h2>
                <Toggle
                  label={paypal.enabled ? "Active" : "Disabled"}
                  checked={paypal.enabled}
                  onChange={(v) => setPaypal((p) => ({ ...p, enabled: v }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Client ID"
                  value={paypal.client_id}
                  onChange={(v) => setPaypal((p) => ({ ...p, client_id: v }))}
                  placeholder="AYSq..."
                />
                <InputField
                  label="Secret"
                  value={paypal.secret}
                  onChange={(v) => setPaypal((p) => ({ ...p, secret: v }))}
                  type="password"
                  placeholder="EGnH..."
                />
              </div>
              <Toggle
                label="Sandbox Mode"
                checked={paypal.sandbox}
                onChange={(v) => setPaypal((p) => ({ ...p, sandbox: v }))}
              />
              <button
                onClick={() => saveSetting("payment_paypal", paypal as unknown as Record<string, unknown>)}
                disabled={saving === "payment_paypal"}
                className="mt-6 bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
              >
                {saving === "payment_paypal" ? "Saving..." : "Save PayPal"}
              </button>
            </NeoCard>
          </motion.div>

          {/* ── Bank Transfer ── */}
          <motion.div variants={fadeInUp}>
            <NeoCard color="neo-green" hover={false} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-space font-bold text-xl uppercase">Bank Transfer</h2>
                <Toggle
                  label={bank.enabled ? "Active" : "Disabled"}
                  checked={bank.enabled}
                  onChange={(v) => setBank((p) => ({ ...p, enabled: v }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="IBAN"
                  value={bank.iban}
                  onChange={(v) => setBank((p) => ({ ...p, iban: v }))}
                  placeholder="NL91ABNA0417164300"
                />
                <InputField
                  label="BIC / SWIFT"
                  value={bank.bic_swift}
                  onChange={(v) => setBank((p) => ({ ...p, bic_swift: v }))}
                  placeholder="ABNANL2A"
                />
                <InputField
                  label="Bank Name"
                  value={bank.bank_name}
                  onChange={(v) => setBank((p) => ({ ...p, bank_name: v }))}
                  placeholder="ABN AMRO"
                />
                <InputField
                  label="Account Holder"
                  value={bank.account_holder}
                  onChange={(v) => setBank((p) => ({ ...p, account_holder: v }))}
                  placeholder="DMC Kreatif"
                />
              </div>
              <button
                onClick={() => saveSetting("payment_bank", bank as unknown as Record<string, unknown>)}
                disabled={saving === "payment_bank"}
                className="mt-6 bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
              >
                {saving === "payment_bank" ? "Saving..." : "Save Bank"}
              </button>
            </NeoCard>
          </motion.div>

          {/* ── General Preferences ── */}
          <motion.div variants={fadeInUp}>
            <NeoCard color="neo-orange" hover={false} className="p-6">
              <h2 className="font-space font-bold text-xl uppercase mb-6">
                General Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-1.5">
                    Default Method
                  </label>
                  <select
                    value={prefs.default_method}
                    onChange={(e) => setPrefs((p) => ({ ...p, default_method: e.target.value }))}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-2.5 font-mono text-sm text-neo-black focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors appearance-none"
                  >
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-1.5">
                    Currency
                  </label>
                  <select
                    value={prefs.currency}
                    onChange={(e) => setPrefs((p) => ({ ...p, currency: e.target.value }))}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-2.5 font-mono text-sm text-neo-black focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors appearance-none"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <InputField
                  label="Tax Rate (%)"
                  value={String(prefs.tax_rate)}
                  onChange={(v) => setPrefs((p) => ({ ...p, tax_rate: Number(v) || 0 }))}
                  type="number"
                  placeholder="21"
                />
              </div>
              <button
                onClick={() =>
                  saveSetting("payment_preferences", prefs as unknown as Record<string, unknown>)
                }
                disabled={saving === "payment_preferences"}
                className="mt-6 bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
              >
                {saving === "payment_preferences" ? "Saving..." : "Save Preferences"}
              </button>
            </NeoCard>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
