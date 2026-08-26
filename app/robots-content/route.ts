import robots from '@/app/robots';

const contentSignal = 'Content-Signal: search=yes, ai-input=yes, ai-train=no';

function resolveRobots(): string {
  const data = robots();
  const rules = Array.isArray(data.rules) ? data.rules : [data.rules];
  const lines: string[] = [];

  for (const rule of rules) {
    const userAgents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent ?? '*'];
    for (const userAgent of userAgents) {
      lines.push(`User-Agent: ${userAgent}`);
    }

    lines.push(contentSignal);

    const allow = rule.allow === undefined ? [] : Array.isArray(rule.allow) ? rule.allow : [rule.allow];
    for (const item of allow) {
      lines.push(`Allow: ${item}`);
    }

    const disallow = rule.disallow === undefined ? [] : Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
    for (const item of disallow) {
      lines.push(`Disallow: ${item}`);
    }

    if (rule.crawlDelay) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }

    lines.push('');
  }

  if (data.host) {
    lines.push(`Host: ${data.host}`);
  }

  const sitemaps = data.sitemap === undefined ? [] : Array.isArray(data.sitemap) ? data.sitemap : [data.sitemap];
  for (const sitemap of sitemaps) {
    lines.push(`Sitemap: ${sitemap}`);
  }

  return `${lines.join('\n')}\n`;
}

export const dynamic = 'force-static';

export function GET() {
  return new Response(resolveRobots(), {
    headers: {'Content-Type': 'text/plain; charset=utf-8'}
  });
}
