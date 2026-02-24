import { useState, useEffect, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { fadeInUp, scaleIn } from "@/lib/animations";

export default function SettingsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();
  const { profile, refreshProfile, updatePassword, signOut } = useAuth();

  /* ── Profile Form State ── */
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  /* ── Password Form State ── */
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setCompany(profile.company ?? "");
      setPhone(profile.phone ?? "");
      setCountry(profile.country ?? "");
    }
  }, [profile]);

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(false);

    if (!name.trim()) {
      setProfileError(t("settings.nameRequired", "Name is required"));
      return;
    }

    setSavingProfile(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        name: name.trim(),
        company: company.trim() || null,
        phone: phone.trim() || null,
        country: country.trim() || null,
      })
      .eq("id", profile!.id);

    if (error) {
      setProfileError(error.message);
    } else {
      setProfileSuccess(true);
      await refreshProfile();
      setTimeout(() => setProfileSuccess(false), 3000);
    }
    setSavingProfile(false);
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError(
        t("auth.passwordMin", "Password must be at least 6 characters"),
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        t("auth.passwordMismatch", "Passwords do not match"),
      );
      return;
    }

    setSavingPassword(true);

    const { error } = await updatePassword(newPassword);

    if (error) {
      setPasswordError(error);
    } else {
      setPasswordSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
    setSavingPassword(false);
  }

  return (
    <>
      <Helmet>
        <title>{t("settings.title", "Account Settings")} — DMC Kreatif</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h1 className="font-space font-bold text-3xl md:text-4xl uppercase tracking-tight text-neo-black">
              {t("settings.title", "Account Settings")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
              {t("settings.subtitle", "Manage your profile and security")}
            </p>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <div className="bg-neo-white border-2 border-neo-black shadow-hard p-8">
              <h2 className="font-space font-bold text-xl uppercase tracking-tight text-neo-black mb-6 border-b-2 border-neo-black pb-3">
                {t("settings.profileSection", "Profile Information")}
              </h2>

              {profileSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neo-green/10 border-2 border-neo-green text-neo-black px-4 py-3 mb-6 font-mono text-sm"
                >
                  {t("settings.profileSaved", "Profile updated successfully!")}
                </motion.div>
              )}

              {profileError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neo-red/10 border-2 border-neo-red text-neo-red px-4 py-3 mb-6 font-mono text-sm"
                >
                  {profileError}
                </motion.div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-5">
                {/* Email (read-only) */}
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2">
                    {t("auth.email", "Email")}
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile?.email ?? ""}
                    className="w-full border-2 border-neo-black/30 bg-neo-bg/50 px-4 py-3 font-mono text-sm text-neo-black/50 cursor-not-allowed"
                  />
                  <p className="font-mono text-[10px] text-neo-black/40 mt-1">
                    {t("settings.emailReadOnly", "Email cannot be changed")}
                  </p>
                </div>

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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.company", "Company")}
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                    >
                      {t("settings.phone", "Phone")}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                    >
                      {t("settings.country", "Country")}
                    </label>
                    <input
                      id="country"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                      placeholder="France"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingProfile}
                  className="w-full bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {savingProfile
                    ? t("settings.saving", "Saving...")
                    : t("settings.saveProfile", "Save Profile")}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Password Section */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="bg-neo-white border-2 border-neo-black shadow-hard p-8">
              <h2 className="font-space font-bold text-xl uppercase tracking-tight text-neo-black mb-6 border-b-2 border-neo-black pb-3">
                {t("settings.passwordSection", "Change Password")}
              </h2>

              {passwordSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neo-green/10 border-2 border-neo-green text-neo-black px-4 py-3 mb-6 font-mono text-sm"
                >
                  {t("settings.passwordSaved", "Password updated successfully!")}
                </motion.div>
              )}

              {passwordError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neo-red/10 border-2 border-neo-red text-neo-red px-4 py-3 mb-6 font-mono text-sm"
                >
                  {passwordError}
                </motion.div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.newPassword", "New Password")}
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                    placeholder="Min 6 characters"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPwd"
                    className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2"
                  >
                    {t("auth.confirmPassword", "Confirm Password")}
                  </label>
                  <input
                    id="confirmPwd"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors"
                    placeholder="Repeat password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingPassword}
                  className="w-full bg-neo-black border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {savingPassword
                    ? t("settings.updating", "Updating...")
                    : t("settings.updatePassword", "Update Password")}
                </button>
              </form>
            </div>

            {/* Logout Section */}
            <div className="bg-neo-white border-2 border-neo-black shadow-hard p-8">
              <h2 className="font-space font-bold text-xl uppercase tracking-tight text-neo-black mb-4 border-b-2 border-neo-black pb-3">
                {t("settings.accountSection", "Account")}
              </h2>
              <p className="font-mono text-xs text-neo-black/60 mb-4">
                {t("settings.logoutDesc", "Sign out of your account on this device.")}
              </p>
              <button
                onClick={async () => {
                  await signOut();
                  navigate(`/${locale ?? "en"}/login`);
                }}
                className="bg-neo-red/10 border-2 border-neo-red px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-red hover:bg-neo-red hover:text-neo-white transition-all duration-150"
              >
                {t("auth.logout", "Sign Out")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
