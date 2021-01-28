create table `User` (
`user_id` int not null auto_increment primary key, -- 유저 index
`name` varchar(256) not null, -- 유저 이름
`disabled` tinyint not null default 0, -- 유저 삭제 여부
`create_date` timestamp not null default current_timestamp -- 유저 생성일
);

create table `Generation` (
 `generation_id` int not null auto_increment primary key, -- 팀 생성 기수 index
 `create_date` timestamp not null default current_timestamp -- 팀 기수 생성일
)

create table `Team` (
 `team_id` int not null auto_increment primary key, --  index
 `team_step` int not null, -- 팀 생성 순번
 `team_name` int not null, -- 팀 이름
 `generation_id` int not null, -- 팀 생성 기수 index
 FOREIGN KEY (`generation_id`) REFERENCES `Generation` (`generation_id`) ON DELETE CASCADE
)

create table `Member` (
 `member_id` int not null auto_increment primary key, -- 소속 멤버 index
 `user_id` int not null, -- 유저 index
 `team_id` int not null, -- 팀 index
 FOREIGN KEY (`team_id`) REFERENCES `Team` (`team_id`) ON DELETE CASCADE
);