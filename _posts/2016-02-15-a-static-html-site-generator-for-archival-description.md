---
layout: post
title: "Introducing staticAid: A Static Site Generator for Archival Description"
date: 2016-02-15
comments: true
categories: archives
---
A [recent trend](https://developmentseed.org/blog/2012/07/27/build-cms-free-websites/) in [web development](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) (first brought to my attention at this year's [edUI conference](http://eduiconf.org/)) is a renewed interest in building static websites because they're faster, more secure, allow for more transparent versioning of content, and are more maintainable over time than CMS-backed systems. With [staticAid](http://hillelarnold.com/staticAid), I've tried to apply those ideas to archival description: JSON files generated via [ArchivesSpace's REST API](http://archivesspace.github.io/archivesspace/api/) are rendered as HTML with [Jekyll](http://jekyllrb.com).<sup>1</sup>

## What are static websites?

Static websites are, in some ways, a back-to-the-future trend which questions the common practice of creating websites using content management systems (CMSes). In most CMSes - like [Wordpress](https://wordpress.com/) or [Drupal](https://www.drupal.org/) - content is stored in a relational database and then queried on the fly to dynamically create HTML pages that can be viewed in a browser. Static sites avoid the substantial overhead of dynamic page generation by using a templating language to generate HTML pages up front. Those pages are then placed on a web server and accessed by users.

### Advantages

#### Speed

When a user requests a page from a static site, the server doesn't have to go find content in a database, find the right templates, and then render all of that as HTML. All it has to do is load pre-existing HTML, CSS and JavaScript files. That means static sites are fast. Really fast.

This matters for a couple of reasons. First, a steadily increasing percentage of web traffic comes from [mobile device users](https://joreteg.com/blog/viability-of-js-frameworks-on-mobile). In addition to smaller screen sizes, this means many users are transferring data over 3G (or slower) connections, and that the amount of data transferred is probably metered by their cellphone service provider. This is especially true in an international context, where the percentage of mobile users is even higher, and where data plans are more expensive and restrictive than in the US.

From the perspective of presenting archival description on the web, one of my biggest headaches over the last few years has been trying to optimize page load times in [DIMES](http://dimes.rockarch.org), Rockefeller Archive Center's discovery system. This system relies on dynamic [EXtensible Stylesheet Language](https://www.w3.org/Style/XSL/WhatIsXSL.html) (XSL) transformations in order to produce HTML pages, which means that rendering a really long container list takes a while. This leads to all kinds of user experience problems which result in repeated user-initiated page refreshes, which ultimately lead to server meltdowns. None of those are good things.

#### Security and Maintenance

Because static sites are simply HTML, CSS and JavaScript files, they are incredibly secure. You don't have to keep on top of security patches or develop a thorough understanding of the intricacies of a system or programming language to mitigate [security risks](http://php.net/manual/en/security.php). There's also a lot less server infrastructure to maintain which, as all sysadmins know, is a very good thing.

Sites that present archival description on the web probably aren't the first choice for malicious attacks, but maintenance is an important consideration, especially since archives are usually under-resourced in areas of technical expertise. HTML, CSS and JavaScript are the _lingua franca_ of the web; as maintainable and migratable<sup>2</sup> as is possible.

#### Version control for content

Static sites also allow you to use version control to more transparently manage changes to your content. With a CMS-backed website, if a piece of content gets corrupted or mistakenly deleted, you'll likely need a backup of your entire database in order to get your site back up and running. Because they generate HTML via a templating system, static sites allow you to version content much more robustly, so you can update and backup content incrementally.

At the Rockefeller Archive Center, we've been using Git and Github to [version our EAD files](http://blog.rockarch.org/?p=1402) (and I know [other institutions](https://github.com/NYULibraries/findingaids_eads) are doing this as well), so this approach would fit in quite nicely for us. Quite frankly, I think all archives should be versioning their descriptive data, and using a static site generator provides additional impetus for that. I'll get into some of the mechanics of that below.

### Disadvantages

Static websites are not without their drawbacks, though.

#### User-generated data

Because they're just a bunch of HTML pages, static sites aren't all that great at handling user-generated input. There are [some options](https://eduardoboucas.com/blog/2015/05/11/rethinking-the-commenting-system-for-my-jekyll-site.html) available if you want to implement commenting features, however, and I'm also not sure how much of a deal-breaker that is for sites presenting archival description.

#### Content management

In addition, static sites generally assume you'll be creating content in a text editor using a format like [Textile](http://redcloth.org/textile) or [Markdown](http://daringfireball.net/projects/markdown/), and then would use some automated process to generate the new pages and push them up to the website. They typically don't have an admin interface where you can create or edit content easily.<sup>3</sup>

While this might be more of an issue for other website creators, archivists already have a number of robust systems for creating and maintaining description, so I don't see this as a barrier for us. Rather, the question is how to ship data between systems that manage it and systems that display it without requiring a lot (or preferably any) human intervention.

## staticAid: A thought exercise in code

Enter [staticAid](http://hillelarnold.com/staticAid), a static website generator for archival description. It takes  [JSON](http://www.json.org/) produced by ArchivesSpace's REST API, runs that data through some templates, and spits out a bunch of HTML pages. I've termed this a "thought exercise in code" since this was really a way for me to think out a number of concepts regarding static sites and archival description. It's not a perfect solution, and there are a number of pretty significant holes (see "Caveats" below), but I think it does offer some intriguing possibilities for reconceptualizing systems for presenting archival description on the web.

Here's a high-level overview of how it works.

*   **Data is exported** by a script that runs against the ArchivesSpace REST API, which by default returns JSON data. This data is saved in files for resources, resource trees, and objects. It should be noted that these are standard endpoints for the ArchivesSpace API, so no data transformation takes place.
*   **Placeholder pages are created** by another script which loops through all of the data files for resources and creates a page for each of them.
*   **HTML pages are built** by Jekyll, which filters the JSON data through a number of templates to create the final pages.

At the end of the process you have a site you can preview locally, or upload to a remote server where it can be accessed by anyone online.

### Caveats
Let me be the first to admit that this is not the perfect solution, and there are some enhancements that would make it a lot better.

*   Most obviously, there's really no search functionality. There are actually some solutions for implementing [search in Jekyll sites](https://github.com/christian-fei/Simple-Jekyll-Search) (as well as [more generically](http://www.listjs.com/)) but for the purposes of this project I chose to ignore search functionality altogether, since I think it might be something better served by a JavaScript framework like [Angular](https://angularjs.org/) or [React](https://facebook.github.io/react/).
*   Machine-readable metadata for webcrawlers (such as [Schema.org](http://schema.org)) or for social media platforms (such as [Open Graph](http://ogp.me/) or [Twitter Cards](https://dev.twitter.com/cards/overview)) is currently not included in the site.
*   Controlled terms (names and subjects) aren't included in the display at all. This could be done by calling JSON for those agents and terms from ArchivesSpace (there are API endpoints for them) and then writing a few more templates to handle display.
*   There's also currently no provision made for the display of digital objects. That's something that could be implemented with a few more templates though.
*   Last, it would be great if lower levels of description (down to the file level) had their own page so they could be linked to or saved. I didn't have the time or energy to sort through the numerous UI problems that display creates, but again that's something that could easily be accomplished with some additional templates.

I may get around to making some of these improvements in the future, especially if there's any interest in this project.

## What does all this mean?

If you've made it this far you're probably wondering what any of this proves. So there's another way of putting your finding aids online. So what?

1.  **Speed matters.** As I've said above, it matters to users on mobile devices and cellular data connections, but it matters to users on desktop computers with ethernet connections. And it matters to sysadmins who get called when the system crashes.
2.  **Maintainability matters.** You don't need a bunch of fancy technologies to make this thing work. In fact, if you wanted to strip this down to its bare essence, all you need is an ArchivesSpace instance, a computer with Python (so you can export data from ArchivesSpace) and Git (so you can version your data), and a Github repository, so you can take advantage of [Github Pages'](https://pages.github.com/) Jekyll integration.<sup>4</sup> Boom, instant finding aids online.
3.  **EAD? We don't need no stinkin' EAD!** If you're observant, you might have noticed that my description of the project didn't mention [EAD](http://www.loc.gov/ead/). That's because staticAid doesn't use it. Instead, it takes the JSON responses that ArchivesSpace produces and uses those instead. Although I don't consider myself one of the multitude of EAD-bashers out there because I think it's good for the archival community to have a standard that kinda sorta works for inter-institutional exchange,<sup>5</sup> I will certainly not cry if I never had to look at another XSLT again.
4.  **The right tool for the job.** Over the last year and a bit, as I've followed the ArchivesSpace listserv, I've been increasingly concerned that the archival community wants that system to be all things to all people, and for it to accommodate every edge case of every institution. We want it to import data in a variety of formats, and then export it back out again, using whatever non-canonical encoding patterns we've established locally. We also want it to let us manage our data using bulk find-and-replace options, manage our processing backlogs, display finding aids and digital objects, and of course to be fast and secure. I wonder if we might not be subjecting ourselves to less frustration if we tried to separate concerns. Let's use ArchivesSpace to manage our data, and then let's use another system to display that data online that doesn't require a ton of complex data transformations into ornate XML structures.

If you're interested in building on this, all the [code is available](https://github.com/helrond/staticAid), along with some more detailed instructions on how to get up and running.

----
[1] Another project that was pretty influential in my thinking was the NCSU Libraries [Collection Guides](http://www.lib.ncsu.edu/findingaids) site, which is a Ruby on Rails app that uses ArchivesSpace-generated JSON. This project pushes things a step further and removes the relational database backend from the equation.
[2] Yes, I know that's not a word.
[3] There are some exceptions to this, for example [https://developmentseed.org/blog/2012/07/27/build-cms-free-websites/](https://developmentseed.org/blog/2012/07/27/build-cms-free-websites/)
[4] This is how staticAid is currently served.
[5] Okay fine, I realize this is maybe a debatable statement. Still.
