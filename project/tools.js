const globals = require('./globals.js')
const fs = require('fs')
const server_os = process.platform

var objectify = {

  common: function (string, keys) {
    string = string.split('\n')
    var possible_keys = '^(' + keys.join('|') + ')'
    var keys_reg = new RegExp(possible_keys)
    var possible_vals = '^(' + keys.join('|') + '):*(.*)'
    var vals_reg = new RegExp(possible_vals)
    var prev_key = ''
    var index = -1
    var objects = []
    string.forEach((line) => {
      var key = line.match(keys_reg)
      var val = line.match(vals_reg)
      if (key && val) {
        if (key[0] === prev_key || !prev_key) {
          objects[++index] = {}
          prev_key = key[0]
        }
        objects[index][key[0]] = val[2].trim()
      }
    })
    return objects
  },

  lun_numbers: function (string) {
    var luns = []
    var regex = /[0-9]+[^\r\n]\s+[0-9]+/g
    var lines = string.match(regex)
    if (!lines) return luns
    lines.forEach((line) => {
      regex = /[0-9]*$/
      luns.push(line.match(regex)[0])
    })
    return luns
  }

}

var tools = {

  count_num_disks: function (string) {
    let lines = string.split('\n')
    let reg = /disk [0-9]+/i
    lines = lines.filter(line => reg.test(line))
    return lines.length
  }

}

var os = {

  get_os: function (name) {
    var linux = /lsl|lslv/i
    var windows = /lsw|lswv/i
    if (name.match(linux)) return 'linux'
    else if (name.match(windows)) return 'win32'
  }

}

var logger = {

  logit: function (string) {
    if (globals.verbose === 'yes') console.log(string)
    fs.appendFile(globals.log, string+'\n')
  }

}

var filter = {
  
  /*
  * Filters groups by os and user input
  * @param groups {array}
  * @return {array} filtered groups
  */
  groups: function (groups) {
    return groups.filter(g => {
      return  os.get_os(g['Storage Group Name']) === server_os 
                &&
              (new RegExp(globals.filtered_sgs,'i')).test(g['Storage Group Name'])
                && g['Storage Group Name'] != globals.server_sg
    })
  }

}

module.exports = {objectify, os, logger, filter, tools}
