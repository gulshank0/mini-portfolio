"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  GitMerge,
  GitPullRequest,
  ExternalLink,
  Calendar,
  GitBranch,
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
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:merged&sort=updated&order=desc&per_page=6`,
        );

        // Fetch open PRs
        const openResponse = await fetch(
          `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr+is:open&sort=updated&order=desc&per_page=6`,
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
      <div className="flex flex-col items-center justify-center py-20 ml-64 bg-black text-white min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
        <p className="text-gray-400">Loading GitHub activity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 ml-64 bg-black text-white min-h-[400px]">
        <p className="text-red-400 mb-2">Failed to load GitHub activity</p>
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pt-20 pb-20 px-8 ml-64 bg-black text-white">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-3"
        >
          GitHub Contributions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400"
        >
          My recent open source contributions and pull requests
        </motion.p>
      </div>

      {/* Merged PRs Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
            <GitMerge className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Recently Merged PRs
          </h3>
          <span className="px-2 py-0.5 text-sm rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {mergedPRs.length}
          </span>
        </div>

        {mergedPRs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No merged PRs found yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30">
            <GitPullRequest className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Open PRs</h3>
          <span className="px-2 py-0.5 text-sm rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
            {openPRs.length}
          </span>
        </div>

        {openPRs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No open PRs at the moment
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 hover:text-white transition-all duration-300"
        >
          View Full GitHub Profile
          <ExternalLink className="w-4 h-4" />
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={`overflow-hidden hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${
          isMerged
            ? "from-purple-900/30 to-gray-900/50 border-purple-500/20 hover:border-purple-500/40"
            : "from-green-900/30 to-gray-900/50 border-green-500/20 hover:border-green-500/40"
        } backdrop-blur-sm h-full`}
      >
        <CardContent className="p-5">
          {/* Repository Info */}
          <div className="flex items-center gap-2 mb-3">
            <GitBranch
              className={`w-4 h-4 ${
                isMerged ? "text-purple-400" : "text-green-400"
              }`}
            />
            <a
              href={`https://github.com/${pr.repo_owner}/${pr.repo_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors truncate"
            >
              {pr.repo_owner}/{pr.repo_name}
            </a>
          </div>

          {/* PR Title */}
          <a
            href={pr.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <h4 className="text-white font-medium mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
              {pr.title}
            </h4>
          </a>

          {/* PR Meta */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {formatDate(
                  isMerged && pr.merged_at ? pr.merged_at : pr.created_at,
                )}
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                isMerged
                  ? "bg-purple-500/20 text-purple-300"
                  : "bg-green-500/20 text-green-300"
              }`}
            >
              #{pr.number}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
