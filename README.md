# naviseccli-lib (Dealing with Backup at the Library)

## Script Routine

* retreive all storage groups.
* filter out storage groups
	* the one that do not have the same os as the server the script is sitting in. 
	* the storage group of the server
	* if command line specified storage groups, only use those
* retrieve all luns for this storage groups
* for each one of them
	* detach its snapshot if exists
	* create/recreate snapshot
	* attach new snapshot to mp of this lun to this server's storage group.

## Server Setup
* Install node
* Set up environment variables
  * naviseccli_server (IP of the EMC host)
  * backup_server_sg (storage group of the backup server the script is running on)
* Set up naviseccli locally

## Setup Software
* After you download this package make sure npm and node are installed.
* Once that is done go into the main project directory and run `npm install` to install dependecies.

## Run the Script to create snaps
* Running `node create-snaps` in the naviseccli-lib/project directory will start the script
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
	* -filtered_sgs
		* description: storage group to back up. if passed, only listed storage groups will be backed up
		* value: any storage group name. to pass multiple storage names separate them with a "|" simbol. e.g. name1|name2|name3
		* default: all storage groups

## Run the Script to reattach disks
* Running `node reattach-disks` in the naviseccli-lib/project directory will start the script