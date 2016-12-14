const env = process.env

module.exports = {
	/*log file name*/
	log: 'log.txt',
	/*naviseccli server ip*/
	server_ip: env.naviseccli_server,
	/*logs to console if true*/
	verbose: 'no'

}