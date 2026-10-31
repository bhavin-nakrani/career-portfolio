---
title: "Linkyfy"
description: "An AI-driven LinkedIn outreach SaaS I took from an empty repository to 150+ customers in two months."
order: 1
featured: true
category: "AI products"
role: "Sole engineer — product build, AI integration and DevOps"
period: "2025 – 2026"
context: "Nexuslink Services"
technologies: ["AI / LLMs", "Prompt engineering", "Python", "Laravel", "MySQL", "AWS", "DevOps"]
cover: "images/projects/linkyfy.svg"
coverAlt: "Illustration of a network of connected profiles with AI-written message bubbles, representing automated LinkedIn outreach."
results:
  - "Live in production within 2 months of starting"
  - "150+ customers using the platform"
  - "Built and operated end-to-end by one engineer"
links:
  - label: "linkyfy.ai"
    url: "https://www.linkyfy.ai/"
---

## Overview

Linkyfy is a cloud-based LinkedIn automation tool for founders, sales teams, agencies and consultants. It finds the right profiles, sends connection requests and follow-ups, and writes each message with AI based on the recipient's profile — so outreach scales without reading like a template.

## The problem

Manual LinkedIn prospecting is slow, and most automation tools solve speed by sending the same generic message to everyone, which hurts reply rates and puts accounts at risk. The goal was a product that is fast, personal and careful with the user's account.

## My contribution

I built Linkyfy from scratch and took it to production on my own, covering:

- **Product architecture** — the data model for campaigns, prospects, sequences and message history.
- **AI personalisation** — prompt design that turns a prospect's public profile into a relevant, human-sounding connection message.
- **Automation engine** — scheduled discovery, connection and follow-up steps that run in the cloud, so users don't need to keep a browser open.
- **Account safety** — per-account isolation and randomised pacing so activity looks like a person, not a bot.
- **DevOps** — servers, deployment pipeline, monitoring and the production rollout.

## Technical approach

The platform separates the user-facing app from the background workers that execute outreach, so campaign runs can be queued, rate-limited and retried independently of the web tier. AI generation sits behind its own service boundary, which keeps prompts versioned and lets the model or provider change without touching campaign logic.

## Outcome

Linkyfy went from first commit to live product in **two months** and now serves **150+ customers**. The roadmap continues with a unified inbox, AI post generation and MCP integrations.
