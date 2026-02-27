import { useState, useEffect, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { fadeInUp, scaleIn } from "@/lib/animations";

export default function LoginPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const { user, role, loading, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const getRedirectPath = (userRole: string | null) => {
    const base = `/${locale ?? "en"}`;
    return userRole === "ADMIN" ? `${base}/admin` : `${base}/dashboard`;
  };

  useEffect(() => {
    if (!loading && user) {
      navigate(getRedirectPath(role), { replace: true });
    }
  }, [user, role, loading, navigate, locale]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setSubmitting(false);
    }
    // redirect handled by useEffect after auth state change
  }

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="border-2 border-neo-black bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("common.loading", "Loading...")}
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("auth.loginTitle", "Login")} — DMC Kreatif</title>
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
                {t("auth.loginTitle", "Login")}
              </h1>
              <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
                {t("auth.loginSubtitle", "Access your client dashboard")}
              </p>
            </motion.div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                aria-live="assertive"
                className="bg-neo-red/10 border-2 border-neo-red text-neo-red px-4 py-3 mb-6 font-mono text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
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

              <div>
                <label
                  htmlFor="password"
                  className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                >
                  {t("auth.password", "Password")}
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting
                  ? t("auth.signingIn", "Signing in...")
                  : t("auth.signIn", "Sign In")}
              </button>
            </form>

            {/* Forgot password link */}
            <div className="mt-4 text-center">
              <Link
                to={`/${locale ?? "en"}/forgot-password`}
                className="font-mono text-xs text-neo-black/50 uppercase hover:text-neo-black transition-colors underline underline-offset-4 decoration-neo-black/20"
              >
                {t("auth.forgotPassword", "Forgot your password?")}
              </Link>
            </div>

            {/* Register link */}
            <div className="mt-4 text-center">
              <p className="font-mono text-xs text-neo-black/60 uppercase">
                {t("auth.noAccount", "Don't have an account?")}{" "}
                <Link
                  to={`/${locale ?? "en"}/register`}
                  className="text-neo-black font-bold underline underline-offset-4 decoration-neo-lime decoration-2 hover:text-neo-lime transition-colors"
                >
                  {t("auth.registerLink", "Register")}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
