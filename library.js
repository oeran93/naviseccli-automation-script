const exec = require('child_process').exec
const api = require('./api.js')
const objectify = require('./objectify.js')

module.exports = {
  /*
  * List all storagegroups
  * @param options {string} all options to pass to storagegroup -list api call
  * @return {promise} data passed to promise is an array of objects with Storage 
  * Group Name and Hostname of each storagegroup
  */
  list_storagegroups: function (options) {
    return new Promise((resolve, reject) => {
      exec(api.list_storagegroups(options),
        (err, stdout) => {
          if (err) reject(stdout)
          resolve(objectify.common(stdout, ['Storage Group Name', 'Host name']))
        })
    })
  },
  /**/
  list_storagegroup_luns: function (name) {
    return new Promise((resolve, reject) => {
      exec(api.list_storagegroups('-gname ' + name),
        (err, stdout) => {
          if (err) reject(stdout)
          resolve(objectify.lun_numbers(stdout))
        })
    })
  },
  /*
  * Lists all luns info. By default the only info printed is uid. More can be
  * specified by passing them as command line args
  * @param options {string} infos to specify. e.g. '-capacity -drivetype'
  * @return {promise}
  */
  list_all_luns: function (options) {
    return new Promise((resolve, reject) => {
      exec(api.list_all_luns(options),
        (err, stdout) => {
          if (err) reject(stdout)
          resolve(stdout)
        })
    })
  },
  /*
  * Create a new snapshot without read write permissions
  * @param lun_id {number} lun_id to take a snapshot of
  * @param name {string} name to assign to the new snapshot
  * @return {promise}
  */
  create_snap: function (lun_id, name) {
    return new Promise((resolve, reject) => {
      exec(api.create_snap(lun_id, name),
        (err, stdout) => {
          if (err) reject(stdout)
          resolve(stdout)
        })
    })
  },
  /*
  * Create a new snapshot with readn write permission
  * @param lun_id {number} lun_id to take a snapshot of
  * @param name {string} name to assign to the new snapshot
  * @return {promise}
  */
  create_rw_snap: function (lun_id, name) {
    return new Promise((resolve, reject) => {
      exec(api.create_rw_snap(lun_id, name),
        (err, stdout) => {
          if (err) reject(stdout)
          resolve(stdout)
        })
    })
  },
  /*
  * Delete a snapshot
  * @param name {string} snapshot name
  * @return {promise}
  */
  delete_snap: function (name) {
    return new Promise((resolve, reject) => {
      exec(api.delete_snap(name),
        (err, stdout) => {
          if (err) reject(stdout)
          resolve(stdout)
        })
    })
  }

}
