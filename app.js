const apiKey = "https://www.omdbapi.com/?&apikey=31103aae&i=";
const searchKey = "https://www.omdbapi.com/?&apikey=31103aae&s=";




function home() {
  let Home_page_id = [
    "tt3896198",
    "tt1201607",
    "tt7286456",
    "tt0371746",
    "tt1517268",
    "tt15398776",
    "tt6723592",
    "tt6751668",
  ];
  getapi(Home_page_id);
}

window.onload = function () {
home();
};

async function getapi(key) {
  debugger;
  var i;
  var dataKey = [];
  for (i = 0; i < key.length; i++) {
    const articleType = await fetch(`${apiKey}${key[i]}`);
    var abc = await articleType.json();
    dataKey.push(abc);
  }
  console.log(dataKey);
  const productstemp = document.getElementById("products-template").innerHTML;
  const productscompile = Handlebars.compile(productstemp);
  const compileddata = productscompile({ data: dataKey });
  const container = document.getElementById("container");
  container.innerHTML = compileddata;
  $(".card").on("click", function abc(e) {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const sec = document.getElementById("secondary");
    sec.setAttribute("style", "display:grid");
    const load = document.getElementById("loading-animation");
    load.setAttribute("style", "display:block");
    $("body").toggleClass("stop-scrolling");
    popup(e.currentTarget.id);
  });
}

function popup(data) {
  setTimeout(async function () {
    debugger;
    const articleType = await fetch(`${apiKey}${data}`);
    var abc = await articleType.json();
    const load = document.getElementById("loading-animation");
    load.setAttribute("style", "display:none");
    console.log(abc);
    const productstemp =
      document.getElementById("products-template2").innerHTML;
    const productscompile = Handlebars.compile(productstemp);
    const compileddata = productscompile({ data: abc });
    const container = document.getElementById("pop");
    container.innerHTML = compileddata;
    const popup = document.getElementById("pop");
    popup.setAttribute("style", "display:flex");

    $("#close").on("click", function () {
      debugger;
      const target = document.getElementById("lol");
      target.setAttribute("src", "#");
      const popup = document.getElementById("pop");
      popup.setAttribute("style", "display:none");
      const sec = document.getElementById("secondary");
      sec.setAttribute("style", "display:none");
      $("body").toggleClass("stop-scrolling");
    });
  }, 300);
}

$("#search").on("keydown", function (e) {
  setTimeout(function () {
    searchFnc(e.currentTarget.value);
  }, 500);
});

async function searchFnc(data) {
  debugger;
  const articleType = await fetch(`${searchKey}${data}`);
  var abc = await articleType.json();
  if (abc.Response === "False" || abc.Search.length < 2) {
    SearchRes = null;
  } else {
    var SearchRes = abc.Search;
  }
  const productstemp = document.getElementById("products-template").innerHTML;
  const productscompile = Handlebars.compile(productstemp);
  const compileddata = productscompile({ data: SearchRes });
  const container = document.getElementById("container");
  container.innerHTML = compileddata;
  const sug = document.getElementById("sug");
  sug.innerText = "Search Results";
  $(".card").on("click", function abc(e) {
    debugger;
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
    const sec = document.getElementById("secondary");
    sec.setAttribute("style", "display:grid");
    const load = document.getElementById("loading-animation");
    load.setAttribute("style", "display:block");
    $("body").toggleClass("stop-scrolling");
    setTimeout(function () {
      popup(e.currentTarget.id);
    }, 500);
  });
}

$("#home").on("click", function () {
  debugger;
  home();
  document.getElementById("search").value = "";
});

Handlebars.registerHelper("splitStringToArray", function (string) {
  debugger;
  return string.split(",");
});
