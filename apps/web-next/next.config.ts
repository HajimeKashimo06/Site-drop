import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: false },
      { source: "/contact.html", destination: "/contact", permanent: false },
      { source: "/devis.html", destination: "/devis", permanent: false },
      { source: "/demo-site.html", destination: "/demo-site", permanent: false },
      { source: "/admin.html", destination: "/admin", permanent: false },
      { source: "/mentions-legales.html", destination: "/mentions-legales", permanent: false },
      { source: "/cgv.html", destination: "/cgv", permanent: false },
      { source: "/qui-sommes-nous.html", destination: "/qui-sommes-nous", permanent: false },
      { source: "/page-test.html", destination: "/sites/page-test", permanent: false },
      { source: "/page-test", destination: "/sites/page-test", permanent: false },
      { source: "/sites/:siteId/index.html", destination: "/sites/:siteId", permanent: false },
    ];
  },
};

export default nextConfig;
