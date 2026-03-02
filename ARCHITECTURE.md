# Kellr — Architecture Overview

> Last updated: 2026-03-02

## Services

| Service | Provider | Notes |
|---------|----------|-------|
| iOS App | SwiftUI | GitHub Actions -> TestFlight |
| Backend | Supabase (Frankfurt) | Auth, DB, Storage |
| Website | GitHub Pages | kellr.app |
| Email | Resend | noreply@kellr.app |
| Analytics | GoatCounter | kellr.goatcounter.com |
| Contact | Microsoft 365 | contact@kellr.app (pending) |
| AI/Automation | OpenClaw + Claude | Building in Public |
| Social | LinkedIn + Instagram | Daily posts via Notion |

## Analytics -- GoatCounter

| | |
|---|---|
| **Provider** | GoatCounter (goatcounter.com) |
| **Dashboard** | https://kellr.goatcounter.com |
| **Tracking** | Page views, Referrer, Browser, Country |
| **Cookies** | None -- GDPR compliant |
| **Pages** | index.html, privacy.html, impressum.html |
| **Cost** | Free up to 100k views/month |

## Cost Overview (monthly)

| Service | Cost |
|---------|------|
| Supabase | 0 EUR (Free) |
| GitHub | 0 EUR (Public repos) |
| Resend | 0 EUR (3k emails/month) |
| GitHub Pages | 0 EUR |
| GoatCounter | 0 EUR (Free) |
| Apple Developer | 99 USD/year |
| AI (Claude API) | variable -- tracked daily |