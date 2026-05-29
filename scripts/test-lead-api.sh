#!/usr/bin/env bash
# Manual test script for /api/lead endpoint
# Usage: BASE_URL=http://localhost:3000 bash scripts/test-lead-api.sh
#
# Prerequisites:
#   - App running locally (npm run dev)
#   - Environment variables set: ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD
#
# What to verify after each test:
#   - Response JSON has ok: true
#   - submissionId is returned
#   - odooConfigured shows whether Odoo env vars are set
#   - Check Odoo CRM > Leads for the created record
#   - Check private/rfq-submissions/ for stored JSON

set -euo pipefail

BASE="${BASE_URL:-http://localhost:3000}"
API="${BASE}/api/lead"

echo "=========================================="
echo "Test 1: Contact form — name + phone only"
echo "=========================================="
curl -s -X POST "$API" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test User",
    "phone": "+98 912 000 0001",
    "source_page": "/contact",
    "form_type": "RFQ Consultation",
    "language": "en"
  }' | python3 -m json.tool || echo "(json parse failed)"

echo ""
echo "=========================================="
echo "Test 2: RFQ form — all fields"
echo "=========================================="
curl -s -X POST "$API" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Ali Mohammadi",
    "phone": "+98 912 000 0002",
    "company": "Test Construction Co.",
    "whatsapp": "+98 912 000 0002",
    "email": "ali@test-construction.com",
    "project_type": "Sandwich Panel Systems",
    "project_location": "Isfahan, Iran",
    "estimated_area": "12000 m2",
    "project_stage": "Design Review",
    "main_concern": ["Leakage Risk", "Cost Control"],
    "message": "We need a full technical review for our warehouse project.",
    "source_page": "/",
    "form_type": "RFQ Quick Consultation",
    "language": "fa"
  }' | python3 -m json.tool || echo "(json parse failed)"

echo ""
echo "=========================================="
echo "Test 3: Resource download form"
echo "=========================================="
curl -s -X POST "$API" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Engineer Rezaei",
    "phone": "+98 913 000 0003",
    "email": "rezaei@example.com",
    "resource_slug": "sandwich-panel-design-guide",
    "resource_title": "Sandwich Panel Design Guide",
    "source_page": "/resources/sandwich-panel-design-guide",
    "form_type": "Resource Download",
    "language": "en"
  }' | python3 -m json.tool || echo "(json parse failed)"

echo ""
echo "=========================================="
echo "Test 4: Validation — missing phone"
echo "=========================================="
echo "(Expected: 400 error)"
curl -s -X POST "$API" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "No Phone User"
  }' | python3 -m json.tool || echo "(json parse failed)"

echo ""
echo "=========================================="
echo "Test 5: Honeypot triggered"
echo "=========================================="
echo "(Expected: 400 spam error)"
curl -s -X POST "$API" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Spam Bot",
    "phone": "+1234567890",
    "website": "http://spam.example.com"
  }' | python3 -m json.tool || echo "(json parse failed)"

echo ""
echo "=========================================="
echo "Test 6: Legacy /api/rfq endpoint (backwards compat)"
echo "=========================================="
curl -s -X POST "${BASE}/api/rfq" \
  -F "name=Legacy RFQ Test" \
  -F "phone=+98 912 000 0006" \
  -F "source_page=/contact" \
  -F "form_type=RFQ Consultation" \
  -F "language=en" \
  -F "website=" \
  | python3 -m json.tool || echo "(json parse failed)"

echo ""
echo "=========================================="
echo "Verification checklist:"
echo "=========================================="
echo "[ ] Tests 1-3 returned ok: true"
echo "[ ] Test 4 returned 400 with phone validation error"
echo "[ ] Test 5 returned 400 spam protection error"
echo "[ ] Test 6 returned ok: true (legacy endpoint works)"
echo "[ ] Check Odoo CRM > Leads for 4 new leads"
echo "[ ] Lead titles follow format: [Website] {form_type} - {name}"
echo "[ ] Lead descriptions contain source_page, form_type, language"
echo "[ ] Lead descriptions contain all submitted metadata"
echo "[ ] Check private/rfq-submissions/ for stored JSON files"
echo "[ ] If Odoo is not configured: odooConfigured: false (not an error)"
echo "[ ] If Odoo is down: response is 502 with safe error message"
