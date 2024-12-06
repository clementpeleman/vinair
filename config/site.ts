export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vinair",
  description: "Match your exisiting menu with the perfect wine.",
  navItems: [
    {
      label: "Features",
      href: "/features",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
