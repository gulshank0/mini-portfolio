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

export default function Github() {
  const [mergedPRs, setMergedPRs] = useState<PullRequest[]>([]);
  const [openPRs, setOpenPRs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPRs() {
      try {
        setLoading(true);
        setError(null);

        // Fetch merged PRs (contributions to other repos)
        const mergedResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged&sort=updated&order=desc&per_page=100`,
        );

        // Fetch open PRs
        const openResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:open&sort=updated&order=desc&per_page=100`,
        );

        if (!mergedResponse.ok || !openResponse.ok) {
          throw new Error("Failed to fetch PRs from GitHub");
        }

        const mergedData = await mergedResponse.json();
        const openData = await openResponse.json();

        // Process merged PRs
        const processedMerged: PullRequest[] = mergedData.items.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => {
            const repoUrl = item.repository_url;
            const repoParts = repoUrl.split("/");
            return {
              id: item.id,
              title: item.title,
              html_url: item.html_url,
              state: item.state,
              merged_at: item.pull_request?.merged_at,
              created_at: item.created_at,
              repository_url: repoUrl,
              repo_name: repoParts[repoParts.length - 1],
              repo_owner: repoParts[repoParts.length - 2],
              number: item.number,
            };
          },
        );

        // Process open PRs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedOpen: PullRequest[] = openData.items.map((item: any) => {
          const repoUrl = item.repository_url;
          const repoParts = repoUrl.split("/");
          return {
            id: item.id,
            title: item.title,
            html_url: item.html_url,
            state: item.state,
            merged_at: null,
            created_at: item.created_at,
            repository_url: repoUrl,
            repo_name: repoParts[repoParts.length - 1],
            repo_owner: repoParts[repoParts.length - 2],
            number: item.number,
          };
        });

        setMergedPRs(processedMerged);
        setOpenPRs(processedOpen);
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
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 lg:ml-64 bg-black text-white min-h-[300px] sm:min-h-[400px]">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-purple-500 mb-3 sm:mb-4" />
        <p className="text-gray-400 text-sm sm:text-base">
          Loading GitHub activity...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 lg:ml-64 bg-black text-white min-h-[300px] sm:min-h-[400px]">
        <p className="text-red-400 mb-2 text-sm sm:text-base">
          Failed to load GitHub activity
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 pt-16 sm:pt-18 lg:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 lg:ml-64 bg-black text-white">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3"
        >
          GitHub Contributions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-sm sm:text-base"
        >
          My recent open source contributions and pull requests
        </motion.p>
      </div>

      {/* Merged PRs Section */}
      <section>
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
            <GitMerge className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            Recently Merged PRs
          </h3>
          <span className="px-1.5 sm:px-2 py-0.5 text-xs sm:text-sm rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {mergedPRs.length}
          </span>
        </div>

        {mergedPRs.length === 0 ? (
          <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">
            No merged PRs found yet
          </p>
        ) : (
          <div className="flex flex-col gap-2">
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
        )}
      </section>

      {/* Open PRs Section */}
      <section>
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 rounded-lg bg-green-500/20 border border-green-500/30">
            <GitPullRequest className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            Open PRs
          </h3>
          <span className="px-1.5 sm:px-2 py-0.5 text-xs sm:text-sm rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
            {openPRs.length}
          </span>
        </div>

        {openPRs.length === 0 ? (
          <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">
            No open PRs at the moment
          </p>
        ) : (
          <div className="flex flex-col gap-2">
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
        )}
      </section>

      {/* View More Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center"
      >
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 hover:text-white transition-all duration-300 text-sm sm:text-base"
        >
          View Full GitHub Profile
          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
      </motion.div>
    </div>
  );
}

function PRCard({
  pr,
  index,
  type,
  formatDate,
}: Readonly<{
  pr: PullRequest;
  index: number;
  type: "merged" | "open";
  formatDate: (date: string) => string;
}>) {
  const isMerged = type === "merged";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <a
        href={pr.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200 hover:scale-[1.01] ${
          isMerged
            ? "bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-900/30"
            : "bg-green-900/20 border-green-500/20 hover:border-green-500/40 hover:bg-green-900/30"
        }`}
      >
        {/* Status Icon */}
        <div
          className={`flex-shrink-0 ${isMerged ? "text-purple-400" : "text-green-400"}`}
        >
          {isMerged ? (
            <GitMerge className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <GitPullRequest className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </div>

        {/* PR Number */}
        <span
          className={`flex-shrink-0 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono ${
            isMerged
              ? "bg-purple-500/20 text-purple-300"
              : "bg-green-500/20 text-green-300"
          }`}
        >
          #{pr.number}
        </span>

        {/* PR Title */}
        <span className="flex-1 text-white text-xs sm:text-sm font-medium truncate hover:text-purple-300 transition-colors">
          {pr.title}
        </span>

        {/* Repository - Hidden on small screens */}
        <span className="flex-shrink-0 text-[10px] sm:text-xs text-gray-500 hidden md:block max-w-[150px] truncate">
          {pr.repo_owner}/{pr.repo_name}
        </span>

        {/* Date - Hidden on small screens */}
        <span className="flex-shrink-0 text-[10px] sm:text-xs text-gray-500 hidden lg:flex items-center gap-1">
          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          {formatDate(isMerged && pr.merged_at ? pr.merged_at : pr.created_at)}
        </span>

        {/* External Link Icon */}
        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" />
      </a>
    </motion.div>
  );
}
