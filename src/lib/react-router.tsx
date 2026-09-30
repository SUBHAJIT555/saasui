"use client";

import NextLink from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
  useParams as useNextParams,
} from "next/navigation";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

type NavigationType = "POP" | "PUSH" | "REPLACE";

let pendingNavigationType: NavigationType = "PUSH";

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    pendingNavigationType = "POP";
  });
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function RouterLink(
  { to, children, ...props },
  ref,
) {
  return (
    <NextLink href={to} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (to: number | string, options?: { replace?: boolean }) => {
      if (typeof to === "number") {
        router.back();
        return;
      }

      pendingNavigationType = options?.replace ? "REPLACE" : "PUSH";
      if (options?.replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    },
    [router],
  );
}

export function useLocation() {
  const pathname = usePathname() ?? "";
  const searchParams = useNextSearchParams() ?? new URLSearchParams();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";

  return useMemo(
    () => ({
      pathname,
      search,
      hash,
      key: `${pathname}${search}${hash}`,
      state: null,
    }),
    [hash, pathname, search],
  );
}

export function useParams<
  T extends Record<string, string | undefined> = Record<string, string | undefined>,
>() {
  return useNextParams() as T;
}

export function useNavigationType(): NavigationType {
  const pathname = usePathname() ?? "";
  const searchParams = useNextSearchParams() ?? new URLSearchParams();
  const [navigationType, setNavigationType] = useState<NavigationType>("PUSH");
  const locationKey = `${pathname}?${searchParams.toString()}`;
  const previousKey = useRef(locationKey);

  useEffect(() => {
    if (previousKey.current === locationKey) return;

    setNavigationType(pendingNavigationType);
    pendingNavigationType = "PUSH";
    previousKey.current = locationKey;
  }, [locationKey]);

  return navigationType;
}

export function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const params = useNextSearchParams() ?? new URLSearchParams();

  const searchParams = useMemo(
    () => new URLSearchParams(params.toString()),
    [params],
  );

  const setSearchParams = useCallback(
  (
    next:
      | URLSearchParams
      | Record<string, string>
      | ((prev: URLSearchParams) => URLSearchParams),
    options?: { replace?: boolean },
  ) => {
    let updated: URLSearchParams;

    if (typeof next === "function") {
      updated = next(new URLSearchParams(params.toString()));
    } else if (next instanceof URLSearchParams) {
      updated = next;
    } else {
      updated = new URLSearchParams(next);
    }

    const query = updated.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    pendingNavigationType = options?.replace ? "REPLACE" : "PUSH";

    if (options?.replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  },
  [params, pathname, router],
);

  return [searchParams, setSearchParams] as const;
}
