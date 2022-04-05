---
layout: post
title: Better Search Through Listening
date: 2014-09-25T00:00:00.000Z
comments: true
categories: archives
published: true
---
<small>Following is the text for a talk I gave at the 2014 <a href="http://eduiconf.org/">edUi</a> conference in beautiful Richmond, Virginia. Slides for the talk are available <a href="http://hillelarnold.com/edui-listen/#/">here</a>. If you like this talk, you'll also probaby like an <a href="http://blogs.loc.gov/digitalpreservation/2014/09/were-all-digital-archivists-now-an-interview-with-sibyl-schaefer/">interview with my boss Sibyl Schaefer</a> in "The Signal," which covers much of the same territory, although from a more holistic perspective.</small>

Good morning! My name is Hillel, and I’ll be talking to you about a project I’ve been involved in over the past few years to radically overhaul a discovery system for unique archival material. I’ll talk about where we started, cover a few of the problems we encountered and the tools and methodologies we used to solve them, and finish up with some of the lessons learned along the way.<!--more-->

## Institutional Context
But first, I want to provide some context by talking a bit about where I work, since that will inform the rest of this talk, and also because it’s a bit of an unusual place. I work at the [Rockefeller Archive Center](http://www.rockarch.org), which is a private research center founded in 1974 located in Sleepy Hollow, New York[^1] (right next to Tarrytown and the Tappan Zee Bridge over the Hudson River). We’re not affiliated with any college or university, but we support learning and scholarship as part of our core mission. Our holdings are mostly archives – unique primary source material created by a variety of people and institutions. As you might guess from our name, we house the collections of prominent members of the [Rockefeller family](http://rockarch.org/collections/family/), but we also hold the records of the numerous charitable organizations they founded. Our researchers come from all over the world and are interested in a [wide variety of topics](http://rockarch.org/publications/resrep/); the history of medicine, public health, education, philanthropy; you name it, we’ve got it!

More specifically, I work as a part of a team with three others. We work together on almost everything, and the work I’m presenting today is no exception. There’s no part of what I did that came out of my brain alone; everything was improved and enhanced by someone else on the team. 

The [Digital Team](http://rockarch.org/programs/digital/)(or D-Team for short) develops and implements technology that helps everyone at the Rockefeller Archive Center do their job more efficiently and effectively. In addition to the system I’ll be talking about today, we are also responsible for technological solutions that support preservation of and access to born-digital materials, management and description of our holdings, a ticketing system to manage reference correspondence, and citation management for publications based on our holdings. We help other departments in the RAC think through their needs and requirements for systems, and then help implement, customize and maintain technological solutions.

A couple of years ago, we had only some very incomplete and unstructured descriptions of our holdings available online. Most of the description of our holdings lived onsite only, in an impressive (and color-coded) array of three-ring binders. It became clear that we needed a way for researchers to search information about our holdings online, so that they could discover what we have and figure out which of our materials might be relevant to their research before they made the trip to visit us in person. Shortly before I joined the RAC, a system called the [eXtensible Text Framework](http://xtf.cdlib.org), or XTF, an open-source product developed by the California Digital Library was implemented. It’s a very simple system that relies on a series of XSL transformations to turn structured data (usually XML) into web pages, and it has some very powerful search features built in which are suitable for a range of users’ experiences and expectations. XTF fulfilled many of our functional requirements out of the box, which was great, but it was also apparent almost immediately that there were some problems.

## Known problems
The default web interface for XTF is in frames. I probably don’t need to tell this group how problematic that is, but in case you don’t know, it turns out that in addition to being an obsolete technology and presenting [tons of usability problems](http://www.nngroup.com/articles/why-frames-suck-most-of-the-time/), frames also cause [huge problems for web crawlers](http://www.eric-a-hall.com/articles/19980209.html).  In addition, the interface makes ample use of HTML tables. When I say “ample” I mean there are tables within tables within tables within tables. Oh, and there are lots of inline styles baked into the various pages.

If that weren’t enough, the system kept crashing on us - in the process displaying a very uninformative error message - and we weren’t sure why.  We knew it had something to do with the size of the files it was trying to load, but we weren’t sure where the problem was, or how to resolve it. 

There were also problems that had nothing to do with XTF, but instead had to do with how archival collections are usually described. In archives, we present information about our holdings in documents called finding aids. These are traditionally fairly lengthy documents, which start off with some narrative contextual information about the collection and its creator, and then follow with a detailed listing of the contents of the collection. When reproduced as a single document on the web, finding aids become completely ungainly walls of text. As such, they’re not really suited to the needs and expectations of users, who expect to be able to perform keyword searches, narrow down searches easily, and view more information about a specific result. 

In addition, finding aids often use a lot of professional jargon that many people may not understand. One of the very first things we did was to evaluate the terms we were using and replace many of them with more commonly used terms and phrases. For example, we replaced terms like “scope and content” with “collection description” and “conditions governing access” to “access restrictions.”

Moving away from the problems we had with XTF and with finding aids, we also encountered issues with people. 

Like many other institutions, we had some staff members that were inherently distrustful of new technology. At least part of the reason for that had to do with the poor introduction of some new technologies in the past, but probably part of it is also that archives is a field that isn’t totally comfortable with change. When you’re used to thinking of “now” as a couple hundred years (at least) you tend to be mistrustful of things that change at the speed of technology today.

Even staff members who weren’t intimidated by new technology often had a way of communicating about problems with technology that was not productive. I would often get feedback that was contentious and not actionable (“This is the worst system I’ve ever used,” “How do you expect me to use this,” “This is broken. Help me!”). Even worse, I’d hear through the grapevine that there were problems, but would never hear about them directly. I’ll come back to this point later, but I’ll just say now that learning how to improve the quality and frequency of feedback is one of the most important things I’ve learned in the last few years.

Finally, we didn’t know enough about our users. We provide our researchers with personalized, one-on-one contact with a fully-trained professional archivist (which is pretty unusual), as well as a standing weekly lunch with researchers. So we have a lot of contact with our user community, and a substantial body of anecdotal evidence. As we all know, anecdotal evidence tends to emphasize the unusual outlier users at the expense of illuminating the behavior of the typical user. 

We also had some data on our researchers – contact information, research topics, level of education – going back to the 1970s, when the Archive Center was founded. All of that was good, but it wasn’t enough. We didn’t have hard numbers about how our users were interacting with our system, and we couldn’t effectively measure whether we were making any progress or just making things worse.

In short - we knew there were problems but we didn’t know exactly what they were or how to fix them.

## What we did
Since we knew we had a variety of problems, we knew we’d need a variety of tools and approaches to help diagnose and solve these problems, and we knew we’d need to work iteratively. Some issues could easily be assessed and evaluated by keeping track of a single metric over a couple of months; others required more sophisticated measurement using qualitative and quantitative methods. 

To get hard numbers, we used web analytics in combination with server logs, which gave us pretty granular information about the ways our users were interacting with the system.

To complement that, we also ran a series of low-cost usability tests to give us insight into interactions with particular features, and to expose problem areas that might not otherwise have occurred to us. We also took steps to try and change the organizational culture around technology and the user experience.

### Web analytics
Probably everyone here is familiar with web analytics, and probably most of you use them. I know there are [more focused sessions](http://eduiconf.org/sessions/edui_analytics/) on this topic here at edUI (which I look forward to attending so I can hear how everything I’m about to tell you is wrong), so I won’t go into a lot of detail about how you do this, but instead I’ll focus on what we learned. 

The thing that jumped out at us right away when we started looking at our web analytics data was that we were getting almost no search traffic from web search engines. On a monthly basis, we routinely received less than five percent of our monthly traffic from search engines.

As a first step, I looked at our site in [Google’s Webmaster Tools](https://www.google.com/webmasters/tools/), which among other things, shows you exactly how Google is indexing your site, and how it will appear in their search results. It lets you do things like add site maps, tweak the behavior of [Googlebot](https://support.google.com/webmasters/answer/182072?hl=en) based on URL parameters and more. It was immediately obvious that our site wasn’t presenting itself very well to web crawlers; the important pages of the website weren’t being indexed, and basic page information was either missing or incorrect.

I started by adding a sitemap, which at least got Googlebot looking at the right URLs. Part of doing this was improving the default URLs the system provides, which are pretty ugly. In the course of making those URLs more human friendly - shorter, more semantic and stable - we made them more friendly to search engines as well. But we still weren’t seeing very good search relevance or rankings, and it looked like web crawlers weren’t picking up the correct information about each page.

After poking around a bit and sending up some distress signals via Twitter, I discovered that [a number](http://www.cni.org/topics/information-access-retrieval/discovery-turned-inside-out-using-schema-org-and-google-site-search-with-library-digital-collections-2/) of [other archives](http://www.alatechsource.org/blog/2014/07/metadata-schemaorg-and-getting-your-digital-collection-noticed.html-3) were experimenting with adding structured data to web pages describing their collections as a way of boosting their search relevance and rankings, so we decided to give that a shot. 

I added some [structured metadata](http://rockarch.org/programs/digital/bitsandbytes/?p=826) for title, author, dates, language and location to our finding aid pages based on schema.org specifications. [Schema.org](http://schema.org) is a collaborative effort between Google, Bing, Yandex and Yahoo! that aims to improve search results for all four companies. Because it is endorsed by the major search engines, schema.org has quickly become the accepted way to embed structured data in web pages. There are a number of ways to do this, and a couple of good tutorials out there about [different approaches](http://www.lynda.com/Web-Content-Strategy-tutorials/Web-Semantics/143180-2.html). Basically, what I did was add a div that contained this information structured according to the schema.org specifications.

Once you’ve done that, you can easily test out pages with [Google’s Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets), which shows you exactly how web crawlers will interpret the data you’ve embedded on pages.

Since implementing this change, we’ve seen a [slow but steady increase](http://rockarch.org/programs/digital/bitsandbytes/?p=865) in traffic from web search engines. A year ago the percentage of traffic we were getting from search engines was in the single digits. Now it’s moving upwards of twenty percent.

The other major thing we use web analytics for is [tracking events](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide). Again, I’m not going to go into too much detail about how to do this, but the basic idea is that anything you can tie an event handler to can be captured as an “event”. In essence, almost any interaction with a web page can be turned into a statistic if you want. We’ve hung analytics events all over the system, with an eye to giving us data over the short or long term that helps us evaluate user behavior.

Most of the time, this data helps us make decisions about UI elements. For example, we used to have “more like this” search functionality as part of our interface that would theoretically find results similar to a particular hit. Users would first click a button to display additional results, and then would click on one of those results to go directly to it. However, as I interacted with the system, I noticed I wasn’t using that feature at all. I asked around, and it turned out I wasn’t the only one. So we added some events to different pieces of that functionality, and it turned out that, although users would click on the “show more results like this” link, they would almost never click through on any of the results shown to them. In addition, once a user had clicked on that “show more results like this” link, they were unlikely to do that again. This told us that our users weren’t really finding this functionality all that helpful, so we eliminated it.

Events tracking also helps us evaluate how good a job we’re doing of explaining what our collections are about, and can help us think about how much time we’re investing in creating different pieces of content that explain our holdings. For example, you can see here that we’ve broken up some of the contextual information about our finding aids into different pieces. We’ve added analytics events on all of these menu items, so we can get click counts over time on which items are more popular. It might surprise you to know that “Access and Use Restrictions” is the most commonly-clicked table of contents item (or it might not). It certainly surprised us, and made us come up with more standardized and carefully worded statements for that section. By comparison, we often spend a lot of time crafting language for a “Biographical/Historical note,” which gives users some context about the person or organization that created the collection. Users click on that item far less frequently, which means that maybe we need to de-emphasize that piece of content and instead point to other sources of that contextual information.

### Server logs
I mentioned earlier that when we first launched the system, it kept crashing and we couldn’t figure out why. I had some anecdotal evidence from staff about various things that caused the system to crash, but I wasn’t able to see a pattern immediately. So I decided to dive into the server logs and see if I could figure out what was happening under the hood.

Any web server will generate pretty [detailed logs](http://httpd.apache.org/docs/2.4/logs.html) telling you what’s going on. What you need to do is first figure out where those logs are and then figure out what they are telling you. There are tons of tutorials out there on both these subjects; a quick Google search will turn up more than enough! There’s a lot of information you can get out of these logs, URL requests, search queries, response times, error messages, HTTP response codes…and the list goes on.

I started out by looking at the error logs to see if there was anything obvious there, but there wasn’t.[^2] Then I looked at the access logs, and noticed that the server would often receive multiple requests for the exact same URL from the same IP address in a very short period of time. This meant that someone was clicking a link a couple of times, thinking that the system wasn’t responding. The response times would start to increase, slowly at first and then very rapidly, until the system would crash. So, to make a long story slightly shorter, the system was crashing because it had a hard time handling multiple requests for very large finding aids. 

There were a couple of things I could do about this. First, I could get every user to be more patient and not click multiple times when loading a large finding aid. Actually, I couldn’t do that! But I could make the amount of data the system was trying to load smaller. 

It turned out that the system really bogged down when loading the detailed listing of box and folder contents in finding aids, which isn’t surprising since those are the largest and most complex piece of content in those documents. By default, when a user clicked on a search result for a hit in a folder title, the system then tried to load the entire container list for the finding aid that contained the hit. In many cases, this was just too much data to load quickly, and there was no amount of processor speed or memory that would have decreased it to a reasonable waiting time for a user. But users weren’t interested in seeing the entire container list at once - in fact, they couldn’t; it wouldn’t fit on the screen! What they are looking for is context about a particular hit to help them determine relevance. Perhaps more importantly, they are looking for just the right amount (not too much, not too little) of context.

One of the interesting things about the practice of creating information about archival collections – referred to as archival description – is that it uses hierarchy to divide archival collections into intellectual groups, which we often call series or subseries. So instead of making the system load the entire container list at once, we configured the system to only load chunks of the finding aid at a time. Now, if a user clicks on a hit, the system will only load the intellectual grouping component (like a series or subseries) containing the relevant folder. This has dramatically increased not just the stability of the system, but its overall speed as well. 

Since we can never leave well enough alone, once that was done we thought, “what if we make it so that users wouldn’t need to load entire finding aids at all?” In other words, what if our search results page presented enough information so that users wouldn’t necessarily need to click through to finding aids to evaluate the relevance of a particular hit? And what if we gave them the option to save certain hits to a list that they could email to themselves?

We reworked our search interface so that a user could see the title, date, extent, creator, additional description of hit, a brief statement of how to access the materials, and the language of any hit.[^3] For most users, this is more than enough contextual information for them to evaluate the relevance of a hit. The user can also save a particular hit to their “Bookbag” and can then email that list to themselves. 

The technology behind this isn’t all that fancy; just some basic jQuery and CSS that shows and hides a details popover when you hover over a hit, and some javascript that saves information to session variables. I wrote a [blog post](http://rockarch.org/programs/digital/bitsandbytes/?p=951) about this with some before and after screenshots, if you’re interested in more details. 

### Usability testing
As you can imagine, for a substantial change to the system, like a complete overhaul of the search interface, we wanted to evaluate whether or not this was actually an improvement before moving those changes into production. We did this by running a series of low-cost usability tests.

In some ways, we have a unique (and fortunate) institutional context, which makes doing these tests relatively easy. First of all, we aren’t subject to IRB rules and processes. Second, because of where we’re located, (a bit far from the nearest large city---NYC), we don’t take walk-in researchers, and tend to have a lot of contact with researchers before they ever show up onsite. Because of such close communication with our users, it’s easy for us to ask them to be test subjects, and they are usually happy to do it. To sweeten the deal, we offer our testers a $25 Amazon gift card.

When there’s something we want to test, we write a couple of tasks we think will test the functionality, find a couple of researchers to act as our testers, run the test, and evaluate our results. Easy, right?

You’re right; it’s not quite that easy! I find that writing the tasks is the hardest part of usability testing. There’s an art to crafting tasks that are realistic, worded in a way that’s not leading, and that test what you actually want to test. This is an area that I can’t claim to have mastered, and one in which I lean on the input of other team members. I’ll often test the test by doing a dry run with one of my coworkers. If any of you have advice or resources on how to create tasks, I’d be very happy to hear from you.

In addition to testing the new search interface with real users, we also ran tests for almost every substantial change to the system. When we added the ability to view digitized material, we tested. When we added catalog records of books to the system, we tested. When we removed the “view more like this” functionality, we tested. The more you test, the easier it gets; the better you get at it, the more useful the data that you are able to collect.

### Changing organizational culture
Finally, I want to talk about what I think is the most important thing we’ve done as a part of this project, which is to start to create organizational awareness about, and investment in, the user experience. This is definitely an ongoing process and something we’re continuing to push whenever we can, so I definitely can’t say we’re done with this, but I think it’s still worth talking about some of our strategies.

For us, this started with a set of values that we developed as a team. These help orient our work and are really useful when taken in combination with the long- and short-term work plan for our department. Our vision tells us where we’re heading; our work plan tells us what we need to do; our values tell us how to go about doing those things. We’re continually revising these, and we are in the middle of one such revision, so I unfortunately can’t share them with you right now, but one value that I am sure will remain at the top of the list is a focus on the user. Part of that focus is helping the rest of the organization understand the importance of the user experience in [all facets of the work we do](http://rockarch.org/programs/digital/bitsandbytes/?p=1036), and to try and get all of our thinking to shift to include a user perspective.

For me, a couple of important dots were connected at this conference last year, particularly with Kim Goodwin’s talk [“Questions, Not Answers”](http://eduiconf.org/edui2013/sessions/questions-not-answers/). Perhaps the most important takeaway for me from the conference came out of that session; namely that UI change and organizational change are tied together. Introducing a new UI or changing an existing one by definition means that users will be interacting with that system differently. It might also mean that your user community changes substantially. As a result, the demands placed upon staff in your organization are going to change; they will have to change the way they work, and they might have to give up some things they think are important and start doing things they think are not as important or that they’re not used to doing.

So, thinking about UI change as organizational change impacts how you approach UI change. It helps you think about how to create organizational change rather than wondering why everyone’s so upset about your new header image. Because the truth is that as UI professionals we’re [change agents](http://eduiconf.org/sessions/edui_change/). We’re not just isolated in an ivory tower of beautiful design; our work impacts and is impacted by legal policy, internal politics, mission statements, administrative structure; in other words almost every aspect of an organization that makes it what it is. Sometimes this is frustrating; I know there are days I wish I could just be left alone to make things I think are cool and fun. But it also means that our work is essential and fundamental to our organizations.

One of the first things we knew we had to do was communicate. I know this is something that everyone always says you should do, but hardly anyone ever talks about how you do it. There are some pretty easy ways of pushing out information, like a blog. My team has a [blog](http://rockarch.org/programs/digital/bitsandbytes/) where we write about what we’re doing; I’ve posted there a bunch about what I’m working on and thinking about. Even if nobody else in the world looks at your posts (which would be both unlikely and very sad) it’s still a useful exercise because it will help you focus your thinking and articulate what you’re doing in clear and concise ways. 

Perhaps more important than just pushing out updates online is getting out of your office and actually talking to your coworkers in person. Drop by their office and say hello, figure out where people hang out socially and spend some time there, listen to the conversations that are going on around you and listen when your colleagues express worry, discomfort or fear, but also listen when they talk about what they love to do and why they love to do it. If you do, you’ll understand what motivates them, and be able to explain how the change you’re making isn’t all that scary, and also how it will make their lives better. 

Another aspect of communication is providing good avenues for and models of feedback. It’s important that people know who to contact when things go wrong, and how to contact them. What phone number should they call? Who should they send an email to?

One thing we quickly realized was that our staff had never been taught how to provide helpful feedback, and a lot of the frustration and anger we were hearing in comments was really because staff weren’t sure how to voice their concerns in a way that would be heard. So we did a bit of education about what good feedback should include: a succinct explanation of the problem, any specific error message and/or codes, links and screenshots where possible, and what expected system behavior would be, if applicable.

We also tried to create as many opportunities as possible for staff to engage with the change process. For example, early in the process we ran a naming contest for the system. Staff submitted names for consideration, which were then narrowed down through several rounds of voting. The person who suggested the winning name got bragging rights and a $25 gift card (which seems to be our favorite reward). We got a lot of really fantastic suggestions, including one staff member who not only came up with a geographically-appropriate name, but also created a logo as well. The name selected was [DIMES](http://dimes.rockarch.org), which was both an acronym for Digital Information Management Engine for Searching as well as a reference to John D. Rockefeller Sr.'s practice of [giving away small change](http://www.factfiend.com/john-d-rockefeller-bag-dimes/) to reward good service, deliver a brief sermon on the virtues of frugality, and engage with the public in a way that did not involve signing autographs, which he hated to do. This contest built excitement and positivity around the upcoming changes, and is a model we’ve successfully used on other occasions. 

We also found that running in-person usability tests with select staff is a good way of getting them involved, in addition to helping identify issues with the system. It allays fears by giving them a preview of changes as well as an opportunity to voice their concerns, but most of all gets them invested in the success of the changes, because their ideas become a part of the process. It’s also a good opportunity for you to figure out who your allies are within the organization, and to start to build relationships with those people.

In closing, I want to relay a couple of important personal lessons I’ve learned during the course of this process, with the fundamental realization that how I behaved as a colleague and person had a huge impact on how well the changes I proposed were received. In other words, who you are as a UI professional and a change agent has a pretty huge impact on what you are able to do.

First, have a thick skin. When people criticize a system or interface that you’ve put a lot of time and energy into, it can feel like they’re criticizing you. But they’re not! The more you’re able to separate your ego from the work you do, the better your work will be, and the happier you will be.

Second, be approachable. This means that you need to be friendly and knowledgeable without being patronizing or intimidating, but it also means that you have to be a bit fearless about engaging in uncomfortable conversations, or working with intimidating personalities.

It’s also important to back up your words with actions. One of the best ways to turn a skeptic into a believer is to make a change to design or functionality that responds to their concerns. The more quickly you can respond the better, even if it means making a couple more iterations on the change to get it right. Your willingness to engage will inspire the staff you’re working with to increase both the frequency and the quality of their feedback because they know they’re being listened to. 

I hope this presentation has given you a good sense of some tools, methodologies and strategies for improving access to unique archival materials. For those of you who haven’t dealt with a lot of archives and archivists, I hope you now have a little more insight into the work we do. But most of all, the one thing that I hope you take away from this talk is that it’s all about the people: the more aware we are as professionals of the impact of our decisions on the user experience, the more we can promote that perspective throughout the organization, and the more our organizations will be able to improve the user experiences they offer.

[^1]: Yes, it’s a real place. No, there aren’t any [headless horsemen](http://en.wikipedia.org/wiki/The_Legend_of_Sleepy_Hollow), unless you count the [town’s official seal](http://thefairytaletraveler.com//wp-content/uploads/2014/02/Sleepy-Hollow-Police-Car.jpg).
[^2]: When I started working on this project I’d played around a bit on the command line, but I was far from being an expert server administrator. So these are things you can definitely do, regardless of your previous experience with server administration, as long as you have the necessary permissions.
[^3]: This set of information complies with the minimum requirements for single-level description in [Describing Archives: A Content Standard (DACS)](http://www2.archivists.org/standards/dacs).