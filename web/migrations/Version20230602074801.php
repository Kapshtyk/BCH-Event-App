<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230602074801 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE api_token (id INT AUTO_INCREMENT NOT NULL, owned_by_id INT NOT NULL, expires_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', token VARCHAR(68) NOT NULL, scopes JSON NOT NULL, INDEX IDX_7BA2F5EB5E70BCD7 (owned_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comments (id INT AUTO_INCREMENT NOT NULL, event_id INT NOT NULL, author_id INT NOT NULL, text LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', is_published TINYINT(1) NOT NULL, INDEX IDX_5F9E962A71F7E88B (event_id), INDEX IDX_5F9E962AF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE events (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, event_date DATETIME NOT NULL, location VARCHAR(255) NOT NULL, is_published TINYINT(1) NOT NULL, is_international TINYINT(1) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE events_users (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, event_id INT NOT NULL, INDEX IDX_A43F6DCFA76ED395 (user_id), INDEX IDX_A43F6DCF71F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE polls_choices (id INT AUTO_INCREMENT NOT NULL, question_id INT NOT NULL, choice VARCHAR(255) NOT NULL, votes INT NOT NULL, INDEX IDX_A3D97E431E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE polls_questions (id INT AUTO_INCREMENT NOT NULL, question LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', is_published TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE polls_votes (id INT AUTO_INCREMENT NOT NULL, question_id INT NOT NULL, choice_id INT NOT NULL, author_id INT NOT NULL, INDEX IDX_3FAB86E01E27F6BF (question_id), INDEX IDX_3FAB86E0998666D1 (choice_id), INDEX IDX_3FAB86E0F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE questions (id INT AUTO_INCREMENT NOT NULL, author_id INT DEFAULT NULL, question VARCHAR(255) NOT NULL, answer LONGTEXT NOT NULL, is_published TINYINT(1) NOT NULL, INDEX IDX_8ADC54D5F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE api_token ADD CONSTRAINT FK_7BA2F5EB5E70BCD7 FOREIGN KEY (owned_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A71F7E88B FOREIGN KEY (event_id) REFERENCES events (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962AF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE events_users ADD CONSTRAINT FK_A43F6DCFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE events_users ADD CONSTRAINT FK_A43F6DCF71F7E88B FOREIGN KEY (event_id) REFERENCES events (id)');
        $this->addSql('ALTER TABLE polls_choices ADD CONSTRAINT FK_A3D97E431E27F6BF FOREIGN KEY (question_id) REFERENCES polls_questions (id)');
        $this->addSql('ALTER TABLE polls_votes ADD CONSTRAINT FK_3FAB86E01E27F6BF FOREIGN KEY (question_id) REFERENCES polls_questions (id)');
        $this->addSql('ALTER TABLE polls_votes ADD CONSTRAINT FK_3FAB86E0998666D1 FOREIGN KEY (choice_id) REFERENCES polls_choices (id)');
        $this->addSql('ALTER TABLE polls_votes ADD CONSTRAINT FK_3FAB86E0F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE questions ADD CONSTRAINT FK_8ADC54D5F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE api_token DROP FOREIGN KEY FK_7BA2F5EB5E70BCD7');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A71F7E88B');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962AF675F31B');
        $this->addSql('ALTER TABLE events_users DROP FOREIGN KEY FK_A43F6DCFA76ED395');
        $this->addSql('ALTER TABLE events_users DROP FOREIGN KEY FK_A43F6DCF71F7E88B');
        $this->addSql('ALTER TABLE polls_choices DROP FOREIGN KEY FK_A3D97E431E27F6BF');
        $this->addSql('ALTER TABLE polls_votes DROP FOREIGN KEY FK_3FAB86E01E27F6BF');
        $this->addSql('ALTER TABLE polls_votes DROP FOREIGN KEY FK_3FAB86E0998666D1');
        $this->addSql('ALTER TABLE polls_votes DROP FOREIGN KEY FK_3FAB86E0F675F31B');
        $this->addSql('ALTER TABLE questions DROP FOREIGN KEY FK_8ADC54D5F675F31B');
        $this->addSql('DROP TABLE api_token');
        $this->addSql('DROP TABLE comments');
        $this->addSql('DROP TABLE events');
        $this->addSql('DROP TABLE events_users');
        $this->addSql('DROP TABLE polls_choices');
        $this->addSql('DROP TABLE polls_questions');
        $this->addSql('DROP TABLE polls_votes');
        $this->addSql('DROP TABLE questions');
        $this->addSql('DROP TABLE user');
    }
}
