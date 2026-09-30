import { assetSrc } from "@/lib/utils";
import {
  TbBrandJavascript,
  TbBrandPython,
  TbTerminal,
  TbLock,
  TbFingerprintScan,
  TbServer2,
  TbCloudLock,
  TbGitBranch,
  TbShieldLock,
  TbWorldUpload,
  TbTopologyComplex,
  TbCloudComputing,
} from "react-icons/tb";
import type { IconType } from "react-icons";
import CyberIcon from "@/assets/img/logo/Icon-01.svg";

/* Distinct colors that read well on neutral-100 background */
const iconConfigs: Array<{ Icon: IconType; color: string }> = [
  { Icon: TbBrandJavascript, color: "#EAB308" },
  { Icon: TbBrandPython, color: "#2563EB" },
  { Icon: TbTerminal, color: "#475569" },
  { Icon: TbLock, color: "#059669" },
  { Icon: TbFingerprintScan, color: "#7C3AED" },
  { Icon: TbServer2, color: "#EA580C" },
  { Icon: TbCloudLock, color: "#0284C7" },
  { Icon: TbGitBranch, color: "#DC2626" },
  { Icon: TbShieldLock, color: "#16A34A" },
  { Icon: TbWorldUpload, color: "#0891B2" },
  { Icon: TbTopologyComplex, color: "#9333EA" },
  { Icon: TbCloudComputing, color: "#0D9488" },
];

const orbitCount = 3;
const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

export function StackOrbit({ className }: { className?: string }) {
  // Orbit ring sizes as % of container (full round, evenly spaced)
  const orbitSizes = ["55%", "78%", "100%"];

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className ?? ""}`}
    >
      {/* Orbit container */}
      <div className="relative w-full h-full min-w-0 min-h-0 aspect-square max-w-[320px] max-h-[320px] sm:max-w-[450px] sm:max-h-[450px] flex items-center justify-center">
        {/* Center Circle - replace with your icon when provided */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-background border-2 border-primary/20 shadow-md flex items-center justify-center shrink-0 z-10">
          <img src={assetSrc(CyberIcon)} alt="Cyberlabs Logo" className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </div>

        {/* Orbits - full round, theme borders */}
        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const size = orbitSizes[orbitIdx];
          const angleStep = (2 * Math.PI) / iconsPerOrbit;

          return (
            <div
              key={orbitIdx}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-primary/30"
              style={{
                width: size,
                height: size,
                animation: `orbit-spin ${12 + orbitIdx * 6}s linear infinite`,
              }}
            >
              {iconConfigs
                .slice(
                  orbitIdx * iconsPerOrbit,
                  orbitIdx * iconsPerOrbit + iconsPerOrbit
                )
                .map((cfg, iconIdx) => {
                  const angle = iconIdx * angleStep;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);

                  return (
                    <div
                      key={iconIdx}
                      className="absolute bg-background border border-primary/10 rounded-full p-1 shadow-sm"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <cfg.Icon
                        className="w-4 h-4 sm:w-7 sm:h-7"
                        style={{ color: cfg.color }}
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
