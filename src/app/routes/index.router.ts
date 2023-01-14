import express from 'express';
const router = express.Router();

router.get('/', function (req, res) {
  res.json({ success: true, message: 'Hello World!' });
});

export default router;
