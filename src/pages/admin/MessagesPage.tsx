import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import NeoButton from "@/components/ui/NeoButton";
import type { Message } from "@/types/database";

type MessageWithProfile = Message & {
  profiles: { name: string; email: string } | null;
};

interface ConversationThread {
  userId: string;
  userName: string;
  userEmail: string;
  messages: MessageWithProfile[];
  unreadCount: number;
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessagesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [threads, setThreads] = useState<ConversationThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function fetchMessages() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchErr } = await supabase
        .from("messages")
        .select("*, profiles!user_id(name, email)")
        .order("created_at", { ascending: true });

      if (fetchErr) throw fetchErr;

      const typedData = (data as unknown as MessageWithProfile[]) ?? [];

      const threadMap = new Map<string, ConversationThread>();

      for (const msg of typedData) {
        const uid = msg.user_id;
        if (!threadMap.has(uid)) {
          threadMap.set(uid, {
            userId: uid,
            userName: msg.profiles?.name ?? t("admin.unknown", "Unknown"),
            userEmail: msg.profiles?.email ?? "",
            messages: [],
            unreadCount: 0,
          });
        }
        const thread = threadMap.get(uid);
        if (thread) {
          thread.messages.push(msg);
          if (!msg.read && !msg.from_admin) {
            thread.unreadCount += 1;
          }
        }
      }

      const sortedThreads = Array.from(threadMap.values()).sort((a, b) => {
        const aLast = a.messages[a.messages.length - 1]?.created_at ?? "";
        const bLast = b.messages[b.messages.length - 1]?.created_at ?? "";
        return bLast.localeCompare(aLast);
      });

      setThreads(sortedThreads);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeThread, threads]);

  async function handleMarkAsRead(userId: string) {
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("from_admin", false)
      .eq("read", false);

    setThreads((prev) =>
      prev.map((thread) =>
        thread.userId === userId
          ? {
              ...thread,
              unreadCount: 0,
              messages: thread.messages.map((m) =>
                !m.from_admin ? { ...m, read: true } : m,
              ),
            }
          : thread,
      ),
    );
  }

  async function handleSendReply(userId: string) {
    if (!replyText.trim() || !user) return;

    try {
      setSending(true);
      const { error: insertErr } = await supabase.from("messages").insert({
        content: replyText.trim(),
        subject: null,
        from_admin: true,
        read: false,
        user_id: userId,
      });

      if (insertErr) throw insertErr;

      setReplyText("");
      await fetchMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setSending(false);
    }
  }

  function handleOpenThread(userId: string) {
    setActiveThread(activeThread === userId ? null : userId);
    if (activeThread !== userId) {
      handleMarkAsRead(userId);
    }
  }

  const activeConversation = threads.find((t) => t.userId === activeThread);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="neo-border bg-neo-green px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("common.loading", "Loading...")}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <NeoCard color="neo-red" hover={false} className="p-8 max-w-md">
          <p className="font-space font-bold text-neo-black uppercase mb-2">
            {t("common.error", "Error")}
          </p>
          <p className="font-mono text-sm text-neo-black/70">{error}</p>
        </NeoCard>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("admin.messagesTitle", "Messages")} | DMC Kreatif Admin</title>
      </Helmet>

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <NeoBadge color="neo-green" className="mb-4">
            {t("admin.badge", "ADMIN PANEL")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.messages", "Messages")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t("admin.messagesSubtitle", "Client communication threads")} ({threads.length})
          </p>
        </motion.div>

        {/* Chat Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thread List */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-1"
          >
            <NeoCard hover={false} className="overflow-hidden">
              <div className="px-4 py-3 bg-neo-black text-neo-white font-mono text-xs uppercase tracking-wider">
                {t("admin.conversations", "Conversations")}
              </div>

              {threads.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="font-mono text-sm text-neo-black/50">
                    {t("admin.noMessages", "No messages yet")}
                  </p>
                </div>
              ) : (
                threads.map((thread) => (
                  <motion.div
                    key={thread.userId}
                    variants={fadeInUp}
                    onClick={() => handleOpenThread(thread.userId)}
                    className={`px-4 py-3 border-b-2 border-neo-black cursor-pointer transition-colors ${
                      activeThread === thread.userId
                        ? "bg-neo-lime"
                        : "bg-neo-white hover:bg-neo-bg-alt"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-space font-bold text-sm truncate">
                        {thread.userName}
                      </span>
                      {thread.unreadCount > 0 && (
                        <span className="bg-neo-red text-neo-white font-mono text-xs font-bold border-2 border-neo-black px-2 py-0.5 min-w-[24px] text-center">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-neo-black/50 truncate mt-0.5">
                      {thread.userEmail}
                    </p>
                    <p className="font-mono text-xs text-neo-black/40 mt-1 truncate">
                      {thread.messages[thread.messages.length - 1]?.content ?? ""}
                    </p>
                  </motion.div>
                ))
              )}
            </NeoCard>
          </motion.div>

          {/* Active Conversation */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeConversation ? (
                <motion.div
                  key={activeConversation.userId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <NeoCard hover={false} className="flex flex-col h-[600px]">
                    {/* Chat Header */}
                    <div className="px-6 py-3 bg-neo-black text-neo-white flex items-center justify-between">
                      <div>
                        <span className="font-space font-bold text-sm">
                          {activeConversation.userName}
                        </span>
                        <span className="font-mono text-xs text-neo-white/50 ml-3">
                          {activeConversation.userEmail}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-neo-white/40">
                        {activeConversation.messages.length}{" "}
                        {t("admin.messagesCount", "messages")}
                      </span>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neo-bg">
                      {activeConversation.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.from_admin ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[75%] border-2 border-neo-black p-3 ${
                              msg.from_admin
                                ? "bg-neo-lime shadow-hard-sm"
                                : "bg-neo-white shadow-hard-sm"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <NeoBadge
                                color={msg.from_admin ? "neo-lime" : "neo-blue"}
                                className="text-[10px]"
                              >
                                {msg.from_admin
                                  ? t("admin.you", "ADMIN")
                                  : t("admin.client", "CLIENT")}
                              </NeoBadge>
                              <span className="font-mono text-[10px] text-neo-black/40">
                                {formatTime(msg.created_at)}
                              </span>
                            </div>
                            {msg.subject && (
                              <p className="font-space font-bold text-xs mb-1">
                                {msg.subject}
                              </p>
                            )}
                            <p className="font-mono text-sm text-neo-black/80 whitespace-pre-wrap">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Reply Form */}
                    <div className="border-t-2 border-neo-black p-4 bg-neo-white">
                      <div className="flex gap-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={t("admin.replyPlaceholder", "Type your reply...")}
                          rows={2}
                          className="flex-1 border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm resize-none placeholder:text-neo-black/30"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendReply(activeConversation.userId);
                            }
                          }}
                        />
                        <NeoButton
                          color="neo-lime"
                          size="sm"
                          onClick={() =>
                            handleSendReply(activeConversation.userId)
                          }
                          disabled={sending || !replyText.trim()}
                          className="self-end"
                        >
                          {sending
                            ? t("common.sending", "...")
                            : t("admin.send", "Send")}
                        </NeoButton>
                      </div>
                    </div>
                  </NeoCard>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[600px] flex items-center justify-center"
                >
                  <NeoCard hover={false} className="p-8 text-center">
                    <p className="font-space font-bold text-lg uppercase text-neo-black/30">
                      {t("admin.selectConversation", "Select a conversation")}
                    </p>
                    <p className="font-mono text-xs text-neo-black/20 mt-2">
                      {t(
                        "admin.selectConversationHint",
                        "Choose a thread from the left to view messages",
                      )}
                    </p>
                  </NeoCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
