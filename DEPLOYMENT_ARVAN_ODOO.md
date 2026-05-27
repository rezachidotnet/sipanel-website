# SIPANEL Staging Deployment: ArvanCloud + Next.js + Odoo

This runbook prepares staging deployment for an ArvanCloud Ubuntu server. It does not launch production and it does not include real Odoo, PostgreSQL, analytics, or notification credentials.

Target:

- Website: `sipanelco.ir`
- Odoo: `odoo.sipanelco.ir`
- Server: ArvanCloud Iran, Ubuntu
- Runtime: Docker Compose
- Reverse proxy: Nginx
- Website app: Next.js standalone output
- CRM: Odoo and PostgreSQL on the same server

## Architecture

Traffic flow:

```text
ArvanCloud DNS/CDN -> Nginx :80/:443 -> nextjs:3000
ArvanCloud DNS/CDN -> Nginx :80/:443 -> odoo:8069 and odoo:8072
Odoo -> postgres:5432 on private Docker network
Next.js RFQ API -> Odoo JSON-RPC on private Docker network
```

Public ports:

- `80`
- `443`

Do not expose these service ports publicly:

- Next.js `3000`
- Odoo `8069`
- Odoo websocket `8072`
- PostgreSQL `5432`

## Files

- `Dockerfile`: production Next.js standalone image.
- `docker-compose.yml`: Next.js, Odoo, PostgreSQL, and Nginx stack.
- `nginx/conf.d/sipanel.conf`: reverse proxy for website and Odoo subdomain.
- `.env.production.example`: sanitized environment template.
- `odoo/odoo.conf`: Odoo proxy-mode configuration.

## ArvanCloud DNS

Create DNS records:

```text
sipanelco.ir        A     <server-public-ip>
www.sipanelco.ir    A     <server-public-ip>
odoo.sipanelco.ir   A     <server-public-ip>
```

Staging recommendation:

1. Start with DNS-only mode or an ArvanCloud mode that does not obscure origin certificate debugging.
2. Verify HTTP routes.
3. Add TLS on origin or configure ArvanCloud TLS termination.
4. Enable CDN/proxy behavior only after website and Odoo health checks pass.

## Ubuntu Server Setup

Run on the server as a sudo-capable user. These are setup commands, not an automatic deployment.

```bash
sudo apt update
sudo apt install -y ca-certificates curl git ufw

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc >/dev/null
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Log out and back in after adding the Docker group.

Firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status
```

Enable `ufw` only when SSH access has been verified.

## Environment Setup

On the server:

```bash
cp .env.production.example .env.production
nano .env.production
```

Use placeholders until real values are approved. Never commit `.env.production`.

Required private values:

```bash
POSTGRES_PASSWORD=<strong-postgres-password>
ODOO_MASTER_PASSWORD=<strong-odoo-master-password>
ODOO_DB=sipanel
ODOO_USERNAME=<dedicated-odoo-rfq-user>
ODOO_PASSWORD=<odoo-api-key-or-password>
```

Optional values:

```bash
ODOO_CRM_TEAM_ID=
ODOO_CRM_SOURCE_ID=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
RFQ_NOTIFICATION_WEBHOOK_URL=
RFQ_NOTIFICATION_WEBHOOK_TOKEN=
```

Odoo credentials are consumed only by server-side Docker services and the RFQ API. They are not exposed to frontend JavaScript.

## Build And Start Staging

Validate Compose config:

```bash
docker compose --env-file .env.production config
```

Build the website image:

```bash
docker compose --env-file .env.production build nextjs
```

Start staging stack:

```bash
docker compose --env-file .env.production up -d
docker compose --env-file .env.production ps
```

Check logs:

```bash
docker compose --env-file .env.production logs -f nextjs
docker compose --env-file .env.production logs -f nginx
docker compose --env-file .env.production logs -f odoo
docker compose --env-file .env.production logs -f postgres
```

## Build And Restart Commands

After pulling a new revision:

```bash
git pull --ff-only
docker compose --env-file .env.production build nextjs
docker compose --env-file .env.production up -d nextjs nginx
docker compose --env-file .env.production ps
```

Restart services without rebuilding:

```bash
docker compose --env-file .env.production restart nextjs nginx
```

Validate Nginx before reload:

```bash
docker compose --env-file .env.production exec nginx nginx -t
docker compose --env-file .env.production exec nginx nginx -s reload
```

## Odoo Initial Setup

Open:

```text
http://odoo.sipanelco.ir
```

Create the Odoo database matching:

```text
ODOO_DB=sipanel
```

Install CRM.

Create a dedicated Odoo user for website RFQ submissions. Grant only the minimum access needed to create CRM leads. Store the API key or password only in `.env.production`.

Proxy mode is already configured:

- `odoo/odoo.conf`: `proxy_mode = True`
- `docker-compose.yml`: `--proxy-mode`
- Nginx forwards `X-Forwarded-*` headers.

## SSL, CDN, And ArvanCloud Notes

Options:

1. Origin TLS with certificates mounted under `nginx/certs`.
2. ArvanCloud TLS termination at CDN edge.
3. Both edge TLS and origin TLS for stricter transport.

For certificate issuance with HTTP challenge:

```bash
mkdir -p nginx/www nginx/certs
docker compose --env-file .env.production up -d nginx
```

Issue certificates using your chosen ACME client on the server. Mount final certificate files under `nginx/certs` and add HTTPS server blocks after issuance.

ArvanCloud checklist:

- DNS records point to the server.
- CDN proxy mode matches TLS strategy.
- `sipanelco.ir`, `www.sipanelco.ir`, and `odoo.sipanelco.ir` are covered by TLS.
- Cache rules do not cache Odoo authenticated pages.
- Cache rules allow long caching for `/_next/static/*`.
- ArvanCloud does not rewrite canonical URLs or strip `hreflang`.

## SEO And Multilingual Routing

The deployment preserves existing Next.js routes:

- `/en`, `/fa`, `/ar`, `/ru`
- `/en|fa|ar|ru/systems`
- `/en|fa|ar|ru/projects`
- `/en|fa|ar|ru/resources`
- `/en|fa|ar|ru/insights`
- `/en|fa|ar|ru/solutions/[slug]`
- `/robots.txt`
- `/sitemap.xml`

Pre-staging local checks:

```bash
npm run lint
npm run typecheck
npm run build
HOSTNAME=127.0.0.1 PORT=3002 node .next/standalone/server.js
SEO_AUDIT_BASE_URL=http://127.0.0.1:3002 npm run seo:audit
```

Server checks after staging is up:

```bash
curl -I http://sipanelco.ir/en
curl -I http://sipanelco.ir/fa
curl -I http://sipanelco.ir/robots.txt
curl -I http://sipanelco.ir/sitemap.xml
curl -I http://odoo.sipanelco.ir/web/login
```

After TLS:

```bash
curl -I https://sipanelco.ir/en
curl -I https://sipanelco.ir/fa
curl -I https://sipanelco.ir/robots.txt
curl -I https://sipanelco.ir/sitemap.xml
curl -I https://odoo.sipanelco.ir/web/login
```

Verify page source for:

- canonical tags
- `hreflang` for `en`, `fa`, `ar`, `ru`, and `x-default`
- one H1 per page
- schema markup
- visible pending states for unverified proof, metrics, resources, or project fields

## Analytics Notes

Do not enable analytics IDs until approved:

- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`

Tracked event names remain implemented in code comments and analytics helpers. Confirm GA4/GTM configuration during staging before production launch.

## Backup Notes For Odoo And PostgreSQL

Create a server-side backup directory:

```bash
mkdir -p backups
chmod 700 backups
```

PostgreSQL logical backup:

```bash
docker compose --env-file .env.production exec -T postgres pg_dumpall -U "$POSTGRES_USER" > "backups/postgres-$(date +%F-%H%M).sql"
```

Odoo filestore archive:

```bash
docker run --rm -v sipanel-staging_odoo_data:/data -v "$PWD/backups:/backups" alpine tar -czf "/backups/odoo-data-$(date +%F-%H%M).tar.gz" -C /data .
```

RFQ protected files:

```bash
docker run --rm -v sipanel-staging_rfq_uploads:/uploads -v "$PWD/backups:/backups" alpine tar -czf "/backups/rfq-uploads-$(date +%F-%H%M).tar.gz" -C /uploads .
docker run --rm -v sipanel-staging_rfq_submissions:/submissions -v "$PWD/backups:/backups" alpine tar -czf "/backups/rfq-submissions-$(date +%F-%H%M).tar.gz" -C /submissions .
```

Also back up:

- `.env.production`
- `nginx/certs`
- `odoo/odoo.conf`
- custom addons under `odoo/addons`

Restore should be tested on a separate staging server before any production migration.

## Content Governance Gate

Before launch:

- No fake metrics.
- No fake contact data.
- No fake project results.
- No fake downloadable resources.
- Pending technical proof remains visibly marked.
- Odoo credentials are not committed or exposed in frontend bundles.
- RFQ upload paths remain outside `/public`.

## Staging Gate

Run before production approval:

```bash
npm run lint
npm run typecheck
npm run build
docker compose --env-file .env.production config
docker compose --env-file .env.production build nextjs
docker compose --env-file .env.production up -d
docker compose --env-file .env.production exec nginx nginx -t
docker compose --env-file .env.production ps
```

Do not run production DNS cutover until staging checks, Odoo login, RFQ-to-Odoo lead creation, SEO audit, TLS, and backup restore checks are complete.
