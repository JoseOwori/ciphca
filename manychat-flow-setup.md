# ManyChat Flow Setup - Ciph Creative Agency
## Facebook Messenger & Instagram DM Automation

---

## Main Menu Setup

### Welcome Message
**Trigger:** User sends first message or clicks "Get Started"

**Message Block:**
```
👋 Welcome to Ciph Creative Agency!

We're offering FREE services to help East African businesses grow:

🎁 Choose what you need:
```

**Quick Reply Buttons:**
- 📧 Email Setup
- 📱 Social Media
- 📊 Market Research  
- 💻 Technical Setup
- 📞 Contact Us

---

## Flow 1: Email Notification Setup

### Step 1 - Initial Response
**Trigger:** User clicks "📧 Email Setup"

**Message:**
```
Awesome! 📧 FREE Email Notification Setup includes:

✅ Contact form alerts
✅ Order confirmations
✅ Welcome emails
✅ Status updates

This is 100% FREE! 🎉

What type of notifications do you need?
```

**Quick Replies:**
- Contact Forms
- E-commerce Orders
- Customer Engagement
- All Types
- ← Back to Menu

### Step 2 - Data Collection
**Trigger:** User selects any option

**Message:**
```
Perfect choice! To set this up, I need:

1️⃣ Your email address
2️⃣ Your website URL (if you have one)
3️⃣ Your platform (WordPress, Shopify, Custom, etc.)

Please reply with these details, or type "CALL" to speak with our team!
```

**User Input:** Collect as Custom Field "email_setup_details"

### Step 3 - Confirmation
**Message:**
```
Got it! ✅ Here's what happens next:

📅 Within 24 hours: Our team reviews your info
🔧 Within 48 hours: Setup begins
✉️ You'll receive: Setup guide + 30 days support

We'll email you at: {{email}}

Questions? Reply here or:
📞 Call: +256 393 24 2000
📧 Email: ciphcreativeagency@gmail.com
```

**Tag User:** "email_setup_requested"
**Notify Admin:** Send details to team

---

## Flow 2: Social Media Auto-Posting

### Step 1 - Platform Selection
**Trigger:** User clicks "📱 Social Media"

**Message:**
```
🎉 FREE Social Media Auto-Posting!

Schedule posts across all platforms automatically!

Which platforms do you use?
```

**Quick Replies:**
- ✓ Facebook
- ✓ Instagram
- ✓ Twitter/X
- ✓ LinkedIn
- ✓ All Platforms
- ← Back

### Step 2 - Business Info
**Message:**
```
Great! To set up your FREE automation:

Tell me about your business:
1️⃣ Business name
2️⃣ Industry/niche
3️⃣ How often you want to post (daily, 3x/week, etc.)

Reply with these details! 👇
```

**User Input:** Save to "social_setup_info"

### Step 3 - Tool Selection
**Message:**
```
Perfect! We can set you up with:

🔹 Buffer (Free tier)
🔹 Meta Business Suite
🔹 Hootsuite Free
🔹 Custom WordPress plugin

Which do you prefer, or should we recommend the best fit?

Reply: "RECOMMEND" or choose one above
```

### Step 4 - Next Steps
**Message:**
```
Excellent! 🚀 Here's your action plan:

✅ We'll prepare your setup guide
✅ 15-min training call scheduled
✅ You'll be auto-posting within 3 days!

Best time for a quick call?
```

**Quick Replies:**
- Morning (9-12)
- Afternoon (12-3)
- Evening (3-6)
- Weekend
- Just Email Me

**Tag User:** "social_automation_lead"

---

## Flow 3: Market Research AI

### Step 1 - Research Type
**Trigger:** User clicks "📊 Market Research"

**Message:**
```
🎯 FREE Market Research AI Report!

Worth $500+ but FREE for you! 🎁

We'll analyze:
✓ Your competitors
✓ Target audience
✓ Market trends
✓ Pricing strategies
✓ Growth opportunities

What do you want to know most?
```

**Quick Replies:**
- Competitor Analysis
- Customer Insights
- Pricing Strategy
- Market Trends
- Everything!

### Step 2 - Business Details
**Message:**
```
Awesome! To create your custom report:

📝 Please share:
1️⃣ Your industry/business type
2️⃣ Your location (Uganda, Kenya, Tanzania, Rwanda)
3️⃣ Main competitors (if known)
4️⃣ Your website/social media

Reply with these details! 👇
```

**User Input:** Save to "research_request_details"

### Step 3 - Timeline
**Message:**
```
Perfect! 📊 Your FREE Market Research Report:

📅 Timeline:
- Initial insights: 24-48 hours
- Full report: 3-5 business days
- Follow-up call: FREE 30 minutes

📧 Report delivered to: {{email}}

🎁 BONUS Included:
✨ 10 content ideas
✨ 5 marketing strategies
✨ Customer persona template

Confirm your email address to proceed!
```

**Collect Email:** Save to {{email}} field

### Step 4 - Confirmation
**Message:**
```
All set! ✅

You'll receive:
📧 Confirmation email (within 1 hour)
📊 Research questionnaire (within 24 hours)
📈 Full report (3-5 days)

Track progress: https://ciphca.com/research-status

Questions? I'm here 24/7! 💬
```

**Tag User:** "research_report_requested"
**Send to CRM:** Create lead with details

---

## Flow 4: Advanced Technical Setup

### Step 1 - Technical Level Check
**Trigger:** User clicks "💻 Technical Setup"

**Message:**
```
💻 FREE Advanced Technical Setup!

We'll help with:
🔧 GitHub & version control
🚀 CI/CD pipelines
☁️ Cloud infrastructure
🔐 Security setup

⚠️ This is slightly technical!

What's your tech level?
```

**Quick Replies:**
- Beginner (guide me!)
- Intermediate (some experience)
- Advanced (I'm technical)
- Not sure

### Step 2 - Service Selection
**Message:**
```
Perfect! What do you need help with?
```

**Quick Replies:**
- GitHub Setup
- Deployment Automation
- Cloud Hosting
- All of the Above
- Not Sure Yet

### Step 3 - Project Details
**Message:**
```
Great choice! 🚀

To set this up FREE, tell me:

1️⃣ Project type (web app, mobile, API, etc.)
2️⃣ Programming language/framework
3️⃣ Current hosting (if any)
4️⃣ Team size

Reply with details or type "CALL" for immediate help!
```

**User Input:** Save to "technical_setup_details"

### Step 4 - GitHub Username
**Conditional:** If GitHub selected

**Message:**
```
Awesome! For GitHub setup:

📝 I need:
- Your GitHub username
- Repository name (or we'll create one)
- Public or Private repo?

Reply with these details! 👇

Don't have GitHub yet? Type "NEW" and we'll help you create an account!
```

### Step 5 - Setup Confirmation
**Message:**
```
Perfect! 🎯 Here's what we'll do:

✅ Repository structure setup
✅ CI/CD pipeline configuration
✅ Documentation templates
✅ Security best practices
✅ 30-min training session

📅 Setup starts within 24 hours
📧 You'll get: Step-by-step guide
🎓 Training: We'll schedule together

Best contact method?
```

**Quick Replies:**
- WhatsApp: +256 393 24 2000
- Email Me
- Call Me
- Continue Here

**Tag User:** "technical_setup_lead"

---

## Flow 5: Contact / Human Handoff

### Contact Flow
**Trigger:** User clicks "📞 Contact Us" or types "human", "agent", "call"

**Message:**
```
Happy to connect you with our team! 👥

📞 CONTACT OPTIONS:

1️⃣ WhatsApp (Fastest!)
+256 393 24 2000

2️⃣ Phone Call
+256 393 24 2000

3️⃣ Email
ciphcreativeagency@gmail.com

4️⃣ Continue chatting here
I can answer most questions!

⏰ Office Hours:
Sun-Fri: 9 AM - 6 PM
Sat: 9 AM - 4 PM

What works best for you?
```

**Quick Replies:**
- Send WhatsApp Link
- Request Callback
- Send Email
- Keep Chatting

### Callback Request
**Trigger:** User clicks "Request Callback"

**Message:**
```
📞 Callback Request

Please provide:
1️⃣ Your name
2️⃣ Phone number
3️⃣ Best time to call

Reply with these details! 👇
```

**User Input:** Save to "callback_request"

**Confirmation:**
```
Got it! ✅

{{name}}, we'll call you at {{phone}} during {{time}}.

Usually within 2 hours during business hours!

Urgent? Call us now: +256 393 24 2000
```

**Notify Team:** Send callback request to staff

---

## Automation Rules

### Rule 1: Business Hours Response
**Condition:** Message received outside business hours

**Auto-Reply:**
```
Thanks for reaching out! 🌙

We're currently offline but will respond when we're back:

⏰ Office Hours:
Sun-Fri: 9 AM - 6 PM EAT
Sat: 9 AM - 4 PM EAT

🚨 Urgent? Email: ciphcreativeagency@gmail.com

Meanwhile, explore our FREE services:
```
**Show Main Menu Buttons**

### Rule 2: Abandoned Cart Recovery
**Condition:** User started flow but didn't complete (24 hours)

**Follow-up Message:**
```
Hey! 👋 I noticed you were interested in our FREE {{service_name}}.

Still need help? I'm here!

Or if timing isn't right, no worries - just let me know when you're ready! 😊

Reply "READY" to continue or "LATER" to pause.
```

### Rule 3: Lead Qualification
**Condition:** User provides business details

**Auto-Tag:**
- Location: Uganda/Kenya/Tanzania/Rwanda
- Service Interest: Email/Social/Research/Technical
- Business Stage: Startup/Growing/Established
- Priority: Hot/Warm/Cold

### Rule 4: Re-engagement (7 days)
**Condition:** No response for 7 days after initial contact

**Message:**
```
Hi again! 👋

Just checking in - did you get a chance to think about our FREE services?

No pressure! Just want to make sure you have what you need.

Reply "YES" to continue or "UNSUBSCRIBE" to stop messages.

- Ciph Creative Agency Team 🚀
```

---

## Custom Fields to Create

1. **email** - User's email address
2. **phone** - Phone number
3. **business_name** - Company name
4. **location** - Country/city
5. **service_interest** - Which free service
6. **tech_level** - Beginner/Intermediate/Advanced
7. **setup_details** - Project specifics
8. **preferred_contact** - WhatsApp/Email/Call
9. **callback_time** - When to call
10. **lead_status** - New/Contacted/Qualified/Converted

---

## Tags to Create

- `email_setup_requested`
- `social_automation_lead`
- `research_report_requested`
- `technical_setup_lead`
- `hot_lead` (responded within 1 hour)
- `warm_lead` (responded within 24 hours)
- `cold_lead` (no response 48+ hours)
- `uganda` / `kenya` / `tanzania` / `rwanda`
- `callback_requested`
- `converted_to_client`

---

## Integration Setup

### Zapier Connections:
1. **ManyChat → Google Sheets**
   - Log all leads automatically
   
2. **ManyChat → Gmail**
   - Send notification to team on new lead
   
3. **ManyChat → Slack**
   - Alert team channel on hot leads

4. **ManyChat → CRM** (HubSpot/Pipedrive)
   - Auto-create contacts

---

## Testing Checklist

- [ ] All flows work end-to-end
- [ ] Quick replies display correctly
- [ ] Custom fields save properly
- [ ] Tags apply automatically
- [ ] Admin notifications send
- [ ] Links work on mobile
- [ ] Emojis display correctly
- [ ] Business hours logic works
- [ ] Re-engagement messages send
- [ ] Unsubscribe works

---

**Platform:** ManyChat (Facebook Messenger & Instagram)
**Setup Time:** 2-3 hours
**Maintenance:** Monthly review recommended
