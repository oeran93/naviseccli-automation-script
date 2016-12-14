# naviseccli-lib (Dealing with Backup at the Library)

## Server Setup
* Install node
* Set up environment variables
  * naviseccli_server (IP of the EMC host)
* Set up naviseccli locally

## Setup Software
* After you download this package make sure npm and node are installed.
* Once that is done go into the main project directory and run `npm install` to install dependecies.

## Run the Script
* Running `node main` in the naviseccli-lib/project directory will start the script
* The following command line args can be specified
	* -verbose
		* description: should the script console.log details of execution ?
		* value: yes/no
		* default: no
	* -log
		* description: what should be the name of the log file?
		* value: any name to give to the log file
		* default: log.txt
	* -server_ip
		* description: the ip of the EMC host
		* value: any IP address
		* default: enironmental variable naviseccli_server
