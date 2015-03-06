---
layout: post
title: "How to connect SEQUEL PRO to MySql in Vagrant"
tagline: "Supporting tagline"
description: ""
category: "Web Development"
tags: [tools,web,development, Laravel, Vagrant, Mysql]
---
{% include JB/setup %}

Working with Vagrant is a change in term of provisioning your DEV enviroment, but also come with new challenges. Now you database is not a local service anymore.  It's running somewhere deep in the forest of Vagrant and Virtual Box.  Arrive there in not easy but not imposible.  Using the SSH tunnel we can create a trust channel to see into vagrant. 

Here is my challenge (Basically I'm writing this for myself in the future)
I need to connect SEQUEL PRO to a MySql instance runnign in a vagrant machine. 

The vagrant is an Ubuntu 12.04 image with MySQL installed.  

1) Connect to your vagrant : 

	$vagrant ssh

2) Find the address MySQL is bound to : cat /etc/mysql/my.cnf | grep bind-address
   The result will be : bind-address = 99.99.99.99 <- example

3) enter to your mysql root -r root -p {root-password-here}

4) mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'{99.99.99.99}' IDENTIFIED BY '{root-password-here}' WITH GRANT OPTION; FLUSH PRIVILEGES;

5) return to your host sytem 

6) open SEQUEL PRO

7) Go to SSH connections :
	7.1) Name: <anyname>
	7.2) MySQL Host: {99.99.99.99}  (MySql IP from step 2)
	7.3) Username: root
	7.4) Password: {root-password-here}
	7.5) Database: {database-name}
	7.6) Port: 3306
	7.7) SSH Host: 127.0.0.1
	7.8) SSH User: vagrant
	7.9) SSH Key: ~/.vagrant.d/insecure_private_key
	7.10) SSH Port: 2222 (or 2200, depend on the vagran up result)

	Test connection, Save Configuration ... 

	Connect

General ideas from [Connect to MySQL in Vagrant with Sequel Pro](https://coderwall.com/p/yzwqvg/connect-to-mysql-in-vagrant-with-sequel-pro)

If you have any question following the steps, please add a comment. 