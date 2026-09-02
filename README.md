# Proposed SOCOTECO II Plebiscite Voting System

A local Node.js and Express application for conducting and reviewing a proposed SOCOTECO II plebiscite. The application validates a voter against an MCO registry, records one ballot per MCO ID, and displays a hash-linked ledger and tally.

## Features

- MCO ID and name matching against an administrator-provisioned registry
- Duplicate-vote prevention per MCO ID
- SHA-256 hash-linked vote ledger with integrity checking
- Live tally and ledger inspector
- Local-network deployment support

## Run locally

Prerequisite: Node.js 18 or later.

```bash
npm install
npm start
```

Open `http://localhost:3000` in a browser. To make the application available on a local network, use the host computer's local IPv4 address with port `3000`.

## Secure data setup

The application expects its registry and vote ledger in `secure_storage/` by default. This directory is intentionally excluded from Git because it can contain personal data and live voting records.

Before operating the application, an authorized administrator must provision the following files on the secured storage location:

- `mco_registry.json` — the approved MCO registry
- `blockchain.json` — the vote ledger; the application creates a genesis block when this file is absent

The storage location can be changed with `TARGET_DIR` in `server.js`.

## Important operational note

This repository is a software project, not an independently audited election platform. Do not use it for a binding election or plebiscite without an appropriate security assessment, legal review, access controls, operational procedures, backups, and independent oversight.

Do not commit voter registries, vote ledgers, passwords, credentials, or other personal information to GitHub.

## Documentation

- [Deployment instructions](README_INSTRUCTIONS.md)
- [Public transparency overview](PUBLIC_TRANSPARENCY.md)
- [Security reporting policy](SECURITY.md)

## License

No license has been selected for this repository. Add an approved license before distributing or reusing the code outside the intended project scope.
