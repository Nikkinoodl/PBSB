# An Eleventy Website (Source Code)

This repository contains the source code for my own Eleventy‑powered static website:

https://portraitsbysimonbland.com

The live site is hosted on AWS S3. This repo serves as a reference — something I can link to in blog posts or revisit later when I want to refresh my memory — and as a template for anyone else who may get benefit from it.

## What This Project Is

This is a simple, fast, no‑database static site built with **Eleventy (11ty)**.  
All of the layouts, templates, and content live in the main repo folder and its sub-folders. Eleventy compiles everything into a folder named `_site/` (not included in this repo) which is then uploaded to S3 for hosting.

## Working With the Site

To run the site locally, first download the files and folders to a folder on your own device. Install NodeJS and npm then from Windows PowerShell run: 

```
cd <your folder location>

npx @11ty/eleventy --serve
```

Eleventy will create the `_site/` folder with the final static files then watch for changes and continuously rebuild the site as you tinker with the files. 

## Deployment (AWS S3)

The site is deployed by syncing the `_site/` directory to an S3 bucket configured for static website hosting. CloudFront is a content delivery network that serves pages from locations close to the user and it also supports HTTPS access.

To set up AWS S3 and Cloudfront, use the document below to work through the process.

https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html

Deployment can be done from your own device providing you have set up IAM credentials that allow for S3 read/write. To deploy from Windows Powershell:

```
aws s3 sync _site/ s3://your-bucket-name --delete
```

If you’re using CloudFront, you can optionally run an invalidation after redeployment to overwrite any cached content, for example:

```
aws cloudfront create-invalidation --distribution-id *<DISTRIBUTION_ID>* --paths "/"
```

Or, you can invalidate specific paths like this:

```
aws cloudfront create-invalidation --distribution-id  *<DISTRIBUTION_ID>* --paths "/blog/palette/*" "/blog/tips/*" "/blog/featured/*
```

## Overall Thoughts

Building your own website is not for everyone, but a simple site is very easy to do.

You don't need to build out a complete website right from the start. I suggest you begin small and add to it over time. In my case, I started with a single *home* page, just a few lines of text, and published it. Then I added an *about* page.

After that, I worked on data migration for some time before I brought all my old blog pages across and worked on the layout you see today. After I re-launched the website I let it sit in production for a month or so while I migrated the old archive pages across.

Ongoing maintenance has been non-existent and the website has had a 100% up time with no effort on my part.


