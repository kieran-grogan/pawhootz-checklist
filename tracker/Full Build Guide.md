# PawHootz — GoHighLevel Full Build Guide (Build-from-Scratch)

**Client:** PawHootz (Karoline Brewer, Ariel Rodriguez Castro)

**Builder:** StrategixAI (Mykel, Kieran, Hunter)

**Source:** PawHootz meeting transcripts (Weekly Check-ins: October 15, October 29, November 07, November 12, November 26, December 10, December 17)

**Last Updated:** 2025-12-19

> This guide is written **as if starting from scratch**, even if portions are already built, to ensure nothing is missed.


## Table of Contents
1. [How to Use This Guide](#how-to-use-this-guide)
2. [Outcome Goals](#outcome-goals)
3. [System Architecture](#system-architecture)
4. [Build Order](#build-order)
5. [Global Conventions](#global-conventions)
6. [Client Portal](#client-portal)
7. [Staff Portal](#staff-portal)
8. [Custom Fields](#custom-fields)
9. [Tags](#tags)
10. [Pipelines](#pipelines)
11. [Calendars and Scheduling](#calendars-and-scheduling)
12. [Forms and Surveys](#forms-and-surveys)
13. [Workflows and Automations](#workflows-and-automations)
14. [Email and SMS Templates](#email-and-sms-templates)
15. [Products Store Packages and Subscriptions](#products-store-packages-and-subscriptions)
16. [Integrations](#integrations)
17. [Roles and Permissions](#roles-and-permissions)
18. [QA Testing and Launch](#qa-testing-and-launch)
19. [Appendix Transcript Anchors](#appendix-transcript-anchors)

## How to Use This Guide

This .md file is designed to be converted into a **client journey styled checklist** (HTML or an internal build guide app).

**Conventions used:**
- `- [ ]` = build task not completed
- `- [x]` = completed (leave unchecked for your build)
- **VA-safe** = a VA can build/adjust without risk
- **Admin-only** = requires owner/admin access (billing, domains, integrations, user permissions, API keys)

**Workflow AI Prompts**
Every workflow includes a **Prompt for Workflow AI** in plain language (copy/paste).  
Each prompt is written to produce a workflow that is:
- deterministic (clear triggers/conditions)
- production-safe (guards against duplicates)
- testable (explicit exit criteria + test cases)

> Note: Some transcript lines contain `...` ellipses (partial capture). Where the transcript is incomplete, this guide flags items as **Needs Confirmation** rather than guessing.

## Outcome Goals

PawHootz wants GoHighLevel to run the **entire business** end-to-end, replacing/absorbing current systems (notably Ginger) and integrating required third parties (iDogCam/webcams, QuickBooks and/or Stripe, etc.).

### Primary outcomes
- One **Pet Parent** login experience to:
  - manage pets (multiple dogs per household)
  - complete onboarding requirements (waivers + vaccine docs)
  - book services (boarding/daycare/grooming/training)
  - view stay updates (daily “pup-dates”, nightly “tucked in” messages, report cards)
  - access webcams during active stays (only when checked in)
  - purchase memberships/packages/retail items in an online store

- A **Staff Portal / Back-of-House** experience to:
  - quickly view pet profiles and safety flags (bite history/aggression/private play)
  - handle check-in/check-out and stay status
  - create/update report cards and notes
  - manage grooming/training schedules
  - fulfill store orders (pickup/delivery rules)
  - keep accounting/financial reporting clean (QuickBooks preferred)


## System Architecture

### Recommended data model (strong recommendation)
- **Contact = Pet Parent (human)**  
  Holds billing/contact info, household-level preferences, marketing consent, membership status.

- **Custom Object: Pet** (one record per dog)  
  Holds vaccines, temperament, grooming details, room tier assignments, play type, photos.

- **Custom Object: Stay / Reservation**  
  Tracks boarding/daycare stays (check-in, check-out, room assignment, webcam access, daily update cadence).

- **Optional Custom Object: Training Enrollment**  
  Tracks orientation/consultation results and tier assignment (beginner/intermediate/advanced).

> If Custom Objects are not available in this location’s plan, the fallback is:
> - Contact = Pet Parent  
> - Additional Contacts = Dogs (one contact per dog) **OR** keep dogs in Custom Fields (not ideal).  
> This guide assumes Custom Objects are available, because PawHootz requires multi-pet households and staff-safe flagging.

### Status tracking (how the system “knows” what to do)
Use a combination of:
- **Tags** (fast, automation-friendly; drives communications loops)
- **Custom Fields** (truth data, used for conditions and UI display)
- **Opportunities/Pipelines** (human-process tracking: onboarding, training, store fulfillment)

### Transcript anchors (architecture drivers)

- **October 15 @ 3:05 (Karoline Brewer)** — Yeah, once they check in, through the Ginger app, they're able to go in and look at certain cameras. That's pretty cool. We only do play yards, some inside, some outside. It's not like it's every run. We have four right …
- **October 15 @ 4:27 (Mykel Stanley)** — Are you wanting to, you know, when it checks them in, what happens now? Do they go into, you got Ginger and they see it in there? Or how does that work? Yeah, they go into Ginger and see it.
- **October 15 @ 7:08 (Karoline Brewer)** — It takes forever to sign them because there's 16 different security measures. Which I know is important, but still.
- **October 15 @ 21:45 (Mykel Stanley)** — And once we get that final export done where everything, you guys are saying this is good, and then the choices over here on grooming are good, then we can click publish on this part of the build, and then the calendars …

## Build Order

This is the recommended build sequence to avoid rework.

### Phase 0 — Foundations
- [ ] Create/confirm Location settings (business profile, timezone, compliance)
- [ ] Enable all relevant **Labs** features used by PawHootz (Admin-only)
- [ ] Configure email/SMS sending domains and phone numbers (Admin-only)
- [ ] Create user roles and add staff users (Admin-only)

### Phase 1 — Data Model + Safety Flags
- [ ] Create Custom Objects (Pet, Stay/Reservation, Training Enrollment) (Admin-only)
- [ ] Create Custom Fields (Pet Parent + Pet + Stay)  
- [ ] Create Tags (status + flags + membership + stay tracking)
- [ ] Create Pipelines (Onboarding, Active Stays, Training, Store Orders)

### Phase 2 — Client Portal (Front-End UX)
- [ ] Build portal pages/components (no-code or custom portal UI)
- [ ] Build onboarding gates (waivers, vaccines, behavior screening)
- [ ] Build booking paths (boarding/daycare/grooming/training) + deposits

### Phase 3 — Back-of-House (Staff Portal)
- [ ] Staff dashboard views (today’s arrivals, active stays, flags)
- [ ] Report card entry + daily update workflow loop
- [ ] Store fulfillment + accounting flow

### Phase 4 — Integrations + Testing
- [ ] iDogCam webcam access integration (Admin-only + vendor coordination)
- [ ] Payments + accounting (QuickBooks preferred; Stripe fallback) (Admin-only)
- [ ] Full end-to-end test scripts
- [ ] Cutover from Ginger + staff training


## Global Conventions

### Naming conventions (prevents chaos)
**Tags:**  
Use prefixes:
- `PORTAL - ...`
- `ONBOARD - ...`
- `VAX - ...`
- `DOG - ...`
- `FLAG - ...`
- `STAY - ...`
- `TRAIN - ...`
- `MEM - ...`
- `STORE - ...`
- `PAY - ...`

**Custom Fields:**  
Prefix by object:
- `PP - ...` = Pet Parent (Contact)
- `PET - ...` = Pet (Custom Object)
- `STAY - ...` = Stay/Reservation (Custom Object)

**Workflows:**  
Prefix by domain:
- `ONBOARD | ...`
- `VAX | ...`
- `SAFETY | ...`
- `STAY | ...`
- `REPORT | ...`
- `TRAIN | ...`
- `MEM | ...`
- `STORE | ...`
- `ADMIN | ...`

### Data ownership rules (who can change what)
- **Pet Parents** can submit data, but **staff approves** anything that affects safety/operations:
  - vaccine approval
  - room tier assignment
  - private play requirement
  - acceptance/denial decisions
- Use “pending review” states to avoid auto-approving sensitive info.


## Client Portal

### What the portal must enable
- [ ] Pet parent login + household management (multiple pets)
- [ ] Add/edit pet profiles (with staff review gates)
- [ ] Upload vaccine documents and waivers
- [ ] Book services (boarding, daycare, grooming, training)
- [ ] See price estimates + deposit amount before checkout
- [ ] View webcams **only when pet is checked in**
- [ ] Receive daily updates (pup-dates) and/or nightly “tucked in” texts
- [ ] View end-of-stay report cards
- [ ] Access store (retail + packages/subscriptions/memberships)

### Portal gating logic (critical)
Do not allow booking until required items are complete:
- [ ] Pet Parent profile complete
- [ ] Pet profile complete
- [ ] Waivers complete
- [ ] Vaccines uploaded AND approved (or staff-reviewed)
- [ ] Behavior screening reviewed (if applicable)

**Transcript anchors (gating + waiver/vaccine concepts):**

- **October 15 @ 14:00 (Mykel Stanley)** — You're good with them. The first thing would be, so we got all the vaccines. As you see, I did this today just to make sure that it would populate, and I submitted these. I approved them on our end. So the next step that…
- **October 15 @ 19:51 (Mykel Stanley)** — I just set it where it would, they'll be alert. It's kind of like this, right? When somebody submits a vaccine, let me just put a date here so you can see. Okay. Just a second. But what happens is you see this pending re…
- **October 15 @ 20:43 (Mykel Stanley)** — yeah, I think you guys would, you guys would get that picture and you would look at that breed that she put in and then, you know, cause it already pinned to review because it was a mix up. It probably not the right dog.…
- **November 07 @ 7:12 (Mykel Stanley)** — And what's going to happen if weather pick it up or we move forward exactly where they're at or if we start from scratch. So the good thing is, is I do, we, we, we found a way to like jump, I wouldn't say light years, bu…
- **November 07 @ 17:45 (StrategixAI (strategixai@gmail.com))** — Yeah, we can do that. And yeah, what we'll do is, is we'll use a go high level field. So that way, if you guys ever need to change it, reference it, or we need to use it for anything else you can. And it'll basically che…

### Webcams / iDogCam in portal
Requirements:
- [ ] Webcam section visible only if `STAY - Checked In` is true for that pet
- [ ] Only show allowed cameras (play yards) — not “every run”
- [ ] Start with current camera count (4), allow scaling to 5
- [ ] iDogCam vendor coordination required (API / embed / authentication)

**Transcript anchors (webcams):**

- **October 15 @ 2:12 (Mykel Stanley)** — Been struggling. We just had, my family just went through COVID. I didn't even know that was a thing still, so. Right? Peeking its head back around. This meeting is actually going to be pretty short, on my side at least,…
- **October 15 @ 3:05 (Karoline Brewer)** — Yeah, once they check in, through the Ginger app, they're able to go in and look at certain cameras. That's pretty cool. We only do play yards, some inside, some outside. It's not like it's every run. We have four right …
- **October 15 @ 3:50 (Mykel Stanley)** — Well, I guess the question I have is, one, where would you want it at in here? I, you know, how would you want them to see that? ACTION ITEM: Connect w/ Aaron (iDogCam) re API integration for webcam feature - WATCH And t…
- **October 15 @ 10:27 (Ariel Rodriguez Castro)** — You can see the view on the side, over here, where it's under account, and then live webcam. How cool is this?
- **October 15 @ 11:27 (Karoline Brewer)** — Anyway, so you can go to the different phones. mean, the different cameras. Okay.
- **October 15 @ 11:33 (Mykel Stanley)** — So we'll do the similar here. I'll tell you what, what about like a sidebar that just like what you have here? We just kind of set one of those up and because it's not dog specific, right? They can kind of see the camera…

### Room tier selection (boarding)
Requirement:
- [ ] Clients should **not** be allowed to choose their suite/room tier freely.
- [ ] “KK” (luxury) is limited inventory (6 total) and not offered as an upgrade flow.
- [ ] Room tier may be set internally after a trial/first stay evaluation.
- [ ] Client portal can show “room tier” as view-only once assigned.

**Transcript anchors (suites/KK):**

- **October 15 @ 22:15 (Karoline Brewer)** — Standard, sweet, deluxe, sweet. So how is that set up? Like that's not set up to. No, this is just view only right now. ACTION ITEM: Continue dev on boarding/daycare logic in portal - WATCH
- **October 15 @ 22:55 (Karoline Brewer)** — Well, we just don't, we don't let our clients choose the suite. Like. Let's I see. And Ariel, I mean, we even still don't let them upgrade to a KK, do we?
- **October 15 @ 23:09 (Ariel Rodriguez Castro)** — So we have that option still in Ginger, but we don't, that's not something that we really promote, because we use KKs for, like, family dogs or, like, Great Danes, you know, big dogs. So we have six of them, six KKs, whi…
- **October 15 @ 24:21 (Mykel Stanley)** — Well, if you could be like, do you want a deluxe suite or a luxury suite?
- **October 15 @ 24:24 (Ariel Rodriguez Castro)** — But once we sell out, it like doesn't give them the option to book a KK. Yeah, I don't know how that would work.
- **October 15 @ 24:44 (Hunter Draut)** — To jump in, I don't see an issue, but we couldn't do that. Michael, they're just asking if we can have a validation to where if they're full on those extra suites, that it doesn't allow anyone else to book. Oh, yeah, yea…

### Training signup UX (Orientation vs Consultation)
Requirements:
- [ ] Training program enrollment must **require** an Orientation or Consultation first (clients cannot opt out)
- [ ] Orientation details:
  - day/time: Saturdays @ 1:00 PM
  - capacity: 4 spots max
  - price: $20
  - format: group orientation
- [ ] Consultation details:
  - 30 minutes
  - one-on-one
- [ ] After orientation/consultation, staff assigns training tier (beginner/intermediate/advanced)

**Transcript anchors (training intake):**

- **November 07 @ 12:05 (Karoline Brewer (PawHootz Pet Resort))** — So in terms of the descriptions, I would say if it's an obvious that, you know, there's a baseline training silver, and then it's six sessions, 12 sessions, copy the baseline to the six and the 12. Okay. Gotcha. If it's …
- **December 10 @ 21:18 (Hunter Draut)** — And for the Ark University, I was getting that added, but I wasn't sure, you know, from your old owner and user point of view, are they selecting their tier, or are they assigned a tier from you guys for a beginner and i…
- **December 10 @ 21:49 (Ariel Rodriguez Castro)** — I mean, Bark University has those tiers, but that's why they have to go to the orientation first before they get, you know, thrown straight into beginner class, because we need to see where they're at. Okay? Um, Because …
- **December 10 @ 22:17 (Hunter Draut)** — So what I can do when I have that option in the client portal, I know you guys already have it in your description. So I do know about the orientation. So I just make note of that and then, you know, just let the user kn…
- **December 10 @ 22:37 (Karoline Brewer (PawHootz Pet Resort))** — What is the difference between orientation and consultation? Orientation is a set day where they can go to a group class or?
- **December 10 @ 22:45 (Ariel Rodriguez Castro)** — It's only on Saturdays. Every Saturday at one o'clock that slot is reserved for orientation if someone wants to come. It's, yeah, a consultation. more than one person could sign up for it, right? Orientation, yeah. Yes. …
- **December 10 @ 23:16 (Hunter Draut)** — And for the orientation sign-up, is that something you want to include in the client portal? Is that something you guys want to have your pet owners reach out to you?

### Store UX (retail + packages + subscriptions)
Requirements:
- [ ] Store exists inside portal
- [ ] Products imported from Ginger: retail + packages + subscriptions
- [ ] Images are missing for most products (only 6 images available); client must provide images
- [ ] Store should launch before Christmas (time-sensitive in transcript)
- [ ] Support pickup/delivery rules (Needs Confirmation: specifics)

**Transcript anchors (store):**

- **October 29 @ 2:58 (StrategixAI)** — Yeah, I've got one thing, so we were able. to grab all of the packages, subscriptions, and your retail listing from Ginger. Okay. So we have all that data. However, when it comes to getting a store up for you guys, we on…
- **October 29 @ 4:06 (Mykel Stanley)** — Yeah. If you got two options, you can either put them in a Google Drive area or you can put them, have your GHL person put them in GHL's media folder and you guys'. Okay. You can store them in either one of those and we …
- **October 29 @ 4:25 (Ariel Rodriguez Castro)** — What I'll do then is I'll put them on the Google Drive just because that girl that we had, our social media person, that was also taking care of our retail is no longer with us. Okay.
- **October 29 @ 4:46 (StrategixAI)** — And then, yeah, I'll leave it up to you guys to decide, you know, what products I guess you, we at least want to start with. Yeah. From the two exports I got, I got one list, which I believe might be your active retail i…
- **November 07 @ 9:22 (StrategixAI (strategixai@gmail.com))** — Should be... All right, so one of the things I've been working on since we've gotten all of your old product listings from Ginger is trying to go through that and then start plugging it in, you know, offering your servic…
- **November 07 @ 10:34 (Karoline Brewer (PawHootz Pet Resort))** — I'm just, so in the long run, can we go in and edit that? That's not something you have to maintain? ACTION ITEM: Update GHL services/products per pricing sheet: copy base training desc; set lodging tiers S/M/L/XL; add p…

## Staff Portal

### Core staff portal needs
- [ ] Quick “pet profile” view with safety flags
- [ ] Ability to see if:
  - vaccines are approved/pending
  - waivers complete
  - behavior red flags (bite history, aggression)
  - private play required
- [ ] Ability to set or override:
  - room tier assignment
  - play group or private play designation
  - training tier assignment (post orientation)
- [ ] Daily operations:
  - check-in / check-out toggles
  - active stay list
  - grooming schedule overview
  - training schedule overview
- [ ] Report card creation and sending logic
- [ ] Store order fulfillment tasks (pickup/delivery, inventory)

**Transcript anchors (staff portal + flags):**

- **November 07 @ 19:45 (Karoline Brewer (PawHootz Pet Resort))** — But if, so let's say the client fills out the form and there's a question on that form that was filled out as, you know, yes, this is like a red flag, this this dog. So aggressive with other dogs, or this dog has a bite …
- **November 07 @ 20:33 (StrategixAI (strategixai@gmail.com))** — So in terms of, you know, what we can do with that is exactly what you're saying, really. And what we did for Champ was they had a big emphasis on identifying dogs, like you said, with bite history. So before anyone was …
- **November 07 @ 21:41 (Karoline Brewer (PawHootz Pet Resort))** — So like if they fill out a form and question five, they answer yes, could that trigger an automatic icon or an automatic, you know, this dog goes into private play or something along those lines? Yes, we can. It's just, …
- **November 07 @ 22:33 (Karoline Brewer (PawHootz Pet Resort))** — So I think that would be a way of avoiding human error. So on that aggressive behavior, we identify, if your dog's people aggressive, you know, we go down a certain path, we say, we don't take you. Um, if your, if your d…
- **November 07 @ 23:13 (StrategixAI (strategixai@gmail.com))** — And there's a couple of different things we can do for that. If you're not sure if you want to have, right, an automatic kick, we can give you guys maybe, like, a report, like, hey, you guys have had five people who sign…
- **December 10 @ 23:35 (Karoline Brewer (PawHootz Pet Resort))** — And then if they sign up, I mean, I would assume we would have Debra call them and just make sure the dog's not aggressive or they've already filled out the form. So we know if the dog has aggression. And if she sees tha…

### Report cards + daily updates
Requirements:
- [ ] Daily “pup-date” cadence currently discussed as **4 PM daily**
- [ ] Option to send:
  - simple nightly SMS (“JoJo was tucked in for the night; all is well”)
  - full report card at end of stay (preferred)
- [ ] Loop continues until stay ends (tag removed or status changes)

**Transcript anchors (report cards / updates):**

- **October 15 @ 8:35 (Karoline Brewer)** — I guess I haven't updated my... All right.
- **October 29 @ 2:49 (Mykel Stanley)** — That's how all business owners are. I'm sure people would say that about me. I don't have any updates for you or nothing, so. Cool, cool. Hunter's got stuff, go ahead.
- **November 07 @ 9:22 (StrategixAI (strategixai@gmail.com))** — Should be... All right, so one of the things I've been working on since we've gotten all of your old product listings from Ginger is trying to go through that and then start plugging it in, you know, offering your servic…
- **November 07 @ 10:34 (Karoline Brewer (PawHootz Pet Resort))** — I'm just, so in the long run, can we go in and edit that? That's not something you have to maintain? ACTION ITEM: Update GHL services/products per pricing sheet: copy base training desc; set lodging tiers S/M/L/XL; add p…
- **November 07 @ 15:38 (StrategixAI (strategixai@gmail.com))** — And then besides from that, I did have one other question. So if someone is, I guess before we get to that. So what we've went ahead and started was to match the grooming that we guys have showed you guys previously. We …
- **November 07 @ 25:39 (StrategixAI (strategixai@gmail.com))** — Yeah, can go ahead and switch out here. So yeah, moving forward, I'll update with that pricing sheet for anything that was maybe a little short. We can add, you know, that extra information you guys have got. For example…
- **November 07 @ 31:17 (Karoline Brewer (PawHootz Pet Resort))** — Question, because we're bringing so much information over, is there a way for us to go through our top 100 or 200 or 300 clients and actually put that information in? Because if we know this dog is going to be grooming o…
- **November 12 @ 7:49 (Mykel Stanley)** — That's what we were going to propose to you guys, instead of just kind of at, we, we, we can tackle it all again tomorrow. Uh, I'm pretty open tomorrow afternoon. Um, but we'll still send that test stuff to you. yeah. As…

## Custom Fields

> This section lists **all recommended fields** to support the workflows, portal UX, staff operations, and accounting.

### Contact (Pet Parent) Custom Fields
- [ ] `PP - Client Type` (Dropdown: New / Existing)
- [ ] `PP - Membership Status` (Dropdown: None / Elevated Play / Other)
- [ ] `PP - Preferred Communication` (Dropdown: SMS / Email / Both)
- [ ] `PP - Waivers Complete` (Checkbox)
- [ ] `PP - Onboarding Status` (Dropdown: Started / Pending Review / Approved / Denied)
- [ ] `PP - Payment Profile On File` (Checkbox)
- [ ] `PP - QuickBooks Customer ID` (Text) *(if syncing)*
- [ ] `PP - Stripe Customer ID` (Text) *(if syncing)*
- [ ] `PP - Notes (Internal)` (Long text)

### Pet (Custom Object) Fields
**Identity**
- [ ] `PET - Name` (Text)
- [ ] `PET - Breed` (Dropdown or Text)
- [ ] `PET - Weight Range` (Dropdown; matches PawHootz sizing matrix)
- [ ] `PET - Coat Type/Length` (Dropdown) *(per grooming matrix)*
- [ ] `PET - Photo URL` (Text / File) *(Needs Confirmation: where stored)*

**Vaccines / Compliance**
- [ ] `PET - Vaccines Uploaded` (Checkbox)
- [ ] `PET - Vaccine Review Status` (Dropdown: Not Submitted / Pending Review / Approved / Rejected / Expired)
- [ ] `PET - Rabies Expiration` (Date)
- [ ] `PET - DHPP/Distemper Expiration` (Date)
- [ ] `PET - Bordetella Expiration` (Date)
- [ ] `PET - Vaccine Doc Link` (Text/File)
- [ ] `PET - Vaccine Notes` (Long text)

**Behavior / Safety**
- [ ] `PET - Bite History` (Checkbox)
- [ ] `PET - Dog Aggressive` (Checkbox)
- [ ] `PET - Private Play Required` (Checkbox)
- [ ] `PET - Staff Safety Notes` (Long text)
- [ ] `PET - Acceptance Decision` (Dropdown: Accept / Reject / Needs More Info)

**Boarding / Daycare**
- [ ] `PET - Room Tier Assigned` (Dropdown: Standard / Suite / Deluxe Suite / KK *(view-only for clients)*) 
- [ ] `PET - Elevated Play Eligible` (Checkbox)
- [ ] `PET - Attendance Frequency` (Dropdown: 1x/wk / 2x/wk / 3x/wk / 4x/wk / 5x/wk) *(for Elevated Play)*

**Grooming**
- [ ] `PET - Grooming Time Estimate` (Dropdown: 30 / 60 / 120 + add-ons) *(from transcript “30, 60, 120 + extras”)* 
- [ ] `PET - Grooming Notes` (Long text)
- [ ] `PET - Grooming Aggression Flags` (Checkboxes) *(if needed)*

**Training**
- [ ] `PET - Training Tier` (Dropdown: Unassigned / Beginner / Intermediate / Advanced)
- [ ] `PET - Orientation Completed` (Checkbox)
- [ ] `PET - Consultation Completed` (Checkbox)

### Stay / Reservation (Custom Object) Fields
- [ ] `STAY - Type` (Dropdown: Boarding / Daycare)
- [ ] `STAY - Check-in DateTime` (DateTime)
- [ ] `STAY - Check-out DateTime` (DateTime)
- [ ] `STAY - Status` (Dropdown: Booked / Checked In / Checked Out / Cancelled)
- [ ] `STAY - Room Tier Used` (Dropdown)
- [ ] `STAY - Webcam Enabled` (Checkbox)
- [ ] `STAY - Daily Update Enabled` (Checkbox)
- [ ] `STAY - Report Card Required` (Checkbox)
- [ ] `STAY - Assigned Staff` (User)
- [ ] `STAY - Notes` (Long text)

### Needs Confirmation (fields that depend on missing transcript detail)
- [ ] Membership tiers, benefits, pricing rules
- [ ] Exact grooming sizing/time matrix and add-ons (transcript references a matrix)
- [ ] Store pickup vs delivery settings and fees

## Tags

> Tags drive automation entry/exit. Keep them consistent.

### Portal / Onboarding
- [ ] `PORTAL - Invite Sent`
- [ ] `PORTAL - Active`
- [ ] `ONBOARD - Started`
- [ ] `ONBOARD - Pending Review`
- [ ] `ONBOARD - Approved`
- [ ] `ONBOARD - Denied`

### Vaccines / Compliance
- [ ] `VAX - Submitted`
- [ ] `VAX - Pending Review`
- [ ] `VAX - Approved`
- [ ] `VAX - Rejected`
- [ ] `VAX - Expired`

### Safety Flags (Internal)
- [ ] `FLAG - Bite History`
- [ ] `FLAG - Dog Aggressive`
- [ ] `FLAG - Private Play Required`
- [ ] `FLAG - Needs Staff Review`

### Stays (Boarding/Daycare)
- [ ] `STAY - Booked`
- [ ] `STAY - Checked In`
- [ ] `STAY - Checked Out`
- [ ] `STAY - Daily Updates Active`
- [ ] `STAY - Report Card Pending`

### Training
- [ ] `TRAIN - Orientation Scheduled`
- [ ] `TRAIN - Orientation Completed`
- [ ] `TRAIN - Consultation Scheduled`
- [ ] `TRAIN - Tier Assigned`

### Membership / Elevated Play
- [ ] `MEM - Elevated Play Active`
- [ ] `MEM - Elevated Play Pending`
- [ ] `MEM - Cancelled`

### Store / Orders
- [ ] `STORE - Order Placed`
- [ ] `STORE - Ready for Pickup`
- [ ] `STORE - Shipped`
- [ ] `STORE - Completed`

### Payments
- [ ] `PAY - Deposit Paid`
- [ ] `PAY - Balance Due`
- [ ] `PAY - Refund Needed`

## Pipelines

### Pipeline 1 — Client Onboarding
Stages:
1. [ ] `New Lead`
2. [ ] `Portal Invite Sent`
3. [ ] `Forms Pending`
4. [ ] `Vaccines Pending Review`
5. [ ] `Approved to Book`
6. [ ] `Active Client`
7. [ ] `Denied / Not Accepted`

**Stage automation ideas**
- [ ] When moved to `Vaccines Pending Review`, notify staff.
- [ ] When moved to `Approved to Book`, send “You’re approved” + booking instructions.

### Pipeline 2 — Active Stays (Operational Tracking)
Stages:
1. [ ] `Booked`
2. [ ] `Checked In`
3. [ ] `In Stay`
4. [ ] `Checked Out`
5. [ ] `Follow-up / Review Request`

### Pipeline 3 — Training
Stages:
1. [ ] `Orientation Scheduled`
2. [ ] `Orientation Completed`
3. [ ] `Tier Assigned`
4. [ ] `Program In Progress`
5. [ ] `Completed`

### Pipeline 4 — Store Orders
Stages:
1. [ ] `Order Placed`
2. [ ] `Payment Confirmed`
3. [ ] `Ready for Pickup` / `Packing`
4. [ ] `Shipped` *(if delivery/ship is enabled)*
5. [ ] `Completed`
6. [ ] `Refund / Issue`


## Calendars and Scheduling

### Calendar structure
- [ ] Create a calendar group: `PawHootz | Client-Facing Bookings`
- [ ] Create sub-calendars:
  - [ ] `Boarding Check-in / Check-out` *(if using GHL calendar for this)*
  - [ ] `Daycare`
  - [ ] `Grooming`
  - [ ] `Training - Orientation`
  - [ ] `Training - Consultation`

### Training scheduling rules (from transcript)
- [ ] Orientation: Saturdays @ 1:00 PM, max 4 spots, $20
- [ ] Consultation: 30-minute 1:1

Implementation options:
- Option A (recommended): Use **GHL Calendar + Appointment** + payment required.
- Option B: Book via portal UI, create appointment via API.

### Deposit rules (from transcript)
- [ ] New clients: **100% deposit for lodging** (boarding)
- [ ] Everything else: **50% deposit**
- [ ] Grooming deposit: **50%** (explicitly stated)

**Transcript anchors (payments/deposits):**

- **November 07 @ 35:41 (Mykel Stanley)** — I say yes, however, strong however, semicolon, is, I cannot predict the accuracy of that, but I will say it'll be over 70, but I have yet, you know, I hate saying that we're not capable, so I've yet to find a... Bulletpr…
- **November 07 @ 44:59 (Mykel Stanley)** — Yeah. I 100% agree. So I'll see you guys Wednesday, and stay safe, and we'll talk then.
- **November 26 @ 36:10 (Karoline Brewer (PawHootz Pet Resort))** — Okay, so I can go in here and I can buy the zippy paws, add it to my cart, proceed to check out my orders. Okay, I just placed an order, but I didn't pay for anything. No, you will be charged. That's how it will work. I'…
- **November 26 @ 36:44 (Kieran Grogan)** — Once we are able to nail down how we're going to run the financial side of it, whether that's going to be through GHL, if there's any certain third-party that you're using primarily, that would dictate the whole process …
- **November 26 @ 37:02 (Karoline Brewer (PawHootz Pet Resort))** — And I don't know when we need to start that conversation, but what we had talked about originally was that we use QuickBooks and it would be really, really nice if daily QuickBooks was updated with our financial informat…
- **November 26 @ 37:46 (StrategixAI (strategixai@gmail.com))** — Can you do it? I think so, as long as we don't have any issues with the payment processing and making sure.
- **November 26 @ 37:54 (Kieran Grogan)** — Yeah, I mean, you could even set up a temporary Stripe payment process for the time being if you wanted to get it up. I think I already have a Stripe set up.
- **November 26 @ 38:20 (Karoline Brewer (PawHootz Pet Resort))** — I would prefer to use QuickBooks if we can just because it's already, that's how we do all of our financial reporting. So that would make our lives a lot easier.

## Forms and Surveys

### Form 1 — Pet Parent Intake (Contact)
Purpose: capture household data and create login record.
- [ ] Name, Email, Phone
- [ ] Address
- [ ] Preferred communication
- [ ] Consent (marketing/comms)

### Form 2 — Pet Profile (Pet Custom Object)
- [ ] Pet name, breed
- [ ] Weight range / size selection
- [ ] Coat type/length (for grooming estimate)
- [ ] Photo upload (optional; staff can request/verify)

### Form 3 — Vaccines + Waivers
- [ ] Vaccine document upload(s)
- [ ] Acknowledgement/waiver checkboxes
- [ ] Capture expiration dates if available (or use AI doc parsing)

### Form 4 — Behavior & Safety Questionnaire
Purpose: screen for aggression/bite history and trigger staff flags.
Key questions (expand):
- [ ] Bite history? (Yes/No)
- [ ] Dog aggressive? (Yes/No)
- [ ] Needs private play? (Yes/No / staff decides)
- [ ] Any special handling notes?

**Transcript anchors (behavior / flags):**

- **November 07 @ 19:45 (Karoline Brewer (PawHootz Pet Resort))** — But if, so let's say the client fills out the form and there's a question on that form that was filled out as, you know, yes, this is like a red flag, this this dog. So aggressive with other dogs, or this dog has a bite …
- **November 07 @ 20:33 (StrategixAI (strategixai@gmail.com))** — So in terms of, you know, what we can do with that is exactly what you're saying, really. And what we did for Champ was they had a big emphasis on identifying dogs, like you said, with bite history. So before anyone was …
- **November 07 @ 21:41 (Karoline Brewer (PawHootz Pet Resort))** — So like if they fill out a form and question five, they answer yes, could that trigger an automatic icon or an automatic, you know, this dog goes into private play or something along those lines? Yes, we can. It's just, …
- **November 07 @ 22:33 (Karoline Brewer (PawHootz Pet Resort))** — So I think that would be a way of avoiding human error. So on that aggressive behavior, we identify, if your dog's people aggressive, you know, we go down a certain path, we say, we don't take you. Um, if your, if your d…
- **November 07 @ 23:13 (StrategixAI (strategixai@gmail.com))** — And there's a couple of different things we can do for that. If you're not sure if you want to have, right, an automatic kick, we can give you guys maybe, like, a report, like, hey, you guys have had five people who sign…
- **December 10 @ 23:35 (Karoline Brewer (PawHootz Pet Resort))** — And then if they sign up, I mean, I would assume we would have Debra call them and just make sure the dog's not aggressive or they've already filled out the form. So we know if the dog has aggression. And if she sees tha…

### Form 5 — Grooming Questionnaire
Purpose: staff can quickly see grooming history/preferences.
- [ ] Desired service (bath, haircut, etc.) *(Needs confirmation of list)*
- [ ] Behavior during grooming (bites, anxious, etc.)
- [ ] Matting notes
- [ ] Preferred length/style notes
- [ ] Allergies/skin issues

**Transcript anchor (grooming history need):**

- **November 07 @ 25:00 (StrategixAI (strategixai@gmail.com))** — For their, or a different dog they don't normally groom, and you know, they want to be able to check the dog's history. If you guys got, you know, your guys' owners filling this kind of stuff out, we can make that available to you guys for your staff, without them having to go back and manually look for this form, or chase any of the information down, that sort of stuff. Perfect. So we've got to check that off.

### Form 6 — Training Interest / Intake
- [ ] Choose: group classes vs individualized training
- [ ] Force: schedule Orientation or Consultation first
- [ ] After completion, staff assigns tier

### Survey — Post-Stay Feedback
- [ ] Trigger after checkout + report card delivered
- [ ] Capture NPS/feedback
- [ ] Ask for review (Google/Facebook) *(Needs confirmation)*


## Workflows and Automations

> Below are production-ready workflow specs.  
> Each one includes a **Prompt for Workflow AI** you can paste into your workflow builder AI.

### Workflow spec format (standard)
For every workflow:
- **GOAL**
- **TRIGGER**
- **REQUIRED INPUTS**
- **STEPS (BUILD ORDER)**
- **EXIT CRITERIA**
- **TEST CASES**
- **Prompt for Workflow AI (Plain Language)**

---

## A) Portal & Onboarding Workflows

### A1 — ONBOARD | Portal Invite + Login Setup

**GOAL**  
When a new lead/client is created, invite them to the PawHootz portal and guide them to complete onboarding.

**TRIGGER**  
- Contact created via intake form **OR**
- Tag added: `ONBOARD - Started`

**REQUIRED INPUTS**
- Contact has email and/or phone
- `PP - Onboarding Status` exists
- Email template: `PORTAL | Invite Email`
- SMS template (optional): `PORTAL | Invite SMS`

**STEPS (BUILD ORDER)**
1. Action: Update `PP - Onboarding Status` → `Started`
2. Action: Add tag `PORTAL - Invite Sent`
3. Action: Send Email `PORTAL | Invite Email` (include portal link + instructions)
4. If phone exists: Send SMS `PORTAL | Invite SMS`
5. Wait 24 hours
6. If `PP - Onboarding Status` is still `Started`:
   - Send reminder email + SMS
   - Create internal task: “Call client to help complete onboarding”
7. Exit when `ONBOARD - Approved` tag is present (or `PP - Onboarding Status` = Approved)

**EXIT CRITERIA**
- Portal invite delivered (email sent)
- Follow-up reminder sent if needed
- Task created for stuck onboarding

**TEST CASES**
- New lead with email only → receives email invite
- New lead with phone only → receives SMS invite
- Lead does not complete onboarding within 24h → reminder + task created
- Approved lead → workflow stops

**Prompt for Workflow AI (Plain Language)**
```text
Create a GoHighLevel workflow named “ONBOARD | Portal Invite + Login Setup”.
Trigger when a new contact is created from the “Pet Parent Intake” form OR when tag “ONBOARD - Started” is added.
If the contact has no email and no phone, create a task for staff and stop.
Otherwise:
1) Set custom field PP - Onboarding Status = Started.
2) Add tag PORTAL - Invite Sent.
3) Send email template “PORTAL | Invite Email” with portal login link.
4) If phone exists, send SMS template “PORTAL | Invite SMS”.
5) Wait 24 hours.
6) If tag ONBOARD - Approved is NOT present and PP - Onboarding Status is still Started, send a reminder email and SMS and create a task assigned to Ariel: “Onboarding stuck — reach out”.
Stop the workflow once ONBOARD - Approved tag is present.
Include safeguards to avoid sending duplicate invites more than once per day.
```

### A2 — ONBOARD | Gate Booking Until Requirements Complete

**GOAL**  
Prevent booking access until waivers/vaccines/behavior form are completed and staff-approved.

**TRIGGER**  
- Form submitted: Waivers/Vaccines/Behavior Questionnaire **OR**
- Any of these fields change:
  - `PP - Waivers Complete`
  - `PET - Vaccine Review Status`
  - `PET - Acceptance Decision`

**REQUIRED INPUTS**
- `PP - Waivers Complete` (checkbox)
- `PET - Vaccine Review Status` (dropdown)
- `PET - Acceptance Decision` (dropdown)
- Portal UI reads a single “Can Book?” signal (recommended)

**STEPS (BUILD ORDER)**
1. Determine eligibility:
   - Waivers complete = true
   - Vaccine Review Status = Approved
   - Acceptance Decision = Accept
2. If all true:
   - Set `PP - Onboarding Status` = `Approved`
   - Add tag `ONBOARD - Approved`
   - Remove tag `ONBOARD - Pending Review` if present
   - Send approval email/SMS
3. Else:
   - Set `PP - Onboarding Status` = `Pending Review`
   - Add tag `ONBOARD - Pending Review`
   - If vaccines are pending → notify staff
   - If acceptance decision is Reject → send denial message (optional)

**EXIT CRITERIA**
- Correct booking eligibility status is set (Approved vs Pending)
- Staff notified when review required

**TEST CASES**
- Waivers complete but vaccines pending → Pending Review + staff notified
- Vaccines approved + waivers complete + accept → Approved + client notified
- Bite history triggers rejection path → Denied logic runs

**Prompt for Workflow AI (Plain Language)**
```text
Create a workflow called “ONBOARD | Gate Booking Until Requirements Complete”.
Trigger when any onboarding form is submitted OR when fields PP - Waivers Complete, PET - Vaccine Review Status, or PET - Acceptance Decision change.
Evaluate eligibility for booking:
Eligible only if PP - Waivers Complete = true AND PET - Vaccine Review Status = Approved AND PET - Acceptance Decision = Accept.
If eligible: set PP - Onboarding Status to Approved, add tag ONBOARD - Approved, remove ONBOARD - Pending Review, and send “Approved to Book” email/SMS.
If not eligible: set PP - Onboarding Status to Pending Review, add tag ONBOARD - Pending Review. If PET - Vaccine Review Status is Pending Review, notify staff and create a task.
If PET - Acceptance Decision is Reject, tag ONBOARD - Denied and send a polite denial email with a call-in number.
Make sure this workflow is idempotent (no repeated approval texts on every field change).
```

---

## B) Vaccines & Compliance Workflows

### B1 — VAX | Vaccine Document Submitted → Pending Review + AI Assist

**GOAL**  
When a vaccine doc is submitted, mark as pending review, optionally run AI document parsing, and notify staff.

**TRIGGER**
- Form submitted: `Vaccines Upload`
- File uploaded to `PET - Vaccine Doc Link`

**REQUIRED INPUTS**
- `PET - Vaccine Doc Link`
- `PET - Vaccine Review Status`
- Staff notification channel (email/SMS/internal task)
- (Optional) Webhook endpoint to AI document reviewer

**STEPS (BUILD ORDER)**
1. Set `PET - Vaccine Review Status` = `Pending Review`
2. Add tag `VAX - Pending Review`
3. Notify staff: “Vaccine doc submitted — review required”
4. (Optional) Send webhook to AI reviewer:
   - extract expiration dates
   - recommend approve/reject
5. Staff approves/rejects:
   - Approved: set status + tag
   - Rejected: set status + tag + client follow-up message

**EXIT CRITERIA**
- Pet record is in correct status
- Staff gets review notification
- Client receives outcome message once decided

**TEST CASES**
- Upload doc → status becomes Pending Review + staff notified
- Staff sets Approved → client receives approval message
- Staff sets Rejected → client asked to resubmit

**Prompt for Workflow AI (Plain Language)**
```text
Create a workflow named “VAX | Vaccine Document Submitted → Pending Review + AI Assist”.
Trigger when the Vaccines Upload form is submitted (or when PET - Vaccine Doc Link is updated).
Immediately set PET - Vaccine Review Status = Pending Review and add tag VAX - Pending Review.
Create a task assigned to the operations team: “Review vaccine document for [Pet Name]”.
If an AI webhook URL is provided, send the vaccine document link and pet identifiers to the webhook and store returned expiration dates into the Pet fields.
Do not auto-approve; require staff review.
When staff changes PET - Vaccine Review Status to Approved, add tag VAX - Approved, remove VAX - Pending Review, and notify the pet parent that they are cleared.
When staff changes to Rejected, add tag VAX - Rejected and message the pet parent to resubmit.
```

---

## C) Safety & Behavior Screening Workflows

### C1 — SAFETY | Behavior Form → Flagging + Private Play Logic

**GOAL**  
Convert specific questionnaire answers into internal flags and staff-visible indicators.

**TRIGGER**
- Behavior & Safety Questionnaire submitted

**REQUIRED INPUTS**
- Questions mapped to fields:
  - Bite History
  - Dog Aggressive
  - Private Play Required (or “needs review”)
- Staff portal can display tags/flags prominently

**STEPS (BUILD ORDER)**
1. Update pet fields from form answers.
2. If Bite History = Yes → add tag `FLAG - Bite History` + create task “Call client / review”
3. If Dog Aggressive = Yes → add tag `FLAG - Dog Aggressive`
4. If Private Play = Yes (or indicates) → set `PET - Private Play Required` true + add tag `FLAG - Private Play Required`
5. Notify staff manager for any red flags.
6. (Optional) Use AI to interpret free-text answers and recommend accept/reject decision.
7. If reject decision reached → set `PET - Acceptance Decision` = Reject and send denial messaging.

**EXIT CRITERIA**
- Flags/tags are applied correctly
- Staff is notified for red flag pets

**TEST CASES**
- Bite history “Yes” → FLAG applied + staff task created
- Aggressive “Yes” → DOG aggressive flag applied
- No red flags → no staff alarm

**Prompt for Workflow AI (Plain Language)**
```text
Create workflow “SAFETY | Behavior Form → Flagging + Private Play Logic”.
Trigger when the “Behavior & Safety Questionnaire” form is submitted.
Map answers into Pet fields:
- If bite history is Yes, set PET - Bite History = true and add tag FLAG - Bite History.
- If dog aggressive is Yes, set PET - Dog Aggressive = true and add tag FLAG - Dog Aggressive.
- If private play is required/selected, set PET - Private Play Required = true and add tag FLAG - Private Play Required.
For any of these red flags, create a task for Ariel: “Review safety flags for [Pet Name]” and send an internal email notification.
Optionally route the form response to an AI decision helper; if AI returns “Reject”, set PET - Acceptance Decision = Reject and tag ONBOARD - Denied.
Ensure staff is always required to confirm final acceptance.
```

---

## D) Booking, Payments, and Deposits Workflows

### D1 — PAY | Apply Deposit Rules (New vs Existing; Lodging vs Other)

**GOAL**  
Ensure the correct deposit percentage is collected based on client type and service type.

**TRIGGER**
- Booking initiated in portal (boarding/daycare/grooming/training)
- Order created in store for service deposit

**REQUIRED INPUTS**
- `PP - Client Type` (New/Existing)
- Service type (boarding vs other)
- Deposit percent rules:
  - New client + lodging = 100%
  - Everything else = 50%

**STEPS (BUILD ORDER)**
1. Determine service type.
2. Determine client type.
3. Calculate deposit required (store/order line item or payment link).
4. Present deposit amount before checkout.
5. When deposit paid:
   - Add tag `PAY - Deposit Paid`
   - If lodging: confirm reservation
   - If grooming/training: confirm appointment

**EXIT CRITERIA**
- Deposit collected at correct percentage
- Booking confirmed only after deposit

**TEST CASES**
- New client boarding → 100% deposit required
- Existing client boarding → 50% deposit (Needs Confirmation: existing lodging rule if different)
- Grooming → 50% deposit

**Prompt for Workflow AI (Plain Language)**
```text
Create a workflow called “PAY | Apply Deposit Rules (New vs Existing; Lodging vs Other)”.
Trigger when a booking/order is created for a service.
If the service type is Boarding (lodging) AND PP - Client Type = New, require 100% deposit before confirmation.
For all other services, require 50% deposit.
After payment succeeds, tag the contact PAY - Deposit Paid and send a confirmation message.
Block booking confirmation if payment fails or is incomplete.
Log the calculated deposit amount to a custom field for reporting.
```

---

## E) Active Stay Communications Workflows

### E1 — STAY | Check-In Starts Stay State + Enables Webcams + Daily Updates

**GOAL**  
When a pet checks in, enable portal webcam access, start daily update loop, and set correct stay status.

**TRIGGER**
- Stay status changes to `Checked In` (from Stay custom object)
- Or tag added `STAY - Checked In`

**REQUIRED INPUTS**
- Stay record exists
- Pet and Pet Parent linked
- Tags: `STAY - Checked In`, `STAY - Daily Updates Active`
- Update schedule time (4 PM) configured

**STEPS (BUILD ORDER)**
1. Add tag `STAY - Checked In`
2. Set Stay status = Checked In
3. Set `STAY - Webcam Enabled` = true
4. Add tag `STAY - Daily Updates Active`
5. Start workflow `REPORT | Daily Pup-Date Loop`

**EXIT CRITERIA**
- Pet parent has webcam access enabled
- Daily updates loop is running

**TEST CASES**
- Check in a pet → webcam section becomes available in portal
- Daily update loop begins

**Prompt for Workflow AI (Plain Language)**
```text
Create workflow “STAY | Check-In Starts Stay State + Enables Webcams + Daily Updates”.
Trigger when the Stay record status becomes Checked In (or tag STAY - Checked In is added).
Actions:
- Add tag STAY - Checked In to the pet parent contact.
- Set STAY - Webcam Enabled = true.
- Add tag STAY - Daily Updates Active.
- Add the contact to workflow “REPORT | Daily Pup-Date Loop”.
Stop if the stay status is not Checked In.
Prevent duplicate enrollments if the tag is already present.
```

### E2 — REPORT | Daily Pup-Date Loop (4 PM)

**GOAL**  
Send daily update messages (SMS/email) while a pet is in an active stay.

**TRIGGER**
- Tag added: `STAY - Daily Updates Active`

**REQUIRED INPUTS**
- Pet is still checked in (Stay status)
- Templates:
  - `STAY | Daily Update SMS`
  - `STAY | Daily Update Email`
- Optional: internal report card notes captured somewhere (Needs Confirmation)

**STEPS (BUILD ORDER)**
1. Wait until 4:00 PM (location timezone)
2. Verify pet is still checked in:
   - Stay status = Checked In/In Stay
   - If not, remove `STAY - Daily Updates Active` and stop
3. Send daily update SMS/email
4. Loop back to step 1 (repeat daily) until checked out

**EXIT CRITERIA**
- Stops automatically at checkout (tag removed or stay status changes)

**TEST CASES**
- Active stay → daily message at 4 PM
- Checkout occurs → loop stops; no further messages

**Prompt for Workflow AI (Plain Language)**
```text
Create workflow “REPORT | Daily Pup-Date Loop (4 PM)”.
Trigger when tag STAY - Daily Updates Active is added.
Wait until 4:00 PM in the location’s timezone.
Before sending, check that the pet’s current Stay status is Checked In (or In Stay). If not, remove STAY - Daily Updates Active and stop.
If active, send SMS template “STAY | Daily Update SMS” and email template “STAY | Daily Update Email”.
Then wait until the next day at 4:00 PM and repeat.
Add guardrails so the contact is only enrolled once.
```

### E3 — REPORT | Nightly “Tucked In” SMS (Optional)

**GOAL**  
Send a simple nightly reassurance text during stays.

**TRIGGER**
- Tag `STAY - Checked In` present AND nightly time reached

**REQUIRED INPUTS**
- Template: `STAY | Tucked In SMS`
- Time (Needs Confirmation: suggested 8–9 PM)

**STEPS**
1. Wait until nightly time
2. Confirm stay active
3. Send SMS
4. Repeat daily until checkout

**Prompt for Workflow AI (Plain Language)**
```text
Create workflow “REPORT | Nightly Tucked-In SMS”.
Trigger when tag STAY - Checked In is present.
Every day at 8:00 PM, verify stay is still active; if yes, send SMS “JoJo was tucked in for the night; all is well.”
Stop automatically when STAY - Checked Out tag is added or stay status changes.
```

### E4 — REPORT | End-of-Stay Report Card Delivery

**GOAL**  
Deliver a full report card at checkout (preferred over daily full reports).

**TRIGGER**
- Stay status changes to `Checked Out`
- Or tag added `STAY - Checked Out`

**REQUIRED INPUTS**
- Report card data source (form or staff notes) *(Needs Confirmation)*
- Email template `REPORT | End-of-Stay Report Card`
- Optional SMS notification `REPORT | Report Card Sent`

**STEPS**
1. Remove `STAY - Daily Updates Active`
2. Generate report card summary (manual or automated)
3. Send report card email to pet parent
4. Tag `STAY - Report Card Pending` removed / `REPORT - Sent` added
5. Trigger feedback request workflow

**Prompt for Workflow AI (Plain Language)**
```text
Create workflow “REPORT | End-of-Stay Report Card Delivery”.
Trigger when stay status becomes Checked Out.
Remove tag STAY - Daily Updates Active.
Send an email “REPORT | End-of-Stay Report Card” that includes the report card summary or a secure link.
Then trigger “ADMIN | Feedback Request After Stay”.
Ensure the report card is only sent once per stay.
```

---

## F) Training Workflows

### F1 — TRAIN | Force Orientation/Consultation Before Training Enrollment

**GOAL**  
Ensure no one can enroll into Bark University/Puppy Academy tiers without completing orientation or consultation.

**TRIGGER**
- Appointment booked for a training program (other than orientation/consultation)
- Training enrollment request submitted via portal

**REQUIRED INPUTS**
- Pet field: `PET - Orientation Completed` / `PET - Consultation Completed`
- Calendar services defined

**STEPS**
1. If orientation/consultation not completed:
   - Block enrollment (portal) OR cancel appointment
   - Send message: “Please book Orientation (Sat 1 PM) or Consultation (30 min) first”
   - Provide booking links
2. If completed:
   - allow enrollment
   - move to Training pipeline stage “Tier Assigned / In Progress”

**Prompt for Workflow AI (Plain Language)**
```text
Create workflow “TRAIN | Force Orientation/Consultation Before Training Enrollment”.
Trigger when a training booking/enrollment is created for Bark University or Puppy Academy (excluding Orientation and Consultation services).
If PET - Orientation Completed is false AND PET - Consultation Completed is false, cancel or mark the request as invalid, add tag TRAIN - Orientation Required, and send the client an email/SMS with links to book Orientation (Saturday 1 PM, max 4) or a 30-minute Consultation.
If one is completed, allow the training booking and proceed normally.
```

---

## G) Membership & Elevated Play Workflows

### G1 — MEM | Elevated Play Membership Purchase → Status + Benefits

**GOAL**  
Track membership status and apply benefits only to eligible Elevated Play attendees.

**TRIGGER**
- Purchase of membership product (Elevated Play)

**REQUIRED INPUTS**
- Product: `Elevated Play Membership` *(Needs Confirmation: tiers and pricing)*
- Field: `PET - Attendance Frequency` or contact-level schedule
- Tag: `MEM - Elevated Play Active`

**STEPS**
1. Add tag `MEM - Elevated Play Active`
2. Set `PP - Membership Status` = Elevated Play
3. (Optional) Set attendance frequency 1–5x/wk (per client selection)
4. Apply benefit rules (discounts, booking allowances, etc.) *(Needs Confirmation)*

**Transcript anchors (membership intent):**

- **October 15 @ 14:00 (Mykel Stanley)** — You're good with them. The first thing would be, so we got all the vaccines. As you see, I did this today just to make sure that it would populate, and I submitted these. I approved them on our end. So the next step that…
- **October 15 @ 19:00 (Karoline Brewer)** — My question is, if we fill out, you know, if they say it's a Brittany mix or a Pitbull mix or whatever, then they're the ones who say it's under 25 pounds. They're the ones who say it's short, light, medium.
- **October 15 @ 20:43 (Mykel Stanley)** — yeah, I think you guys would, you guys would get that picture and you would look at that breed that she put in and then, you know, cause it already pinned to review because it was a mix up. It probably not the right dog.…
- **October 15 @ 26:37 (Ariel Rodriguez Castro)** — And one thing that I added to that drive folder today was information about the PALS plan. So I uploaded a bunch of our rack cards for like training, PALS plan, daycare, grooming, so you guys can get more of that. So tha…
- **October 29 @ 0:01 (StrategixAI)** — She's out and she would be back on the 5th. Yeah, November 5th. She's in Budapest.
- **October 29 @ 5:45 (StrategixAI)** — Yeah, other than that, I think that's it. Well, it was nice catching up with you, Ariel. ACTION ITEM: Confirm next check-in w/ Mykel & StrategixAI: Nov 5 or 7 - WATCH

**Prompt for Workflow AI (Plain Language)**
```text
Create workflow “MEM | Elevated Play Membership Purchase → Status + Benefits”.
Trigger when the Elevated Play membership product is purchased successfully.
Set PP - Membership Status = Elevated Play and add tag MEM - Elevated Play Active.
If the purchase form captures attendance frequency (1–5x/week), store it in PET - Attendance Frequency.
Apply membership benefits only to clients who are participating in Elevated Play (not overnight-only clients). If a client is overnight-only, notify staff for manual review.
Send a welcome email explaining benefits and how to book.
```

---

## H) Store & Retail Workflows

### H1 — STORE | Order Placed → Fulfillment + Accounting Sync

**GOAL**  
When a store order is placed, route it for pickup/delivery and sync to QuickBooks (preferred) or Stripe.

**TRIGGER**
- New order paid in GHL store

**REQUIRED INPUTS**
- Order details (items, SKUs)
- Fulfillment preference field (Pickup/Delivery) *(Needs Confirmation)*
- Accounting integration:
  - QuickBooks (preferred)
  - Stripe fallback

**STEPS**
1. Tag contact `STORE - Order Placed`
2. Create opportunity in `Store Orders` pipeline stage `Order Placed`
3. Notify staff (Karoline/Ariel) with order summary
4. If pickup:
   - set stage `Ready for Pickup` when packed
   - send pickup instructions
5. If delivery:
   - set stage `Shipped` when shipped
   - send tracking info (Needs Confirmation)
6. Sync invoice/transaction to QuickBooks (or record Stripe receipt)

**Transcript anchors (QuickBooks + store):**

- **October 29 @ 2:58 (StrategixAI)** — Yeah, I've got one thing, so we were able. to grab all of the packages, subscriptions, and your retail listing from Ginger. Okay. So we have all that data. However, when it comes to getting a store up for you guys, we on…
- **October 29 @ 4:06 (Mykel Stanley)** — Yeah. If you got two options, you can either put them in a Google Drive area or you can put them, have your GHL person put them in GHL's media folder and you guys'. Okay. You can store them in either one of those and we …
- **October 29 @ 4:25 (Ariel Rodriguez Castro)** — What I'll do then is I'll put them on the Google Drive just because that girl that we had, our social media person, that was also taking care of our retail is no longer with us. Okay.
- **October 29 @ 4:46 (StrategixAI)** — And then, yeah, I'll leave it up to you guys to decide, you know, what products I guess you, we at least want to start with. Yeah. From the two exports I got, I got one list, which I believe might be your active retail i…

- **November 07 @ 35:41 (Mykel Stanley)** — I say yes, however, strong however, semicolon, is, I cannot predict the accuracy of that, but I will say it'll be over 70, but I have yet, you know, I hate saying that we're not capable, so I've yet to find a... Bulletpr…
- **November 07 @ 44:59 (Mykel Stanley)** — Yeah. I 100% agree. So I'll see you guys Wednesday, and stay safe, and we'll talk then.
- **November 26 @ 36:10 (Karoline Brewer (PawHootz Pet Resort))** — Okay, so I can go in here and I can buy the zippy paws, add it to my cart, proceed to check out my orders. Okay, I just placed an order, but I didn't pay for anything. No, you will be charged. That's how it will work. I'…
- **November 26 @ 36:44 (Kieran Grogan)** — Once we are able to nail down how we're going to run the financial side of it, whether that's going to be through GHL, if there's any certain third-party that you're using primarily, that would dictate the whole process …

**Prompt for Workflow AI (Plain Language)**
```text
Create workflow “STORE | Order Placed → Fulfillment + Accounting Sync”.
Trigger when an ecommerce order is marked as paid.
Add tag STORE - Order Placed and create an opportunity in the Store Orders pipeline at stage “Order Placed”.
Send internal notification to Karoline and Ariel with order items, total, and customer name.
If fulfillment preference is Pickup, send an email/SMS: “Your order is being prepared; we will notify you when ready for pickup.”
If Delivery/Shipping is enabled, create a task for staff to ship and capture tracking; then message the customer.
Sync the transaction to QuickBooks if integration is enabled; otherwise log the order ID and amount in custom fields for manual reconciliation.
```

---

## I) Admin / Data Quality Utilities

### I1 — ADMIN | Prevent Duplicate Pets / Records
- [ ] When a pet is created, check for existing pet with same name + owner before creating duplicate.
- [ ] If duplicate detected, notify staff and halt.

### I2 — ADMIN | Ginger Data Import QA
- [ ] Validate all products imported (names, SKUs, pricing)
- [ ] Validate images availability; request missing images from client
- [ ] Validate pet photos export (transcript mentions missing %)


## Email and SMS Templates

> Keep templates short and friendly. Use personalization fields.  
> (Write final copy in your brand voice.)

### Portal
- [ ] `PORTAL | Invite Email`
- [ ] `PORTAL | Invite SMS`
- [ ] `PORTAL | Onboarding Reminder`

### Vaccines
- [ ] `VAX | Submitted Confirmation`
- [ ] `VAX | Approved Notice`
- [ ] `VAX | Rejected - Resubmit`

### Booking/Payments
- [ ] `BOOK | Deposit Required`
- [ ] `BOOK | Confirmation`
- [ ] `BOOK | Payment Failed`

### Stay Updates
- [ ] `STAY | Daily Update SMS`
- [ ] `STAY | Daily Update Email`
- [ ] `STAY | Tucked In SMS`
- [ ] `REPORT | End-of-Stay Report Card`

### Training
- [ ] `TRAIN | Book Orientation`
- [ ] `TRAIN | Tier Assigned`

### Store
- [ ] `STORE | Order Confirmation`
- [ ] `STORE | Ready for Pickup`
- [ ] `STORE | Shipped`

### Feedback
- [ ] `FEEDBACK | Post-Stay Request`


## Products Store Packages and Subscriptions

### Data source
Products/packages/subscriptions imported from Ginger.

**Transcript anchors (product import + missing images):**

- **October 29 @ 2:58 (StrategixAI)** — Yeah, I've got one thing, so we were able. to grab all of the packages, subscriptions, and your retail listing from Ginger. Okay. So we have all that data. However, when it comes to getting a store up for you guys, we on…
- **October 29 @ 4:06 (Mykel Stanley)** — Yeah. If you got two options, you can either put them in a Google Drive area or you can put them, have your GHL person put them in GHL's media folder and you guys'. Okay. You can store them in either one of those and we …
- **October 29 @ 4:25 (Ariel Rodriguez Castro)** — What I'll do then is I'll put them on the Google Drive just because that girl that we had, our social media person, that was also taking care of our retail is no longer with us. Okay.

### Product groups to configure
- [ ] Retail products (SKUs, pricing, inventory if needed)
- [ ] Service deposits (boarding, grooming, training)
- [ ] Packages:
  - [ ] Daycare multi-day packages (1 day, 2 day, 3 day, 5 day, etc.) *(Needs Confirmation: exact names/prices)*
  - [ ] Training session packages (4, 6, 12 sessions referenced) *(Needs Confirmation: exact details)*
  - [ ] Diamond packages (bundle: daycare + training + membership fee possibly) *(Needs Confirmation)*
- [ ] Subscriptions / memberships:
  - [ ] Elevated Play membership (rebrand to reduce confusion per transcript)

### Packaging / accounting note (important)
Transcript indicates some bundles are currently charged as multiple line items (e.g., “diamond package” may split into multiple charges for training/daycare/membership fee).  
If PawHootz prefers one client-facing charge, implement:
- [ ] one product for checkout
- [ ] back-end mapping to accounting categories (QuickBooks classes/items) via integration rules or middleware


## Integrations

### iDogCam (Webcams)
- [ ] Confirm iDogCam integration method:
  - embed viewer
  - API-based access with secure token
  - SSO-like experience (ideal)
- [ ] Ensure webcam view is only available when pet is checked in.
- [ ] Confirm which cameras are allowed (play yards) and current count (4 → 5).

### QuickBooks (preferred)
- [ ] Confirm current QuickBooks plan and integration availability.
- [ ] Decide whether to:
  - sync customers + invoices from GHL to QuickBooks
  - or keep QuickBooks as source of truth and push summaries
- [ ] If GHL native integration is insufficient:
  - use middleware (Make/Zapier/custom) to create invoices, map SKUs, and reconcile.

**Transcript anchors (QuickBooks preference + store deadline):**

- **November 07 @ 35:41 (Mykel Stanley)** — I say yes, however, strong however, semicolon, is, I cannot predict the accuracy of that, but I will say it'll be over 70, but I have yet, you know, I hate saying that we're not capable, so I've yet to find a... Bulletpr…
- **November 07 @ 44:59 (Mykel Stanley)** — Yeah. I 100% agree. So I'll see you guys Wednesday, and stay safe, and we'll talk then.
- **November 26 @ 36:10 (Karoline Brewer (PawHootz Pet Resort))** — Okay, so I can go in here and I can buy the zippy paws, add it to my cart, proceed to check out my orders. Okay, I just placed an order, but I didn't pay for anything. No, you will be charged. That's how it will work. I'…
- **November 26 @ 36:44 (Kieran Grogan)** — Once we are able to nail down how we're going to run the financial side of it, whether that's going to be through GHL, if there's any certain third-party that you're using primarily, that would dictate the whole process …
- **November 26 @ 37:02 (Karoline Brewer (PawHootz Pet Resort))** — And I don't know when we need to start that conversation, but what we had talked about originally was that we use QuickBooks and it would be really, really nice if daily QuickBooks was updated with our financial informat…
- **November 26 @ 37:46 (StrategixAI (strategixai@gmail.com))** — Can you do it? I think so, as long as we don't have any issues with the payment processing and making sure.
- **November 26 @ 37:54 (Kieran Grogan)** — Yeah, I mean, you could even set up a temporary Stripe payment process for the time being if you wanted to get it up. I think I already have a Stripe set up.
- **November 26 @ 38:20 (Karoline Brewer (PawHootz Pet Resort))** — I would prefer to use QuickBooks if we can just because it's already, that's how we do all of our financial reporting. So that would make our lives a lot easier.

### Stripe (fallback / temporary)
- [ ] If QuickBooks integration delays store launch, use Stripe temporarily for checkout.
- [ ] Ensure accounting export is possible for reconciliation.

### Ginger (migration)
- [ ] Export:
  - contacts/pet parents
  - pets
  - packages/subscriptions
  - retail products
  - images (missing in export)
- [ ] Import into GHL and validate mapping.


## Roles and Permissions

### Recommended roles
- **Admin (StrategixAI / Owner)** — full access (Admin-only configs)
- **Ops Manager (Karoline/Ariel)** — workflows, pipelines, orders, messaging, calendars
- **Front Desk** — contacts, check-in/out status updates, booking assistance
- **Grooming Team** — grooming notes, grooming calendar, limited contact access
- **Training Team** — training calendar, tier assignment, notes
- **VAs (limited)** — data entry, template edits, tags (VA-safe only)

### VA-safe vs Admin-only
**VA-safe examples**
- tags creation
- pipeline stage edits
- template copy edits
- workflow step edits (when no integrations/billing touched)

**Admin-only examples**
- payments providers, QuickBooks/Stripe integrations
- domain/email sending setup
- user permissions/roles
- API keys and custom code webhooks


## QA Testing and Launch

### End-to-end test scripts (minimum)
- [ ] Create a new pet parent + add a pet
- [ ] Submit waivers + vaccines → ensure pending review triggers
- [ ] Staff approves vaccines → ensure booking unlocks
- [ ] Submit behavior form with red flags → ensure staff icon/flag triggers
- [ ] Book boarding (new client) → verify 100% deposit required
- [ ] Check in pet → verify webcams enable + daily updates loop starts
- [ ] Verify 4 PM daily update sends
- [ ] Check out pet → verify daily loop stops + report card sent + feedback request triggers
- [ ] Place a store order → verify staff notified + pipeline updated + accounting sync attempt
- [ ] Book training → verify orientation/consultation required gate works

### Launch / Cutover plan
- [ ] Freeze Ginger new account creation date (communicate to staff)
- [ ] Import final deltas from Ginger
- [ ] Run QA scripts
- [ ] Staff training session (30–60 min)
- [ ] Soft launch with internal pets (Karoline’s dogs) per transcript intent
- [ ] Full launch


## Appendix Transcript Anchors

Use these to justify build decisions or revisit intent quickly.

### Webcams / iDogCam

- **October 15 @ 2:12 (Mykel Stanley)** — Been struggling. We just had, my family just went through COVID. I didn't even know that was a thing still, so. Right? Peeking its head back around. This meeting is actually going to be pretty short, on my side at least,…
- **October 15 @ 3:05 (Karoline Brewer)** — Yeah, once they check in, through the Ginger app, they're able to go in and look at certain cameras. That's pretty cool. We only do play yards, some inside, some outside. It's not like it's every run. We have four right …
- **October 15 @ 3:50 (Mykel Stanley)** — Well, I guess the question I have is, one, where would you want it at in here? I, you know, how would you want them to see that? ACTION ITEM: Connect w/ Aaron (iDogCam) re API integration for webcam feature - WATCH And t…
- **October 15 @ 10:27 (Ariel Rodriguez Castro)** — You can see the view on the side, over here, where it's under account, and then live webcam. How cool is this?
- **October 15 @ 11:27 (Karoline Brewer)** — Anyway, so you can go to the different phones. mean, the different cameras. Okay.
- **October 15 @ 11:33 (Mykel Stanley)** — So we'll do the similar here. I'll tell you what, what about like a sidebar that just like what you have here? We just kind of set one of those up and because it's not dog specific, right? They can kind of see the camera…
- **October 15 @ 12:27 (Ariel Rodriguez Castro)** — The only time that clients get upset about the cameras is if their dog is private cause they don't have set times that they go out. So they have to call or we have to chat with them like, okay, go watch right now. And th…
- **October 15 @ 12:44 (Mykel Stanley)** — they switch every time they switch yards, it could, it could alert them. Right. Right. That's a great idea. So what, yeah, cause we have that whiteboard set up that we had shown and talked about before. So if you guys us…

### Suites / Room tiers

- **October 15 @ 22:15 (Karoline Brewer)** — Standard, sweet, deluxe, sweet. So how is that set up? Like that's not set up to. No, this is just view only right now. ACTION ITEM: Continue dev on boarding/daycare logic in portal - WATCH
- **October 15 @ 22:55 (Karoline Brewer)** — Well, we just don't, we don't let our clients choose the suite. Like. Let's I see. And Ariel, I mean, we even still don't let them upgrade to a KK, do we?
- **October 15 @ 23:09 (Ariel Rodriguez Castro)** — So we have that option still in Ginger, but we don't, that's not something that we really promote, because we use KKs for, like, family dogs or, like, Great Danes, you know, big dogs. So we have six of them, six KKs, whi…
- **October 15 @ 24:21 (Mykel Stanley)** — Well, if you could be like, do you want a deluxe suite or a luxury suite?
- **October 15 @ 24:24 (Ariel Rodriguez Castro)** — But once we sell out, it like doesn't give them the option to book a KK. Yeah, I don't know how that would work.
- **October 15 @ 24:44 (Hunter Draut)** — To jump in, I don't see an issue, but we couldn't do that. Michael, they're just asking if we can have a validation to where if they're full on those extra suites, that it doesn't allow anyone else to book. Oh, yeah, yea…
- **October 15 @ 26:56 (Mykel Stanley)** — Well, I mean, we were definitely heavier on the development side, just getting you guys as. Your logic changed over from theirs, and then also making sure all the data, which we did the data export last week, but making …
- **November 07 @ 15:38 (StrategixAI (strategixai@gmail.com))** — And then besides from that, I did have one other question. So if someone is, I guess before we get to that. So what we've went ahead and started was to match the grooming that we guys have showed you guys previously. We …

### Vaccines / Waivers / AI review

- **October 15 @ 14:00 (Mykel Stanley)** — You're good with them. The first thing would be, so we got all the vaccines. As you see, I did this today just to make sure that it would populate, and I submitted these. I approved them on our end. So the next step that…
- **October 15 @ 19:51 (Mykel Stanley)** — I just set it where it would, they'll be alert. It's kind of like this, right? When somebody submits a vaccine, let me just put a date here so you can see. Okay. Just a second. But what happens is you see this pending re…
- **October 15 @ 20:43 (Mykel Stanley)** — yeah, I think you guys would, you guys would get that picture and you would look at that breed that she put in and then, you know, cause it already pinned to review because it was a mix up. It probably not the right dog.…
- **November 07 @ 7:12 (Mykel Stanley)** — And what's going to happen if weather pick it up or we move forward exactly where they're at or if we start from scratch. So the good thing is, is I do, we, we, we found a way to like jump, I wouldn't say light years, bu…
- **November 07 @ 17:45 (StrategixAI (strategixai@gmail.com))** — Yeah, we can do that. And yeah, what we'll do is, is we'll use a go high level field. So that way, if you guys ever need to change it, reference it, or we need to use it for anything else you can. And it'll basically che…
- **November 07 @ 18:41 (StrategixAI (strategixai@gmail.com))** — One way is we could use GoHighLevel's automation system, and what it'll do is when you guys get a new contact or someone signs up through the app that's new, that means they won't have open a field that simply, you know,…
- **November 07 @ 29:42 (Mykel Stanley)** — So this is kind of like the beginning stages of what we're going to put together for you guys, but this is really showing you that we have all your data in the new system, which is great. ACTION ITEM: Build front-desk bo…
- **November 26 @ 9:36 (StrategixAI (strategixai@gmail.com))** — And then, yeah, for high level, we can just utilize their media storage. And I was actually double checking this with the vaccine upload so we can set it up to where whatever folder structure works best for you, whether,…

### Behavior / Bite history / Private play

- **November 07 @ 19:45 (Karoline Brewer (PawHootz Pet Resort))** — But if, so let's say the client fills out the form and there's a question on that form that was filled out as, you know, yes, this is like a red flag, this this dog. So aggressive with other dogs, or this dog has a bite …
- **November 07 @ 20:33 (StrategixAI (strategixai@gmail.com))** — So in terms of, you know, what we can do with that is exactly what you're saying, really. And what we did for Champ was they had a big emphasis on identifying dogs, like you said, with bite history. So before anyone was …
- **November 07 @ 21:41 (Karoline Brewer (PawHootz Pet Resort))** — So like if they fill out a form and question five, they answer yes, could that trigger an automatic icon or an automatic, you know, this dog goes into private play or something along those lines? Yes, we can. It's just, …
- **November 07 @ 22:33 (Karoline Brewer (PawHootz Pet Resort))** — So I think that would be a way of avoiding human error. So on that aggressive behavior, we identify, if your dog's people aggressive, you know, we go down a certain path, we say, we don't take you. Um, if your, if your d…
- **November 07 @ 23:13 (StrategixAI (strategixai@gmail.com))** — And there's a couple of different things we can do for that. If you're not sure if you want to have, right, an automatic kick, we can give you guys maybe, like, a report, like, hey, you guys have had five people who sign…
- **December 10 @ 23:35 (Karoline Brewer (PawHootz Pet Resort))** — And then if they sign up, I mean, I would assume we would have Debra call them and just make sure the dog's not aggressive or they've already filled out the form. So we know if the dog has aggression. And if she sees tha…

### Report cards / Pup-dates

- **October 15 @ 8:35 (Karoline Brewer)** — I guess I haven't updated my... All right.
- **October 29 @ 2:49 (Mykel Stanley)** — That's how all business owners are. I'm sure people would say that about me. I don't have any updates for you or nothing, so. Cool, cool. Hunter's got stuff, go ahead.
- **November 07 @ 9:22 (StrategixAI (strategixai@gmail.com))** — Should be... All right, so one of the things I've been working on since we've gotten all of your old product listings from Ginger is trying to go through that and then start plugging it in, you know, offering your servic…
- **November 07 @ 10:34 (Karoline Brewer (PawHootz Pet Resort))** — I'm just, so in the long run, can we go in and edit that? That's not something you have to maintain? ACTION ITEM: Update GHL services/products per pricing sheet: copy base training desc; set lodging tiers S/M/L/XL; add p…
- **November 07 @ 15:38 (StrategixAI (strategixai@gmail.com))** — And then besides from that, I did have one other question. So if someone is, I guess before we get to that. So what we've went ahead and started was to match the grooming that we guys have showed you guys previously. We …
- **November 07 @ 25:39 (StrategixAI (strategixai@gmail.com))** — Yeah, can go ahead and switch out here. So yeah, moving forward, I'll update with that pricing sheet for anything that was maybe a little short. We can add, you know, that extra information you guys have got. For example…
- **November 07 @ 31:17 (Karoline Brewer (PawHootz Pet Resort))** — Question, because we're bringing so much information over, is there a way for us to go through our top 100 or 200 or 300 clients and actually put that information in? Because if we know this dog is going to be grooming o…
- **November 12 @ 7:49 (Mykel Stanley)** — That's what we were going to propose to you guys, instead of just kind of at, we, we, we can tackle it all again tomorrow. Uh, I'm pretty open tomorrow afternoon. Um, but we'll still send that test stuff to you. yeah. As…

### Store / Retail products

- **October 29 @ 2:58 (StrategixAI)** — Yeah, I've got one thing, so we were able. to grab all of the packages, subscriptions, and your retail listing from Ginger. Okay. So we have all that data. However, when it comes to getting a store up for you guys, we on…
- **October 29 @ 4:06 (Mykel Stanley)** — Yeah. If you got two options, you can either put them in a Google Drive area or you can put them, have your GHL person put them in GHL's media folder and you guys'. Okay. You can store them in either one of those and we …
- **October 29 @ 4:25 (Ariel Rodriguez Castro)** — What I'll do then is I'll put them on the Google Drive just because that girl that we had, our social media person, that was also taking care of our retail is no longer with us. Okay.
- **October 29 @ 4:46 (StrategixAI)** — And then, yeah, I'll leave it up to you guys to decide, you know, what products I guess you, we at least want to start with. Yeah. From the two exports I got, I got one list, which I believe might be your active retail i…
- **November 07 @ 9:22 (StrategixAI (strategixai@gmail.com))** — Should be... All right, so one of the things I've been working on since we've gotten all of your old product listings from Ginger is trying to go through that and then start plugging it in, you know, offering your servic…
- **November 07 @ 10:34 (Karoline Brewer (PawHootz Pet Resort))** — I'm just, so in the long run, can we go in and edit that? That's not something you have to maintain? ACTION ITEM: Update GHL services/products per pricing sheet: copy base training desc; set lodging tiers S/M/L/XL; add p…
- **November 07 @ 11:19 (StrategixAI (strategixai@gmail.com))** — And yeah, so these are already, we've actually got the training already in GoHighLevel. And then some of your guys' other services were already in there, but we did have some issues. I spoke to Ariel about where, for exa…
- **November 07 @ 12:05 (Karoline Brewer (PawHootz Pet Resort))** — So in terms of the descriptions, I would say if it's an obvious that, you know, there's a baseline training silver, and then it's six sessions, 12 sessions, copy the baseline to the six and the 12. Okay. Gotcha. If it's …

### Payments / Deposits

- **November 07 @ 35:41 (Mykel Stanley)** — I say yes, however, strong however, semicolon, is, I cannot predict the accuracy of that, but I will say it'll be over 70, but I have yet, you know, I hate saying that we're not capable, so I've yet to find a... Bulletpr…
- **November 07 @ 44:59 (Mykel Stanley)** — Yeah. I 100% agree. So I'll see you guys Wednesday, and stay safe, and we'll talk then.
- **November 26 @ 36:10 (Karoline Brewer (PawHootz Pet Resort))** — Okay, so I can go in here and I can buy the zippy paws, add it to my cart, proceed to check out my orders. Okay, I just placed an order, but I didn't pay for anything. No, you will be charged. That's how it will work. I'…
- **November 26 @ 36:44 (Kieran Grogan)** — Once we are able to nail down how we're going to run the financial side of it, whether that's going to be through GHL, if there's any certain third-party that you're using primarily, that would dictate the whole process …
- **November 26 @ 37:02 (Karoline Brewer (PawHootz Pet Resort))** — And I don't know when we need to start that conversation, but what we had talked about originally was that we use QuickBooks and it would be really, really nice if daily QuickBooks was updated with our financial informat…
- **November 26 @ 37:46 (StrategixAI (strategixai@gmail.com))** — Can you do it? I think so, as long as we don't have any issues with the payment processing and making sure.
- **November 26 @ 37:54 (Kieran Grogan)** — Yeah, I mean, you could even set up a temporary Stripe payment process for the time being if you wanted to get it up. I think I already have a Stripe set up.
- **November 26 @ 38:20 (Karoline Brewer (PawHootz Pet Resort))** — I would prefer to use QuickBooks if we can just because it's already, that's how we do all of our financial reporting. So that would make our lives a lot easier.

### Training programs

- **November 07 @ 12:05 (Karoline Brewer (PawHootz Pet Resort))** — So in terms of the descriptions, I would say if it's an obvious that, you know, there's a baseline training silver, and then it's six sessions, 12 sessions, copy the baseline to the six and the 12. Okay. Gotcha. If it's …
- **December 10 @ 21:18 (Hunter Draut)** — And for the Ark University, I was getting that added, but I wasn't sure, you know, from your old owner and user point of view, are they selecting their tier, or are they assigned a tier from you guys for a beginner and i…
- **December 10 @ 21:49 (Ariel Rodriguez Castro)** — I mean, Bark University has those tiers, but that's why they have to go to the orientation first before they get, you know, thrown straight into beginner class, because we need to see where they're at. Okay? Um, Because …
- **December 10 @ 22:17 (Hunter Draut)** — So what I can do when I have that option in the client portal, I know you guys already have it in your description. So I do know about the orientation. So I just make note of that and then, you know, just let the user kn…
- **December 10 @ 22:37 (Karoline Brewer (PawHootz Pet Resort))** — What is the difference between orientation and consultation? Orientation is a set day where they can go to a group class or?
- **December 10 @ 22:45 (Ariel Rodriguez Castro)** — It's only on Saturdays. Every Saturday at one o'clock that slot is reserved for orientation if someone wants to come. It's, yeah, a consultation. more than one person could sign up for it, right? Orientation, yeah. Yes. …
- **December 10 @ 23:16 (Hunter Draut)** — And for the orientation sign-up, is that something you want to include in the client portal? Is that something you guys want to have your pet owners reach out to you?
- **December 10 @ 23:29 (Karoline Brewer (PawHootz Pet Resort))** — I would think orientation, we would want them to be able to sign up. Yeah.

### Membership / Elevated Play / Punches

- **October 15 @ 14:00 (Mykel Stanley)** — You're good with them. The first thing would be, so we got all the vaccines. As you see, I did this today just to make sure that it would populate, and I submitted these. I approved them on our end. So the next step that…
- **October 15 @ 19:00 (Karoline Brewer)** — My question is, if we fill out, you know, if they say it's a Brittany mix or a Pitbull mix or whatever, then they're the ones who say it's under 25 pounds. They're the ones who say it's short, light, medium.
- **October 15 @ 20:43 (Mykel Stanley)** — yeah, I think you guys would, you guys would get that picture and you would look at that breed that she put in and then, you know, cause it already pinned to review because it was a mix up. It probably not the right dog.…
- **October 15 @ 26:37 (Ariel Rodriguez Castro)** — And one thing that I added to that drive folder today was information about the PALS plan. So I uploaded a bunch of our rack cards for like training, PALS plan, daycare, grooming, so you guys can get more of that. So tha…
- **October 29 @ 0:01 (StrategixAI)** — She's out and she would be back on the 5th. Yeah, November 5th. She's in Budapest.
- **October 29 @ 5:45 (StrategixAI)** — Yeah, other than that, I think that's it. Well, it was nice catching up with you, Ariel. ACTION ITEM: Confirm next check-in w/ Mykel & StrategixAI: Nov 5 or 7 - WATCH
- **October 29 @ 5:50 (Ariel Rodriguez Castro)** — All right, sounds good. I'll talk to you guys next week. I mean, she said she'd be in the 5th. What's that? So literally next Wednesday, she'll be in-house. So... you need to push to like Friday or something, let us know…
- **October 29 @ 6:14 (Ariel Rodriguez Castro)** — Thanks. Pawhootz Weekly Check-in - November 07 VIEW RECORDING - 45 mins (No highlights)

### Grooming

- **October 15 @ 2:12 (Mykel Stanley)** — Been struggling. We just had, my family just went through COVID. I didn't even know that was a thing still, so. Right? Peeking its head back around. This meeting is actually going to be pretty short, on my side at least,…
- **October 15 @ 5:08 (Karoline Brewer)** — Except my computer has been running at a snail's pace. Let me see. You can send it to Strategix's email.
- **October 15 @ 7:29 (Karoline Brewer)** — I can't send it all to my phone. Some has to send it. Let me go find Oliver, Oliver. I don't even remember how to do any of this. I'm going to make a new grooming. No, that'll freak them out. Yeah, I'll do it. I'd be lik…
- **October 15 @ 11:03 (Karoline Brewer)** — There we go. Who's picking at their fingernails? Oh, is that a phone? Oh, getting people in trouble.
- **October 15 @ 14:00 (Mykel Stanley)** — You're good with them. The first thing would be, so we got all the vaccines. As you see, I did this today just to make sure that it would populate, and I submitted these. I approved them on our end. So the next step that…
- **October 15 @ 17:24 (Mykel Stanley)** — One of them is, if this, excuse me if I'm wrong here, but a Labrador, if it was anywhere in this arena, like Barry was anywhere in this arena of breed, it actually, even with two dogs, analyzes the one that's correct. Ok…
- **October 15 @ 20:43 (Mykel Stanley)** — yeah, I think you guys would, you guys would get that picture and you would look at that breed that she put in and then, you know, cause it already pinned to review because it was a mix up. It probably not the right dog.…
- **October 15 @ 21:45 (Mykel Stanley)** — And once we get that final export done where everything, you guys are saying this is good, and then the choices over here on grooming are good, then we can click publish on this part of the build, and then the calendars …

### Data migration from Ginger

- **October 15 @ 3:05 (Karoline Brewer)** — Yeah, once they check in, through the Ginger app, they're able to go in and look at certain cameras. That's pretty cool. We only do play yards, some inside, some outside. It's not like it's every run. We have four right …
- **October 15 @ 4:27 (Mykel Stanley)** — Are you wanting to, you know, when it checks them in, what happens now? Do they go into, you got Ginger and they see it in there? Or how does that work? Yeah, they go into Ginger and see it.
- **October 15 @ 7:08 (Karoline Brewer)** — It takes forever to sign them because there's 16 different security measures. Which I know is important, but still.
- **October 15 @ 21:45 (Mykel Stanley)** — And once we get that final export done where everything, you guys are saying this is good, and then the choices over here on grooming are good, then we can click publish on this part of the build, and then the calendars …
- **October 15 @ 23:09 (Ariel Rodriguez Castro)** — So we have that option still in Ginger, but we don't, that's not something that we really promote, because we use KKs for, like, family dogs or, like, Great Danes, you know, big dogs. So we have six of them, six KKs, whi…
- **October 15 @ 25:37 (Mykel Stanley)** — And then from there, Hunter, were you in here when we talked about the cameras, the iCam? Nope. I got here like three minutes ago. Sorry, guys. We're going to give them a sidebar here. And she showed me the camera thing …
- **October 15 @ 26:56 (Mykel Stanley)** — Well, I mean, we were definitely heavier on the development side, just getting you guys as. Your logic changed over from theirs, and then also making sure all the data, which we did the data export last week, but making …
- **October 29 @ 0:53 (Mykel Stanley)** — Yeah, it's actually not a big deal because as of like an hour ago, half of the Internet is down right now. So we were trying to tighten some things up to show you, and it was having some issues, and I own a golf simulato…