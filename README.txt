STRATA MARQUEE CRM — SETUP
==========================

App address:  https://stratamarqueegroup.github.io/strata-crm/
Repository:   https://github.com/stratamarqueegroup/strata-crm
Firebase:     stratamarquee-crm
Admins (all three equal: every lead, import/export, assign, delete, team, approvals):
              stratamarqueegroup@gmail.com
              rhovie.stratamarqueegroup@gmail.com
              admin.stratamarqueegroup@gmail.com
Anyone else who signs in is a rep only after an admin approves them.


FILES
-----
index.html            the CRM
sw.js                 lets the app open with no internet
firestore.rules       security rules (pasted into Firebase, see step 1)
README.txt            this file
manifest.webmanifest  + icon-192.png + icon-512.png
                      needed for "Add to Home Screen" / "Install app" with the app's name and icon

strata-crm-backup.json is NOT part of the app. It holds your lead data. Keep it private:
never upload it to GitHub (the repository is public). Delete it after step 4.


STEP 0 — Check the API key (1 minute)
-------------------------------------
Two different keys were pasted during setup: one with "D6z", one with "D6x".
index.html uses:  AIzaSyD6zAJxfNnYiAOiqBOJ0xVKj-5P8FUcPi4
In Firebase: gear icon -> Project settings -> Your apps -> Strata CRM -> apiKey.
If yours differs, open index.html on GitHub, click the pencil icon, search for "AIzaSy",
replace that one line, and commit. A wrong key makes every sign-in fail.


STEP 1 — Security rules (2 minutes)
-----------------------------------
Firebase -> Firestore Database -> Rules tab.
Select all the text there, delete it, paste the full contents of firestore.rules, click Publish.


STEP 2 — Upload the app to GitHub (3 minutes)
---------------------------------------------
1. Open https://github.com/stratamarqueegroup/strata-crm
2. Click "Add file" -> "Upload files".
3. Drag in: index.html, sw.js, manifest.webmanifest, icon-192.png, icon-512.png, README.txt
   (firestore.rules is optional here: it only needs to be in Firebase.)
   If files with the same names are already there, uploading replaces them.
4. Click "Commit changes".
5. Settings -> Pages: "Deploy from a branch", branch "main", folder "/ (root)", Save.
6. Wait 1-2 minutes, then open https://stratamarqueegroup.github.io/strata-crm/


STEP 3 — Sign in as admin
-------------------------
Open the app, click "Sign in with Google", choose stratamarqueegroup@gmail.com.
You go straight to the Pipeline.


STEP 4 — Move your data in (one time)
-------------------------------------
Dashboard -> "Move data from the Claude version" -> Import backup file -> strata-crm-backup.json
(214 leads, call history, assignments, team.) Running it twice adds nothing.
Then Pipeline -> Import CSV -> CRM_Import_1_Ready_to_Call.csv (the 848 organized leads).


STEP 5 — Your team
------------------
1. Send Rhovie and admin.stratamarqueegroup the app address. They sign in with Google and go
   straight in as admins.
2. Rhovie is linked to "Rhovie" on the team automatically, so "Mine" shows her leads.
3. Dashboard -> Team: next to the right name, choose admin.stratamarqueegroup's account
   under "Linked account". Remove names you don't use.
4. Pipeline -> filter (e.g. by campaign) -> "Assign N shown leads to..." -> a person or "Split evenly".
   Use the "Mine" filter to work only your own leads.
Any future rep you add signs in, waits under Dashboard -> Access requests, and once approved
sees ONLY the leads assigned to them.


STEP 6 — Install on phones and computers
----------------------------------------
iPhone:   open the address in Safari -> Share -> Add to Home Screen.
          If Google sign-in won't finish inside the installed app, sign in once in Safari first.
Android:  Chrome -> menu -> Install app.
Computer: Chrome -> install icon at the right end of the address bar.


HOW OFFLINE WORKS
-----------------
- Sign in once with internet. After that the app opens and works with no connection.
- Every change saves on the device first. The pill at the top shows:
  "Offline - 3 to sync", "Syncing...", "Synced", or "1 conflict".
- When the connection returns, changes upload automatically.
- If two people changed the same field, nothing is overwritten: the rep picks
  Keep mine / Keep theirs / Keep both (for notes).


WHO CAN DO WHAT (enforced by the Firebase rules, not just the screen)
---------------------------------------------------------------------
Admins (the three accounts above): every lead, import/export CSV, add/edit/delete/assign leads, team, approvals,
       all calls and dashboard numbers.
Rep:   only leads assigned to them; log calls and outcomes; edit stage, follow-up date,
       notes and contact email; see their own calls. Cannot add, delete, import, export
       or assign leads, cannot see other reps' leads, cannot manage the team.


NOT AVAILABLE IN THIS VERSION
-----------------------------
- Find (lead search): uses Firecrawl, which runs through Claude. The tab explains this.
  Search in the Claude version, Export CSV there, Import CSV here. Duplicates are blocked.
- AI message drafting: needs Claude. Drafts saved earlier still show on each lead.


STILL NEEDS A REAL-WORLD CHECK
------------------------------
The app was tested in a simulated browser against a stand-in Firebase that enforces these
same rules (57 checks: sign-in, approvals, rep-only visibility, offline reload, sync,
conflicts, integrity). It has not run against your live Firebase yet. After setup:
1. Sign in on your computer, import, and assign a few leads to Rhovie.
2. Rhovie signs in on her phone: she sees every lead (she's an admin) and "Mine" shows hers.
3. Put her phone in airplane mode, log a call, then edit the same lead's notes on your computer.
4. Turn airplane mode off: the call syncs, and the notes clash appears for her to resolve.
To check rep-only visibility for real, approve a test Google account as a rep and assign it one lead.
If the Firebase rules editor reports an error when you click Publish, send a screenshot.
