class ToggleLikes {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;
      $.ajax({
        type: "Post",
        url: $(self).attr("href"),
      })
        .done(function (data) {
          let likesCount = parseInt($(self).attr("data-like"));
          if (data.data.deleted == true) {
            likesCount = data.data.likes;
          } else {
            likesCount += 1;
          }

          $(self).attr("data-likes", likesCount);
          $(self).html(`${likesCount} Like`);
        })
        .fail(function (errData) {
          console.log("error in completing the request");
        });
    });
  }
}
