---
title: "AlphaTheta CRM & Repair Portal"
description: "An ERP/CRM and customer repair-claim portal for Pioneer DJ, built from scratch and used by 2,000+ agents and distributors on three continents."
order: 3
featured: true
category: "Enterprise systems"
role: "Senior engineer — built from scratch to production"
period: "2024 – 2025"
context: "StableLogic Ltd for TEO International"
technologies: ["Symfony", "Laravel", "PostgreSQL", "MySQL", "Redis", "AWS", "DevOps"]
cover: "images/projects/alphatheta-pioneer-dj.svg"
coverAlt: "Illustration of a CRM dashboard with a repair-claim pipeline and regional distributor markers across Europe, Asia and the USA."
results:
  - "2,000+ agents and distributor users onboarded"
  - "Operating across Europe, Asia and the USA"
  - "Delivered from scratch to live"
links:
  - label: "Customer repair portal"
    url: "https://repair.pioneerdj.com/customer/claim"
---

## Overview

AlphaTheta is the company behind Pioneer DJ equipment. This project gave it an internal ERP/CRM for service operations and a public-facing portal where customers start repair claims for their hardware. The CRM is private; the customer portal is public.

## The problem

After-sales service for professional DJ hardware runs through a global network of agents, distributors and service centres. Claims, product data and partner communication needed to live in one system, with the right access for each partner in each region.

## My contribution

- Built the **ERP/CRM** and the **customer repair-claim frontend** from scratch.
- Designed **role- and region-aware access** so agents and distributors only see what belongs to them.
- Modelled the **claim lifecycle**, from customer submission through partner handling to resolution.
- Handled **infrastructure and deployment** to production.

## Technical approach

The customer portal and the partner CRM share one domain model, so a claim submitted publicly appears immediately in the right partner's queue. Access is scoped by organisation and region rather than hard-coded per screen, which let the platform onboard new distributors without new code.

## Outcome

The platform launched successfully and serves **2,000+ agent and distributor users across Europe, Asia and the USA**.

*The CRM is not publicly accessible, so no internal screens are shown here.*
