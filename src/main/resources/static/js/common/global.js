/*
 *  Cross Site Request Forgery (CSRF)
 *  protected CSRF for ajax Jquery
 */

$(function() {
  var token = $("meta[name='_csrf']").attr('content')
  var header = $("meta[name='_csrf_header']").attr('content')
  $(document).ajaxSend(function(e, xhr, options) {
    if (token && header) {
      xhr.setRequestHeader(header, token)
    }
  })

  $('.dropdown-toggle').on('click', function() {
    goUrl(
      $(this)
        .next()
        .find('a:eq(0)')
        .prop('href')
    )
  })
})
