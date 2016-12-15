const exec = require('child_process').exec
const api = require('./api.js')
const objectify = require('./tools.js').objectify
const log = require('./tools.js').logger

module.exports = {
  /*
  * List all storagegroups
  * @param options {string} all options to pass to storagegroup -list api call
  * @return {promise} data passed to promise is an array of objects with Storage 
  * Group Name and Hostname of each storagegroup
  */
  list_storagegroups: (options) => call_api(api.list_storagegroups, [options], objectify.common, ['Storage Group Name', 'Host name']),
  /*
  * list all the luns for a given storagegroup
  * @param name {string} name of the storage group
  * return {promise}
  */
  list_storagegroup_luns: (name) => call_api(api.list_storagegroups, ['-gname ' + name], objectify.lun_numbers),
  /*
  * Lists all luns info. By default the only info printed is uid. More can be
  * specified by passing them as command line args
  * @param options {string} infos to specify. e.g. '-capacity -drivetype'
  * @return {promise}
  */
  list_all_luns: (options) => call_api(api.list_all_luns, [options]),
  /*
  * Lists all snaps info for 1 lun.
  * @param lun_id {string} lun id
  * @return {promise}
  */
  list_all_snaps: (lun_id) => call_api(api.list_all_snaps, [lun_id], objectify.common, ['Name']),
  /*
  * Create a new snapshot with read/write permission
  * @param lun_id {number} lun_id to take a snapshot of
  * @param name {string} name to assign to the new snapshot
  * @return {promise}
  */
  create_snap: (lun_id, name) => call_api(api.create_snap, [lun_id, name]),
  /*
  * Create a snap mountpoint for a specific lun
  * @param lun_id {number}
  * @param snap_mp_name {string} name to assign to the new snapshot mount point
  * @return {promise}
  */
  create_snap_mp: (lun_id, snap_mp_name) => call_api(api.create_snap_mp, [lun_id,snap_mp_name]),
  /*
  * Delete a snapshot
  * @param name {string} snapshot name
  * @return {promise}
  */
  delete_snap: (name) => call_api(api.delete_snap, [name]), //errors occur when snap doesn't exist,
  /*
  * detach snapshot from mountpoint
  * @param name {string} snapshot name
  * @return {promise}
  */
  detach_snap: (name) => call_api(api.detach_snap, [name]),
  /*
  * List mp id for a given mount point
  * @param mp_name {string} mount point name
  * @return {promise}
  */
  list_mp_uid: (mp_name) => call_api(api.list_mp_uid, [mp_name], objectify.common, ['LOGICAL UNIT NUMBER']),
  /*
  * List all the mountpoints for a given lun
  * @param lun_id {number}
  * @return {promise}
  */
  list_lun_mps: (lun_id) => call_api(api.list_lun_mps, [lun_id], objectify.common, ['Snapshot Mount Points']),
  /*
  * Attach a mountpoint to a storagegroup
  * @param storagegroup {string} storagegroup the mp should belong to
  * @param mp_id {string} id of the mount point (obtained using list_lun_mps)
  * @param new_id {string} when attaching mp to a storage group they need a new unique LUN id
  * @return {promise}
  */
  attach_mp: (storagegroup, mp_id, new_id) => call_api(api.attach_mp, [storagegroup, mp_id, new_id]),
  /*
  * Attach snapshot to a mountpoint
  * @param snap_name {string}
  * @param mp_id {string} mount point iud
  * @return {promise}
  */
  attach_snap: (snap_name, mp_id) => call_api(api.attach_snap, [snap_name,mp_id]),
  /*
  * Deletes a snap and recreates a new one
  * @param lun_id {string} id of the lun the snap belongs to
  * @return {promise}
  */
  recreate_snap: function (lun_id) {
    return new Promise((resolve, reject) => {
      this.delete_snap(lun_id + '_snap')
        .then(() => {
          //FLUSH BEFORE!!
          this.create_snap(lun_id, lun_id + '_snap')
            .then(() => resolve(lun_id + '_snap'))
        })
    })
  }
}

function call_api (api_call, args1, modifier = (x) => x , args2 = []) {
  return new Promise((resolve, reject) => {
    exec(api_call.apply(this,args1),
      (err, stdout, stderr) => {
        log.logit("Calling: "+api_call.name)
        if (err) {
          log.logit("response: error") //at the moment we are not breaking on any error!!
          //reject(stdout)
        }
        else log.logit("response: success")
        resolve(modifier.call(this,stdout,args2))
      }
    )
  })
}
