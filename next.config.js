module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 本地请求路径
        destination: 'https://ai-travel-assistant-7c66a5856baf5b0199af79eddbc8194a.default.us.langgraph.app/:path*', // Proxy to LangGraph API
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // 允许所有域名和 IP 地址
      },
      {
        protocol: 'https',
        hostname: '**', // 允许所有域名和 IP 地址
      },
    ],
  },
}; 