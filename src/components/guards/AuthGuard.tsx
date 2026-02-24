import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { locale } = useParams();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <div className="border-2 border-neo-black bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("common.loading", "Loading...")}
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/${locale ?? "en"}/login`} replace />;
  }

  return <>{children}</>;
}
