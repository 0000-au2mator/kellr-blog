// === KELLR BLOG DATA ===
// Edit this file to add new journal entries and update stats.

const JOURNAL = [
    {
        day: 2,
        date: "2026-03-01",
        title: { de: "Der erste Build-Tag", en: "First Build Day" },
        body: {
            de: `<p>Der Wahnsinn. Ein Tag, eine App. 24 Features in rund 6 Stunden — gesteuert komplett über WhatsApp-Sprachnachrichten vom Handy.</p>
<p>Was heute passiert ist:</p>
<ul>
<li>45 Commits pushed</li>
<li>20 GitHub Issues erstellt und bearbeitet</li>
<li>3 Security-Fixes (ja, die KI hat auch Sicherheitslücken gebaut)</li>
<li>5 fehlgeschlagene Builds (Xcode war nicht immer einverstanden)</li>
<li>~50 WhatsApp-Nachrichten an OpenClaw</li>
</ul>
<p>Meine eigene Zeit? Ungefähr 2 Stunden. Den Rest hat Claude gemacht. Ich hab gesagt was ich will, die KI hat es gebaut. Manchmal musste ich nachjustieren, manchmal lief es auf Anhieb.</p>
<p>Was nicht lief: Build-Fehler wegen fehlender Imports, ein paar Race Conditions, und einmal hat die KI ein Feature komplett missverstanden. Aber: Alles fixbar über eine kurze Sprachnachricht.</p>`,
            en: `<p>Insane. One day, one app. 24 features in about 6 hours — controlled entirely via WhatsApp voice messages from my phone.</p>
<p>What happened today:</p>
<ul>
<li>45 commits pushed</li>
<li>20 GitHub issues created and resolved</li>
<li>3 security fixes (yes, the AI built security holes too)</li>
<li>5 failed builds (Xcode wasn't always on board)</li>
<li>~50 WhatsApp messages to OpenClaw</li>
</ul>
<p>My own time? About 2 hours. Claude did the rest. I said what I wanted, the AI built it. Sometimes I had to adjust, sometimes it worked first try.</p>
<p>What didn't work: Build errors from missing imports, a few race conditions, and once the AI completely misunderstood a feature. But: All fixable with a quick voice message.</p>`
        },
        stats: {
            features: 24,
            commits: 45,
            issues: 20,
            cost: "~200€",
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
            de: `<p>Es ist Wochenende. Der kleine Sohn ist krank, wir liegen auf der Couch. Und ich denke: Jeder redet über KI. Alle sagen "KI kann programmieren". Aber kann sie es wirklich?</p>
<p>Ich komme aus der Microsoft-Welt. PowerShell, Azure, Automatisierung — das ist meine Komfortzone. Ich verstehe wie Programmierung funktioniert, aber iOS? SwiftUI? Xcode? Noch nie angerührt.</p>
<p>Also mache ich ein Experiment: Ich baue eine komplette iOS App, ohne selbst eine Zeile Code zu schreiben. Alles über Sprache. WhatsApp-Nachrichten an OpenClaw, das dann Claude Opus steuert.</p>
<p>Die App-Idee: <strong>Kellr</strong> — ein Vorratskammer-Tracker. Simpel genug um realistisch zu sein, komplex genug um KI herauszufordern.</p>
<p>Kein Tutorial. Keine Vorbereitung. Einfach loslegen und schauen was passiert. Building in Public.</p>`,
            en: `<p>It's the weekend. My little son is sick, we're lying on the couch. And I think: Everyone talks about AI. Everyone says "AI can code." But can it really?</p>
<p>I come from the Microsoft world. PowerShell, Azure, automation — that's my comfort zone. I understand how programming works, but iOS? SwiftUI? Xcode? Never touched it.</p>
<p>So I'm running an experiment: Building a complete iOS app without writing a single line of code myself. All through voice. WhatsApp messages to OpenClaw, which controls Claude Opus.</p>
<p>The app idea: <strong>Kellr</strong> — a pantry tracker. Simple enough to be realistic, complex enough to challenge AI.</p>
<p>No tutorial. No preparation. Just start and see what happens. Building in public.</p>`
        },
        stats: {
            features: 0,
            commits: 0,
            issues: 0,
            cost: "0€",
            time: "~1h",
            messages: "Planung"
        },
        tags: ["Konzept", "Planung"]
    }
];

const STATS = {
    totalDays: 2,
    totalFeatures: 24,
    totalCommits: 45,
    totalIssues: 20,
    totalCost: "~200€",
    totalTime: "~3h",
    totalMessages: "~50",
    failedBuilds: 5,
    securityFixes: 3
};
