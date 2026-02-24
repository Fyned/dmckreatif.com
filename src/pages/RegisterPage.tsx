import { useState, useEffect, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { fadeInUp, scaleIn } from "@/lib/animations";

export default function RegisterPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const { user, loading, signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate(`/${locale ?? "en"}/dashboard`, { replace: true });
    }
  }, [user, loading, navigate, locale]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError(t("auth.passwordMin", "Password must be at least 6 characters"));
      return;
    }

    setSubmitting(true);

    const { error: signUpError, needsConfirmation } = await signUp(
      email,
      password,
      name,
      company || undefined,
    );

    if (signUpError) {
      setError(signUpError);
      setSubmitting(false);
    } else if (needsConfirmation) {
      setSuccess(true);
      setSubmitting(false);
    } else {
      // Auto-signed in — redirect handled by useEffect
      setSubmitting(false);
    }
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
        <title>{t("auth.registerTitle", "Register")} — DMC Kreatif</title>
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
                {t("auth.registerTitle", "Register")}
              </h1>
              <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
                {t("auth.registerSubtitle", "Create your client account")}
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
                  {t("auth.successTitle", "Registration successful!")}
                </span>
                {t(
                  "auth.checkEmail",
                  "Check your email for a confirmation link to activate your account.",
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
                    htmlFor="name"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.name", "Full Name")} *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.email", "Email")} *
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
                    {t("auth.password", "Password")} *
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
                  <p className="font-mono text-[10px] text-neo-black/40 mt-1 uppercase">
                    {t("auth.passwordHint", "Minimum 6 characters")}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.company", "Company")}{" "}
                    <span className="text-neo-black/40 normal-case">
                      ({t("common.optional", "optional")})
                    </span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting
                    ? t("auth.creating", "Creating account...")
                    : t("auth.createAccount", "Create Account")}
                </button>
              </form>
            )}

            {/* Login link */}
            <div className="mt-6 text-center">
              <p className="font-mono text-xs text-neo-black/60 uppercase">
                {t("auth.hasAccount", "Already have an account?")}{" "}
                <Link
                  to={`/${locale ?? "en"}/login`}
                  className="text-neo-black font-bold underline underline-offset-4 decoration-neo-lime decoration-2 hover:text-neo-lime transition-colors"
                >
                  {t("auth.loginLink", "Sign In")}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
