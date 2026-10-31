---
title: "dongK"
description: "A German online shop with live ticking prices — buyers watch the price move and buy, or let a bot buy at their target price."
order: 6
featured: false
category: "Commerce & booking"
role: "Full-stack engineer — frontend, backend and DevOps"
period: "2014 – 2017"
context: "Galitein Technologies for a German client"
technologies: ["Symfony", "Node.js", "MySQL", "Redis", "RabbitMQ", "AWS"]
cover: "images/projects/dongk.svg"
coverAlt: "Illustration of a product card with a live price ticker chart trending down and a target-price marker."
results:
  - "Owned frontend, backend and DevOps"
  - "Real-time price-ticking logic running on AWS"
links:
  - label: "dongk.shop"
    url: "https://dongk.shop/"
---

## Overview

dongK is a German webshop where prices change live depending on customer demand. Shoppers can buy as soon as a price suits them, or set a target and let the shop's BuyBot buy automatically when the price gets there.

## The problem

A ticking price only works if every shopper sees the same price at the same moment, purchases are consistent under load, and automated buy orders trigger precisely. That is closer to a trading system than a standard shop.

## My contribution

- Worked on the project end-to-end: **frontend, backend and DevOps**.
- Built the **price-ticking logic** on AWS.
- Implemented the purchase flow, accounts and automated buying.

## Technical approach

Price changes are produced on the server and pushed to connected browsers so all shoppers see the same tick. Purchases and target-price orders are processed through queues to keep them consistent when demand spikes.

## Outcome

dongK runs as a live, playful shopping experience with its own brand voice — and was one of the most technically distinctive commerce builds of my career.
