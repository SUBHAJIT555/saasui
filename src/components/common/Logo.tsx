import { SITE_NAME } from "@/lib/siteMetadata";

type LogoProps = {
  className?: string;
};

const Logo = ({ className = "h-full w-full" }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 676 199"
      preserveAspectRatio="xMinYMid meet"
      role="img"
      aria-label={`${SITE_NAME} logo`}
      className={className}
    >
      <polygon points="74,99 57,128.4 23,128.4 6,99 23,69.6 57,69.6" fill="#2667ff" />
      <polygon points="125,69.6 108,99 74,99 57,69.6 74,40.2 108,40.2" fill="#2667ff" opacity="0.72" />
      <polygon points="125,128.4 108,157.8 74,157.8 57,128.4 74,99 108,99" fill="#2667ff" opacity="0.44" />
      <text
        x="152"
        y="122"
        fontSize="64"
        fontWeight="700"
        letterSpacing="1"
        fill="#111111"
      >
        PRIME
        <tspan fill="#2667ff"> HIVE</tspan>
      </text>
    </svg>
  );
};

export default Logo;
