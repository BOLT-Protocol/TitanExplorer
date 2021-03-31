let searching = false;
let searchTimeout = 0;
const TIMEOUT = 500;

$(document).ready(() => {
  const $input = $(".search input");
  console.log($input);
  const $result = $(".search-result");
  $result.hide();

  $result.css("width", "calc(100% - 110px)");
  $result.css("left", "55px");
  $result.css("top", "calc(100% - 40px)");

  //   $result.css("height", "100px");
  //   $result.css("background", "red");

  $input.bind("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (!$input.val()) {
        $result.hide();
        return;
      }
      if (searching) return;

      searching = true;
      onSearch($input.val());
    }, TIMEOUT);
  });

  $("body").on("click", function (event) {
    if (!$(event.target).is(".search-result")) {
        $(".search-result").hide();
    }
  });
});

const onSearch = (v) => {
  API.postSearch(v).then(
    (res) => {
      searching = false;

      if (res.success) {
        $(".search-result").show();
        console.log(tmpGenetator(TMP.SEARCH_RESAULT, res.payload));
        $(".search-result").html(tmpGenetator(TMP.SEARCH_RESAULT, res.payload));
      }
    },
    (e) => {
      searching = false;
      console.error(e);
    }
  );
};
