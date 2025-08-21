const express = require('express');
const router = express.Router();
const { cariKodePos } = require('../services/kodepos');
const path = require('path');

// Halaman utama
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API endpoint untuk pencarian
router.post('/search', async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.json({
                success: false,
                error: 'Query pencarian tidak boleh kosong'
            });
        }

        const results = await cariKodePos(query);

        res.json({
            success: true,
            results: results
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
