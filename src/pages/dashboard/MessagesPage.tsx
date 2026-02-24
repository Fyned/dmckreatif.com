import { useState, useEffect, useRef, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import type { Message } from "@/types/database";
import { fadeInUp } from "@/lib/animations";

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

export default function MessagesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [sending, setSending] = useState(false);
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    async function fetchMessages() {
      try {
        const { data, error: fetchError } = await supabase
          .from("messages")
          .select("*")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: true });

        if (fetchError) throw fetchError;
        const fetched = (data ?? []) as unknown as Message[];
        setMessages(fetched);

        // Mark unread messages as read
        const unreadIds = fetched
          .filter((m) => !m.read && m.from_admin)
          .map((m) => m.id);

        if (unreadIds.length > 0) {
          await supabase
            .from("messages")
            .update({ read: true })
            .in("id", unreadIds);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t("common.error", "Something went wrong"),
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, [user, t]);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendReply(e: FormEvent) {
    e.preventDefault();
    if (!user || !replyContent.trim()) return;

    setSending(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from("messages")
        .insert({
          subject: null,
          content: replyContent.trim(),
          from_admin: false,
          read: false,
          user_id: user.id,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setMessages((prev) => [...prev, data as unknown as Message]);
      setReplyContent("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("common.error", "Failed to send message"),
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>{t("dashboard.messages", "Messages")} — DMC Kreatif</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h1 className="font-space font-bold text-3xl md:text-4xl uppercase tracking-tight text-neo-black">
              {t("dashboard.messages", "Messages")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
              {t("dashboard.messagesSub", "Communication with your project team")}
            </p>
          </motion.div>

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

          {/* Messages Thread */}
          <div className="bg-neo-white border-2 border-neo-black shadow-hard">
            {/* Thread Body */}
            <div className="p-6 min-h-[300px] max-h-[500px] overflow-y-auto space-y-4">
              {/* Loading */}
              {loading && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
                    >
                      <div className="max-w-[75%] animate-pulse">
                        <div className="h-16 w-64 bg-neo-black/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty */}
              {!loading && messages.length === 0 && (
                <div className="flex items-center justify-center h-48">
                  <p className="font-mono text-sm text-neo-black/30 uppercase text-center">
                    {t(
                      "dashboard.noMessages",
                      "No messages yet. Send your first message below.",
                    )}
                  </p>
                </div>
              )}

              {/* Message Bubbles */}
              {!loading &&
                messages.map((message) => {
                  const isAdmin = message.from_admin;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isAdmin ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[75%] ${
                          isAdmin
                            ? "bg-neo-bg border-2 border-neo-black"
                            : "bg-neo-lime border-2 border-neo-black"
                        }`}
                      >
                        {/* Sender Label */}
                        <div
                          className={`px-4 pt-3 pb-1 flex items-center justify-between gap-4 ${
                            isAdmin ? "border-b border-neo-black/10" : "border-b border-neo-black/20"
                          }`}
                        >
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neo-black/50">
                            {isAdmin
                              ? t("dashboard.adminLabel", "DMC Kreatif")
                              : t("dashboard.youLabel", "You")}
                          </span>
                          <span className="font-mono text-[10px] text-neo-black/30">
                            {formatTime(message.created_at)}
                          </span>
                        </div>

                        {/* Subject */}
                        {message.subject && (
                          <div className="px-4 pt-2">
                            <span className="font-space font-bold text-xs uppercase text-neo-black">
                              {message.subject}
                            </span>
                          </div>
                        )}

                        {/* Content */}
                        <div className="px-4 py-3">
                          <p className="font-mono text-sm text-neo-black whitespace-pre-wrap break-words leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

              <div ref={threadEndRef} />
            </div>

            {/* Reply Form */}
            <form
              onSubmit={handleSendReply}
              className="border-t-2 border-neo-black p-4 flex gap-3"
            >
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={t("dashboard.typeMessage", "Type your message...")}
                rows={2}
                className="flex-1 border-2 border-neo-black bg-neo-bg px-4 py-3 font-mono text-sm text-neo-black placeholder:text-neo-black/30 focus:outline-none focus:ring-2 focus:ring-neo-lime focus:border-neo-lime transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={sending || !replyContent.trim()}
                className="self-end bg-neo-lime border-2 border-neo-black shadow-hard px-5 py-3 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
              >
                {sending
                  ? t("dashboard.sending", "Sending...")
                  : t("dashboard.send", "Send")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
