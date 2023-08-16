const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/liqpay-callback', (req, res) => {
  // Отримання даних з LiqPay
  const { data, signature } = req.body;

  // Ваш публічний ключ і приватний ключ з LiqPay
  const publicKey = 'sandbox_i54441337826';
  const privateKey = 'sandbox_LMwbu92lTGwpt5dUEgTC0SqaQyaWVebb5125YaK2';

  // Перевірка підпису
  const crypto = require('crypto');
  const signString = privateKey + data + privateKey;
  const expectedSignature = crypto.createHash('sha1').update(signString).digest('base64');

  if (expectedSignature === signature) {
    // Підпис вірний - оплата успішна
    console.log('Payment successful');
    res.send(data)
    res.sendStatus(200);
  } else {
    // Підпис невірний - оплата неуспішна
    console.log('Payment failed');
    
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
