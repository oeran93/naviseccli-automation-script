const globals = require('./globals.js')

module.exports = {
  create_snap: (lun_id, name) => `naviseccli -h ${globals.server_ip} snap -create -res ${lun_id} -name ${name} -allowReadWrite yes`,
  create_snap_mp: (lun_id, snap_mp) => `naviseccli -h ${globals.server_ip} lun -create -type Snap -primaryLun ${lun_id} -name ${snap_mp} -allowInbandSnapAttach yes`,
  delete_snap: (name) => `naviseccli -h ${globals.server_ip} snap -destroy -id ${name} -o`,
  list_storagegroups: (options = '') => `naviseccli -h ${globals.server_ip} storagegroup -list ${options}`,
  list_all_luns: (options = '') => `naviseccli -h ${globals.server_ip} getlun -uid ${options}`,
  list_all_snaps: (lun_id) => `naviseccli -h ${globals.server_ip} snap -list -res ${lun_id}`,
  list_lun_mps: (lun_id) => `naviseccli -h ${globals.server_ip} lun -list -l ${lun_id} -snapMountPoints`,
  list_mp_uid: (mp) => `naviseccli -h ${globals.server_ip} lun -list -name ${mp} -uid`,
  attach_mp: (storagegroup, mp_id, new_id) => `naviseccli -h ${globals.server_ip}  storagegroup -addhlu -gname ${storagegroup} -alu ${mp_id} -hlu ${new_id}`,
  attach_snap: (name, mp_id) => `naviseccli -h ${globals.server_ip} snap -attach -id ${name} -res ${mp_id}`,
  detach_snap: (name) => `naviseccli -h ${globals.server_ip} snap -detach -id ${name} -o`,
}
