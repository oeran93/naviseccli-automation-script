const naviseccli = require('./library.js')
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()
const globals = require('./globals.js')
const filter = require('./tools.js').filter

/*Command line arguments settings*/
emitter.on('setup', (cmd_line_args) => {
  for (let i = 2; i < cmd_line_args.length; i++) {
    globals[cmd_line_args[i].replace('-','')] = cmd_line_args[++i]
  }
})

/*Routine*/
emitter.on('start_routine', () => {
  naviseccli.list_storagegroups()
  .then(groups => {
    groups = filter.groups(groups)
    groups.forEach(group => {
      naviseccli.list_storagegroup_luns(group['Storage Group Name'])
      .then(luns => {
        luns.forEach(lun => {
          naviseccli.detach_snap(lun+'_snap')
          .then(() => {
            naviseccli.recreate_snap(lun)
            .then((snap) => {
              naviseccli.list_mp_uid(lun+'_mp')
              .then((mp) => { //if logic in here fails there is no error handling!!
                if (mp) {
                  mp = mp[0]['LOGICAL UNIT NUMBER']
                  naviseccli.attach_snap(snap,mp)
                }
              })
            })
          })
        })
      })
    })
  })
})


emitter.emit('setup',process.argv)
emitter.emit('start_routine')