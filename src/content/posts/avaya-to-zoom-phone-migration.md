---
title: "Migrating 150 users from Avaya to Zoom Phone: what actually happened"
date: 2026-03-15
type: post
tags: [work, voip, zoom, fortigate, yealink]
description: A full account of the Avaya to Zoom Phone cutover at a 150-person law firm — the plan, the surprises, and what I'd do differently.
---

We migrated a 150-user law firm from Avaya to Zoom Phone over a weekend. Here's the unfiltered version of how it went.

## The Plan

The cutover involved:
- Porting all DIDs from Avaya to Zoom
- Deploying Yealink T54W phones provisioned via Zoom
- Cutting over the FortiGate port6 to a new VLAN (`2026zoomphone`, 10.20.30.0/23)
- Training staff on Monday morning

We had a 72-hour change window starting Friday night.

## What Went Wrong

### SIP ALG (obviously)

Covered this in a separate log. FortiGate's SIP ALG was rewriting headers. Disabled it early Saturday and that resolved call drops.

### IP Blacklisting

Zoom blocked our public IP after a burst of failed registration attempts during initial provisioning. Had to contact Zoom support to whitelist us. Lost about 2 hours here.

### UDP Port Range

The firewall policy wasn't wide enough for Zoom's media ports. Zoom Phone requires UDP 8001–65535 for media. We had a narrower range from the old Avaya config.

## What I'd Do Differently

1. Disable SIP ALG *before* the first registration attempt
2. Pre-stage the firewall policy with the correct UDP range
3. Do a single test phone registration 24h before cutover to catch IP blacklisting early

## Result

By Sunday evening everything was stable. Monday morning was clean. Staff adapted faster than expected — Zoom's interface is more intuitive than Avaya for most users.

Total downtime: ~4 hours, mostly on Saturday during troubleshooting.
