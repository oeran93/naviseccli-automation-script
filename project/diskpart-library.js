const exec = require('child_process').exec
const log = require('./tools.js').logger
const tools = require('./tools.js').tools
const globals = require('./globals')
const fs = require('fs')
const os = require('os')

module.exports = {

 num_disks: function () {
  let command = 'list disk'
  fs.writeFileSync(globals.disk_script, command)
  return call_diskpart(tools.count_num_disks)
 },

 offline_online_disks: function (disk_num) {
  [...Array(disk_num).keys()].map(num => {
    let command = 'sel disk '+num+os.EOL
    command += 'offline disk noerr'+os.EOL
    command += 'online disk noerr'+os.EOL
    fs.writeFileSync(globals.disk_script, command)
    call_diskpart()
  })
 }

}

function call_diskpart (modifier = (x) => x , args2 = []) {
  return new Promise((resolve, reject) => {
    exec('diskpart /s '+globals.disk_script,
      (err, stdout, stderr) => {
        log.logit('diskpart executing')
        if (err) {
          log.logit("diskpart error")
        }
        else log.logit("diskpart done")
        resolve(modifier.call(this,stdout,args2))
      }
    )
  })
}