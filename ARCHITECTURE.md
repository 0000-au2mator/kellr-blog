# Kellr — Architektur & Service-Übersicht

> Letzte Aktualisierung: 2026-03-02
> Dieses Dokument beschreibt alle verwendeten Services, ihre Integration und Konfiguration.

---

## 🏗️ Gesamtüberblick

```
[Michael / Nutzer]
       │
       │ WhatsApp Voice/Text
       ▼
[OpenClaw + Claude]  ◄──── KI-Steuerung (Sonnet Default, Opus für Coding)
       │
       ├──► GitHub (0000-kellr)
       │         ├── kellr (iOS App)
       │         └── kellr-blog (Website)
       │
       ├──► Supabase (Backend)
       │
       ├──► Apple (TestFlight / App Store)
       │
       ├──► Resend (E-Mail)
       │
       └──► Notion (Tasks / Social Media Posts)
```

---

## 📱 iOS App — Kellr

| Eigenschaft | Wert |
|-------------|------|
| **Repo** | https://github.com/0000-kellr/kellr |
| **Tech** | SwiftUI, iOS 17+ |
| **Bundle ID** | com.au2mator.kellr |
| **Team** | QV64L84RFS |
| **CI/CD** | GitHub Actions → TestFlight (Push to main) |
| **TestFlight** | Internal: "Familie" · Public Link: https://testflight.apple.com/join/NGG31k6t |

### Signing
- **Distribution Certificate:** iOS Distribution: Michael Seidl (gespeichert als GitHub Secret `DIST_P12_BASE64`)
- **Provisioning:** Automatic via App Store Connect API
- **API Key:** GY3WY8PX59 (in secrets/apple_authkey_GY3WY8PX59.p8)

---

## 🗄️ Backend — Supabase

| Eigenschaft | Wert |
|-------------|------|
| **Projekt** | bflxydqsutvpjzrevjlh |
| **URL** | https://bflxydqsutvpjzrevjlh.supabase.co |
| **Region** | Frankfurt (eu-central-1) |
| **Plan** | Free (Evaluation Pro für Custom Domain) |
| **Auth** | Supabase Auth (E-Mail + Magic Link) |
| **Storage** | Supabase Storage (Bucket: public-assets) |

### Wichtige Tabellen
- `profiles` — User-Profile, Household-Verknüpfung
- `households` — Haushalte (Seidl-Hofmeister)
- `products` — Vorratskammer-Items
- `product_categories` — Kategorien (Unique Constraint: household+name)
- `storage_locations` — Lagerorte
- `stock_transactions` — Bestandsbewegungen
- `affiliate_partners` — Amazon & Co.
- `category_affiliate_links` — Kategorie → Affiliate-Verknüpfung

### Credentials (lokal)
- Service Role Key: `secrets/supabase_service_role.txt`
- Anon Key: `secrets/supabase_anon_key.txt`
- URL: `secrets/supabase_url.txt`

---

## 🌐 Website — kellr.app

| Eigenschaft | Wert |
|-------------|------|
| **Repo** | https://github.com/0000-kellr/kellr-blog |
| **Hosting** | GitHub Pages |
| **Domain** | https://kellr.app |
| **Tech** | Pure HTML/CSS/JS (kein Framework) |
| **Content** | data.js — JSON-basierte Blog-Einträge |
| **Sprachen** | DE + EN (Toggle) |

### Seiten
- **Hero** — Projektvorstellung
- **Journal** — Tägliche Build-Logs
- **Dashboard** — KI-Kosten, Commits, Features (live aus data.js)
- **About** — Über Michael + WhatsApp Community
- **Community CTA** — WhatsApp Community Join-Link

---

## 📧 E-Mail — Resend

| Eigenschaft | Wert |
|-------------|------|
| **Provider** | Resend (resend.com) |
| **Domain** | kellr.app |
| **Sender** | noreply@kellr.app |
| **SMTP Host** | smtp.resend.com |
| **SMTP Port** | 465 |
| **User** | resend |
| **Zweck** | Supabase Auth-Mails (Einladungen, Password Reset) |
| **Limit** | 3.000 Mails/Monat (Free) |
| **Admin API** | secrets/resend_admin_api_key.txt |
| **Send API** | secrets/resend_api_key.txt |

---

## 📬 Kontakt — Microsoft 365 (geplant)

| Eigenschaft | Wert |
|-------------|------|
| **Postfach** | contact@kellr.app |
| **Status** | ⏳ Ausstehend — DNS noch einzurichten |
| **Tenant** | Privat (ms_client_id_Private.txt) |

---

## 🤖 KI & Automatisierung — OpenClaw

| Eigenschaft | Wert |
|-------------|------|
| **Platform** | OpenClaw (lokal auf Michaels PC) |
| **Haupt-Modell** | Claude Sonnet 4.6 (Routine) |
| **Coding Sub-Agents** | Claude Opus 4.6 (on demand) |
| **Steuerung** | WhatsApp Voice/Text |
| **Workspace** | C:\Users\Micha\.openclaw\workspace |
| **Agent** | Groot (main session) |

### Automatisierte Jobs (Cron)
- Resend Domain-Verifikation (alle 5 Min bis verified)
- kellr.app DNS Check (alle 5 Min bis propagiert)
- TestFlight Retry (alle 2h bis Upload erfolgreich)
- TestFlight Build nach Morgen 07:00 (einmalig)

---

## 📣 Social Media — Notion Posts Planer

| Eigenschaft | Wert |
|-------------|------|
| **DB** | b85c425b76a94007aa83a9cab5d2d45c |
| **Kanäle** | LinkedIn (SeidlM) + Instagram (SeidlM) |
| **Rhythmus** | Täglich: DE 08:00, EN 14:00 |
| **Status Flow** | Placeholder → ToPlan → Published |
| **Inhalt** | Building in Public — Kellr Fortschritt |

---

## 🔑 GitHub

| Eigenschaft | Wert |
|-------------|------|
| **Organisation** | 0000-kellr |
| **App Repo** | 0000-kellr/kellr |
| **Blog Repo** | 0000-kellr/kellr-blog |
| **Token** | secrets/github_token.txt (User: Seidlm) |
| **Enterprise** | au2mator-gmbh (SAML SSO) |

### GitHub Secrets (kellr Repo)
- `APP_STORE_CONNECT_PRIVATE_KEY` — .p8 API Key
- `APP_STORE_CONNECT_KEY_ID` — GY3WY8PX59
- `APP_STORE_CONNECT_ISSUER_ID` — 360c0f64-...
- `APPLE_TEAM_ID` — QV64L84RFS
- `DIST_P12_BASE64` — Distribution Certificate
- `DIST_P12_PASSWORD` — P12 Passwort

---

## 💰 Kosten-Übersicht (Stand Tag 2)

| Service | Kosten |
|---------|--------|
| OpenClaw + Claude API | ~€200 (Tag 1-2, Opus-intensiv) |
| Supabase | €0 (Free Plan) |
| GitHub | €0 (Free für Public Repos) |
| Resend | €0 (Free: 3.000 Mails/Monat) |
| GitHub Pages | €0 |
| Apple Developer | $99/Jahr (bereits bezahlt) |
| **Total laufend** | **~€0/Monat** (excl. KI) |

---

## 📍 Wo wird dieses Dokument gepflegt?

**Empfehlung:** Im `kellr-blog` Repo als `ARCHITECTURE.md` — damit es:
- Versioniert ist (Git History)
- Öffentlich einsehbar (Building in Public)
- Von Groot automatisch aktualisiert werden kann

Alternativ als eigene Seite auf kellr.app einbaubar.
