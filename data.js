// === KELLR BLOG DATA ===
// Edit this file to add new journal entries and update stats.

const JOURNAL = [
    {
        day: 7,
        date: "2026-03-07",
        title: { de: "Code Review &uuml;ber Nacht, Bugfixes am Tag", en: "Overnight Code Review, Daytime Bugfixes" },
        body: {
            de: `<p>Tag 7 begann um Mitternacht &mdash; mit einer KI die alleine arbeitet. Und endete mit den letzten Schliffs f&uuml;r den GoLive.</p>

<h3>&Uuml;ber Nacht: Der gro&szlig;e Code Review</h3>
<p>Gestern Abend habe ich meinem KI-Assistenten den Auftrag gegeben: &ldquo;Mach ein vollst&auml;ndiges Code Review, fixe alles, und mach 3 Durchl&auml;ufe.&rdquo; Dann bin ich schlafen gegangen.</p>
<p>Das Ergebnis am Morgen:</p>
<ul>
<li><strong>3 Review-Runden</strong> mit insgesamt <strong>27 Findings</strong></li>
<li><strong>2 Critical:</strong> Crash-Pfade bei ung&uuml;ltigen URLs + SwiftData-Migration behoben</li>
<li><strong>6 High:</strong> Token-Refresh Race Condition (der JWT-Bug von gestern!), Kamera-Permission, Code-Duplikation</li>
<li><strong>12 Medium + 7 Low:</strong> Von Force-Unwraps bis toter Code</li>
<li><strong>1 versteckter Bug gefunden:</strong> Offline-Sync r&auml;umte pendingMutationIds nicht auf</li>
<li>Gesamtbewertung: <strong>8.5/10 &mdash; Production-ready</strong></li>
</ul>
<p>6 Builds, alle gr&uuml;n. Keine menschliche Intervention n&ouml;tig. Das ist die Zukunft der Software-Entwicklung.</p>

<h3>Tagsüber: Bugfixes &amp; GoLive-Sprint</h3>
<p>Wenig Zeit heute, aber ein paar wichtige Dinge:</p>
<ul>
<li><strong>GoLive Sprint erstellt:</strong> Notion Sprint + GitHub Milestones. Ziel: 14. M&auml;rz.</li>
<li><strong>Privacy Policy:</strong> DSGVO-konform, DE+EN, live auf kellr.app/privacy</li>
<li><strong>App Store Metadata:</strong> Beschreibung, Keywords, Promo Text &mdash; alles vorbereitet</li>
<li><strong>Demo-Account:</strong> F&uuml;r den Apple Reviewer angelegt</li>
<li><strong>Scanner-Flow gefixt:</strong> Nach Produkterfassung zur&uuml;ck zum Inventar statt Scanner</li>
<li><strong>Lagerort-UX:</strong> Letzter Lagerort wird gemerkt, Filter-Pills im Inventar, Lagerorte als eigenes Men&uuml;</li>
</ul>

<h3>Das pers&ouml;nliche Fazit</h3>
<p>Die &Uuml;bernacht-Session war beeindruckend. 27 Fixes ohne mein Zutun. Aber die UX-Bugs am Tag &mdash; die findet man nur durch echtes Benutzen. Beides zusammen macht die App besser.</p>
<p>Wir bewegen uns langsam aber sicher Richtung GoLive. N&auml;chste Woche wird spannend.</p>`,
            en: `<p>Day 7 started at midnight &mdash; with an AI working alone. And ended with final polish for GoLive.</p>

<h3>Overnight: The Big Code Review</h3>
<p>Last night I told my AI assistant: &ldquo;Do a complete code review, fix everything, 3 rounds.&rdquo; Then I went to sleep.</p>
<p>The result in the morning:</p>
<ul>
<li><strong>3 review rounds</strong> with <strong>27 findings</strong> total</li>
<li><strong>2 Critical:</strong> Crash paths from invalid URLs + SwiftData migration fixed</li>
<li><strong>6 High:</strong> Token refresh race condition (yesterday&apos;s JWT bug!), camera permissions, code duplication</li>
<li><strong>12 Medium + 7 Low:</strong> From force-unwraps to dead code</li>
<li><strong>1 hidden bug found:</strong> Offline sync wasn&apos;t cleaning up pendingMutationIds</li>
<li>Overall rating: <strong>8.5/10 &mdash; Production-ready</strong></li>
</ul>
<p>6 builds, all green. No human intervention needed. This is the future of software development.</p>

<h3>Daytime: Bugfixes &amp; GoLive Sprint</h3>
<p>Not much time today, but a few important things:</p>
<ul>
<li><strong>GoLive Sprint created:</strong> Notion Sprint + GitHub Milestones. Target: March 14th.</li>
<li><strong>Privacy Policy:</strong> GDPR-compliant, DE+EN, live at kellr.app/privacy</li>
<li><strong>App Store Metadata:</strong> Description, keywords, promo text &mdash; all prepared</li>
<li><strong>Demo account:</strong> Created for the Apple reviewer</li>
<li><strong>Scanner flow fixed:</strong> After saving a product, back to inventory instead of scanner</li>
<li><strong>Location UX:</strong> Last location remembered, filter pills in inventory, locations as own menu</li>
</ul>

<h3>Personal takeaway</h3>
<p>The overnight session was impressive. 27 fixes without my involvement. But the UX bugs during the day &mdash; you only find those by actually using the app. Both together make it better.</p>
<p>We&apos;re slowly but surely moving towards GoLive. Next week will be exciting.</p>`
        },
        stats: {
            features: 3,
            commits: 15,
            issues: 6,
            cost: "~100&euro;",
            time: "~3h (+KI &uuml;ber Nacht)",
            messages: "~80"
        },
        tags: ["Code Review", "GoLive", "Privacy", "UX", "Day 7"]
    },
    {
        day: 6,
        date: "2026-03-05",
        title: { de: "Ruhiger Tag, neue Tester", en: "Slow Day, New Testers" },
        body: {
            de: `<p>Tag 6 war ruhig &mdash; und das ist okay.</p>
<p>Nach dem massiven Architektur-Umbau von gestern (Local-First mit SwiftData + Background-Sync) ging es heute ums Testen. Aber ehrlich gesagt hatte ich kaum Zeit.</p>

<h3>Was heute passiert ist</h3>
<ul>
<li><strong>2 neue Beta-Tester:</strong> Frische TestFlight-Einladungen verschickt. Unser Testerkreis w&auml;chst &mdash; jetzt sind wir nicht mehr nur &ldquo;Familie&rdquo;.</li>
<li><strong>Tests der Local-First-Architektur:</strong> Erste manuelle Tests des neuen Offline-Modus. Funktioniert soweit &mdash; aber noch nicht ausgiebig getestet.</li>
<li><strong>TestFlight-Limit:</strong> Wieder am Upload-Limit. Zwangspause. Builds b&uuml;ndeln bleibt die Lektion.</li>
</ul>

<h3>Das pers&ouml;nliche Fazit</h3>
<p>Nicht jeder Tag muss ein Sprint sein. Manchmal ist das Wichtigste, den Schwung nicht zu verlieren. Zwei neue Tester zu gewinnen ist mehr wert als drei Features &mdash; weil echtes Feedback Gold wert ist.</p>
<p>Morgen geht es weiter mit den P3-Issues: Barcode-Scanner-Rotation, bessere Accessibility, Onboarding-Tour. Kleine Dinge die den Unterschied machen.</p>`,
            en: `<p>Day 6 was quiet &mdash; and that&apos;s okay.</p>
<p>After yesterday&apos;s massive architecture rebuild (Local-First with SwiftData + background sync), today was about testing. But honestly, I barely had time.</p>

<h3>What happened today</h3>
<ul>
<li><strong>2 new beta testers:</strong> Fresh TestFlight invitations sent out. Our tester circle is growing &mdash; we&apos;re no longer just &ldquo;family.&rdquo;</li>
<li><strong>Local-First architecture testing:</strong> First manual tests of the new offline mode. Works so far &mdash; but not extensively tested yet.</li>
<li><strong>TestFlight limit:</strong> Hit the upload limit again. Forced pause. Batching commits remains the lesson.</li>
</ul>

<h3>Personal takeaway</h3>
<p>Not every day has to be a sprint. Sometimes the most important thing is to not lose momentum. Gaining two new testers is worth more than three features &mdash; because real feedback is gold.</p>
<p>Tomorrow we continue with P3 issues: barcode scanner rotation, better accessibility, onboarding tour. Small things that make the difference.</p>`
        },
        stats: {
            features: 0,
            commits: 0,
            issues: 0,
            cost: "<10&euro;",
            time: "<1h",
            messages: "~15"
        },
        tags: ["Testing", "Beta-Tester", "Pause", "Day 6"]
    },    {
        day: 5,
        date: "2026-03-04",
        title: { de: "Der gro&szlig;e Architektur-Switch", en: "The Big Architecture Switch" },
        body: {
            de: `<p>Tag 5 begann mit kleinen UI-Fixes &mdash; und endete mit einem kompletten Architektur-Umbau. So l&auml;uft das manchmal.</p>
<p>Irgendwann in der Mitte des Tages wurde klar: Das Netzwerk-zuerst-Modell ist ein Flaschenhals. Jede Aktion wartet auf Supabase. Der App-Start zeigt einen Spinner. Das f&uuml;hlt sich nicht gut an. Also haben wir das Fundament neugebaut.</p>

<h3>Was heute passiert ist</h3>
<ul>
<li><strong>Local-First mit SwiftData:</strong> 6 neue <code>@Model</code>-Klassen direkt auf dem Ger&auml;t &mdash; mit Sync-Metadaten (<code>supabaseId</code>, <code>needsPush</code>, <code>lastSyncedAt</code>). Das Inventar lebt jetzt lokal.</li>
<li><strong>Offline-Queue:</strong> Wenn Supabase nicht erreichbar ist, landet die &Auml;nderung in einer <code>PendingStockOp</code>-Queue statt verloren zu gehen. Beim n&auml;chsten App-Start wird die Queue geleert.</li>
<li><strong>Schnellerer App-Start:</strong> Beim zweiten Launch zeigt die App sofort die gecachten Daten &mdash; Supabase l&auml;dt im Hintergrund nach. Kein Spinner mehr.</li>
<li><strong>SyncEngine:</strong> Neue Klasse die beim App-Foreground automatisch synchronisiert: erst Queue leeren, dann Supabase pullen.</li>
<li><strong>Sync-Status in den Einstellungen:</strong> Zeigt wann zuletzt synchronisiert wurde, wie viele Operationen noch ausstehen &mdash; und einen &ldquo;Jetzt synchronisieren&rdquo;-Button.</li>
<li><strong>Upload-Limit wieder voll:</strong> Zu viele Fix-Commits heute. TestFlight-Upload erst morgen.</li>
</ul>

<h3>Das pers&ouml;nliche Fazit</h3>
<p>Heute habe ich das erste Mal wirklich gesp&uuml;rt, dass KI-Coding nicht bedeutet: beschreiben und fertig. Man braucht Architektur-Verst&auml;ndnis um zu wissen <em>warum</em> etwas so gebaut werden sollte.</p>
<p>Ohne 15 Jahre Erfahrung mit Scripting, Automatisierung und Backend-Grundlagen h&auml;tte ich diesen Architektur-Switch nicht steuern k&ouml;nnen. Ich w&auml;re nicht mal auf die Idee gekommen, dass es ein Problem gibt.</p>
<p>KI ist ein massiver Beschleuniger. Aber der Mensch am Steuer muss wissen, wohin die Fahrt gehen soll.</p>`,
            en: `<p>Day 5 started with small UI fixes &mdash; and ended with a complete architecture rebuild. That&apos;s how it goes sometimes.</p>
<p>Midway through the day it became clear: the network-first model is a bottleneck. Every action waits for Supabase. The app shows a spinner on launch. That doesn&apos;t feel right. So we rebuilt the foundation.</p>

<h3>What happened today</h3>
<ul>
<li><strong>Local-first with SwiftData:</strong> 6 new <code>@Model</code> classes living directly on-device &mdash; with sync metadata (<code>supabaseId</code>, <code>needsPush</code>, <code>lastSyncedAt</code>). The inventory now lives locally.</li>
<li><strong>Offline queue:</strong> When Supabase is unreachable, changes land in a <code>PendingStockOp</code> queue instead of being lost. The queue flushes on the next app launch.</li>
<li><strong>Faster app start:</strong> On the second launch the app shows cached data instantly &mdash; Supabase loads in the background. No spinner.</li>
<li><strong>SyncEngine:</strong> New class that automatically syncs when the app comes to foreground: flush queue first, then pull from Supabase.</li>
<li><strong>Sync status in settings:</strong> Shows when last synced, how many operations are pending &mdash; and a &ldquo;Sync now&rdquo; button.</li>
<li><strong>Upload limit hit again:</strong> Too many fix commits today. TestFlight upload tomorrow.</li>
</ul>

<h3>Personal takeaway</h3>
<p>Today I truly felt for the first time that AI coding doesn&apos;t mean: describe and done. You need architectural understanding to know <em>why</em> something should be built a certain way.</p>
<p>Without 15 years of experience with scripting, automation, and backend fundamentals, I couldn&apos;t have directed this architecture switch. I wouldn&apos;t have even noticed there was a problem.</p>
<p>AI is a massive accelerator. But the person at the wheel needs to know where they&apos;re going.</p>`
        },
        stats: {
            features: 8,
            commits: 12,
            issues: 0,
            cost: "~80&euro;",
            time: "~3h",
            messages: "~80"
        },
        tags: ["SwiftData", "Local-First", "Architektur", "Offline", "Day 5"]
    },
    {
        day: 4,
        date: "2026-03-03",
        title: { de: "Design, UX und das perfekte Icon", en: "Design, UX and the Perfect Icon" },
        body: {
            de: `<p>Tag 4 war k&uuml;rzer &mdash; aber intensiver als die Zahlen vermuten lassen.</p>
<p>Nur rund 30&euro; KI-Kosten heute. Aber was wir gebaut haben, &auml;ndert die Nutzungserfahrung der App komplett. Es waren lauter kleine Dinge &mdash; und genau diese kleinen Dinge machen den Unterschied zwischen &ldquo;funktioniert&rdquo; und &ldquo;f&uuml;hlt sich gut an&rdquo;.</p>

<h3>Was heute passiert ist</h3>
<ul>
<li><strong>Warnungen-Tab komplett &uuml;berarbeitet:</strong> Swipe-Aktionen direkt auf dem Warnungs-Screen (hinzuf&uuml;gen, entnehmen, bearbeiten). Plus eine neue Prognose-Sektion &mdash; mit Gruppen-Logik, damit kein Produkt doppelt erscheint.</li>
<li><strong>Inventar neu gestaltet:</strong> Gruppen sind jetzt auf- und zuklappbar. Die Bestandszahl wird gro&szlig; rechts angezeigt. Mehr Luft, bessere Lesbarkeit.</li>
<li><strong>App-Icon:</strong> Nach mehreren KI-Versuchen &mdash; die alle nicht schön genug waren &mdash; haben wir das K-Icon selbst entworfen und final gesetzt. Ein K aus Regal-Planken mit bunten Vorratsdosen. Simpel, erkennbar, passt zur App.</li>
<li><strong>Onboarding:</strong> Drei Screens beim ersten Start erkl&auml;ren worum es geht. Kleine Sache, gro&szlig;er Eindruck im App Store Review.</li>
<li><strong>Xcode 26.0.1 &amp; macOS 26 SDK:</strong> Ab April 2026 verlangt Apple den neuen SDK. Wir haben gleich upgedatet &mdash; war l&auml;ngst f&auml;llig.</li>
<li><strong>Shop-Zuordnung inline:</strong> Affiliate-Partner k&ouml;nnen jetzt direkt beim Bearbeiten einer Kategorie oder Produktgruppe zugewiesen werden. Kein separater Einstellungs-Punkt mehr.</li>
<li><strong>Upload-Limit wieder erreicht:</strong> Zu viele Builds in kurzer Zeit &mdash; Apple sperrt f&uuml;r 24 Stunden. Lektion gelernt: Commits b&uuml;ndeln.</li>
</ul>

<h3>Das pers&ouml;nliche Fazit</h3>
<p>Heute habe ich bewusst klarer kommuniziert. Weniger &ldquo;mach irgendwas mit den Warnungen&rdquo;, mehr &ldquo;genau dieser Screen, genau diese Logik, genau diese Reihenfolge&rdquo;. Der Unterschied war sp&uuml;rbar: Weniger Korrekturrunden, sauberere Ergebnisse.</p>
<p>Das ist die eigentliche Lernkurve beim KI-Coding: nicht Programmieren lernen &mdash; sondern <strong>pr&auml;zise Anweisungen geben</strong> lernen. Und das wird jeden Tag ein bisschen besser.</p>`,
            en: `<p>Day 4 was shorter &mdash; but more intense than the numbers suggest.</p>
<p>Only around &euro;30 in AI costs today. But what we built completely changes how the app feels to use. Lots of small things &mdash; and those small things are exactly what separates &ldquo;works&rdquo; from &ldquo;feels right.&rdquo;</p>

<h3>What happened today</h3>
<ul>
<li><strong>Warnings tab fully redesigned:</strong> Swipe actions directly on the warning screen (add, remove, edit). Plus a new forecast section &mdash; with group-aware logic so no product appears twice.</li>
<li><strong>Inventory redesigned:</strong> Groups are now collapsible. Stock count shown large on the right. More breathing room, better readability.</li>
<li><strong>App icon:</strong> After several AI attempts that weren&apos;t quite right &mdash; we designed the K icon ourselves and set it as final. A K made of pantry shelves with colorful product jars. Simple, recognizable, fits the app.</li>
<li><strong>Onboarding:</strong> Three screens on first launch explain what the app does. Small thing, big impression in App Store review.</li>
<li><strong>Xcode 26.0.1 &amp; macOS 26 SDK:</strong> Apple requires the new SDK from April 2026. We updated immediately &mdash; it was long overdue.</li>
<li><strong>Shop assignment inline:</strong> Affiliate partners can now be assigned directly when editing a category or product group. No separate settings screen anymore.</li>
<li><strong>Upload limit hit again:</strong> Too many builds in quick succession &mdash; Apple locks you out for 24 hours. Lesson learned: batch your commits.</li>
</ul>

<h3>Personal takeaway</h3>
<p>Today I communicated more precisely. Less &ldquo;do something with the warnings&rdquo;, more &ldquo;exactly this screen, exactly this logic, exactly this order.&rdquo; The difference was noticeable: fewer correction rounds, cleaner results.</p>
<p>That&apos;s the real learning curve in AI coding: not learning to program &mdash; but learning to <strong>give precise instructions</strong>. And that gets a little better every day.</p>`
        },
        stats: {
            features: 7,
            commits: 18,
            issues: 0,
            cost: "~30&euro;",
            time: "~1.5h",
            messages: "~30"
        },
        tags: ["Design", "UX", "Icon", "Onboarding", "Day 4"]
    },
    {
        day: 3,
        date: "2026-03-02",
        title: { de: "Bugs, Limits und Lernen", en: "Bugs, Limits and Lessons" },
        body: {
            de: `<p>Tag 3 war ern&uuml;chternd &mdash; aber genau das war wertvoll.</p>
<p>Nach der Euphorie von Tag 2 kam heute die Realit&auml;t. Die KI hat gestern w&auml;hrend dem Code-Review Probleme gefunden, die sie selbst eingebaut hatte. Heute wurden sie gefixt. Das ist das Paradoxon des KI-Codings: Dieselbe Intelligenz, die den Bug baut, l&ouml;st ihn auch wieder.</p>

<h3>Was heute passiert ist</h3>
<ul>
<li><strong>Kostenoptimierung:</strong> Wir haben auf Sonnet f&uuml;r den normalen Chat umgestellt. Opus nur noch f&uuml;r Coding-Aufgaben. Tag-3-Kosten: ~100&euro;. Ziel: unter 50&euro;/Tag.</li>
<li><strong>Security-Fixes aus Review:</strong> Hardcoded API Keys wurden zu sicheren Variablen. Supabase-URL und Anon Key jetzt richtig in Config.swift und Keychain gespeichert.</li>
<li><strong>Build-Pipeline geblockt:</strong> Gestern wurde TestFlight zu oft getriggert. Apple sperrt f&uuml;r 24 Stunden. Lektion: Build-Trigger sparsamer einsetzen.</li>
<li><strong>Amazon Barcode-Suche:</strong> Versucht, EAN-Barcodes direkt in Amazon-Affiliate-Links umzuwandeln. Ergebnis: Leere Suchergebnisse. R&uuml;ckzug auf Produktnamenssuche &mdash; funktioniert zuverl&auml;ssig.</li>
<li><strong>Packungsgr&ouml;&szlig;e gesperrt:</strong> Nach dem Erstellen eines Produkts kann die Packungsgr&ouml;&szlig;e nicht mehr ge&auml;ndert werden. Logisch &mdash; sonst stimmt der Verlauf nicht mehr.</li>
<li><strong>Swipe-Aktionen:</strong> Plus und Minus per Swipe im Lagerbestand. Funktioniert &mdash; mit einem kleinen Bug den wir noch jagen.</li>
<li><strong>kellr.app live:</strong> Die Homepage ist &ouml;ffentlich. Mit Building-in-Public-Journal, Impressum und Datenschutz.</li>
<li><strong>E-Mail-Infrastruktur:</strong> Resend f&uuml;r noreply@kellr.app (Passwort-Reset, Einladungen). Office-365-Postfach f&uuml;r contact@kellr.app.</li>
<li><strong>Dokumentation:</strong> Prognose-Logik und CI/CD-Ablauf intern dokumentiert. Damit die KI beim n&auml;chsten Mal wei&szlig; was gilt.</li>
</ul>

<h3>Das pers&ouml;nliche Fazit</h3>
<p>KI-Coding ist kein Selbstl&auml;ufer. Das merkt man sp&auml;testens wenn man sieht, dass ein simpler Stock-Swipe nicht vollst&auml;ndig synchronisiert &mdash; weil die KI beim Bauen die Nebenbedingungen nicht mitgedacht hat.</p>
<p>Der Punkt ist: Man muss <strong>sehr genau wissen, was man will</strong>. Nicht nur das Feature, sondern alle Abh&auml;ngigkeiten. Wenn ich sage &quot;f&uuml;ge Stock hinzu&quot;, muss ich gleichzeitig sagen: &quot;und sync die UI, und update die DB, und zeig mir ein Feedback&quot;. Das geht nicht automatisch.</p>
<p>Klingt frustrierend? Ist es manchmal. Aber ich schreibe immer noch keinen eigenen Code. Und morgen debuggen wir weiter.</p>`,
            en: `<p>Day 3 was humbling &mdash; and that was exactly what made it valuable.</p>
<p>After the euphoria of Day 2, reality set in. The AI found issues during yesterday&apos;s code review that it had built itself. Today we fixed them. That&apos;s the paradox of AI coding: the same intelligence that introduces a bug also resolves it.</p>

<h3>What happened today</h3>
<ul>
<li><strong>Cost optimization:</strong> Switched to Sonnet for normal chat. Opus only for coding tasks now. Day 3 cost: ~&euro;100. Target: under &euro;50/day.</li>
<li><strong>Security fixes from review:</strong> Hardcoded API keys replaced with secure variables. Supabase URL and Anon Key now properly stored in Config.swift and Keychain.</li>
<li><strong>Build pipeline blocked:</strong> TestFlight was triggered too many times yesterday. Apple locks you out for 24 hours. Lesson: use build triggers sparingly.</li>
<li><strong>Amazon barcode search:</strong> Tried converting EAN barcodes directly into Amazon affiliate links. Result: empty search results. Reverted to product name search &mdash; works reliably.</li>
<li><strong>Pack size locked:</strong> After creating a product, pack size can no longer be changed. Makes sense &mdash; otherwise the transaction history doesn&apos;t add up.</li>
<li><strong>Swipe actions:</strong> Plus and minus via swipe in the inventory view. Works &mdash; with a small bug we&apos;re still chasing.</li>
<li><strong>kellr.app live:</strong> The homepage is public. With building-in-public journal, legal notice and privacy policy.</li>
<li><strong>Email infrastructure:</strong> Resend for noreply@kellr.app (password reset, invitations). Office 365 mailbox for contact@kellr.app.</li>
<li><strong>Documentation:</strong> Forecast logic and CI/CD process documented internally. So the AI knows the rules next time.</li>
</ul>

<h3>Personal takeaway</h3>
<p>AI coding is not on autopilot. You realize that when a simple stock swipe doesn&apos;t fully sync &mdash; because the AI didn&apos;t think through the side effects while building it.</p>
<p>The key insight: you need to <strong>know exactly what you want</strong>. Not just the feature, but all its dependencies. When I say &quot;add stock&quot;, I also need to say: &quot;and sync the UI, and update the DB, and show me feedback.&quot; That doesn&apos;t happen automatically.</p>
<p>Sounds frustrating? Sometimes it is. But I&apos;m still not writing my own code. And tomorrow we debug on.</p>`
        },
        stats: {
            features: 6,
            commits: 15,
            issues: 0,
            cost: "~100&euro;",
            time: "~2h",
            messages: "~40"
        },
        tags: ["Fixes", "CI/CD", "Homepage", "Learnings", "Day 3"]
    },
    {
        day: 2,
        date: "2026-03-01",
        title: { de: "Der erste Build-Tag", en: "First Build Day" },
        body: {
            de: `<p>Der Wahnsinn. Ein Tag, eine App. 24 Features in rund 6 Stunden &mdash; gesteuert komplett &uuml;ber WhatsApp-Sprachnachrichten vom Handy.</p>
<p>Was heute passiert ist:</p>
<ul>
<li>45 Commits pushed</li>
<li>20 GitHub Issues erstellt und bearbeitet</li>
<li>3 Security-Fixes (ja, die KI hat auch Sicherheitsl&uuml;cken gebaut)</li>
<li>5 fehlgeschlagene Builds (Xcode war nicht immer einverstanden)</li>
<li>~50 WhatsApp-Nachrichten an OpenClaw</li>
</ul>
<p>Meine eigene Zeit? Ungef&auml;hr 2 Stunden. Den Rest hat Claude gemacht. Ich hab gesagt was ich will, die KI hat es gebaut. Manchmal musste ich nachjustieren, manchmal lief es auf Anhieb.</p>
<p>Was nicht lief: Build-Fehler wegen fehlender Imports, ein paar Race Conditions, und einmal hat die KI ein Feature komplett missverstanden. Aber: Alles fixbar &uuml;ber eine kurze Sprachnachricht.</p>`,
            en: `<p>Insane. One day, one app. 24 features in about 6 hours &mdash; controlled entirely via WhatsApp voice messages from my phone.</p>
<p>What happened today:</p>
<ul>
<li>45 commits pushed</li>
<li>20 GitHub issues created and resolved</li>
<li>3 security fixes (yes, the AI built security holes too)</li>
<li>5 failed builds (Xcode wasn&apos;t always on board)</li>
<li>~50 WhatsApp messages to OpenClaw</li>
</ul>
<p>My own time? About 2 hours. Claude did the rest. I said what I wanted, the AI built it. Sometimes I had to adjust, sometimes it worked first try.</p>
<p>What didn&apos;t work: Build errors from missing imports, a few race conditions, and once the AI completely misunderstood a feature. But: All fixable with a quick voice message.</p>`
        },
        stats: {
            features: 24,
            commits: 45,
            issues: 20,
            cost: "~200&euro;",
            time: "~2h",
            messages: "~50"
        },
        tags: ["SwiftUI", "Supabase", "OpenClaw", "Day 1 Build"]
    },
    {
        day: 1,
        date: "2026-02-28",
        title: { de: "Die Idee", en: "The Idea" },
        body: {
            de: `<p>Es ist Wochenende. Der kleine Sohn ist krank, wir liegen auf der Couch. Und ich denke: Jeder redet &uuml;ber KI. Alle sagen &quot;KI kann programmieren&quot;. Aber kann sie es wirklich?</p>
<p>Ich komme aus der Microsoft-Welt. PowerShell, Azure, Automatisierung &mdash; das ist meine Komfortzone. Ich verstehe wie Programmierung funktioniert, aber iOS? SwiftUI? Xcode? Noch nie ber&uuml;hrt.</p>
<p>Also mache ich ein Experiment: Ich baue eine komplette iOS App, ohne selbst eine Zeile Code zu schreiben. Alles &uuml;ber Sprache. WhatsApp-Nachrichten an OpenClaw, das dann Claude Opus steuert.</p>
<p>Die App-Idee: <strong>Kellr</strong> &mdash; ein Vorratskammer-Tracker. Simpel genug um realistisch zu sein, komplex genug um KI herauszufordern.</p>
<p>Kein Tutorial. Keine Vorbereitung. Einfach loslegen und schauen was passiert. Building in Public.</p>`,
            en: `<p>It&apos;s the weekend. My little son is sick, we&apos;re lying on the couch. And I think: Everyone talks about AI. Everyone says &quot;AI can code.&quot; But can it really?</p>
<p>I come from the Microsoft world. PowerShell, Azure, automation &mdash; that&apos;s my comfort zone. I understand how programming works, but iOS? SwiftUI? Xcode? Never touched it.</p>
<p>So I&apos;m running an experiment: Building a complete iOS app without writing a single line of code myself. All through voice. WhatsApp messages to OpenClaw, which controls Claude Opus.</p>
<p>The app idea: <strong>Kellr</strong> &mdash; a pantry tracker. Simple enough to be realistic, complex enough to challenge AI.</p>
<p>No tutorial. No preparation. Just start and see what happens. Building in public.</p>`
        },
        stats: {
            features: 0,
            commits: 0,
            issues: 0,
            cost: "0&euro;",
            time: "~1h",
            messages: "Planung"
        },
        tags: ["Konzept", "Planung"]
    }
];

const STATS = {
    totalDays: 6,
    totalFeatures: 45,
    totalCommits: 90,
    totalIssues: 20,
    totalCost: "~420&euro;",
    totalTime: "~9.5h",
    totalMessages: "~215",
    failedBuilds: 18,
    securityFixes: 3
};
