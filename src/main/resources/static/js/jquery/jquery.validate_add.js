// 정규식을 적용
$.validator.addMethod('regx', function(value, element, regexpr) {
  return regexpr.test(value)
})

// 다중 정규식 중 3개 이상 적용
$.validator.addMethod('multiRegxs', function(value, element, regexprs) {
  var regCount = 0
  regexprs.forEach(regexpr => {
    if (regexpr.test(value)) {
      regCount++
    }
  })
  return regCount >= 3
})

// 허용 불가 문자열 검사(id, 전화번호, 연속문자/숫자)
$.validator.addMethod('notAllowedData', function(value, element, datas) {
  // 반복 문자/숫자 체크
  if (isSameWord(value)) {
    return false
  }

  // 연속문자/숫자 체크
  if (!isContinueWord(value, 3)) {
    return false
  }

  // id, 전화번호 포함여부 체크
  var result = true
  datas.forEach(data => {
    if (data && value.indexOf(data) != -1) {
      result = false
    }
  })
  return result
})

function isSameWord(value) {
  return /(\w)\1\1/.test(value)
}

function isContinueWord(value, limit) {
  var o,
    d,
    p,
    n = 0,
    l = limit == null ? 3 : limit

  for (var i = 0; i < value.length; i++) {
    var c = value.charCodeAt(i)
    if (i > 0 && (p = o - c) > -2 && p < 2 && (n = p == d ? n + 1 : 0) > l - 3) {
      return false
    }
    ;(d = p), (o = c)
  }
  return true
}

$.validator.addMethod('prevPasswordCheck', function(value, element, adminUserId) {
  var isEnable = true
  $.ajax({
    url: '/login/existsPrevPassword',
    type: 'post',
    data: {
      adminUserId: adminUserId,
      password: value
    },
    dataType: 'json',
    async: false,
    success: function(response) {
      isEnable = !response
    },
    error: function(jqXHR, textStatus, errorThrown) {
      swal('이전 비밀번호 존재 여부 조회 오류', '', 'error')
    }
  })
  return isEnable
})

$.validator.addMethod('enableUserId', function(value, element) {
  var isEnable = true
  $.ajax({
    url: '/login/selectAdminUserChk',
    type: 'post',
    data: {
      userId: value
    },
    dataType: 'json',
    async: false,
    success: function(response) {
      isEnable = response == 0
    },
    error: function(jqXHR, textStatus, errorThrown) {
      swal('아이디 존재 여부 조회 오류', '', 'error')
    }
  })
  return isEnable
})

// 한글, 영어를 체크하여 계산된 바이트 길이를 최소 길이와 비교
$.validator.addMethod('minbytelength', function(value, element, param) {
  var nMin = param
  var nBytes = $.type(value) !== 'string' ? 0 : value.getByteLength() // 문자열의 Byte 길이를 반환(한글은 2byte이며 영숫자는 1byte)

  return this.optional(element) || nBytes === 0 || nBytes >= nMin
})

// 한글, 영어를 체크하여 계산된 바이트 길이를 최대 길이와 비교
$.validator.addMethod('maxbytelength', function(value, element, param) {
  var nMax = param
  var nBytes = $.type(value) !== 'string' ? 0 : value.getByteLength() // 문자열의 Byte 길이를 반환(한글은 2byte이며 영숫자는 1byte)

  return this.optional(element) || nBytes === 0 || nBytes <= nMax
})

// 한글, 영어를 체크하여 계산된 바이트 길이를 최소 길이와 최대 길이 비교
$.validator.addMethod('bytelength', function(value, element, params) {
  var nMin = params.min
  var nMax = params.max
  var nBytes = $.type(value) !== 'string' ? 0 : value.getByteLength() // 문자열의 Byte 길이를 반환(한글은 2byte이며 영숫자는 1byte)

  return this.optional(element) || nBytes === 0 || (nBytes >= nMin && nBytes <= nMax)
})
