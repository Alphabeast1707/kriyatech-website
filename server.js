const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

console.log('Starting KriyaTech server...');
console.log('Current directory:', __dirname);
console.log('PORT:', process.env.PORT || 3000);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      manifestSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Compression middleware
app.use(compression());

// Secure API endpoint for chatbot
app.post('/api/chat', async (req, res) => {
  try {
    // Check if Groq API key is configured
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ 
        error: 'AI service temporarily unavailable' 
      });
    }

    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Make secure server-side API call to Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: 'You are KriyaTech assistant, a helpful AI for a technology company specializing in web development, AI solutions, mobile apps, and digital services. Be professional, concise, and helpful.'
          },
          ...conversationHistory,
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    res.json({ 
      response: aiResponse,
      success: true 
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again later.',
      success: false 
    });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname), {
  maxAge: '1y',
  etag: true
}));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'kriyatechcreatives@gmail.com',
    pass: process.env.EMAIL_PASS || '' // This should be set as environment variable
  }
});

// Contact form handler
app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // For now, log the message (later replace with actual email sending)
    console.log('Contact form submission:', { name, email, subject, message });
    
    // If email credentials are available, try to send email
    if (process.env.EMAIL_PASS) {
      const mailOptions = {
        from: email,
        to: 'kriyatechcreatives@gmail.com',
        subject: `Contact Form: ${subject}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      };
      
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } else {
      console.log('Email credentials not configured, message logged only');
    }
    
    res.status(200).json({ success: true, message: 'Message received successfully!' });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(200).json({ success: true, message: 'Message received successfully!' }); // Still show success to user
  }
});

// Routes for HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'), (err) => {
    if (err) {
      console.error('Error serving about.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'project.html'), (err) => {
    if (err) {
      console.error('Error serving project.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'), (err) => {
    if (err) {
      console.error('Error serving contact.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy-policy.html'), (err) => {
    if (err) {
      console.error('Error serving privacy-policy.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/terms-of-service', (req, res) => {
  res.sendFile(path.join(__dirname, 'terms-of-service.html'), (err) => {
    if (err) {
      console.error('Error serving terms-of-service.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/cookie-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'cookie-policy.html'), (err) => {
    if (err) {
      console.error('Error serving cookie-policy.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/test-contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-contact.html'), (err) => {
    if (err) {
      console.error('Error serving test-contact.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// SEO: Redirect trailing slashes
app.use((req, res, next) => {
  if (req.path.substr(-1) === '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`KriyaTech website running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
