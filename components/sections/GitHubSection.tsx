"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GitMerge,
  GitPullRequest,
  ExternalLink,
  Calendar,
  Loader2,
} from "lucide-react";

interface PullRequest {
  id: number;
  title: string;
  html_url: string;
  state: string;
  merged_at: string | null;
  created_at: string;
  repository_url: string;
  repo_name: string;
  repo_owner: string;
  number: number;
}

const GITHUB_USERNAME = "gulshank0";

export default function GitHubSection() {
  const [mergedPRs, setMergedPRs] = useState<PullRequest[]>([]);
  const [openPRs, setOpenPRs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPRs() {
      try {
        setLoading(true);
        setError(null);

        const mergedResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged&sort=updated&order=desc&per_page=100`,
        );
        const openResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:open&sort=updated&order=desc&per_page=100`,
        );

        if (!mergedResponse.ok || !openResponse.ok) {
          throw new Error("Failed to fetch PRs from GitHub");
        }

        const mergedData = await mergedResponse.json();
        const openData = await openResponse.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processPR = (item: any, isMerged: boolean): PullRequest => {
          const repoUrl = item.repository_url;
          const repoParts = repoUrl.split("/");
          return {
            id: item.id,
            title: item.title,
            html_url: item.html_url,
            state: item.state,
            merged_at: isMerged ? item.pull_request?.merged_at : null,
            created_at: item.created_at,
            repository_url: repoUrl,
            repo_name: repoParts[repoParts.length - 1],
            repo_owner: repoParts[repoParts.length - 2],
            number: item.number,
          };
        };

        // Only show contributions to other people's repos
        const isExternalRepo = (pr: PullRequest) =>
          pr.repo_owner.toLowerCase() !== GITHUB_USERNAME.toLowerCase();

        setMergedPRs(
          mergedData.items
            .map((item: PullRequest) => processPR(item, true))
            .filter(isExternalRepo),
        );
        setOpenPRs(
          openData.items
            .map((item: PullRequest) => processPR(item, false))
            .filter(isExternalRepo),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchPRs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="github" className="py-16 px-4 sm:px-6">
        <p className="section-label mb-6">Open Source</p>
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--muted-foreground)] mb-3" />
          <p className="text-[var(--muted-foreground)] text-sm">
            Loading GitHub activity...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="py-16 px-4 sm:px-6">
        <p className="section-label mb-6">Open Source</p>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-red-500 text-sm mb-1">
            Failed to load GitHub activity
          </p>
          <p className="text-[var(--muted-foreground)] text-xs">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-2">Open Source</p>
        <p className="text-[15px] text-[var(--muted-foreground)] mb-8">
          My recent contributions and pull requests
        </p>
      </motion.div>

      {/* Merged PRs */}
      {mergedPRs.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <GitMerge className="w-4 h-4 text-purple-500" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              Merged PRs
            </h3>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 font-medium">
              {mergedPRs.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {mergedPRs.map((pr, index) => (
              <PRCard
                key={pr.id}
                pr={pr}
                index={index}
                type="merged"
                formatDate={formatDate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Open PRs */}
      {openPRs.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
              <GitPullRequest className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              Open PRs
            </h3>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-500/10 text-green-500 border border-green-500/20 font-medium">
              {openPRs.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {openPRs.map((pr, index) => (
              <PRCard
                key={pr.id}
                pr={pr}
                index={index}
                type="open"
                formatDate={formatDate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Profile Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm font-medium hover:bg-[var(--muted)] transition-all duration-200"
        >
          View Full GitHub Profile
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}

function PRCard({
  pr,
  index,
  type,
  formatDate,
}: {
  pr: PullRequest;
  index: number;
  type: "merged" | "open";
  formatDate: (date: string) => string;
}) {
  const isMerged = type === "merged";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
    >
      <a
        href={pr.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border transition-all duration-200 hover:shadow-sm group ${
          isMerged
            ? "bg-purple-500/5 border-purple-500/10 hover:border-purple-500/25 hover:bg-purple-500/10"
            : "bg-green-500/5 border-green-500/10 hover:border-green-500/25 hover:bg-green-500/10"
        }`}
      >
        <div
          className={`flex-shrink-0 ${isMerged ? "text-purple-500" : "text-green-500"}`}
        >
          {isMerged ? (
            <GitMerge className="w-3.5 h-3.5" />
          ) : (
            <GitPullRequest className="w-3.5 h-3.5" />
          )}
        </div>

        <span
          className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono ${
            isMerged
              ? "bg-purple-500/10 text-purple-500"
              : "bg-green-500/10 text-green-500"
          }`}
        >
          #{pr.number}
        </span>

        <span className="flex-1 text-sm text-[var(--foreground)] font-medium truncate group-hover:opacity-80 transition-opacity">
          {pr.title}
        </span>

        <span className="flex-shrink-0 text-[10px] text-[var(--muted-foreground)] hidden md:block max-w-[140px] truncate font-mono">
          {pr.repo_owner}/{pr.repo_name}
        </span>

        <span className="flex-shrink-0 text-[10px] text-[var(--muted-foreground)] hidden lg:flex items-center gap-1 font-mono">
          <Calendar className="w-2.5 h-2.5" />
          {formatDate(isMerged && pr.merged_at ? pr.merged_at : pr.created_at)}
        </span>

        <ExternalLink className="w-3 h-3 text-[var(--muted-foreground)] flex-shrink-0" />
      </a>
    </motion.div>
  );
}
