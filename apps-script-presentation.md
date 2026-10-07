# Google Apps Script Presentation

Google Apps script allows you to harness your Google platforms to create embedded automations or web applications without leaving the environment of your Google account.

## Benefits

As compared to writing a fully custom web app outside Google's platform, this tool has the advantage of built in Google features.

* Access to Google Sheets data
* Connection to Google Calendar
* Control of Gmail account
* Access to company directory via People API
* Create and edit Google Docs
* SSO, with access control exactly how you control Google resources like Google Docs etc

## Writing with AI

### Google AI Studio (Not what I have chosen)

Google encourages you to use their own development environment, Google AI Studio. This is not necessary. I chose not to do this because I already have my own development environment I like to use.

https://ai.google.dev/aistudio

### Claude Code (my chosen method)

You can build Google Apps Script applications on your computer using Claude Code or similar programming agents.

I built using Claude Code and `clasp`, Google's open source tool for pushing updates to the Apps Script workspace.

https://developers.google.com/apps-script/guides/clasp

https://github.com/google/clasp

*Upside*

* Use your favorite coding agents
* Popular agents already understand Apps Script APIs well enough to build with very few issues

*Downsides*

* You can't test integrations with Google services until you push them to the Google Apps Script environment.
* Apps Script environment can have a lag between pushing and being able to see your changes

## AI Features

Google Apps Script also has built in AI features. I have not explored this yet. Here are a few of them.

https://developers.google.com/workspace/guides/ai-overview#samples

* Dialogflow - chat bot system
* Gemini - llm agent

## A Few of my Real Use Cases

* Checkin agenda creation, including custom updates for each person I manage
  * Show quick demo
* Generate Onboarding email, using Google Calendar events and createing an email draft in my Gmail, ready to review.
  * Show quick demo

## Today's Use Case

I'm going to demo building a Recipe Box App today. I use a real, physical recipe box with index cards on it (bring this box in for the demo). I do weekly meal planning for my family. To do this, I look ahead one week in my calendar. I check which days I have time to cook, look at my list of regular family dinners, then choose a meal to make each day. On days when I can't cook, we just default to getting takeout.

So our app needs to do the following:

* Maintain a list of regular dinners I like to make (Google Sheets)
* Check for days that have enough time to cook (Google Calendar)
* Choose from my list of dinners for each day with time (will do this on a web app)
* Record my chosen meal onto that day in my calendar (Google Calendar)

## Let's Build!

I'm going to build this step-by-step in the browser. This is a little more straightforward than building using `clasp` as I mentioned. You will be able to follow along on your own computer!


Run As Me = You're scheduling on my calendar

It will show you a scary permissions screen

Unlink the app after the end of the presentation
https://myaccount.google.com/linkedapps