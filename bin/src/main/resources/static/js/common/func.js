function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

function goUrl(url) {
  location.href = url
}

function goFrontPlayDetail(status, finishedClass, revisionId) {
  if (status == 99 || status == 0) {
    goUrl('/admin/front?menuId=101&revisionId='+ revisionId);
  } else if(status == 2 || status == 3 || status == 4 || status == 5 || status == 6) {
    goUrl('/admin/front?menuId=102&revisionId='+ revisionId);
  } else if((status == 7 || status == 8 || status == 9) && finishedClass == '' && finishedClass == undefined ) {
    goUrl('/admin/front?menuId=103&revisionId='+ revisionId);
  } else {
    goUrl('/admin/front?menuId=104&revisionId='+ revisionId);
  }
}

function getDayOfWeek(date) {
  var week = ['일', '월', '화', '수', '목', '금', '토']
  var dayOfWeek = week[new Date(date).getDay()]
  return dayOfWeek
}

/* *
 * 목록의 상세화면에서 목록버튼 클릭시 처리
 * 목록에서 항목을 클릭해 상세화면으로 이동한 경우 history.back으로 이전 페이지 목록으로 이동,
 * 링크를 타고 바로 들어온 경우 목록의 첫페이지로 이동
 * */
function goList(listUrl) {
  var prevPage = document.referrer

  if (prevPage.indexOf(listUrl) > 0) {
    history.back()
  } else {
    goUrl(listUrl)
  }
}

function formSerialize(form) {
  if (!form || form.nodeName !== 'FORM') {
    return
  }
  var i,
    j,
    q = []
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === '') {
      continue
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'tel':
          case 'email':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
            break
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
            }
            break
        }
        break
      case 'file':
        break
      case 'TEXTAREA':
        q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
        break
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
            break
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].options[j].value))
              }
            }
            break
        }
        break
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
            break
        }
        break
    }
  }
  return q.join('&')
}

function pagingHtml(selector, page, resultMap, fnName) {
  var pagingVo = resultMap.pagingDto
  var htmlPaging = ''
  if (resultMap.pagingDto.totalCount > 0) {
    //맨 처음
    htmlPaging += '<li>'
    htmlPaging += '<a href="javascript:' + fnName + '(' + pagingVo.firstPageNo + ');" >처음</a>'
    htmlPaging += '</li>'

    //블럭의 첫번째 페이지
    htmlPaging += '<li>'
    htmlPaging += '	<a href="javascript:' + fnName + '(' + pagingVo.prevBlockPageNo + ')" aria-label="Previous">'
    htmlPaging += '		<span aria-hidden="true" style="font-size:12px; line-height:1.7;">≪</span>'
    htmlPaging += '	</a>'
    htmlPaging += '</li>'

    //이전 페이지
    htmlPaging += '<li>'
    htmlPaging += '	<a href="javascript:' + fnName + '(' + pagingVo.prevPageNo + ')" aria-label="Previous">'
    htmlPaging += '		<span aria-hidden="true" style="font-size:12px; line-height:1.7;">＜</span>'
    htmlPaging += '	</a>'
    htmlPaging += '</li>'

    for (var i = pagingVo.startPageNo; i <= pagingVo.endPageNo; i++) {
      if (i == page) {
        htmlPaging += '<li class="active"><a href="javascript:' + fnName + '(' + i + ')">' + i + '</a></li>'
      } else {
        htmlPaging += '<li><a href="javascript:' + fnName + '(' + i + ')" >' + i + '</a></li>'
      }
    }

    //다음 페이지
    htmlPaging += '<li>'
    htmlPaging += '	<a href="javascript:' + fnName + '(' + pagingVo.nextPageNo + ')" >'
    htmlPaging += '		<span aria-hidden="true" style="font-size:12px; line-height:1.7;">＞</span>'
    htmlPaging += '	</a>'
    htmlPaging += '</li>'

    //블럭 마지막 페이지
    htmlPaging += '<li>'
    htmlPaging += '	<a href="javascript:' + fnName + '(' + pagingVo.nextBlockPageNo + ')" >'
    htmlPaging += '		<span aria-hidden="true" style="font-size:12px; line-height:1.7;">≫</span>'
    htmlPaging += '	</a>'
    htmlPaging += '</li>'

    //맨 마지막
    htmlPaging += '<li>'
    htmlPaging += '<a href="javascript:' + fnName + '(' + pagingVo.finalPageNo + ');" >마지막</a>'
    htmlPaging += '</li>'
  }
  selector.innerHTML = htmlPaging
}

function newPagingHtml(selector, page, pagingVo, fnName) {
  var htmlPaging = ''
  if (pagingVo.totalCount > 0) {
    //맨 처음
    htmlPaging += '<li>'
    htmlPaging += '<a href="javascript:' + fnName + '(' + pagingVo.firstPageNo + ');" >처음</a>'
    htmlPaging += '</li>'

    //블럭의 첫번째 페이지
    htmlPaging += '<li>'
    htmlPaging += '	<a href="javascript:' + fnName + '(' + pagingVo.prevBlockPageNo + ')" aria-label="Previous">'
    htmlPaging += '		<span aria-hidden="true" style="font-size:12px; line-height:1.7;">≪</span>'
    htmlPaging += '	</a>'
    htmlPaging += '</li>'

    //이전 페이지
    htmlPaging += '<li>'
    htmlPaging += '	<a href="javascript:' + fnName + '(' + pagingVo.prevPageNo + ')" aria-label="Previous">'
    htmlPaging += '		<span aria-hidden="true" style="font-size:12px; line-height:1.7;">＜</span>'
    htmlPaging += '	</a>'
    htmlPaging += '</li>'

    for (var i = pagingVo.startPageNo; i <= pagingVo.endPageNo; i++) {
      if (i == page) {
        htmlPaging += '<li class="active"><a href="javascript:' + fnName + '(' + i + ')">' + i + '</a></li>'
      } else {
        htmlPaging += '<li><a href="javascript:' + fnName + '(' + i + ')" >' + i + '</a></li>'
      }
    }

    //다음 페이지
    htmlPaging += '<li>'
    htmlPaging += '	<a href="javascript:' + fnName + '(' + pagingVo.nextPageNo + ')" >'
    htmlPaging += '		<span aria-hidden="true" style="font-size:12px; line-height:1.7;">＞</span>'
    htmlPaging += '	</a>'
    htmlPaging += '</li>'

    //블럭 마지막 페이지
    htmlPaging += '<li>'
    htmlPaging += '	<a href="javascript:' + fnName + '(' + pagingVo.nextBlockPageNo + ')" >'
    htmlPaging += '		<span aria-hidden="true" style="font-size:12px; line-height:1.7;">≫</span>'
    htmlPaging += '	</a>'
    htmlPaging += '</li>'

    //맨 마지막
    htmlPaging += '<li>'
    htmlPaging += '<a href="javascript:' + fnName + '(' + pagingVo.finalPageNo + ');" >마지막</a>'
    htmlPaging += '</li>'
  }
  selector.innerHTML = htmlPaging
}

function modalPagingHtml(selector, page, pagingVo, fnName, param) {
  var htmlPaging = ''
  if (pagingVo.totalCount > 0) {
    //맨 처음
    htmlPaging += '<li>'
    htmlPaging += '<a href="javascript:' + fnName + '(' + pagingVo.firstPageNo + ',' + param + ');" >처음</a>'
    htmlPaging += '</li>'

    //블럭의 첫번째 페이지
    htmlPaging += '<li>'
    htmlPaging += '    <a href="javascript:' + fnName + '(' + pagingVo.prevBlockPageNo + ',' + param + ')" aria-label="Previous">'
    htmlPaging += '        <span aria-hidden="true" style="font-size:12px; line-height:1.7;">≪</span>'
    htmlPaging += '    </a>'
    htmlPaging += '</li>'

    //이전 페이지
    htmlPaging += '<li>'
    htmlPaging += '    <a href="javascript:' + fnName + '(' + pagingVo.prevPageNo + ',' + param + ')" aria-label="Previous">'
    htmlPaging += '        <span aria-hidden="true" style="font-size:12px; line-height:1.7;">＜</span>'
    htmlPaging += '    </a>'
    htmlPaging += '</li>'

    for (var i = pagingVo.startPageNo; i <= pagingVo.endPageNo; i++) {
      if (i == page) {
        htmlPaging += '<li class="active"><a href="javascript:' + fnName + '(' + i + ',' + param + ')">' + i + '</a></li>'
      } else {
        htmlPaging += '<li><a href="javascript:' + fnName + '(' + i + ',' + param + ')" >' + i + '</a></li>'
      }
    }

    //다음 페이지
    htmlPaging += '<li>'
    htmlPaging += '    <a href="javascript:' + fnName + '(' + pagingVo.nextPageNo + ',' + param + ')" >'
    htmlPaging += '        <span aria-hidden="true" style="font-size:12px; line-height:1.7;">＞</span>'
    htmlPaging += '    </a>'
    htmlPaging += '</li>'

    //블럭 마지막 페이지
    htmlPaging += '<li>'
    htmlPaging += '    <a href="javascript:' + fnName + '(' + pagingVo.nextBlockPageNo + ',' + param + ')" >'
    htmlPaging += '        <span aria-hidden="true" style="font-size:12px; line-height:1.7;">≫</span>'
    htmlPaging += '    </a>'
    htmlPaging += '</li>'

    //맨 마지막
    htmlPaging += '<li>'
    htmlPaging += '<a href="javascript:' + fnName + '(' + pagingVo.finalPageNo + ',' + param + ');" >마지막</a>'
    htmlPaging += '</li>'
  }
  selector.innerHTML = htmlPaging
}

/**
 * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
 *
 * @param str :
 *            체크할 문자열
 */
function isEmpty(str) {
  if (typeof str == 'undefined' || str == null || str == '') return true
  else return false
}

/**
 * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 *
 * @param str :
 *            체크할 문자열
 * @param defaultStr :
 *            문자열이 비어있을경우 리턴할 기본 문자열
 */
function nvl(str, defaultStr) {
  if (typeof str == 'undefined' || str == null || str == '') str = defaultStr
  return str
}

/**
 * 카테고리 코드 셀렉트 리스트를 만든다
 *
 * @param classification :
 *            어떠한 카테고리 코드인지
 * @param selector :
 *            셀렉트 리스트를 붙일 element
 * @param selected :
 *            해당 값 selected
 * @param all :
 *            전체 true, false
 *
 * @param platformType :
 *            플랫폼 타입에 따른 카테고리 변경
 * @returns
 */
function ctCodeSelect(classification, selector, selected, all, platformType) {
  $.ajax({
    type: 'post',
    url: '/common/selectCategoryCode',
    data: {
      classification: classification,
      platformType: platformType
    },
    dataType: 'json',
    success: function(response) {
      $('#' + selector + '').empty()
      var categoryDto = response
      var html = ''
      if (all) {
        html += '<option value="">전체</option>'
      } else {
        if (selected != '') {
          html += '<option value="" disabled>선택</option>'
        } else {
          html += '<option value="" disabled selected>선택</option>'
        }
      }
      if (categoryDto != '') {
        for (var i = 0; i < categoryDto.length; i++) {
          var desc = categoryDto[i].categoryDesc
          if (classification == 'REVIEW') {
            desc = desc.replace(/<br>/g, ' ')
          }
          if (selected == categoryDto[i].category && selected != '') {
            html +=
              '<option value="' +
              categoryDto[i].category +
              '" data-desc="' +
              categoryDto[i].categoryDesc +
              '" selected="selected">' +
              categoryDto[i].categoryKoName +
              '</option>'
          } else {
            html +=
              '<option value="' + categoryDto[i].category + '" data-desc="' + categoryDto[i].categoryDesc + '">' + categoryDto[i].categoryKoName + '</option>'
          }
        }
      }
      $('#' + selector + '').append(html)
    },
    error: function(e) {
      if (e.status == 200) {
        location.href = '/login/adminLogin'
      } else {
        swal(e.responseText)
      }
    }
  })
}

/**
 * 카테고리 코드 셀렉트 리스트를 만든다
 *
 * @param classification :
 *            어떠한 카테고리 코드인지
 * @param selector :
 *            셀렉트 리스트를 붙일 element
 * @param selected :
 *            해당 값 selected
 * @param all :
 *            전체 true, false
 * @param menu :
 *            메뉴에 따른 Play 상태 값 보이기
 * @returns
 */
function stCodeSelect(classification, selector, selected, all, menu) {
  $.ajax({
    type: 'post',
    url: '/common/selectStatusCode',
    data: {
      menu: menu
    },
    dataType: 'json',
    success: function(response) {
      $('#' + selector + '').empty()
      var statusDto = response
      var html = ''
      if (all) {
        html += '<option value="">전체</option>'
      } else {
        html += '<option value="" disabled selected>선택</option>'
      }
      if (statusDto != '') {
        for (var i = 0; i < statusDto.length; i++) {
          if (selected == statusDto[i].status && selected != '') {
            html +=
              '<option value="' +
              statusDto[i].status +
              '" data-status="' +
              statusDto[i].statusName +
              '" selected="selected">' +
              statusDto[i].statusKoName +
              '</option>'
          } else {
            html += '<option value="' + statusDto[i].status + '" data-status="' + statusDto[i].statusName + '">' + statusDto[i].statusKoName + '</option>'
          }
        }
      }
      $('#' + selector + '').append(html)
    },
    error: function(e) {
      if (e.status == 200) {
        location.href = '/login/adminLogin'
      } else {
        swal(e.responseText)
      }
    }
  })
}

/**
 * Admin 등급 코드 셀렉트 리스트를 만든다
 *
 * @param selector :
 *            셀렉트 리스트를 붙일 element
 * @param selected :
 *            해당 값 selected
 * @param all :
 *            전체 true, false
 * @returns
 */
function adminRoleSelect(selector, selected, all) {
  $.ajax({
    type: 'post',
    url: '/common/selectAdminUserRoleCode',
    data: {},
    dataType: 'json',
    success: function(response) {
      $('#' + selector + '').empty()
      var adminRoleDto = response
      var html = ''
      if (all) {
        html += '<option value="">전체</option>'
      } else {
        html += '<option value="" >선택해 주세요</option>'
      }
      if (adminRoleDto != '') {
        for (var i = 0; i < adminRoleDto.length; i++) {
          if (selected == adminRoleDto[i].adminUserRoleId && selected != '') {
            html +=
              '<option value="' +
              adminRoleDto[i].adminUserRoleId +
              '" data-desc="' +
              adminRoleDto[i].roleDesc +
              '" selected="selected">' +
              adminRoleDto[i].roleDesc +
              '</option>'
          } else {
            html +=
              '<option value="' + adminRoleDto[i].adminUserRoleId + '" data-desc="' + adminRoleDto[i].roleDesc + '">' + adminRoleDto[i].roleDesc + '</option>'
          }
        }
      }
      $('#' + selector + '').append(html)
    },
    error: function(e) {
      if (e.status == 200) {
        location.href = '/login/adminLogin'
      } else {
        swal(e.responseText)
      }
    }
  })
}

function refresh() {
  $('form')
    .get(0)
    .reset()
}

function fileDownload(id, type, menu) {
  var form = $('<form></form>')
  form.attr('action', '/common/fileDownload')
  form.attr('method', 'post')
  form.appendTo('body')
  var id = $("<input type='hidden' value='" + id + "' id='id' name='id'>")
  var type = $("<input type='hidden' value='" + type + "' id='type' name='type'>")
  var menu = $("<input type='hidden' value='" + menu + "' id='menu' name='menu'>")

  form.append(id)
  form.append(type)
  form.append(menu)
  form.submit()
}

function fileDownloadUrl(url, fileName) {
  var form = $('<form></form>')
  form.attr('action', '/common/fileDownloadUrl')
  form.attr('method', 'get')
  form.appendTo('body')
  var url = $("<input type='hidden' value='" + url + "' id='url' name='url'>")
  var fileName = $("<input type='hidden' value='" + fileName + "' id='fileName' name='fileName'>")

  form.append(url)
  form.append(fileName)
  form.submit()
}

//search form reset
function searchFormReset() {
  $('.form-horizontal')[0].reset()
  if ($('#fromDatePicker')) $('#fromDatePicker').datepicker('update', '')
  if ($('#toDatePicker')) $('#toDatePicker').datepicker('update', '')
}

//전화번호 하이픈
function phoneHypen(str) {
  if (str) {
    return str.replace(/[^0-9]/g, '').replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-");
  }
  return str
}

//말줄임표 붙이기
function strEllipsis(str, len) {
  if (str.length > len) {
    str = str.substr(0, len) + '...'
  }
  return str
}

/*
문자열의 공백을 모두 제거한 뒤에
문자열을 검사해서 http:// , https://, ftp:// .. etc 로 시작하지 않을 경우
http:// 를 맨앞에 붙여서 반환
*/
function getRightURL(n) {
  var tmpURL = n.replace(/\s/g, '')
  var tmp = tmpURL.toLowerCase()
  if (
    tmp.indexOf('http://') == 0 ||
    tmp.indexOf('https://') == 0 ||
    tmp.indexOf('ftp://') == 0 ||
    tmp.indexOf('mailto:// ') == 0 ||
    tmp.indexOf('mms://') == 0 ||
    tmp.indexOf('pnm://') == 0 ||
    tmp.indexOf('telnet:// ') == 0 ||
    tmp.indexOf('rlogin://') == 0 ||
    tmp.indexOf('news:// ') == 0 ||
    tmp.indexOf('file://') == 0
  )
    return tmpURL
  else return 'http://' + tmpURL
}

//홈페이지로 이동
function goHomepage(url) {
  url = getRightURL(url)
  window.open(url, '_blank')
}

/** IE 에서는 obj.serialize() function이 동작하지 않기 때문에 아래와 같이 만들어 준다. */

function serialize(form) {
  if (!form || form.nodeName !== 'FORM') {
    return
  }
  var i,
    j,
    q = []
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === '') {
      continue
    }
    if (form.elements[i].disabled === true) {
      continue
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
            break
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
            }
            break
        }
        break
      case 'file':
        break
      case 'TEXTAREA':
        q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
        break
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
            break
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].options[j].value))
              }
            }
            break
        }
        break
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            q.push(form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value))
            break
        }
        break
    }
  }
  return q.join('&')
}

function escapeHtml(string) {
  var entityMap = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    //'/': '&#x2F;',
    '`': '&#x60;'
    //'=': '&#x3D;'
  }

  return String(string).replace(/[<>"'`]/g, function(s) {
    return entityMap[s]
  })
}

/**
 *
 * @param selected		현재 선택한 status
 * @param oStatusName	해당 revision의 statusName
 * @param oStatus		해당 revision의 status 값
 * @param id			select box id
 * @returns
 */
function noSelectStatus(selected, oStatusName, oStatus, id) {
  var flag = false

  // 서비스중을 선택했을 시 서비스 중지, 서비스 차단, 서비스 중 이외에는 선택할 수 없다.
  if (selected == 'SERVICED') {
    if (oStatusName != 'DISABLED' && oStatusName != 'BLOCKED' && oStatusName != 'SERVICED' && oStatusName != 'INFO_FINISHED') {
      flag = true
    }
  }

  // 해당 revision이 서비스 중 이었을때는 이 전 status를 선택 할 수 없다.
  if (oStatusName == 'SERVICED') {
    if (
      selected != 'SERVICED' &&
      selected != 'DISABLED' &&
      selected != 'BLOCKED' &&
      selected != 'DELETED' &&
      selected != 'FINISHED' &&
      selected != 'INFO_FINISHED'
    ) {
      flag = true
    }
  }

  if (flag) {
    swal({
      title: 'Play 상태 변경',
      text: '해당 Play 상태를 선택하실 수 없습니다.',
      type: 'warning',
      confirmButtonClass: 'btn-primary',
      confirmButtonText: '저장',
      closeOnConfirm: false
    })
    $(id).val(oStatus)
  }
}

function xssBlock(str) {
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/%00/, null)
  str = str.replace(/\"/g, '&#34;')
  str = str.replace(/\'/g, '&#39;')
  str = str.replace(/%/, '&#37;')
  str = str.replace(/..\\\\/, '')
  str = str.replace(/%2F/, '')
  return str
}

/* 뒤로가기시 페이지 유지 처리 */
function checkForHashPage() {
  if (document.location.hash) {
    var HashPage = document.location.hash
    HashPage = HashPage.replace('#', '')
    loadList(HashPage)
  } else {
    loadList(1)
  }
}

/* 날짜 포맷 */
function format(time, formatStr) {
  if (time == '') {
    return ''
  }
  var t = new Date(time)
  var tf = function(i) {
    return (i < 10 ? '0' : '') + i
  }
  return formatStr.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
        break
      case 'MM':
        return tf(t.getMonth() + 1)
        break
      case 'mm':
        return tf(t.getMinutes())
        break
      case 'dd':
        return tf(t.getDate())
        break
      case 'HH':
        return tf(t.getHours())
        break
      case 'ss':
        return tf(t.getSeconds())
        break
    }
  })
}

function dateByString(strDate) {
  var dateTime = strDate.split(' ')
  var date = dateTime[0].split('-')
  var time = dateTime[1].split(':')
  return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2])
}

function stringToDateFormat(strDate, formatStr) {
  var date = dateByString(strDate)
  return format(date, formatStr)
}

/*체크박스 Array 돌려줌*/
function getCheckboxStrArray(name) {
  return $('input:checkbox[name="' + name + '"]:checked')
    .map(function() {
      return $(this)
        .val()
        .trim()
    })
    .get() // array를 갖고 있는 jQuery object를 array로 바꿈
    .filter(function(val) {
      return val != ''
    })
}

function pad(n, width) {
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
}

//Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
    }
    var toInteger = function(value) {
      var number = Number(value)
      if (isNaN(number)) {
        return 0
      }
      if (number === 0 || !isFinite(number)) {
        return number
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
    }
    var maxSafeInteger = Math.pow(2, 53) - 1
    var toLength = function(value) {
      var len = toInteger(value)
      return Math.min(Math.max(len, 0), maxSafeInteger)
    }

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike)

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined')
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined
      var T
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function')
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2]
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length)

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len)

      // 16. Let k be 0.
      var k = 0
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue
      while (k < len) {
        kValue = items[k]
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k)
        } else {
          A[k] = kValue
        }
        k += 1
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len
      // 20. Return A.
      return A
    }
  })()
}

//https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0

      // 3. If len is 0, return false.
      if (len === 0) {
        return false
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y))
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true
        }
        // c. Increase k by 1.
        k++
      }

      // 8. Return false
      return false
    }
  })
}

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict'
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object')
      }

      var to = Object(target)

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }

      var o = Object(this)

      var len = o.length >>> 0

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      var thisArg = arguments[1]

      var k = 0

      while (k < len) {
        var kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return k
        }
        k++
      }

      return -1
    },
    configurable: true,
    writable: true
  })
}

if (!sanitizeHtml) var sanitizeHtml = {}
sanitizeHtml.defaults = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'p',
    'a',
    'ul',
    'ol',
    'nl',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'strike',
    'code',
    'hr',
    'br',
    'div',
    's',
    'sub',
    'img',
    'table',
    'thead',
    'caption',
    'tbody',
    'tr',
    'th',
    'td',
    'pre',
    'iframe',
    'blockquote',
    'u',
    'span'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src', 'style'],
    span: ['style', 'class'],
    p: ['style', 'class'],
    table: ['class'],
    iframe: ['frameborder', 'src', 'width', 'height', 'class', 'allowfullscreen'],
    pre: ['class', 'spellcheck'],
    '*': ['style']
  },
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
  allowProtocolRelative: true
}

var genericExamples
function makePlaySearchChoices() {
  genericExamples = new Choices('[data-trigger-playSearch]', {
    placeholderValue: '',
    shouldSort: false,
    searchEnabled: true,
    searchChoices: false,
    resetScrollPosition: false,
    noChoicesText: '검색결과가 없습니다.',
    editItems: true,
    callbackOnInit: function() {
      var thisChoices = this
      $.ajax({
        type: 'get',
        url: '/play/getAllPocList',
        data: {
          searchText: thisChoices.input.value
        },
        dataType: 'json',
        success: function(response) {
          var result = response.list
          var prevPocArr = thisChoices.getValue(true)

          var pocArr = new Array()
          for (var i = 0; i < result.length; i++) {
            var pocObj = new Object()
            if (prevPocArr.includes(result[i].pocName)) {
              pocObj = { value: result[i].pocName, label: result[i].pocName, disabled: true }
              pocArr.push(pocObj)
            } else {
              pocObj = { value: result[i].pocName, label: result[i].pocName }
              pocArr.push(pocObj)
            }
          }

          thisChoices.setChoices(pocArr, 'value', 'label', false)

          $(genericExamples.passedElement.element).on({
            choice: function(event) {
              if (event.detail.choice.disabled) {
                swal('이미 선택되어 있는 POC 입니다', '', 'info')
              }
              $('.choices__list--dropdown').hide()
              genericExamples._clearChoices()
            }
          })

          $(genericExamples.passedElement.element)
            .next()
            .next()
            .on({
              keyup: function() {
                var thisSelectBox = $(this)
                  .prev()
                  .prev()
                var inputVal = $(this)
                  .val()
                  .replace(/\,/g, '')
                  .trim()
                if (inputVal.length > 0) {
                  playSearchCommon(thisSelectBox, inputVal)
                  $('.choices__list--dropdown').show()
                }
              },
              blur: function() {
                $(this).val('')
                $('.choices__list--dropdown').hide()
              }
            })
        },
        error: function(e) {
          alert(e.responseText)
        }
      })
    }
  })
}

function playSearchCommon(selectBox, inputVal) {
  $.ajax({
    type: 'get',
    url: '/play/getAllPocList',
    data: {
      gubun: 1,
      searchText: inputVal
    },
    dataType: 'json',
    success: function(response) {
      var result = response.list
      var prevPocArr = genericExamples.getValue(true)

      var pocArr = new Array()
      for (var i = 0; i < result.length; i++) {
        var pocObj = new Object()
        if (prevPocArr.includes(result[i].pocName)) {
          pocObj = { value: result[i].pocName, label: result[i].pocName, disabled: true }
          pocArr.push(pocObj)
        } else {
          pocObj = { value: result[i].pocName, label: result[i].pocName }
          pocArr.push(pocObj)
        }
      }

      genericExamples._clearChoices()
      genericExamples.setChoices(pocArr, 'value', 'label', false)
    },
    error: function(e) {
      alert(e.responseText)
    }
  })
}

function resetSearchCondition() {
  if ($('#noInvocationName').length > 0) {
    if ($('#noInvocationName').is(':checked')) {
      $('#noInvocationName').click()
    }
    $('#noInvocationName')
      .closest('div')
      .hide()
  }
  searchFormReset()
  if (genericExamples) {
    genericExamples.destroy()
    makePlaySearchChoices()
  }
}

function isIE() {
  return (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) || navigator.userAgent.toLowerCase().indexOf('msie') !== -1
}
