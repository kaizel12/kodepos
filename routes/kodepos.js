const fetch = require('node-fetch');

const cariKodePos = async (namaDaerah) => {
    try {
        const r = await fetch("https://www.google.com/search?q=kode+pos+" + encodeURIComponent(namaDaerah), {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        });

        const d = await r.text();
        const a = d.matchAll(/<div class="j039Wc"><h3 class="zBAuLc l97dzf"><div class="ilUpNd UFvD1 aSRlid">(.+?)<\/div><\/h3>/g);
        let hm = Array.from(a).map(v => v[1]).filter(v => /\d{5}/.test(v));

        // Filter out hanifmu.com results
        hm = hm.filter(result => !result.toLowerCase().includes('hanifmu.com'));

        if (!hm?.length) throw Error(`Tidak ditemukan hasil dari pencarian kode pos ${namaDaerah}`);
        return hm;
    } catch (error) {
        throw new Error(`Error dalam pencarian: ${error.message}`);
    }
};

module.exports = { cariKodePos };
