// Function to select elements by CSS selector
function select(elem) {
  return document.querySelector(elem);
}

// Variables
let curr = Math.floor(Math.random() * users.length); // Default random index for offline functionality
let isanimating = false;

// Set data based on the index
function setdata(index) {
  select(".prflimg img").src = users[index].profilepic;
  select(".buttons .download-btn a").href = users[index].download;
}

// Extract the 'number' query parameter from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Set the initial image based on the query parameter
(function setinitial() {
  // Check if the 'number' query parameter is present
  const numberParam = getQueryParam('number');

  // If 'number' is found, use it to set the index
  if (numberParam && !isNaN(numberParam) && numberParam >= 0 && numberParam < users.length) {
    curr = parseInt(numberParam);
  } else {
    curr = Math.floor(Math.random() * users.length); // If no valid 'number' parameter, use random index
  }

  // Set images and data
  select(".maincard img").src = users[curr].displaypic;
  select(".incomingcard img").src = users[curr + 1]?.displaypic;
  setdata(curr);

  curr = Math.floor(Math.random() * users.length - 2); // Default next index setup
})();

// Function to change images with animation
function imagechange() {
  if (!isanimating) {
    isanimating = true;

    let timeline = gsap.timeline({
      onComplete: function () {
        isanimating = false;

        let main = select(".maincard");
        let incoming = select(".incomingcard");

        incoming.style.zIndex = 3;
        incoming.classList.remove("incomingcard");

        main.style.zIndex = 2;

        gsap.set(main, {
          scale: 1,
          opacity: 1,
        });

        if (curr === users.length) curr = 0;

        select(".maincard img").src = users[curr].displaypic;
        curr++;
        main.classList.remove("maincard");
        incoming.classList.add("maincard");
        main.classList.add("incomingcard");
      },
    });

    timeline
      .to(
        ".maincard",
        {
          scale: 1.1,
          opacity: 0,
          ease: Circ,
          duration: 0.9,
        },
        "a"
      )
      .from(
        ".incomingcard",
        {
          scale: 0.9,
          opacity: 0,
          ease: Circ,
          duration: 1.1,
        },
        "a"
      );
  }
}

// Event listener for the "next" button
let next_btn = select(".next-btn");
next_btn.addEventListener("click", function () {
  setdata(curr - 1);
  imagechange();

  gsap.from(".details .element", {
    y: "100%",
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: Power4.easeInOut,
  });
});

// Create container for animation on all details
(function containercreator() {
  document.querySelectorAll(".element").forEach(function (element) {
    let div = document.createElement("div");
    div.classList.add(`${element.classList[1]}container`, `overflow-hiden`);
    div.appendChild(element);
    select(".details").appendChild(div);
  });
})();


// not important 

     $(function() {

  $("#responsive-off").click(function() {
    $('meta[name="viewport"]').prop('content', 'width=initial');
  });
  $("#responsive-on").click(function() {
    $('meta[name="viewport"]').prop('content', 'width=device-width, initial-scale=1');
  });

});
