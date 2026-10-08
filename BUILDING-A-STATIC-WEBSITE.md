# Building a Static Website

I've always enjoyed building and running my own website. I think it's a must-have tool for connecting with the world and showcasing products. But modern websites are complex and require programming skill, technical support and hardware to the point where most artists have either sought professional services or have outsourced their site to companies like [FASO](https://www.faso.com/).

After spending so much time and effort on my own website over the last decade, I wanted to make a site that is easier to maintain and cheaper to run. This document is basically an instruction manual that will allow you to get started on building one of your own. 

My entire website code is available on GitHub here:[https://github.com/Nikkinoodl/PBSB](https://github.com/Nikkinoodl/PBSB)

### Table of Contents
* [The Basics of Website Platforms](#the-basics-of-website-platforms)
* [Building a Static Website](#building-a-static-website)
* [Using Eleventy](#using-eleventy)
* [Pagination](#pagination)
* [Contact Page](#contact-page)
* [Configuration and Migration](#configuration-and-migration)
* [Running Eleventy](#running-eleventy)
* [Creating New Content](#creating-new-content)
* [Publishing Content](#publishing-content)
* [Overall Thoughts](#overall-thoughts)


### The Basics of Website Platforms
A typical website page is often constructed from lots of individual parts (including ones defined by code) and bits of data queried from a database that are put together in a fraction of a second. This is done on demand by server-side computing capacity after receiving an HTTP request (\*1). The requested web page is then delivered to your device, again via an HTTP pipeline, where it is styled and manipulated using Javascript and stylesheets.

The entry-level cost of operating a website usually starts at around $20–$25 per month no matter your choice of hosting platform. That's for a website that can serve a few thousand page requests per day. You can pay more if you want an online store, more storage, better support, or if you need upgrades to support a larger audience (\*2).

A static website is much simpler. Each page is pre-built and is kept as an individual file on a data storage service (AWS S3 in my case) (\*3). When you click on a link, the entire page can be delivered without the need for any server-side processing other than reading a file.

This simplicity makes static websites much faster than their dynamically generated counterparts, especially when served through a content delivery network. They are also inherently more secure.

Even better, storage is very cheap. The cost of running a static website for a small business like mine is just a few cents per month (\*4).

### Building the Website
If you have a simple site with just one or two pages, you could simply code individual HTML pages by hand. Once you learn how a web page is structured and some [HTML basics](https://www.w3schools.com/html/), you can do this easily, but as the number of pages increases, it becomes harder to keep everything organized, consistent and well-maintained across your website. For example, if you decide you need to change something like the layout of the menu, you would need to change it on every web page.

A static site generator (SSG) helps you to build and maintain a static website. It's an application that runs on your device in the background, building a website directory structure and populating it with HTML pages while you create the content. It can also serve those web pages to your browser so you can see the result as you work.

SSGs allow you to build components that can be used across multiple web pages (e.g. things like navigation links or footers) and template layouts that can inject structured data into your page content. Among other things, they also enable content to be categorized and they can automatically create things like pagination groupings.

Even though the relationships between all the different components and layout files can sometimes be confusing, the individual files that make up your actual website content tend to be very simple and it is easy to add new content or to make site-wide changes to the website.

There are a few options to choose from in the free software space: I selected Eleventy, after first trying other software providers (Jekyll and Hugo) and finding them buggy in the Windows environment. I also liked the simplicity of use, the speed and flexibility of this software.




### Using Eleventy
Eleventy will read files in a variety of formats (it doesn't seem to care which file extensions are actually used). The main types of files are:

- *.html* format. Eleventy will read HTML directly which is useful for your first sample page.

- *.md* (Markdown) format. You will find this a more convenient format to use if you type content directly and you can embed HTML tags and content in it (\*5). 

- *.liquid* format. Each file has two sections: a set of structured data, i.e. fields and values in YAML format, usually referred to as *front matter*, and a section of content in Markdown and/or HTML with embedded fields. The structured data is useful for things like page title, template, permalink, publication date, and category.

- *.njk* (Nunjucks) format. These are HTML files with embedded fields and are used mainly to build components like page templates, footers, headers, and so on.

This following is an example of one of my blog posts in *.liquid* format. It has been converted from an older post that was created with an HTML editor, so the content is written in HTML:

```html
--- 
layout: post.njk
title: "A Black Faced Ram"
permalink: /blog/a-black-faced-ram/ 
date: 2014-12-19 05:55:00
shortdate: 19 Dec 2014
image: /images/2014/Ram.jpg
description: "Black Faced Ram Sketch. 8x8, oil on linen. 2014
I painted this small sketch of a black faced ram at Weatherlea Farm in part because I wanted to try a creating something a little darker than usual. &nbsp; I had taken a series of photos in the shadow cast by the large barn and there was only a trace o"
categories:
  - sheep
  - painting
  - sketch
tags: post
--- 

<p style="text-align: center;"><img src="/images/2014/Ram.jpg" alt="Portrait of a black-faced ram" width="450" height="347" /></p>
<p style="text-align: center;">Black Faced Ram Sketch. 8x8, oil on linen. 2014</p>
<p style="text-align: left;">I painted this small sketch of a black faced ram at Weatherlea Farm in part because I wanted to try a creating something a little darker than usual. &nbsp; I had taken a series of photos in the shadow cast by the large barn and there was only a trace of cool light illuminating the scene. &nbsp;The ram's face was almost devoid of features in the original photo so I made some adjustments to the curve profiles before starting to use the reference photo.</p>
<p style="text-align: left;">I tried to work the edges as much as possible but I left everything else au premier coup: I find that sheep, like clouds, look better if you don't try and fuss over the details.</p>
```








You can focus on just creating content whenever you need to add new pages; the *post.njk* Nunjucks file which controls the layout of the published page is referenced in the front matter.

This layout file (shown below) contains references to the component files *head.njk*, *header.njk*, *socialicons.njk* and *footer.njk*. There are also fields, for example *{{title}}*, that will call and display the title attribute contained in the front matter.

You can see where the HTML content of the webpage is injected into the layout using the content field.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    {% include "head.njk" %}
  </head>
  <body>
    <div class="container-xl">
      {% include "header.njk" %}
      <hr/>
      <main>
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <h2>{{ title }}</h2>
            <p class="postdate">Simon Bland: {{ shortdate }}</p>
            {{ content | safe }}
            <p class="signoff">Simon Bland: {{ shortdate }}</p>
          </div>
          <div class="col-sm-2"></div>        
        </main>
      {% include "socialicons.njk" %}
      {% include "footer.njk" %}
    </div>
  </body>
</html>
```




The embedded file *head.njk* shown below contains the links to stylesheets. I have used the Bootstrap UI framework to help maintain consistency of appearance across platforms and devices.

The stylesheet *site-specific.css* contains a collection of tweaks to the base Bootstrap CSS that I've adopted over the years. It is easier to keep the website consistent over time if I do this rather than customizing the Bootstrap CSS file.

```html
<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/css/bootstrap.min.css" integrity="sha512-2bBQCjcnw658Lho4nlXJcc6WkV/UxpE/sAokbXPxQNGqmNdQrWqtw26Ns9kFF/yG792pKR1Sx8/Y1Lf1XN4GKA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="/assets/site-specific.css">
```







The file *header.njk* shown below contains the html header element component. This is the navigation menu, so it makes sense to just to create and maintain it in one place. The \<class\> element names are used by Bootstap UI to control that element's formatting.

```html
<header>
  <h1 class="instance-name">Art by Simon Bland</h1>
  <div class = "row">
    <div class = "col-sm-1"></div>
    <div class = "col-sm-10">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/home/about/">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/archives/">Archives</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/blog/">Blog</a>
        </li>
      </ul>
    </div>
    <div class = "col-sm-1"></div>
  </div>
</header>
```

The files *footer.njk* and *socialicons.njk* do similar things for the footer contents and social icon links respectively. Change any part of these files and the content changes throughout the website.





### Pagination
Eleventy does pagination almost effortlessly. It is set up in the front matter of a page and it just works. For example, in *blog.liquid* which I've included below, the main blog content page is paginated automatically. There is no user defined code needed to control this, just some care needed in building the permalinks and pagination settings.

```html
---
layout: base.njk
title: "A Blog About Oil Painting"
description: "An extensive collection of blog posts about art, working in the artists studio, works in progress and oil painting techniques"
permalink: /blog/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber }}/{% endif %}
pagination:
  data: collections.post
  size: 9
  alias: posts
  reverse: true
---
<div class="col-12">
    <h2 class="text-center mb-2">{{ title }}</h2>
        <p>Welcome to my blog. Here you'll find me rambling on about all sorts of things related to art in general and oil painting in particular. There's even a recipe for dog cookies hidden away somewhere.</p>
        <p>Like the rest of the site, this section is still a work in progress and I will be making it tider and easier to navigate in time. There is a lot
        of content, so using the buttons below may help you to get around. Newest posts are shown first.</p>
        {% include "blognav.njk" %}
</div>

{% include "blogcards.njk" %}
{% include "pagination.njk" %}
```






The *blogcards.njk* file shown below is a reusable component that just displays whatever collection of blog posts is called. There is heavy reliance on Bootstrap UI for formatting.

```html
    <div class = "row card-deck row-cols-1 row-cols-md-3 text-center">
        {% for post in posts %}
            <div class="col mb-4">
                <div class="card imageBox h-100 p-1">
                    <a class="stretched-link" href="{{ post.url }}">
                        <img class="img img-fluid m-auto" style="height:10rem;" src="{{ post.data.image }}" alt='{{ post.data.title }}' />
                    </a>
                    <div class="card-body">
                        <h4 class="card-title mt-3">
                            {{ post.data.title }}
                        </h4>
                        <p class="card-text">
                            <small class="muted">
                                by Simon Bland / {{ post.data.shortdate }}
                            </small>
                        </p>
                        <p class="card-text">
                            {{ post.data.description }}...
                        </p>
                    </div>
                    <meta content="{{ post.data.date }}" />
                </div>      
            </div>
      {% endfor %}
    </div>
```









The *pagination.njk* file shown below contains the HTML that's used to display the page links.

```html
<p>
        <ul class="pagination">
        {% if pagination.href.previous %}
            <li class="page-item"><a href="{{ pagination.href.previous }}" class="page-link">Previous</a></li>
        {% else %}
            <li class="page-item active"><a class="page-link" href="#" aria-current="page">Previous</a></li>
        {% endif %} 
        {% if pagination.href.next %}
            <li class="page-item"><a class="page-link" href="{{ pagination.href.next }}">Next</a></li>
        {% else %}
            <li class="page-item active"><a class="page-link" href="#" aria-current="page">Next</a></li>
        {% endif %}
        </ul>
</p>
```





### Contact Page
The last piece of functionality I added to the site (a year after first launching) was a contact page.

In the past, I've never had many customer contacts via this route and it is far more likely to provide a firehose of spam, scams and other unwanted content. Still, it occasionally proves useful and I am able to filter out most of the unwanted content.

The contact page contains an HTML form, formatted with Bootstrap. When submitted, the form content is posted to an AWS API Gateway, then handed over to an AWS Lambda function (a bit of software that doesn't require a reserved server) which processes the message and sends it on to me using AWS Simple Email Service.

An outline of the method for doing this can be found in [this AWS article](https://aws.amazon.com/blogs/architecture/create-dynamic-contact-forms-for-s3-static-websites-using-aws-lambda-amazon-api-gateway-and-amazon-ses/), although some of the details are slightly out of date.

I have omitted the details of my own implementation here because it is a bit more technically complex and it really needs its own article. 




### Configuration and Migration
On the whole, I found the static website platform much easier to set up than a self-hosted service, although still an order of magnitude harder than a managed platform like WordPress or Square.

I started with a very simple website—just an *index.html* file displaying the equivalent of "Hello World"—and built up the site incrementally over several months.

Most of my effort went into migrating a few hundred pages of blog and painting archive content over to the new platform. I used a Jupyter Notebook to extract the existing data from a Sqlite database, clean up and format the content, remove unnecessary data, and write the blog and archive pages in *.liquid* format.

As part of the migration, I wanted to group blog articles and painting archives into the same categories I used on my old site. With Eleventy, this must be done by defining those collections in the Eleventy config file, then making sure that each post and archive *.liquid* file references the correct category. I would say this was the most difficult part of the website creation process because my experience with JavaScript is not very extensive.

Collections are created in the eleventy.config.js file shown below:

```js
export default function (eleventyConfig) {
  // Shortcode for images with captions
  eleventyConfig.addShortcode("image", function (imgAddress, imgCaption, altText) {
    return `
      <figure class="figure">
        <img src="${imgAddress}" class="figure-img img-fluid mx-auto d-block" alt="${altText}">
        <figcaption class="figure-caption text-left">${imgCaption}</figcaption>
      </figure>
    `;
  });

  // Passthrough copies
  eleventyConfig.addPassthroughCopy("blog");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("archives");
  
  //Explicitly create the archives collection
  eleventyConfig.addCollection("archives", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("archives/**/*.md")
      .sort((a, b) => b.data.id - a.data.id);   // newest first
  });

  //
  // Archive categories and filters
  //

  //Custom collection: archiveCategories
  eleventyConfig.addCollection("archiveCategories", function () {
    return ["landscapes", "other", "dogs", "horses", "people"];
  });

  //Filter: filter archives by archiveCategory
  eleventyConfig.addFilter("filterByArchiveCategory", function (archives, cat) {
    if (typeof cat === "string" && cat.trim() !== "") {
      cat = cat.toLowerCase();
    }

    return archives.filter(p => {
      const cats = (p.data.archiveCategories || []).map(s => s.toLowerCase());
      return cats.includes(cat);
    }).sort((a, b) => b.data.Id - a.data.Id); // ensure correct order
    
  });

  //
  // Blog categories and filters
  //

  // Custom collection: categories
  eleventyConfig.addCollection("categories", function () {
    return ["featured", "palette", "tips"];
  });

  // Filter: filter posts by category
  eleventyConfig.addFilter("filterByCategory", function (posts, cat) {
    if (typeof cat === "string" && cat.trim() !== "") {
      cat = cat.toLowerCase();
    }

    return posts.filter(p => {
      const cats = (p.data.categories || []).map(s => s.toLowerCase());
      return cats.includes(cat);
    });
  });

}
```








From the blog and archive pages, a particular collection is be fetched by clicking on a button. The following is the blog categories page:

```html
---
layout: base.njk
title: "A Blog About Oil Painting"
description: "An extensive collection of blog posts about art, working in the artists studio, works in progress and oil painting techniques"
permalink: "/blog/{{ category }}/"
pagination:
  data: collections.categories
  size: 1
  alias: category
---

{% assign posts = collections.post | filterByCategory: category %}
<div class="col-12">
    <h2>Category: {{ category }}</h2>
        <p>This collection of articles provides some discussion on different aspects of painting and my
        own art journey. Some of these posts are longer and more in-depth than my typical content.</p>
        <p>Older posts are shown first.</p>
        {% include "blognav.njk" %}
</div>

{% include "blogcards.njk" %}
```






Individual posts in the collection are displayed using the same *blogcards.njk* that was shown in the previous section.

### Running Eleventy
On your local device it first requires NodeJS and npm to be installed then it can be run from the command line or Windows PowerShell (I find it better to use Powershell ISE so that I can save these scripts and use them again). In my case the website is being built in the <kbd>c:\users\simon\projects\PBSB</kbd> folder. Eleventy reads the input files without any additional help and creates the output files in a sub-folder.

```powershell
# Creates a web page
cd c:\users\simon\projects\PBSB

npx @11ty/eleventy --serve
```





Open a web browser and enter the displayed localhost address/port combination to see your website.




### Creating New Content
As I mentioned above, creating new content is not as easy as it is with other technologies. In my case I have found a solution that provides a nice interface, but adding new posts is a pipeline that requires slightly more effort than just clicking a *publish* button.

For most users, I would recommend creating new pages with an editor like Visual Code.




### Setting Up AWS and Cloudfront
When your website is eventually built out and you are ready to go live, the static files must be copied from your device to an online platform from where they can be served on the web.

Setting up AWS S3 and Cloudfront is relatively easy and doesn't require any coding experience. I used the document below to work through the process and I was able to get this part done quickly. That said, I've been an AWS user since early 2013 so I'm reasonably familiar with it and your experience may vary.


[https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html)




### Publishing Content
This is also easy to do if you use a cloud provider. For a website hosted on AWS S3, after setting up an AWS IAM identity and [saving credentials to your device](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-format), you can publish directly from Windows PowerShell like this (I would definitely recommend doing it like this rather than uploading files manually):

```powershell
aws s3 sync 'C:\Users\simon\Projects\PBSB\_site' s3://amazon-cloudfront-secure-static-site--*<BUCKETROOTID>*/ --delete
```





Then, because the existing content is cached by CloudFront, you *must* invalidate the cached elements that need overwriting. You won't be able to see the changes otherwise. In Windows PowerShell the entire website contents can be invalidated like this:

```powershell
aws cloudfront create-invalidation --distribution-id *<DISTRIBUTION_ID>* --paths "/*"
```





Or, you can invalidate specific paths like this:

```powershell
aws cloudfront create-invalidation --distribution-id  *<DISTRIBUTION_ID>* --paths "/blog/palette/*" "/blog/tips/*" "/blog/featured/*
```





### Overall Thoughts
Building your own static website is not for everyone but it's easy to do, even if you don't have much development experience. If you are building a website for the first time, have a can-do attitude and are willing to learn some new things, I think this is a great way to start.

Most importantly, you should begin small and add to your site over time. I started with a single *home* page, just a few lines of text, and published it. After that, I worked on data migration for a few months before I migrated the old blog content over and worked on the layout you see today. I migrated the archived painting pages over a few months after that, then finally added a contact page.

All the software I used to create my site is freeware and is available to use on both Windows and Linux distributions.

AWS also provides a free tier of service for new users for up to a year. All the services I use for my website are available in this plan. Essentially you can build and run a no-ad website and run it for free for an entire year, after which you will have running costs of a few cents a month. AWS also tend to be very forgiving if you occasionally mess up and ring up unexpected charges.

Ongoing maintenance has been non-existent and the website has had 100% up time with no effort on my part.

There are plenty of free tutorials online where you can learn more about the website build process—these were particularly useful ones for me:

-[https://www.11ty.dev/](https://www.11ty.dev/)
-[https://cfjedimaster.github.io/eleventy-blog-guide/guide.html](https://cfjedimaster.github.io/eleventy-blog-guide/guide.html)

This is a helpful cheat sheet for Markdown:

-[https://www.markdownguide.org/cheat-sheet/](https://www.markdownguide.org/cheat-sheet/)





### Footnotes
- \*1 The computing service is usually presented as a virtual server, i.e. a device defined by software. It's basically some processing power that's available to be used by your website on demand. You don't have a dedicated physical server set aside for you unless you pay for it, and that's a much more expensive proposition.
- \*2 Hosting your own website on your own server is the next step-up from this and requires significant effort in system management, upgrading, migrating data as well as the same amount of effort to keep the application running smoothly. You also pay for special storage that's accessible from the server and which can used to store the operating system, hosting software (e.g. .NET Core), the website code and the physical files that are used to create the content.
 - \*3 The stored webpage is static and can't be changed. However, it is possible to change the contents being displayed to the user through scripting on the client device.
 - \*4 There are also hybrid web apps, like those built with React. They are built on a static site (one which usually has a single web page) but they use javascript to manipulate the DOM and fetch data using APIs and other backends. These types of websites are widespread and technically elegant, but they come with a level of complexity and technical requirements that I find hard to adapt to my own needs.
- \*5 Markdown is much easier to use if you're typing webpage content directly and it is easy to learn.