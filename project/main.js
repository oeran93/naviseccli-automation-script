/*
* @file
* this scripts performs the following operations
*
* Script sequence of actions
*  retreive all storage groups.
*  filter out the one that do not have the same os as the server the script is sitting in
*  retrieve all luns for this storage groups
*  for each one of them
*    detach its snapshot if exists
*    create/recreate snapshot
*    attach new snapshot to mp of this lun to this server's storage group.
*
* to call it simply run 'node main' from the directory of this file
*
* make sure the following environmental vaiables are specified before running the script
*   naviseccli_server: server that hosts the naviseccli service
*/
const naviseccli = require('./library.js')
const objectify = require('./tools.js').objectify
const os = require('./tools.js').os
const server_os = process.platform
const hostname = require('os').hostname()
const log = require('./tools.js').logger
const fs = require('fs')

naviseccli.list_storagegroups()
  .then(groups => {
    groups = groups.filter(g => os.get_os(g['Storage Group Name']) === server_os)
    groups.forEach(group => {
      naviseccli.list_storagegroup_luns(group['Storage Group Name'])
      .then(luns => {
        luns.forEach(lun => {
          naviseccli.detach_snap(lun+'_snap')
          .then(() => {
            naviseccli.recreate_snap(lun)
            .then(snap => {
              naviseccli.list_mp_uid(lun+'_mp')
              .then(mp => {
                  mp = mp[0]['LOGICAL UNIT NUMBER']
                  naviseccli.attach_snap(snap,mp)
              })
            })
          })
        })
      })
    })
  })





















// function attach_mp() {
//   return new Promise ((resolve, reject) => {
//     naviseccli.list_lun_mps(5)
//      .then(mps => {
//         mps = mps[0]['Snapshot Mount Points'].split(',').map(Number)
//         console.log(typeof mps[0])
//         if (typeof mps[0] != 'number') {
//           console.log('empty')
//           naviseccli.create_snap_mp('5','5_mp')
//             .then(attach_mp)
//         } else {
//           console.log('not empty')
//           naviseccli.attach_mp('SG_LSVM110',mps[0],num_mps)
//             .then( () => resolve(mps[0]))
//         }
//      })
//   })
// }

// attach_mp().then(x => console.log(x))