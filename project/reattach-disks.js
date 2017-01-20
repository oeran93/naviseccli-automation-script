var library = require('./diskpart-library.js')

library.num_disks().then(num_disks => {
	library.offline_online_disks(num_disks)
})