var naviseccli = require('./library.js')
var objectify = require('./objectify.js')

naviseccli.list_storagegroups('-host').then((data) => {
  data.forEach((storagegroup) => {
    if (storagegroup['Host name']) {
      naviseccli.list_storagegroup_luns(storagegroup['Storage Group Name']).then((luns) => {
        console.log('Storage Group: ' + storagegroup['Storage Group Name'])
        console.log('host: ' + storagegroup['Host name'])
        console.log('luns: ' + luns.join('\t'))
        console.log('--------------')
      })
    }
  })
})
