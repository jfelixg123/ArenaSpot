const { Router } = require('express');

const router = Router();

const usuarios = [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
]

router.get('/', (req, res) => {
  res.json({ 
    message: 'ok', 
    data: usuarios  
    });
  
});

router.get('/2', (req, res) => {
  res.json({ message: 'ok users 2' });
});

module.exports = router;