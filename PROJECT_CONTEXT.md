# SIPANEL Website System

This project is an engineering-first industrial envelope platform.

Important folders:

/specs = source-of-truth JSON specifications
/assets = real engineering assets
/app = Next.js App Router
/components = reusable UI components
/messages = localization files

Core technologies:
- Next.js App Router
- TypeScript
- Tailwind CSS
- next-intl
- React Hook Form
- Zod

Critical rules:
- Do NOT invent fake metrics
- Do NOT invent contact information
- Use engineering-first positioning
- Support EN / FA / AR / RU
- Apply RTL for FA and AR

Read all JSON files in /specs before implementation.