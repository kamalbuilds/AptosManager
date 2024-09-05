import { BarChart, Coins, Image, User } from "lucide-react"

export const APP_PATHS = {
  OVERVIEW: "/overview",
  PROFILE: "/profile",
  TOKENS: "/tokens",
  NFTS: "/nfts",
  APTOSNAMING: "/aptosnamingservice",
}

export const APP_ROUTES = [
  {
    title: "Overview",
    Icon: BarChart,
    href: APP_PATHS.OVERVIEW,
  },
  {
    title: "Profile",
    Icon: User,
    href: APP_PATHS.PROFILE,
  },
  {
    title: "Tokens",
    Icon: Coins,
    href: APP_PATHS.TOKENS,
  },
  {
    title: "NFTS",
    Icon: Image,
    href: APP_PATHS.NFTS,
  },
  {
    title: "AptosNamingService",
    Icon: Image,
    href: "/aptosnamingservice",
  },
]
