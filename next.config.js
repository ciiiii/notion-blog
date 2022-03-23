// const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['pbs.twimg.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
})
