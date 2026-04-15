# n8n Contact Form Security Setup

## 🔐 Security Features Implemented

### 1. **Server-Side Validation**

- Required field validation (name, email, message)
- Email format validation using regex
- Input sanitization and trimming
- Timestamp tracking for each submission

### 2. **CORS Protection**

- Allowed origins configured for your domain
- Restricts access to specific domains only
- Headers properly configured

### 3. **Rate Limiting (Recommended Setup)**

Add these additional security measures to your n8n workflow:

#### Rate Limiting Node (Add before email sending):

```json
{
  "parameters": {
    "functionCode": "// Simple rate limiting based on IP\nconst ip = $json.headers['x-forwarded-for'] || $json.headers['x-real-ip'] || 'unknown';\nconst now = Date.now();\nconst windowMs = 15 * 60 * 1000; // 15 minutes\nconst maxRequests = 3; // Max 3 requests per 15 minutes\n\n// This would need to be stored in a database in production\n// For now, we'll pass through but log the attempt\nconsole.log(`Contact form submission from IP: ${ip} at ${new Date(now).toISOString()}`);\n\nreturn $json;"
  },
  "name": "Rate Limiting Check",
  "type": "n8n-nodes-base.function"
}
```

### 4. **Content Security**

- HTML escaping in email template
- SQL injection protection (no direct DB queries)
- XSS prevention through input validation

### 5. **Email Security**

- Reply-to header set to user's email
- Professional email template
- No sensitive data exposure
- Spam detection ready

## 🚀 Setup Instructions

### Step 1: Install n8n

```bash
npm install -g n8n
# or
npx n8n
```

### Step 2: Import Workflow

1. Open n8n interface (usually http://localhost:5678)
2. Click "Import from File"
3. Upload the `n8n-contact-workflow.json` file
4. Configure your email settings in the "Send Email" node

### Step 3: Configure Email Provider

In the "Send Email" node, configure your SMTP settings:

- **SMTP Host**: Your email provider's SMTP server
- **SMTP Port**: Usually 587 for TLS or 465 for SSL
- **Security**: TLS recommended
- **Username/Password**: Your email credentials

### Step 4: Environment Variables

Create a `.env` file in your project root:

```
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/client-contact-form
```

### Step 5: Deploy n8n (Production)

Consider these hosting options:

- **n8n Cloud**: Managed solution (easiest)
- **DigitalOcean Droplet**: Self-hosted
- **Railway**: Simple deployment
- **Docker**: Container deployment

## 🛡️ Additional Security Recommendations

### 1. **HTTPS Only**

- Ensure n8n runs behind HTTPS in production
- Use SSL certificates (Let's Encrypt recommended)

### 2. **Firewall Rules**

- Restrict n8n access to specific IPs if possible
- Close unnecessary ports

### 3. **Monitoring**

- Set up email notifications for failed submissions
- Monitor webhook endpoint for unusual activity
- Log all submissions with timestamps

### 4. **Backup Strategy**

- Regular workflow backups
- Email delivery logs
- Database backups if using rate limiting

### 5. **Error Handling**

- Graceful error responses
- No sensitive information in error messages
- Fallback email notification system

## 🧪 Testing

### Development Testing:

```bash
# Start n8n locally
npx n8n

# Test webhook endpoint
curl -X POST http://localhost:5678/webhook/client-contact-form \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

### Production Testing:

- Test form submission from your live site
- Verify email delivery to contact@tomcohendev.com
- Check error handling with invalid data
- Test CORS restrictions

## 📝 Maintenance

### Regular Tasks:

- [ ] Monitor email delivery rates
- [ ] Review submission logs monthly
- [ ] Update n8n version quarterly
- [ ] Test backup/restore procedures
- [ ] Review security logs

### Scaling Considerations:

- Database integration for rate limiting
- Redis for session management
- Load balancing for high traffic
- CDN for webhook endpoints
