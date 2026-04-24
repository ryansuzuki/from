---
title: "ADE enrollment failing silently — ABM sync delay"
date: 2026-04-18
type: log
tags: [work, intune, apple, mdm]
description: New iPhones weren't showing up as supervised after ADE enrollment. Waited 15 min, problem solved itself.
---

Enrolled a batch of new iPhones via ADE. Setup Assistant completed but devices weren't showing as supervised in Intune — no management profile installed.

Spent 20 minutes checking the MDM server token, enrollment profile assignment, and ABM device assignment. Everything looked correct.

Turned out ABM just hadn't synced to Intune yet. The sync can take up to 15 minutes after assigning devices to the MDM server in ABM.

Re-enrolled after waiting and it worked immediately.

**Lesson:** Add a 15-minute buffer to ADE enrollment workflows when devices are freshly assigned in ABM. Don't burn time troubleshooting what is just a sync delay.
