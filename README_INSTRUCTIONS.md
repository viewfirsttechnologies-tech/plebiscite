# Proposed SOCOTECO II Plebiscite Voting System

## Deployment & Local Drive Configuration Guide

Follow these steps to deploy the **Proposed SOCOTECO II Plebiscite Voting System** on your local network (LAN) and lock the secured database file directly onto a specific designated drive.

---

### Step 1: Install Prerequisites
Make sure **Node.js** is installed on the host computer acting as the local server. You can download it from [nodejs.org](https://nodejs.org/).

### Step 2: Set Up the Project Folder on Your Target Drive
1. Copy the entire `socoteco_plebiscite` folder onto your target storage partition or drive (e.g., `D:\PlebisciteData\socoteco_plebiscite` on Windows or `/mnt/sec-drive/socoteco_plebiscite` on Linux).
2. Open your terminal or command prompt inside that folder.

### Step 3: Install Dependencies
Run the following command to install the required lightweight server framework (`express`):
```bash
npm install
```

### Step 4: Configure Data Drive Paths (Optional)
If you want the database to write to a completely separate drive partition away from the application code, open `server.js` and modify `TARGET_DIR`:
```javascript
const TARGET_DIR = 'D:/YourCustomDrivePath/secure_storage';
```

### Step 5: Start the Server
Start the local application server by running:
```bash
npm start
```
You will see output confirming:
- The server port (`3000`)
- The explicit file path where the secure blockchain ledger is written.

### Step 6: Accessing from the Local Network (LAN)
1. Find the **Local IPv4 Address** of the host computer (e.g., `192.168.1.50`).
2. Any voting terminal, tablet, or PC connected to the same local router can open a web browser and navigate to:
   `http://192.168.1.50:3000`
