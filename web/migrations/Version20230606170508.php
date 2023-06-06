<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230606170508 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE polls_questions ADD event_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE polls_questions ADD CONSTRAINT FK_F1DD09F471F7E88B FOREIGN KEY (event_id) REFERENCES events (id)');
        $this->addSql('CREATE INDEX IDX_F1DD09F471F7E88B ON polls_questions (event_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE polls_questions DROP FOREIGN KEY FK_F1DD09F471F7E88B');
        $this->addSql('DROP INDEX IDX_F1DD09F471F7E88B ON polls_questions');
        $this->addSql('ALTER TABLE polls_questions DROP event_id');
    }
}
