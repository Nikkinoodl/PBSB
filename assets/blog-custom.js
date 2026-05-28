document.addEventListener("DOMContentLoaded", function () {
  const imageSelector = 'img:not([class=""])';
  const imgClass = "figure-img img-fluid center-block";
  const pClass = "figure-caption";

  const images = document.querySelectorAll(imageSelector);

  images.forEach(img => {
    // Add Bootstrap classes to image
    img.classList.add(...imgClass.split(" "));

    // Remove <p> wrapper if present
    if (img.parentElement && img.parentElement.tagName.toLowerCase() === "p") {
      const parent = img.parentElement;
      parent.replaceWith(img); // unwrap
    }

    const nextP = img.nextElementSibling;
    const paraLength = nextP && nextP.tagName.toLowerCase() === "p"
      ? nextP.textContent.length
      : 0;

    // Create <figure> wrapper
    const figure = document.createElement("figure");
    figure.className = "text-center m-auto";

    if (paraLength > 0 && paraLength < 150) {
      // Wrap both <img> and <p>
      img.insertAdjacentElement("beforebegin", figure);
      figure.appendChild(img);
      figure.appendChild(nextP);
      nextP.classList.add(pClass);
    } else {
      // Wrap only <img>
      img.insertAdjacentElement("beforebegin", figure);
      figure.appendChild(img);
    }
  });
});


    //Change pager button href for category paging
 //   $('a[href^="/blog/simon-bland"]').each(function () {
 //       var oldUrl = $(this).attr("href"); // Get current url
 //       var newUrl = oldUrl.replace("/blog/simon-bland", "/blog/category"); // Create new url
//        $(this).attr("href", newUrl); // Set href value
//    });

