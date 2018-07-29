'use strict'

var _ = require('lodash')
var chroma = require('chroma-js')

module.exports = function statusTypes (arr, current, lightBG) {
  var statusList = _.uniq(sanitize(arr))
  var colors = chroma.scale('Spectral').mode('rgb').colors(statusList.length)

  var id = currentID(statusList, current)
  var bg = _.toString(colors[statusID(statusList, id)])
  var text = textColor(bg)

  if (lightBG) {
    return 'background-color:' + bgColor(bg) + '; border-color: ' + bg
  } else {
    return 'background-color:' + bg + '; color: ' + text + '; border-color: ' + bg
  }
}

function sanitize (list) {
  var arr = []
  _.forEach(list, function (value, id) {
    arr.push(_.split(value, ' - ')[0])
  })
  return arr
}

function currentID (list, current) {
  var statusCurrentId = ''
  _.forEach(list, function (value, id) {
    if (_.includes(_.split(current, ' - ')[0], value)) {
      statusCurrentId = id
    }
  })
  return statusCurrentId
}

function statusID (list, id) {
  var state = 0
  for (var i = 0; i < list.length; i++) {
    if (id === i) state = i
  }
  return state
}

function textColor (hex) {
  var r = parseInt(hex.substr(1, 2), 16)
  var g = parseInt(hex.substr(3, 2), 16)
  var b = parseInt(hex.substr(5, 2), 16)
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 180) ? '#333333' : '#ffffff'
}

function bgColor (hex) {
  var a = parseInt(hex.substr(1, 2), 16)
  var b = parseInt(hex.substr(3, 2), 16)
  var c = parseInt(hex.substr(5, 2), 16)
  return 'rgb(' + a + ',' + b + ',' + c + ', 0.1)'
}
