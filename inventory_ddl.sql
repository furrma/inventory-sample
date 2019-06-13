use inventory;

CREATE TABLE `items`
(
`id` int(12) not null auto_increment,
`name` varchar(50) default null,
`qty` int(255) default null, 
`amount` decimal default null,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;

