create table `User` (
`user_id` int not null auto_increment primary key, -- 유저 index
`name` varchar(256) not null, -- 유저 이름
`disabled` tinyint not null default 0, -- 유저 삭제 여부
`create_date` timestamp not null default current_timestamp -- 유저 생성일
);

create table `Generation` (
 `generation_id` int not null auto_increment primary key, -- 그룹 생성 기수 index
 `create_date` timestamp not null default current_timestamp -- 그룹 기수 생성일
)

create table `Group` (
 `group_id` int not null auto_increment primary key, -- 그룹 index
 `group_name` varchar(32) not null, -- 그룹 이름
 `generation_id` int not null, -- 그룹 생성 기수 index
 FOREIGN KEY (`generation_id`) REFERENCES `Generation` (`generation_id`) ON DELETE CASCADE
)

create table `Member` (
 `member_id` int not null auto_increment primary key, -- 그룹 index
 `user_id` int not null, -- 유저 index
 `group_id` int not null, -- 그룹 index
 FOREIGN KEY (`group_id`) REFERENCES `Group` (`group_id`) ON DELETE CASCADE
);