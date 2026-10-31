---
title: "KiViP-Concierge"
description: "An AI agent service for busy professionals: hand off the task, AI does the work, and a human concierge checks it before delivery."
order: 2
featured: true
category: "AI products"
role: "Full-stack engineer — built from scratch to live, including DevOps"
period: "2025 – 2026"
context: "Nexuslink Services"
technologies: ["AI agents", "LLMs", "RAG", "Python", "Laravel", "AWS", "DevOps"]
cover: "images/projects/kivip-concierge.svg"
coverAlt: "Illustration of a task flowing from a request card through an AI agent and a human review checkpoint to a finished result."
results:
  - "Built from scratch and launched to production"
  - "Covers transcription, translation, image, video, document and data tasks"
  - "Human-in-the-loop review on every result"
links:
  - label: "kivip-concierge.com"
    url: "https://www.kivip-concierge.com/"
---

## Overview

KiViP-Concierge is a German-language AI service for people with no time to write prompts and no patience for mediocre output. Customers describe a task the way they would brief an assistant; AI agents do the work, and a human concierge reviews the result before the customer sees it. Billing is usage-based, with the cost shown beside each job.

## The problem

Generative AI can save hours, but only if you know how to prompt it, check it and fix it. Most business users don't have that time, and output they can't trust is worse than none. The product had to hide the prompting entirely while keeping a person accountable for quality.

## My contribution

I built the platform from scratch and took it live, including the DevOps:

- **Agent workflows** for transcription, translation, image, video, document and data tasks.
- **Concierge review flow** — every job passes a human checkpoint before delivery.
- **Private data rooms** — each customer gets an isolated workspace, with shared context for teams.
- **Transparency** — customers can see what the system knows about them, and the cost of each job.
- **Infrastructure and deployment** for a production service.

## Technical approach

Requests are turned into structured jobs that agents execute step by step, with customer context retrieved from the customer's own data room (a retrieval-augmented approach) instead of being re-explained every time. A review state sits between generation and delivery, so the concierge can correct or reject output before release.

## Outcome

The service launched in production as a complete, process-driven alternative to do-it-yourself prompting, offering six task categories behind a single conversational interface.
