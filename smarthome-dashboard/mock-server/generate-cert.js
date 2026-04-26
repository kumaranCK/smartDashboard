const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');

// Generate self-signed certificate
exec('openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"', (error, stdout, stderr) => {
  if (error) {
    console.error('Error generating certificate:', error);
    return;
  }
  console.log('Self-signed certificates generated successfully!');
});