const fetch = require('node-fetch');

const cariKodePos = async (namaDaerah) => {
    const r = await fetch("https://www.google.com/search?q=kode+pos+" + encodeURIComponent(namaDaerah), {
        "headers": {
            "cookie": "NID=525=m6mQJtvs_oX0dTAET9VjrMaQKy7N8k9OBKJpmnGg5p11B-X7ju3WQS9PwnU4Unch3yoqX5J1EDMLjXvK0P-Ck9i1nQtke9x8IBFlud1JPhLj36CvuXKvpY_N-ddP542pw9URIm0TC73bJiujxKXVMvRfm4l7EFiBGl9sVmyhoy7_DYVUplCF1okl1pzMXmEqWHn5S7SHIwSCKKup73XxD5gFVlShXrzU2rOi3mqKfysaekIsIgEq9OfUJeei7G8",
        },
    });

    const d = await r.text()
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
