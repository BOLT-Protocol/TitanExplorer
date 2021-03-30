let searching = false;

$(document).ready(() => {
  const $input = $(".search input");

  $(".search button").click((e) => {
    if (!$input.val() || searching) {
      return;
    }

    searching = true;
    onSearch($input.val());
  });
});

const onSearch = (v) => {
  API.postSearch(v).then(
    (res) => {
      searching = false;

      if (res.success) {
        const { redirectType, redirectPathId } = res.payload;
        const path = location.pathname;
        const page = path.substring(path.lastIndexOf("/") + 1);

        switch (redirectType) {
          case "address":
            location.href = location.href.replace(
              page,
              `address.html?address=${redirectPathId}`
            );
            break;
          case "transaction":
            break;
          default:
        }
      }
    },
    (e) => {
      searching = false;

      console.error(e);
    }
  );
};
