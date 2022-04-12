DROP TABLE IF EXISTS Organization;
DROP TABLE IF EXISTS _User;
DROP TABLE IF EXISTS Package;
DROP TABLE IF EXISTS Repository;
DROP TABLE IF EXISTS Downloads;
DROP TABLE IF EXISTS DownloadsOnDate;
DROP TABLE IF EXISTS _Commit;
DROP TABLE IF EXISTS HasPackage;
DROP TABLE IF EXISTS CommitStats;

-- Describe schema for entity Venue
CREATE TABLE Organization (
  orgID  INT NOT NULL,
  login   VARCHAR(100),
  name    VARCHAR(100),
  description   VARCHAR(10000),
  email    VARCHAR(100),
  createdAt    DATETIME,
  updatedAt    DATETIME,
  location    VARCHAR(100),
  type    VARCHAR(100),
  PRIMARY KEY(orgID)
);


-- Insert a list of tuples into Customer
INSERT INTO Organization VALUES
(69631,'facebook','Meta','We are working to build community through open source technology. NB: members must have two-factor auth.',null,'2009-04-02 03:35:22','2022-04-01 07:03:49','Menlo Park, California','Organization'),
(1342004,'google','Google','Google Open Source,opensource@google.com',null,'2012-01-18 01:30:18','2021-12-30 01:40:20',null,'Organization'),
(8594673,'amzn','Amazon',null,null,'2014-08-29 21:50:46','2022-03-23 22:08:14',null,'Organization'),
(139426,'angular','Angular',null,null,'2009-10-13 22:16:19','2021-12-30 01:40:19',null,'Organization'),
(9919,'github','GitHub','How people build software.',null,'2008-05-11 04:37:31','2022-04-08 10:02:08','San Francisco, CA','Organization'),
(23617963,'sveltejs','Svelte','Cybernetically enhanced web apps',null,'2016-11-20 18:03:26','2022-03-10 15:25:29','pkg.devDependencies','Organization'),
(6128107,'vuejs','vuejs',null,null,'2013-12-07 06:13:00','2022-01-09 08:00:00','All Over the World','Organization'),
(14985020,'vercel','Vercel','Develop.Preview. Ship. Creators of Next.js.','support@vercel.com','2015-10-05 19:40:30','2022-03-21 22:12:44','Global','Organization'),
(23360933,'nuxt','Nuxt','The Intuitive Vue Framework',null,'2016-11-09 14:48:11','2021-09-15 08:35:38','Global','Organization'),
(6154722,'microsoft','Microsoft','Open source projects and samples from Microsoft,opensource@microsoft.com',null,'2013-12-10 19:06:48','2021-03-18 18:50:55','Redmond, WA','Organization'),
(698437,'airbnb','Airbnb',null,null,'2011-03-30 01:29:47','2021-11-30 17:18:46','San Francisco','Organization'),
(18489846,'lit','Lit','Simple. Fast. Web Components.',null,'2016-04-15 19:11:08','2022-03-15 18:39:57','USA','Organization');

-- User(userID, login, url, type)
CREATE TABLE _User(
  userID     INT NOT NULL,
  login     VARCHAR(100),
  url     VARCHAR(100),
  type     VARCHAR(200),
  PRIMARY KEY(userID)
);


-- Insert a list of tuples into Item
INSERT INTO _User VALUES
(23617963,'sveltejs','https://api.github.com/users/sveltejs','Organization'),
(18489846,'lit','https://api.github.com/users/lit','Organization'),
(14262490,'solid','https://api.github.com/users/solid','Organization'),
(19475707,'MithrilJS','https://api.github.com/users/MithrilJS','Organization'),
(59030169,'alpinejs','https://api.github.com/users/alpinejs','Organization'),
(1,'mojombo','https://api.github.com/users/mojombo','User'),
(2,'defunkt','https://api.github.com/users/defunkt','User'),
(3,'pjhyett','https://api.github.com/users/pjhyett','User'),
(4,'wycats','https://api.github.com/users/wycats','User'),
(5,'ezmobius','https://api.github.com/users/ezmobius','User'),
(6,'ivey','https://api.github.com/users/ivey','User'),
(7,'evanphx','https://api.github.com/users/evanphx','User'),
(17,'vanpelt','https://api.github.com/users/vanpelt','User'),
(18,'wayneeseguin','https://api.github.com/users/wayneeseguin','User');

-- Package (packageName, version, star, score)
CREATE TABLE Package(
  packageName varchar(100) NOT NULL, 
  version varchar(100), 
  stars INT,
  score FLOAT,
  PRIMARY KEY(packageName)
);

INSERT INTO Package VALUES
('hello-world','0.0.2',2,0.044960028187118216),
('svelte','3.47.0',8,0.7974160444960227),
('react','18.0.0',780,0.9207700956691587),
('angular','1.8.2',236,0.684327989286437),
('vue','3.2.31',253,0.8689296385832939),
('next.js','1.0.3',1,0.14524278244785552),
('nuxt.js','0.0.1',0,0.544574745265177),
('javascript','1.0.0',1,0.017431406659975952),
('kit','0.1.2',0,0.36571585422744374);

-- HasPackage(orgID, packageName)
CREATE TABLE HasPackage(
  orgID  INT NOT NULL,
  packageName varchar(100) NOT NULL, 
  PRIMARY KEY(orgID, packageName),
  FOREIGN KEY(orgID) REFERENCES Organization(orgID),
  FOREIGN KEY(packageName) REFERENCES Package(packageName)
);

INSERT INTO HasPackage VALUES
(23617963,'svelte'),
(69631,'react'),
(139426,'angular'),
(6128107,'vue'),
(14985020,'next.js'),
(23360933,'nuxt.js'),
(698437,'javascript'),
(23617963,'kit');

-- Repository(repoID, name, description, url, forksCount, stargazersCount, watchersCount, openIssuesCount)
CREATE TABLE Repository(
  repoID INT,
  name varchar(100), 
  description varchar(100), 
  url varchar(100), 
  forksCount INT, 
  stargazersCount INT, 
  watchersCount INT, 
  openIssuesCount INT,
  PRIMARY KEY(repoID)
);

INSERT INTO Repository VALUES
(1296269,'Hello-World','My first repository on GitHub!','https://api.github.com/repos/octocat/Hello-World',1720,1832,1832,860),
(74293321,'svelte','Cybernetically enhanced web apps','https://api.github.com/repos/sveltejs/svelte',2824,57276,57276,708),
(10270250,'react','A declarative, efficient, and flexible JavaScript library for building user interfaces.','https://api.github.com/repos/facebook/react',38202,186047,186047,916),
(24195339,'angular','The modern web developer’s platform','https://api.github.com/repos/angular/angular',21254,80659,80659,1413),
(11730342,'vue','Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.','https://api.github.com/repos/vuejs/vue',31879,194817,194817,568),
(70107786,'next.js','The React Framework','https://api.github.com/repos/vercel/next.js',17803,84996,84996,1213),
(71995937,'nuxt.js','The Intuitive Vue(2) Framework','https://api.github.com/repos/nuxt/nuxt.js',3219,39779,39779,525),
(311525798,'Web-Dev-For-Beginners','24 Lessons, 12 Weeks, Get Started as a Web Developer','https://api.github.com/repos/microsoft/Web-Dev-For-Beginners',6609,45601,45601,4),
(6498492,'javascript','JavaScript Style Guide','https://api.github.com/repos/airbnb/javascript',23258,121847,121847,134),
(304344049,'kit','The fastest way to build Svelte apps','https://api.github.com/repos/sveltejs/kit',698,7821,7821,406),
(95797174,'lit','Lit is a simple library for building fast, lightweight web components.','https://api.github.com/repos/lit/lit',568,10940,10940,254),
(46769790,'solid','Solid - Re-decentralizing the web (project directory)','https://api.github.com/repos/solid/solid',384,8108,8108,141),
(17814354,'mithril.js','A JavaScript Framework for Building Brilliant Applications','https://api.github.com/repos/MithrilJS/mithril.js',943,13169,13169,113),
(224663696,'alpine','A rugged, minimal framework for composing JavaScript behavior in your markup. ','https://api.github.com/repos/alpinejs/alpine',895,20335,20335,15);


-- Downloads(packageName, startDate, endDate, downloadsCount) 
CREATE TABLE Downloads(
  packageName varchar(100),
  startDate DATE,
  endDate DATE,
  downloadsCount INT,
  PRIMARY KEY(packageName)
);

INSERT INTO Downloads VALUES
('react','2020-07-01','2022-01-01',777923146),
('angular','2020-07-01','2022-01-01',42326835),
('vue','2020-07-01','2022-01-01',174850534),
('svelte','2020-07-01','2022-01-01',11335992),
('next','2020-07-01','2022-01-01',102088245),
('nuxt','2020-07-01','2022-01-01',25360257),
('solid','2020-07-01','2022-01-01',2733),
('lit','2020-07-01','2022-01-01',1290455),
('mithril','2020-07-01','2022-01-01',1147877),
('alpine','2020-07-01','2022-01-01',7495);

-- DownloadsOnDate(packageName, day, downloads)
CREATE TABLE DownloadsOnDate(
  packageName varchar(100),
  _day DATE,
  downloads INT,
  PRIMARY KEY(packageName,_day,downloads)
);

INSERT INTO DownloadsOnDate VALUES
('react','2021-08-01',494885),
('react','2021-08-02',1892551),
('react','2021-08-03',2046414),
('react','2021-08-04',2090801),
('angular','2021-03-24',118441),
('angular','2021-03-25',116830),
('angular','2021-03-26',96385),
('angular','2021-03-27',28224),
('svelte','2021-07-11',12868),
('svelte','2021-07-12',26226),
('vue','2020-12-14',390993),
('vue','2020-12-15',385482),
('vue','2020-12-16',378570),
('vue','2020-12-19',94686);

-- Commit(commitID, repoID, author, committer, message, commentCount, isVerified) 
CREATE TABLE _Commit(
  commitID varchar(200), 
  repoID INT, 
  author varchar(200), 
  committer varchar(200), 
  -- message varchar(1000), 
  commentCount INT, 
  isVerified BOOLEAN,
  PRIMARY KEY(commitID)
);

INSERT INTO _Commit VALUES
('1c9259146663e42421d3eb10e73502e4cbadc397',70107786,'shuding','GitHub',0,true),
('eddf1715ee680f7ca407c88930df66c0a8c04a70',70107786,'huozhi','GitHub',0,true),
('d8623bb90f39b10e95a4f572e6eacb1e278538c6',70107786,'shuding','GitHub',0,true),
('5feb400aff8e7b8968174b4e339b98ce48412180',70107786,'reconbot','GitHub',0,true),
('630bf80a22132a08be11e001a4ab3ee0124dd5a2',70107786,'huozhi','GitHub',0,true),
('51d7153ea8710915ad2580ce06944f8d6339130f',70107786,'shuding','GitHub',0,true),
('345f5cc351f807b3bf4b97fda915c06521c71902',70107786,'ijjk','JJ Kasper',0,true),
('26aacb04fb6625f973cd18adac6424e25e5dff8c',70107786,'ijjk','GitHub',0,true),
('0164ac60f2f6d240b9dc1fbd8dde08c0cbc22a99',70107786,'sokra','GitHub',0,true),
('f3088266038543814b3151ab0965c6c9f961596d',70107786,'jakejarvis','GitHub',0,true),
('049bb22c1c91f1928d31aa1fd2f4e939a71e0a48',70107786,'shuding','GitHub',0,true),
('9110b5a4f1def444986744bd9fa68eb22b340ed6',70107786,'JohnDaly','GitHub',0,true),
('633050402f8706cb06c1874338ab9d5e6aec1107',70107786,'nkzawa','GitHub',0,true);

-- CommitStats(commitID, additions, deletions, total) // multivalued attribute of Commit
CREATE TABLE CommitStats(
  commitID varchar(200), 
  additions INT, 
  deletions INT, 
  total INT,
  PRIMARY KEY(commitID)
);

INSERT INTO CommitStats VALUES
('049bb22c1c91f1928d31aa1fd2f4e939a71e0a48',32,226,258),
('1c9259146663e42421d3eb10e73502e4cbadc397',55,18,73),
('7fd1a60b01f91b314f59955a4e4d4e80d8edf11d',1,1,2),
('762941318ee16e59dabbacb1b4049eec22f0d303',1,1,2),
('553c2077f0edc3d5dc5d17262f6aa498e69d6f8e',1,0,1),
('83ad711c054788720d613c2c7f78b6dfb2b84f64',2,0,2),
('d22c5a07b639a44fdbea53c61f0e651204027e7f',1,2,3),
('5cd58ba24a16d323e1aa39fc45ed0984ee1bb39b',1,1,2),
('c96bbd4d4d8f77c3b8417cca5f1dc027240a326d',2,1,3),
('6861885e4a567c12a569c957a8cc4393a2eed52b',1,0,1),
('3e4141ebdb61b739f9132bedeb116a5f2420bdca',46,0,46);