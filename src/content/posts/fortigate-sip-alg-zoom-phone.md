---
title: "FortiGate SIP ALG was silently breaking Zoom Phone registration"
date: 2026-04-10
type: log
tags: [work, fortigate, voip, zoom]
description: Phones were registering but calls were dropping mid-dial. Took 3 hours to land on SIP ALG.
---

Yealink T54Ws were registering to Zoom fine but outbound calls dropped immediately after dialing. No errors in the Zoom portal — just silence.

Ran packet captures on the FortiGate and saw malformed SIP INVITEs leaving the firewall. Turns out SIP ALG was rewriting the SIP headers incorrectly.

**Fix:** Disabled SIP ALG under `VoIP Profile` and confirmed via CLI:

```
config voip profile
  edit "default"
    config sip
      set status disable
    end
  next
end
```

Calls stable immediately after. Classic FortiGate footgun — SIP ALG is enabled by default and almost always wrong.
