CREATE TABLE `bids` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int NOT NULL,
	`freelancerId` int NOT NULL,
	`proposedRate` decimal(20,8) NOT NULL,
	`proposal` text,
	`status` enum('PENDING','ACCEPTED','REJECTED','WITHDRAWN') DEFAULT 'PENDING',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bids_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deliverables` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int NOT NULL,
	`freelancerId` int NOT NULL,
	`ipfsHash` varchar(255) NOT NULL,
	`fileHash` varchar(255) NOT NULL,
	`status` enum('SUBMITTED','APPROVED','REJECTED','DISPUTED') DEFAULT 'SUBMITTED',
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`approvedAt` timestamp,
	CONSTRAINT `deliverables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `disputes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int NOT NULL,
	`clientId` int NOT NULL,
	`freelancerId` int NOT NULL,
	`reason` text NOT NULL,
	`evidenceIpfs` varchar(255),
	`status` enum('OPEN','VOTING','RESOLVED','CLOSED') DEFAULT 'OPEN',
	`resolution` enum('CLIENT_WIN','FREELANCER_WIN','SPLIT'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedAt` timestamp,
	CONSTRAINT `disputes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`skills` json NOT NULL,
	`budget` decimal(20,8) NOT NULL,
	`deadline` timestamp,
	`status` enum('OPEN','ASSIGNED','IN_PROGRESS','SUBMITTED','COMPLETED','DISPUTED','CANCELLED') DEFAULT 'OPEN',
	`selectedFreelancerId` int,
	`escrowAddress` varchar(42),
	`ipfsHash` varchar(255),
	`milestones` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('DEPOSIT','RELEASE','REFUND','ARBITRATION_REWARD'),
	`txHash` varchar(255),
	`status` enum('PENDING','SUCCESS','FAILED') DEFAULT 'PENDING',
	`amount` decimal(20,8),
	`jobId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `transactions_txHash_unique` UNIQUE(`txHash`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','client','freelancer','arbitrator') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `walletAddress` varchar(42);--> statement-breakpoint
ALTER TABLE `users` ADD `reputation` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `totalEarnings` decimal(20,8) DEFAULT '0';--> statement-breakpoint
ALTER TABLE `users` ADD `completedJobs` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` text;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `skills` json;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_walletAddress_unique` UNIQUE(`walletAddress`);