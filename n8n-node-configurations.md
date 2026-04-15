# n8n Node Configurations

## 1. Webhook Node Configuration
- **HTTP Method**: POST
- **Path**: d91a2aaf-c1c5-42d7-a0a5-b21a63c3099e (already set)
- **Response Mode**: Respond When Last Node Finishes

## 2. Code-validation Node

Replace the default code with this validation logic:

```javascript
// Validation for contact form submission
const items = $input.all();
const validatedItems = [];

for (const item of items) {
  const body = item.json.body || item.json;
  
  // Initialize validation results
  const validation = {
    isValid: true,
    errors: [],
    data: body
  };
  
  // Check required fields
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    validation.isValid = false;
    validation.errors.push('Name is required');
  }
  
  if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
    validation.isValid = false;
    validation.errors.push('Email is required');
  } else {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim())) {
      validation.isValid = false;
      validation.errors.push('Invalid email format');
    }
  }
  
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
    validation.isValid = false;
    validation.errors.push('Message is required');
  }
  
  // Check message length (prevent spam)
  if (body.message && body.message.length > 5000) {
    validation.isValid = false;
    validation.errors.push('Message too long (max 5000 characters)');
  }
  
  // Sanitize data
  if (validation.isValid) {
    validation.sanitizedData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
      ip: item.json.headers['x-forwarded-for'] || 
          item.json.headers['x-real-ip'] || 
          item.json.headers['cf-connecting-ip'] || 
          'unknown'
    };
  }
  
  // Add validation results to item
  item.json.validation = validation;
  
  // Only pass valid items to next node
  if (validation.isValid) {
    item.json.formData = validation.sanitizedData;
    validatedItems.push(item);
  } else {
    // For invalid data, we'll handle this in error response
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }
}

return validatedItems;
```

## 3. Code-rate limiting Node

Replace the default code with this rate limiting logic:

```javascript
// Simple rate limiting implementation
const items = $input.all();
const processedItems = [];

for (const item of items) {
  const formData = item.json.formData;
  const currentTime = Date.now();
  const timeWindow = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3; // Max 3 requests per IP per 15 minutes
  
  // In a production environment, you'd store this in a database
  // For now, we'll implement basic checks and logging
  
  const rateLimitInfo = {
    ip: formData.ip,
    timestamp: currentTime,
    timeWindow: timeWindow,
    maxRequests: maxRequests
  };
  
  // Log the submission attempt
  console.log(`Contact form submission from IP: ${formData.ip} at ${new Date(currentTime).toISOString()}`);
  
  // Basic spam detection
  const suspiciousPatterns = [
    /viagra|cialis|pharmacy/i,
    /\$\$\$|\$\d+/g,
    /click here|visit now/i,
    /free money|make money fast/i
  ];
  
  const isSpam = suspiciousPatterns.some(pattern => 
    pattern.test(formData.message) || pattern.test(formData.name)
  );
  
  if (isSpam) {
    console.log(`Potential spam detected from IP: ${formData.ip}`);
    throw new Error('Message appears to be spam');
  }
  
  // Add rate limit info to the item
  item.json.rateLimitInfo = rateLimitInfo;
  item.json.isValidSubmission = true;
  
  processedItems.push(item);
}

return processedItems;
```

## 4. Send Email Node Configuration

Configure these settings in the Send Email node:

### **Connection**
- **SMTP Host**: Your email provider's SMTP server
- **SMTP Port**: 587 (TLS) or 465 (SSL)
- **Security**: TLS
- **Username**: Your email address
- **Password**: Your email password or app password

### **Email Content**
- **From Email**: contact@end2endstartup.com
- **To Email**: contact@end2endstartup.com
- **Subject**: `New Contact Form Submission - {{ $json.formData.name }}`
- **Email Type**: HTML
- **Reply To**: `{{ $json.formData.email }}`

### **Email Body** (HTML):
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #7c77c6; border-bottom: 2px solid #7c77c6; padding-bottom: 10px;">
    New Contact Form Submission
  </h2>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Name:</strong> {{ $json.formData.name }}</p>
    <p><strong>Email:</strong> {{ $json.formData.email }}</p>
    <p><strong>Submitted:</strong> {{ $json.formData.timestamp }}</p>
    <p><strong>IP Address:</strong> {{ $json.formData.ip }}</p>
  </div>
  
  <div style="margin: 20px 0;">
    <h3>Message:</h3>
    <div style="background: #ffffff; padding: 15px; border-left: 4px solid #7c77c6; border-radius: 4px;">
      {{ $json.formData.message }}
    </div>
  </div>
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
  
  <p style="color: #6c757d; font-size: 14px;">
    <em>This email was sent from the End2End Startup contact form.<br>
    Reply directly to this email to respond to the inquiry.</em>
  </p>
</div>
```

## 5. Respond to Webhook Node Configuration

### **Response**
- **Respond With**: JSON
- **Response Code**: 200

### **Response Body**:
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
  "timestamp": "{{ $json.formData.timestamp }}"
}
```

### **Response Headers**:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
Content-Type: application/json
```

## Error Handling Setup

Add error handling by creating an "On Error" workflow:

1. **Add Error Trigger**: Connect to all nodes
2. **Add Respond to Webhook**: For error responses

### Error Response Configuration:
- **Response Code**: 400
- **Response Body**:
```json
{
  "success": false,
  "message": "{{ $json.error.message || 'An error occurred while processing your request' }}",
  "timestamp": "{{ new Date().toISOString() }}"
}
```
