const apiKey = "https://www.omdbapi.com/?&apikey=31103aae&i=";
const searchKey = "https://www.omdbapi.com/?&apikey=31103aae&s=";

$(document).ready(function() {
  // Call this function when the page loads
  home();

  // Event handler for home button
  $("#home").on("click", function () {
    home();
    $("#search").val("");
  });

  // Event handler for search input
  $("#search").on("keydown", function (e) {
    setTimeout(function () {
      searchFnc(e.currentTarget.value);
    }, 500);
  });

  // Event delegation for card click
  $("#container").on("click", ".card", function () {
    const id = $(this).attr("id");
    openPopup(id);
  });
});

function home() {
  const homePageIds = [
    "tt3896198", "tt1201607", "tt7286456", "tt0371746",
    "tt1517268", "tt15398776", "tt6723592", "tt6751668"
  ];
  getApi(homePageIds);
}

function getApi(ids) {
  const promises = ids.map(id => fetch(`${apiKey}${id}`).then(response => response.json()));
  Promise.all(promises).then(dataKey => {
    const productstemp = $("#products-template").html();
    const productscompile = Handlebars.compile(productstemp);
    const compileddata = productscompile({ data: dataKey });
    $("#container").html(compileddata);
  });
}

function openPopup(data) {
  setTimeout(async function () {
    const articleType = await fetch(`${apiKey}${data}`);
    const abc = await articleType.json();
    const load = $("#loading-animation");
    load.css("display", "none");
    const productstemp = $("#products-template2").html();
    const productscompile = Handlebars.compile(productstemp);
    const compileddata = productscompile({ data: abc });
    $("#pop").html(compileddata).css("display", "flex");

    $("#close").on("click", function () {
      const target = $("#lol");
      target.attr("src", "#");
      $("#pop").css("display", "none");
      $("#secondary").css("display", "none");
      $("body").toggleClass("stop-scrolling");
    });
  }, 300);
}

async function searchFnc(data) {
  const articleType = await fetch(`${searchKey}${data}`);
  const abc = await articleType.json();
  const searchRes = (abc.Response === "False" || abc.Search.length < 2) ? null : abc.Search;

  const productstemp = $("#products-template").html();
  const productscompile = Handlebars.compile(productstemp);
  const compileddata = productscompile({ data: searchRes });
  $("#container").html(compileddata);
  $("#sug").text("Search Results");
}
