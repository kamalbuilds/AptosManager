import { BarChart, Coins, Image, User } from "lucide-react"

export const APP_PATHS = {
  OVERVIEW: "/overview",
  PROFILE: "/profile",
  TOKENS: "/tokens",
  NFTS: "/nfts",
}

export const APP_ROUTES = [
  {
    title: "Overivew",
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
]
