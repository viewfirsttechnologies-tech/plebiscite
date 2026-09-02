# Public Notice & Transparency Explanation

### Notice of Plebiscite on the Conditional Joint Venture Agreement Between SOCOTECO II & Ignite Power

---

## What is This System?
This digital plebiscite application is engineered using cryptographic **blockchain technology** to guarantee that every vote cast by Member-Consumer-Owners (MCOs) regarding the Conditional Joint Venture Agreement is permanently recorded, fully auditable, and mathematically protected against tampering.

## Core Pillars of Transparency

### 1. Cryptographic Immutability (The Chain)
Unlike traditional databases where historical records can be silently edited behind the scenes by administrators, this system uses **SHA-256 cryptographic hashing**. 
- Every single vote forms a "block".
- Each block contains a unique mathematical signature derived from its data, timestamp, voter identity, choice, and the cryptographic hash of the *preceding* block.
- If anyone attempts to manually modify even a single character in past voting logs on the storage drive, the cryptographic chain instantly breaks. The dashboard triggers a **Critical Integrity Alert**, notifying election overseers immediately.

### 2. Universal Alias Protection & Whitelisting
To prevent identity spoofing and duplicate voting:
- Votes are strictly validated against an official **MCO Registry Whitelist** (`mco_registry.json`).
- The system features **flexible token-matching algorithms**. Whether a member enters their official ID (e.g., `00013`), their exact name (`JAMES REED`), or a reversed word format (`Reed James`), the system accurately resolves it to their unique profile.
- Once an MCO ID successfully casts a ballot, the system permanently locks that ID out from voting a second time, completely neutralizing double-voting attempts regardless of formatting variations.

### 3. Real-Time Public Verification
Every participant and observer has complete visibility into the live ledger via the **Blockchain Ledger Inspector**:
- **Timestamps:** Every vote is marked with an unalterable exact timestamp.
- **Hash Tracking:** Both previous hashes and current cryptographic hashes are displayed transparently on-screen.
- **Instant Tallying:** Results update in real-time as votes are securely registered onto the locked local storage drive.

---
*SOCOTECO II MCO Plebiscite Committee — Committed to Absolute Transparency, Accountability, and Secure Democracy.*