---
layout: post
title: "How Upgrate Laravel 4.1.x t0 4.2.x in Ubuntu 12.04 LTS (Precise Pangolin)"
tagline: "Supporting tagline"
description: ""
category: "Web Development"
tags: [tools,web,development, Laravel, Vagrant]
---
{% include JB/setup %}

If you started your project with Laravel 4.1.x in 2013, now is time to update to 4.2.x, but the process is not as simple as it sound, because that include upgrate your php distro from 4.3 for 4.4+ or 4.5, probably at this point you already upgrated your laptop php version with the OSX upgrate to Yosemte.  The problem is with your vagrams VMs and the AWS instances. 

If you want move to php 5.5, it comes with Apache 2.4 or you can move to php 4.4.x for now and continue with 
apache 2.2 (my choice!)

[First, upgrate your php in your vagram/aws with Ubuntu 12.04](http://www.dev-metal.com/how-to-install-latest-php-5-4-x-on-ubuntu-12-04-lts-precise-pangolin/)

[Secord, upgrate your Laravel version to 4.2](http://laravel.com/docs/4.2/upgrade#upgrade-4.2)

If you have any question follow this steps, please add a comment. 