const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DEMO_MODE = process.env.DEMO_MODE === 'true';

const DEMO_REGISTRY = [
    { id: 'DEMO-001', name: 'ALEX RIVERA' },
    { id: 'DEMO-002', name: 'JAMIE SANTOS' },
    { id: 'DEMO-003', name: 'MORGAN LEE' },
    { id: 'DEMO-004', name: 'TAYLOR CRUZ' }
];
let demoChain;

// ==========================================
// TARGET DRIVE CONFIGURATION
// To lock data to a specific drive or folder, 
// modify TARGET_DIR below:
// Windows example: 'D:/PlebisciteSecureData/secure_storage'
// Linux/Server example: '/mnt/sec-drive/secure_storage'
// ==========================================
const TARGET_DIR = path.join(__dirname, 'secure_storage');
const DB_FILE = path.join(TARGET_DIR, 'blockchain.json');
const REGISTRY_FILE = path.join(TARGET_DIR, 'mco_registry.json');

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

app.use(express.json());
app.use(express.static('public'));

// Helper: SHA-256 Hash Calculation
function calculateHash(index, timestamp, mcoId, voterName, choice, prevHash) {
    const dataString = index + timestamp + mcoId + voterName + choice + prevHash;
    return crypto.createHash('sha256').update(dataString).digest('hex');
}

// Helper: Token normalization to handle "Reed James" vs "James Reed"
function normalizeAndSort(str) {
    return str.trim().toUpperCase().split(/\s+/).filter(Boolean).sort().join(' ');
}

function getBlockchain() {
    if (DEMO_MODE) {
        if (!demoChain) {
            const genesis = {
                index: 0,
                timestamp: new Date().toISOString(),
                mcoId: 'SYS',
                voterName: 'System',
                choice: 'GENESIS_BLOCK',
                prevHash: '0',
                hash: ''
            };
            genesis.hash = calculateHash(genesis.index, genesis.timestamp, genesis.mcoId, genesis.voterName, genesis.choice, genesis.prevHash);
            demoChain = [genesis];
        }
        return demoChain;
    }

    if (!fs.existsSync(DB_FILE)) {
        const genesis = {
            index: 0,
            timestamp: new Date().toISOString(),
            mcoId: "SYS",
            voterName: "System",
            choice: "GENESIS_BLOCK",
            prevHash: "0",
            hash: ""
        };
        genesis.hash = calculateHash(genesis.index, genesis.timestamp, genesis.mcoId, genesis.voterName, genesis.choice, genesis.prevHash);
        const initialChain = [genesis];
        fs.writeFileSync(DB_FILE, JSON.stringify(initialChain, null, 2));
        return initialChain;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

// API: Cast Vote with Whitelist & Token Matching
app.post('/api/vote', (req, res) => {
    const { inputQuery, choice } = req.body;
    if (!inputQuery || !choice) {
        return res.status(400).json({ error: 'Please provide your MCO ID or Name and your choice.' });
    }

    if (!DEMO_MODE && !fs.existsSync(REGISTRY_FILE)) {
        return res.status(500).json({ error: 'Registry file missing on secure storage.' });
    }

    const registry = DEMO_MODE ? DEMO_REGISTRY : JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf8'));
    const cleanInput = inputQuery.trim().toUpperCase();
    const normalizedInputTokens = normalizeAndSort(inputQuery);

    const matchedMco = registry.find(mco => {
        if (mco.id.toUpperCase() === cleanInput) return true;
        if (mco.name.toUpperCase() === cleanInput) return true;
        if (normalizeAndSort(mco.name) === normalizedInputTokens) return true;
        return false;
    });

    if (!matchedMco) {
        return res.status(403).json({ error: 'Unauthorized: MCO ID or Name not found in the official plebiscite registry.' });
    }

    const chain = getBlockchain();

    // Prevent double voting per unique MCO ID
    const alreadyVoted = chain.some(block => block.mcoId === matchedMco.id);
    if (alreadyVoted) {
        return res.status(400).json({ error: `Security Alert: MCO ID ${matchedMco.id} (${matchedMco.name}) has already cast a vote. Duplicate voting is blocked.` });
    }

    const prevBlock = chain[chain.length - 1];
    const newBlock = {
        index: prevBlock.index + 1,
        timestamp: new Date().toISOString(),
        mcoId: matchedMco.id,
        voterName: matchedMco.name,
        choice: choice,
        prevHash: prevBlock.hash,
        hash: ''
    };

    newBlock.hash = calculateHash(newBlock.index, newBlock.timestamp, newBlock.mcoId, newBlock.voterName, newBlock.choice, newBlock.prevHash);
    
    chain.push(newBlock);
    if (!DEMO_MODE) {
        fs.writeFileSync(DB_FILE, JSON.stringify(chain, null, 2));
    }

    res.json({ success: true, message: `Vote successfully recorded for ${matchedMco.name} (${matchedMco.id}).` });
});

// API: Get Blockchain Ledger & Integrity Status
app.get('/api/chain', (req, res) => {
    const chain = getBlockchain();
    let isValid = true;

    for (let i = 1; i < chain.length; i++) {
        const curr = chain[i];
        const prev = chain[i - 1];
        const recalcHash = calculateHash(curr.index, curr.timestamp, curr.mcoId, curr.voterName, curr.choice, curr.prevHash);
        if (curr.hash !== recalcHash || curr.prevHash !== prev.hash) {
            isValid = false;
            break;
        }
    }
    res.json({ chain, isValid });
});

app.get('/api/config', (req, res) => {
    res.json({ demoMode: DEMO_MODE });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`SOCOTECO II Plebiscite Server running on port ${PORT}${DEMO_MODE ? ' in DEMO MODE' : ''}`);
    if (!DEMO_MODE) console.log(`Secured Data Path: ${DB_FILE}`);
});
