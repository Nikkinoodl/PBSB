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



