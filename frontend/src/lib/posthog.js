import posthog from 'posthog-js'

posthog.init('phc_Cs6TgYzVWJfnhDLJhW8X8Tip4rrsmhbJuqyM5uq3RmTg', {
  api_host: 'https://app.posthog.com',
  capture_pageview: true
})

export default posthog