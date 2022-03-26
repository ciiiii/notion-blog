// const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      'libcuda.so'
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
})
