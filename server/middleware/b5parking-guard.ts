// /b5parking is a QR-code destination, not part of the public site: it must not
// be indexed, cached, archived or fed to an LLM. robots.txt asks nicely; this
// is the enforcement for crawlers that don't. Every response on the path gets
// an X-Robots-Tag, and known AI crawlers / AI-assistant fetchers get a 403.
const AI_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Google-CloudVertexBot',
  'Gemini-Deep-Research',
  'Applebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  'CCBot',
  'Bytespider',
  'TikTokSpider',
  'cohere-ai',
  'cohere-training-data-crawler',
  'MistralAI-User',
  'DuckAssistBot',
  'YouBot',
  'Diffbot',
  'ImagesiftBot',
  'Omgilibot',
  'Omgili',
  'Timpibot',
  'PanguBot',
  'Kangaroo Bot',
  'AI2Bot',
  'Ai2Bot-Dolma',
  'Scrapy',
  'img2dataset',
  'webzio',
  'Webzio-Extended'
]
const AI_PATTERN = new RegExp(AI_AGENTS.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i')

export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname.toLowerCase()
  if (path !== '/b5parking' && !path.startsWith('/b5parking/')) return

  setResponseHeader(event, 'x-robots-tag', 'noindex, nofollow, noarchive, nosnippet, noimageai, noai')

  const agent = getRequestHeader(event, 'user-agent') ?? ''
  if (AI_PATTERN.test(agent)) {
    setResponseStatus(event, 403)
    setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
    return 'Not for AI crawlers.\n'
  }
})
