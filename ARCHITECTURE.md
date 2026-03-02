# Kellr — Architektur & Service-Übersicht

> Letzte Aktualisierung: 2026-03-02

---

## Gesamtüberblick

```
[Nutzer / Michael]
       |
       | WhatsApp Voice/Text
       v
[OpenClaw + Claude]  <---- KI-Steuerung
       |
       +---> GitHub (0000-kellr)
       |         +-- kellr (iOS App)
       |         +-- kellr-blog (Website)
       |
       +---> Supabase (Backend)
       |
       +---> Apple (TestFlight / App Store)
       |
       +---> Resend (E-Mail)
       |
       +---> Microsoft 365 (Kontakt-Postfach)
```

---

## iOS App

| | |
|---|---|
| **Tech** | SwiftUI, iOS 17+ |
| **Backend** | Supabase (Frankfurt) |
| **CI/CD** | GitHub Actions → TestFlight (Push to main = Auto-Deploy) |
| **Distribution** | TestFlight (intern + Public Link) |
| **Signing** | Apple Distribution Certificate via GitHub Secrets |

---

## Backend — Supabase

| | |
|---|---|
| **Region** | Frankfurt (eu-central-1) |
| **Plan** | Free |
| **Auth** | Supabase Auth (Magic Link, E-Mail) |
| **Database** | PostgreSQL mit Row Level Security |
| **Storage** | Supabase Storage (Public Assets) |

### Kernfunktionen
- Haushaltsverwaltung mit Familien-Sharing
- Produktverwaltung (Barcode, Ablaufdatum, Bestand)
- Bestandstransaktionen (Einlagern / Entnehmen)
- Kategorien & Lagerorte pro Haushalt
- Amazon Affiliate Integration per Kategorie

---

## Website — kellr.app

| | |
|---|---|
| **Hosting** | GitHub Pages |
| **Domain** | https://kellr.app |
| **Tech** | HTML/CSS/JS |
| **Content** | JSON-basiert (data.js) — kein CMS nötig |
| **Sprachen** | Deutsch + Englisch (Toggle) |

---

## E-Mail

| | |
|---|---|
| **Provider** | Resend |
| **Sender** | noreply@kellr.app |
| **Zweck** | Supabase Auth-Mails (Einladungen, Password Reset) |
| **Kontakt** | contact@kellr.app (Microsoft 365, in Vorbereitung) |

---

## KI & Automatisierung

| | |
|---|---|
| **Platform** | OpenClaw (selbst-gehostet) |
| **Modelle** | Claude Sonnet (Routine), Claude Opus (Coding-Tasks) |
| **Steuerung** | WhatsApp Voice/Text |
| **Aufgaben** | Code schreiben, Bugs fixen, Deployments, Posts generieren |

---

## Social Media

| | |
|---|---|
| **Kanaele** | LinkedIn + Instagram |
| **Rhythmus** | Taeglich: DE 08:00, EN 14:00 |
| **Inhalt** | Building in Public — taeglich transparent ueber Fortschritt, Kosten, Learnings |

---

## Kostenübersicht (laufend)

| Service | Kosten |
|---------|--------|
| Supabase | 0 EUR/Monat (Free) |
| GitHub | 0 EUR/Monat (Public Repos) |
| Resend | 0 EUR/Monat (bis 3.000 Mails) |
| GitHub Pages | 0 EUR/Monat |
| Apple Developer | 99 USD/Jahr |
| KI (Claude API) | variabel — wird taeglich gemessen |