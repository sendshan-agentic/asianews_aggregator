import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Image services
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // India - Times Group
      { protocol: 'https', hostname: '*.indiatimes.com' },
      { protocol: 'https', hostname: 'static.toiimg.com' },
      // India - Hindustan Times
      { protocol: 'https', hostname: '*.hindustantimes.com' },
      { protocol: 'https', hostname: 'images.hindustantimes.com' },
      // India - NDTV
      { protocol: 'https', hostname: '*.ndtvimg.com' },
      { protocol: 'https', hostname: '*.ndtv.com' },
      { protocol: 'https', hostname: 'cdn.ndtv.com' },
      // India - The Hindu
      { protocol: 'https', hostname: '*.thehindu.com' },
      { protocol: 'https', hostname: 's4.s3.amazonaws.com' },
      // India - Others
      { protocol: 'https', hostname: 'www.deccanherald.com' },
      { protocol: 'https', hostname: 'images.livemint.com' },
      { protocol: 'https', hostname: '*.india.com' },
      { protocol: 'https', hostname: '*.abplive.com' },
      { protocol: 'https', hostname: '*.zeenews.india.com' },
      { protocol: 'https', hostname: '*.republicworld.com' },
      { protocol: 'https', hostname: '*.opindia.com' },
      // China
      { protocol: 'https', hostname: '*.news.cn' },
      { protocol: 'https', hostname: '*.globaltimes.cn' },
      { protocol: 'https', hostname: 'www.chinadaily.com.cn' },
      // Japan
      { protocol: 'https', hostname: '*.japantimes.co.jp' },
      { protocol: 'https', hostname: 'www.japantimes.co.jp' },
      // South Korea
      { protocol: 'http', hostname: '*.koreaherald.com' },
      { protocol: 'https', hostname: '*.koreaherald.com' },
      // Southeast Asia
      { protocol: 'https', hostname: '*.straitstimes.com' },
      { protocol: 'https', hostname: '*.asiaone.com' },
      { protocol: 'https', hostname: '*.channelnewsasia.com' },
      // Asia Pacific
      { protocol: 'https', hostname: '*.nikkei.com' },
      { protocol: 'https', hostname: 'asia.nikkei.com' },
      // Catch-all for common CDNs
      { protocol: 'https', hostname: 'cdn.cnn.com' },
      { protocol: 'https', hostname: 'cloudfront-us-east-1.images.arcpublishing.com' },
    ],
  },
};

export default nextConfig;
