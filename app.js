// === KELLR BLOG APP ===
let currentLang = 'de';

function toggleLang() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    document.documentElement.setAttribute('data-lang', currentLang);
    document.querySelectorAll('.lang-flag').forEach(el => {
        el.textContent = currentLang === 'de' ? '🇬🇧' : '🇩🇪';
    });
    document.querySelectorAll('[data-de]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
    renderJournal();
    renderStats();
}

function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

function renderJournal() {
    const container = document.getElementById('journal-entries');
    container.innerHTML = JOURNAL.map(entry => {
        const title = entry.title[currentLang];
        const body = entry.body[currentLang];
        const statsLabels = {
            de: { features: 'Features', commits: 'Commits', issues: 'Issues', cost: 'KI-Kosten', time: 'Eigene Zeit', messages: 'Nachrichten' },
            en: { features: 'Features', commits: 'Commits', issues: 'Issues', cost: 'AI Cost', time: 'Own Time', messages: 'Messages' }
        };
        const labels = statsLabels[currentLang];
        return `
        <article class="journal-entry">
            <div class="journal-header">
                <span class="journal-day">${currentLang === 'de' ? 'Tag' : 'Day'} ${entry.day} — ${title}</span>
                <span class="journal-date">${entry.date}</span>
            </div>
            <div class="journal-body">${body}</div>
            <div class="journal-stats">
                <div class="journal-stat"><div class="journal-stat-val">${entry.stats.features}</div><div class="journal-stat-label">${labels.features}</div></div>
                <div class="journal-stat"><div class="journal-stat-val">${entry.stats.commits}</div><div class="journal-stat-label">${labels.commits}</div></div>
                <div class="journal-stat"><div class="journal-stat-val">${entry.stats.cost}</div><div class="journal-stat-label">${labels.cost}</div></div>
                <div class="journal-stat"><div class="journal-stat-val">${entry.stats.time}</div><div class="journal-stat-label">${labels.time}</div></div>
            </div>
            <div class="journal-tags">${entry.tags.map(t => `<span class="journal-tag">${t}</span>`).join('')}</div>
        </article>`;
    }).join('');
}

function renderStats() {
    const labels = {
        de: { totalDays: 'Tage', totalFeatures: 'Features', totalCommits: 'Commits', totalCost: 'KI-Kosten', totalTime: 'Eigene Zeit', totalMessages: 'Nachrichten', failedBuilds: 'Failed Builds', securityFixes: 'Security Fixes' },
        en: { totalDays: 'Days', totalFeatures: 'Features', totalCommits: 'Commits', totalCost: 'AI Cost', totalTime: 'Own Time', totalMessages: 'Messages', failedBuilds: 'Failed Builds', securityFixes: 'Security Fixes' }
    };
    const l = labels[currentLang];
    const container = document.getElementById('stats-grid');
    container.innerHTML = Object.entries(STATS).map(([key, val]) => `
        <div class="stat-card">
            <div class="stat-val">${val}</div>
            <div class="stat-label">${l[key] || key}</div>
        </div>
    `).join('');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderJournal();
    renderStats();
});
