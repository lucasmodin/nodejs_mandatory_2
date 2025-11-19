import { Router } from 'express';
import { isUser, isAdmin } from '../middleware/accessControl.js';

const router = Router();

router.get("/status", isUser, (req, res) => {
    res.send({
        data: {
            status: "OPERATIONAL",
            machineSpirit: "CALM",
            message: "Machine Spirit hums in approval"
        }
    });
});

router.get("/logs", isUser, (req, res) => {
    res.send({
        data: {
            logs: [
                "Authentication cogitators synced.",
                "No heretical code fragments detected"
            ]
        }
    });
});

router.get("/classified-archives", isAdmin, (req, res) => {
    res.send({
        data: {
            archiveLevel: "ALPHA-PRIME",
            content: "+++ CLASSIFIED +++ Forbidden STC fragments detected"
        }
    });
});

router.get("/vaults", isAdmin, (req, res) => {
    res.send({
        data: {
            vaults: [
                "Data-Vault Sigma-7: Secure",
                "Reliquary Vault Omicron-3: Under seal"
            ]
        }
    });
});

export default router;