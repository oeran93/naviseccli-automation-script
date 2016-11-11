var env = process.env

module.exports = {
  create_snap: (lun_id, name) => `naviseccli -h ${env.naviseccli_server} snap -create -res ${lun_id} -name ${name}`,
  create_rw_snap: (lun_id, name) => `naviseccli -h ${env.naviseccli_server} snap -create -res ${lun_id} -name ${name} -allowReadWrite yes`,
  delete_snap: (snap_name) => `naviseccli -h ${env.naviseccli_server} snap -destroy -id ${snap_name} -o`,
  list_storagegroups: (options = '') => `naviseccli -h ${env.naviseccli_server} storagegroup -list ${options}`,
  list_all_luns: (options = '') => `naviseccli -h ${env.naviseccli_server} getlun -uid ${options}`
}
