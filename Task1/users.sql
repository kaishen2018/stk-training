/*
Navicat MySQL Data Transfer

Source Server         : fan
Source Server Version : 50546
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50546
File Encoding         : 65001

Date: 2016-12-26 20:53:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `fName` varchar(20) NOT NULL,
  `lName` varchar(20) NOT NULL,
  `fDate` varchar(20) NOT NULL,
  `lDate` varchar(20) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Henry', 'Fan', '2016-01-22', '2016-11-11', '');
INSERT INTO `users` VALUES ('2', 'Beck', 'Zhang', '2016-23-31', '2016-23-31', '');
INSERT INTO `users` VALUES ('3', 'Banana', 'Cao', '2016-23-31', '2016-23-31', '');
INSERT INTO `users` VALUES ('18', 'qwe', 'qwe', '2016-12-22', '2016-12-22', '');
INSERT INTO `users` VALUES ('19', 'asd', 'asd', '2016-12-22', '2016-12-22', '');
INSERT INTO `users` VALUES ('20', 'qqq', 'qqq', '2016-12-26', '2016-12-26', '123');
INSERT INTO `users` VALUES ('21', 'www', 'www', '2016-12-26', '2016-12-26', '123');
