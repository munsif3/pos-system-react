CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ;

CREATE TABLE `orders` (
  `order_no` int(11) NOT NULL AUTO_INCREMENT,
  `is_open` tinyint(4) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_no`)
) ;

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `unit_price` int(11) DEFAULT NULL,
  `stock_amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ;

CREATE TABLE `order_item_detail` (
  `order_no` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_no`,`item_id`),
  KEY `fk_order_no` (`order_no`),
  KEY `fk_item_id` (`item_id`),
  CONSTRAINT `fk_item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_no` FOREIGN KEY (`order_no`) REFERENCES `orders` (`order_no`) ON DELETE CASCADE ON UPDATE CASCADE
);
