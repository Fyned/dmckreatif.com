import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { fadeInUp, scaleIn } from "@/lib/animations";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const { updatePassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError(
        t("auth.passwordMin", "Password must be at least 6 characters"),
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch", "Passwords do not match"));
      return;
    }

    setSubmitting(true);

    const { error: updateError } = await updatePassword(password);

    if (updateError) {
      setError(updateError);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate(`/${locale ?? "en"}/dashboard`, { replace: true });
      }, 2000);
    }
    setSubmitting(false);
  }

  return (
    <>
      <Helmet>
        <title>
          {t("auth.resetPasswordTitle", "Set New Password")} — DMC Kreatif
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-[60vh] flex items-center justify-center py-20 px-6">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <div className="bg-neo-white border-2 border-neo-black shadow-hard p-8">
            {/* Header */}
            <motion.div variants={fadeInUp} className="mb-8 text-center">
              <h1 className="font-space font-bold text-3xl uppercase tracking-tight text-neo-black">
                {t("auth.resetPasswordTitle", "Set New Password")}
              </h1>
              <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
                {t(
                  "auth.resetPasswordSubtitle",
                  "Choose a strong password for your account",
                )}
              </p>
            </motion.div>

            {/* Success */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neo-green/10 border-2 border-neo-green text-neo-black px-4 py-3 mb-6 font-mono text-sm"
              >
                <span className="font-bold block mb-1">
                  {t("auth.passwordUpdated", "Password updated!")}
                </span>
                {t(
                  "auth.redirecting",
                  "Redirecting to your dashboard...",
                )}
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neo-red/10 border-2 border-neo-red text-neo-red px-4 py-3 mb-6 font-mono text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            {!success && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="password"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.newPassword", "New Password")}
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                    placeholder="Min 6 characters"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.confirmPassword", "Confirm Password")}
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                    placeholder="Repeat password"
                  />
                  <p className="font-mono text-[10px] text-neo-black/40 mt-1 uppercase">
                    {t("auth.passwordHint", "Minimum 6 characters")}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting
                    ? t("auth.updating", "Updating...")
                    : t("auth.updatePassword", "Update Password")}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
}
