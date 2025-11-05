-- CreateTable
CREATE TABLE `reservations` (
    `id_resertion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_reserve_state` INTEGER NOT NULL,
    `date_state` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reservation_date` DATETIME(3) NOT NULL,
    `number_of_people` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_package_touristic` INTEGER NOT NULL,

    PRIMARY KEY (`id_resertion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activities` (
    `id_activity` INTEGER NOT NULL AUTO_INCREMENT,
    `name_activity` VARCHAR(191) NOT NULL,
    `description_activity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_activity`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packages_activities` (
    `id_package_activity` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ativity` INTEGER NOT NULL,

    PRIMARY KEY (`id_package_activity`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `climates` (
    `id_climate` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `climates_code_key`(`code`),
    PRIMARY KEY (`id_climate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `places_recreationals` (
    `id_place_recreational` INTEGER NOT NULL AUTO_INCREMENT,
    `geographical_location` VARCHAR(191) NULL,
    `email_place_recreational` VARCHAR(191) NULL,
    `place_name` VARCHAR(191) NOT NULL,
    `id_department` INTEGER NOT NULL,
    `id_city` INTEGER NOT NULL,
    `id_climate` INTEGER NULL,
    `image_url` TEXT NULL,
    `short_description` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,
    `search_name` VARCHAR(191) NULL,
    `rating_avg` DOUBLE NULL DEFAULT 0,
    `review_count` INTEGER NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `price_from` INTEGER NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `id_user` INTEGER NULL,

    UNIQUE INDEX `places_recreationals_email_place_recreational_key`(`email_place_recreational`),
    INDEX `places_recreationals_id_department_id_city_id_climate_idx`(`id_department`, `id_city`, `id_climate`),
    INDEX `places_recreationals_price_from_idx`(`price_from`),
    INDEX `places_recreationals_search_name_idx`(`search_name`),
    INDEX `places_recreationals_is_active_idx`(`is_active`),
    PRIMARY KEY (`id_place_recreational`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packages_touristics` (
    `id_package_touristic` INTEGER NOT NULL AUTO_INCREMENT,
    `name_package_touristic` VARCHAR(191) NOT NULL,
    `description_package_touristic` VARCHAR(191) NOT NULL,
    `days_durations` DATETIME(3) NOT NULL,
    `price_package_touristic` INTEGER NOT NULL,
    `id_place_recreational` INTEGER NOT NULL,
    `id_climate` INTEGER NOT NULL,

    PRIMARY KEY (`id_package_touristic`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id_payment` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `payment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_reservation` INTEGER NOT NULL,

    PRIMARY KEY (`id_payment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types_documents` (
    `id_type_document` INTEGER NOT NULL AUTO_INCREMENT,
    `document_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `types_documents_document_name_key`(`document_name`),
    PRIMARY KEY (`id_type_document`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name_user` VARCHAR(191) NOT NULL,
    `lastname_user` VARCHAR(191) NULL,
    `number_document` INTEGER NOT NULL,
    `id_type_document` INTEGER NOT NULL,
    `date_birth` DATETIME(3) NULL,
    `direction_user` VARCHAR(191) NULL,
    `email_user` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `id_role_user` INTEGER NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `passwordResetToken` VARCHAR(64) NULL,
    `passwordResetExpires` DATETIME(3) NULL,
    `photo_user` VARCHAR(191) NULL,

    UNIQUE INDEX `users_number_document_key`(`number_document`),
    UNIQUE INDEX `users_email_user_key`(`email_user`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles_users` (
    `id_role_user` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `roles_users_description_key`(`description`),
    PRIMARY KEY (`id_role_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins_places` (
    `id_admin_place` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_admin_place`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logistics_agents` (
    `id_logistic_agent` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_logistic_agent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserved_states` (
    `id_reserve_state` INTEGER NOT NULL AUTO_INCREMENT,
    `state_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_reserve_state`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id_department` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,

    UNIQUE INDEX `departments_name_key`(`name`),
    PRIMARY KEY (`id_department`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id_city` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_department` INTEGER NOT NULL,

    UNIQUE INDEX `cities_name_id_department_key`(`name`, `id_department`),
    PRIMARY KEY (`id_city`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categories_code_key`(`code`),
    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `place_categories` (
    `id_place_category` INTEGER NOT NULL AUTO_INCREMENT,
    `id_place_recreational` INTEGER NOT NULL,
    `id_category` INTEGER NOT NULL,

    UNIQUE INDEX `place_categories_id_place_recreational_id_category_key`(`id_place_recreational`, `id_category`),
    PRIMARY KEY (`id_place_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NULL,
    `imageUrl` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    INDEX `News_expiresAt_idx`(`expiresAt`),
    INDEX `News_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites` (
    `id_favorite` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_place_recreational` INTEGER NOT NULL,

    UNIQUE INDEX `favorites_id_user_id_place_recreational_key`(`id_user`, `id_place_recreational`),
    PRIMARY KEY (`id_favorite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_id_reserve_state_fkey` FOREIGN KEY (`id_reserve_state`) REFERENCES `reserved_states`(`id_reserve_state`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_id_package_touristic_fkey` FOREIGN KEY (`id_package_touristic`) REFERENCES `packages_touristics`(`id_package_touristic`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packages_activities` ADD CONSTRAINT `packages_activities_id_ativity_fkey` FOREIGN KEY (`id_ativity`) REFERENCES `activities`(`id_activity`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `places_recreationals` ADD CONSTRAINT `places_recreationals_id_department_fkey` FOREIGN KEY (`id_department`) REFERENCES `departments`(`id_department`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `places_recreationals` ADD CONSTRAINT `places_recreationals_id_city_fkey` FOREIGN KEY (`id_city`) REFERENCES `cities`(`id_city`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `places_recreationals` ADD CONSTRAINT `places_recreationals_id_climate_fkey` FOREIGN KEY (`id_climate`) REFERENCES `climates`(`id_climate`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `places_recreationals` ADD CONSTRAINT `places_recreationals_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packages_touristics` ADD CONSTRAINT `packages_touristics_id_place_recreational_fkey` FOREIGN KEY (`id_place_recreational`) REFERENCES `places_recreationals`(`id_place_recreational`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `packages_touristics` ADD CONSTRAINT `packages_touristics_id_climate_fkey` FOREIGN KEY (`id_climate`) REFERENCES `climates`(`id_climate`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_id_reservation_fkey` FOREIGN KEY (`id_reservation`) REFERENCES `reservations`(`id_resertion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_type_document_fkey` FOREIGN KEY (`id_type_document`) REFERENCES `types_documents`(`id_type_document`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_role_user_fkey` FOREIGN KEY (`id_role_user`) REFERENCES `roles_users`(`id_role_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins_places` ADD CONSTRAINT `admins_places_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logistics_agents` ADD CONSTRAINT `logistics_agents_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_id_department_fkey` FOREIGN KEY (`id_department`) REFERENCES `departments`(`id_department`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `place_categories` ADD CONSTRAINT `place_categories_id_place_recreational_fkey` FOREIGN KEY (`id_place_recreational`) REFERENCES `places_recreationals`(`id_place_recreational`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `place_categories` ADD CONSTRAINT `place_categories_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `categories`(`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_id_place_recreational_fkey` FOREIGN KEY (`id_place_recreational`) REFERENCES `places_recreationals`(`id_place_recreational`) ON DELETE RESTRICT ON UPDATE CASCADE;
