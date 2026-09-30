"use client";

import { motion } from "framer-motion";
import { Shield, Lock,  SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      {/* SVG Paths  */}
      <svg
        className="h-full sm:w-full text-muted"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        {/* Base Paths */}
        <g
          stroke="#e5e5e5"
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength={100}
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        {/* Glow Lines - Animated segments traveling along paths */}
        <g stroke={lightColor || "#00A6F5"} fill="none" strokeWidth="0.6" strokeLinecap="round">
          <motion.path
            d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
            strokeDasharray="12 300"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -312 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "linear",
            }}
            filter="url(#glow-filter)"
            opacity={0.7}
          />
          <motion.path
            d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
            strokeDasharray="12 300"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -312 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "linear",
            }}
            filter="url(#glow-filter)"
            opacity={0.7}
          />
          <motion.path
            d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
            strokeDasharray="12 300"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -312 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: "linear",
            }}
            filter="url(#glow-filter)"
            opacity={0.7}
          />
          <motion.path
            d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
            strokeDasharray="12 300"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -312 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: "linear",
            }}
            filter="url(#glow-filter)"
            opacity={0.7}
          />
        </g>
        {/* Blue Lights - Animated along paths */}
        <g mask="url(#db-mask-1)">
          <motion.circle
            className="database db-light-1"
            r="12"
            fill="url(#db-blue-grad)"
            initial={{ cx: 31, cy: 10 }}
            animate={{
              cx: [31, 31, 36, 50, 70, 90, 95, 95],
              cy: [10, 25, 30, 35, 40, 45, 45, 45],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />
        </g>
        <g mask="url(#db-mask-2)">
          <motion.circle
            className="database db-light-2"
            r="12"
            fill="url(#db-blue-grad)"
            initial={{ cx: 77, cy: 10 }}
            animate={{
              cx: [77, 77, 82, 90, 95, 95],
              cy: [10, 20, 25, 35, 40, 40],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          />
        </g>
        <g mask="url(#db-mask-3)">
          <motion.circle
            className="database db-light-3"
            r="12"
            fill="url(#db-blue-grad)"
            initial={{ cx: 124, cy: 10 }}
            animate={{
              cx: [124, 124, 119, 110, 105, 100, 100],
              cy: [10, 20, 25, 35, 40, 40, 40],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: "easeInOut",
            }}
          />
        </g>
        <g mask="url(#db-mask-4)">
          <motion.circle
            className="database db-light-4"
            r="12"
            fill="url(#db-blue-grad)"
            initial={{ cx: 170, cy: 10 }}
            animate={{
              cx: [170, 170, 165, 150, 130, 110, 105, 100, 100],
              cy: [10, 25, 30, 35, 40, 45, 45, 45, 45],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: "easeInOut",
            }}
          />
        </g>
        {/* Buttons */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* First Button */}
          <g>
            <rect
              fill="#53565a"
              stroke="#a3a3a3"
              strokeWidth="0.3"
              x="14"
              y="5"
              width="34"
              height="10"
              rx="2"
            ></rect>
            <SecurityIcon x="18" y="7.5" iconType="shield"></SecurityIcon>
            <text
              x="26"
              y="12"
              fill="white"
              stroke="none"
              fontSize="6"
              fontWeight="500"
            >
              {badgeTexts?.first || "SCAN"}
            </text>
          </g>
          {/* Second Button */}
          <g>
            <rect
              fill="#53565a"
              stroke="#a3a3a3"
              strokeWidth="0.3"
              x="60"
              y="5"
              width="34"
              height="10"
              rx="2"
            ></rect>
            <SecurityIcon x="64" y="7.5" iconType="lock"></SecurityIcon>
            <text
              x="72"
              y="12"
              fill="white"
              stroke="none"
              fontSize="6"
              fontWeight="500"
            >
              {badgeTexts?.second || "PROTECT"}
            </text>
          </g>
          {/* Third Button */}
          <g>
            <rect
              fill="#53565a"
              stroke="#a3a3a3"
              strokeWidth="0.3"
              x="108"
              y="5"
              width="34"
              height="10"
              rx="2"
            ></rect>
            <SecurityIcon x="112" y="7.5" iconType="eye"></SecurityIcon>
            <text
              x="118"
              y="12"
              fill="white"
              stroke="none"
              fontSize="6"
              fontWeight="500"
            >
              {badgeTexts?.third || "MONITOR"}
            </text>
          </g>
          {/* Fourth Button */}
          <g>
            <rect
              fill="#53565a"
              stroke="#a3a3a3"
              strokeWidth="0.3"
              x="150"
              y="5"
              width="40"
              height="10"
              rx="2"
            ></rect>
            <SecurityIcon x="154" y="7.5" iconType="alert"></SecurityIcon>
            <text
              x="163"
              y="12"
              fill="white"
              stroke="none"
              fontSize="6"
              fontWeight="500"
            >
              {badgeTexts?.fourth || "RESPOND"}
            </text>
          </g>
        </g>
        <defs>
          {/* 1 -  user list */}
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 2 - task list */}
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 3 - backlogs */}
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 4 - misc */}
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* Blue Grad */}
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#00A6F5"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Glow Gradient for traveling lines */}
          <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lightColor || "#00A6F5"} stopOpacity="0" />
            <stop offset="30%" stopColor={lightColor || "#00A6F5"} stopOpacity="0.6" />
            <stop offset="50%" stopColor={lightColor || "#00A6F5"} stopOpacity="0.8" />
            <stop offset="70%" stopColor={lightColor || "#00A6F5"} stopOpacity="0.6" />
            <stop offset="100%" stopColor={lightColor || "#00A6F5"} stopOpacity="0" />
          </linearGradient>
          {/* Glow Filter */}
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30" />
        {/* box title */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-md border border-neutral-400 bg-[#53565a] px-2 py-1 sm:-top-4 sm:py-1.5 font-inter-display font-normal text-white">
          <SparklesIcon 
            className="size-4" 
            style={{ color: lightColor || "#00A6F5" }}
          />
          <span className="ml-2 text-[12px]">
            {title ? title : "Cybersecurity Training Platform"}
          </span>
        </div>
        {/* box outter circle */}
        <div className="absolute -bottom-8 z-30 flex h-[60px] w-[60px] items-center justify-center rounded-full border-t border-neutral-300 bg-primary text-background">
          {circleText ? (
            <span className="font-semibold text-xs">{circleText}</span>
          ) : (
            <Shield className="size-6" />
          )}
        </div>
        {/* box content */}
        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-md border border-neutral-400 bg-background shadow-md">
          {/* Badges */}
          <div className="absolute bottom-8 left-12 z-10 h-7 rounded-md bg-primary px-3 text-xs border border-neutral-400 flex items-center gap-2 font-inter-display font-normal text-background">
            <Shield className="size-4" />
            <span>{buttonTexts?.first || "Cyberlabs"}</span>
          </div>
          <div className="absolute right-16 z-10 hidden h-7 rounded-md bg-primary px-3 text-xs sm:flex border border-neutral-400 items-center gap-2 font-inter-display font-normal text-background">
            <Lock className="size-4" />
            <span>{buttonTexts?.second || "Defense"}</span>
          </div>
          {/* Circles */}
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t border-neutral-400 bg-accent/5"
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t border-neutral-400 bg-accent/5"
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t border-neutral-400 bg-accent/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t border-neutral-400 bg-accent/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

const SecurityIcon = ({ x = "0", y = "0", iconType = "shield" }: { x: string; y: string; iconType?: "shield" | "lock" | "eye" | "alert" }) => {
  const iconPaths = {
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    lock: (
      <>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    alert: (
      <>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </>
    ),
  };

  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[iconType]}
    </svg>
  );
};
