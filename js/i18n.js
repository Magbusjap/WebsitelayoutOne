
export async function loadLocale(lang) {
    const res = await fetch(`/locales/${lang}.json`);
    return await res.json();
}

export async function applyTranslations(lang, selector = '[data-i18n]') {
const dict = await loadLocale(lang);
document.querySelectorAll(selector).forEach(el => {
    const key = el.dataset.i18n;
    const txt = dict[key] || '';
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    el.placeholder = txt;
    } else {
    el.textContent = txt;
    }
});
}
