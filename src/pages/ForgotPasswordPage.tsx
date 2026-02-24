import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { fadeInUp, scaleIn } from "@/lib/animations";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: resetError } = await resetPassword(email);

    if (resetError) {
      setError(resetError);
    } else {
      setSuccess(true);
    }
    setSubmitting(false);
  }

  return (
    <>
      <Helmet>
        <title>
          {t("auth.forgotPasswordTitle", "Reset Password")} — DMC Kreatif
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
                {t("auth.forgotPasswordTitle", "Reset Password")}
              </h1>
              <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
                {t(
                  "auth.forgotPasswordSubtitle",
                  "Enter your email to receive a reset link",
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
                  {t("auth.resetEmailSent", "Reset link sent!")}
                </span>
                {t(
                  "auth.resetEmailSentDesc",
                  "Check your email for a link to reset your password. It may take a few minutes.",
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
                    htmlFor="email"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.email", "Email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting
                    ? t("auth.sending", "Sending...")
                    : t("auth.sendResetLink", "Send Reset Link")}
                </button>
              </form>
            )}

            {/* Back to login */}
            <div className="mt-6 text-center">
              <Link
                to={`/${locale ?? "en"}/login`}
                className="font-mono text-xs text-neo-black/60 uppercase hover:text-neo-black transition-colors underline underline-offset-4 decoration-neo-lime decoration-2"
              >
                {t("auth.backToLogin", "Back to Login")}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
