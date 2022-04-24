$(function() {
  Handlebars.registerHelper('isYn', function(flag) {
    return flag == 1 ? 'Y' : 'N'
  })

  Handlebars.registerHelper('dateTimeFormat', function(TS) {
    if (TS != null) {
      return format(dateByString(TS.replace(/[T]/g, ' ').substring(0, 19)), 'yyyy-MM-dd HH:mm')
    }
  })

  Handlebars.registerHelper('dateFormat', function(TS) {
    if (TS != null) {
      return format(dateByString(TS.replace(/[T]/g, ' ').substring(0, 19)), 'yyyy-MM-dd')
    }
  })

  Handlebars.registerHelper('stringCut', function(str, length) {
    if (str != null) {
      return new Handlebars.SafeString(xssBlock(strEllipsis(str, length)))
    }
  })

  Handlebars.registerHelper('phoneHypen', function(phone) {
    return phoneHypen(phone)
  })

  Handlebars.registerHelper('playTypeCheck', function(playOperationType) {
    if (playOperationType == 'USER_PLAY') {
      return 'CUSTOM'
    } else if (playOperationType == 'SYSTEM_PLAY') {
      return 'SYSTEM'
    } else if (playOperationType == 'SMARTHOME') {
      return 'SMARTHOME'
    }
  })

  Handlebars.registerHelper({
    eq: function(v1, v2) {
      return v1 === v2
    },
    ne: function(v1, v2) {
      return v1 !== v2
    },
    lt: function(v1, v2) {
      return v1 < v2
    },
    gt: function(v1, v2) {
      return v1 > v2
    },
    lte: function(v1, v2) {
      return v1 <= v2
    },
    gte: function(v1, v2) {
      return v1 >= v2
    },
    and: function() {
      return Array.prototype.slice.call(arguments).every(Boolean)
    },
    or: function() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean)
    },
    minus: function(v1, v2) {
      return v1 - v2
    }
  })

  Handlebars.registerHelper('breakLines', function(text) {
    text = text.replace(/(\r|\n|\r\n)/g, '<br>')
    return new Handlebars.SafeString(text)
  })

  Handlebars.registerHelper({
    svcTypeStr : function(svcType) {
      switch (svcType) {
        case "apollo" :
          return "Apollo 전용"
        case "aladdin" :
          return "NUGU 전용"
        default :
          return "공통"
      }
    },
    svcTypeName : function(svcType) {
      return svcType == 'aladdin'? "NUGU" : "Apollo";
    }
  });
})
