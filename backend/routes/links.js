import express from 'express';
import { createLink, listLinks, getLinkStats, deleteLink } from '../controllers/linkController.js';

const router = express.Router();

router.post('/', createLink);
router.get('/', listLinks);        // ✅ List all links for dashboard
router.get('/:code', getLinkStats);
router.delete('/:code', deleteLink);

export default router;
