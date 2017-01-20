const env = process.env

module.exports = {
	/*log file name*/
	log: 'log.txt',
	/*naviseccli server ip*/
	server_ip: env.naviseccli_server,
	/*backup server storage group name*/
	server_sg: env.backup_server_sg,
	/*logs to console if true*/
	verbose: 'no',
	/*storage groups to back up*/
	filtered_sgs: '.',
	/*name of diskpart script*/
	disk_script: 'diskpart_script.txt'
}