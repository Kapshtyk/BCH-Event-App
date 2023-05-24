<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230523121736 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A3E5F2F7B');
        $this->addSql('DROP INDEX IDX_5F9E962A3E5F2F7B ON comments');
        $this->addSql('ALTER TABLE comments CHANGE event_id event_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A3E5F2F7B FOREIGN KEY (event_id_id) REFERENCES events (id)');
        $this->addSql('CREATE INDEX IDX_5F9E962A3E5F2F7B ON comments (event_id_id)');
        $this->addSql('ALTER TABLE events ADD created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A3E5F2F7B');
        $this->addSql('DROP INDEX IDX_5F9E962A3E5F2F7B ON comments');
        $this->addSql('ALTER TABLE comments CHANGE event_id_id event_id INT NOT NULL');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A3E5F2F7B FOREIGN KEY (event_id) REFERENCES events (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_5F9E962A3E5F2F7B ON comments (event_id)');
        $this->addSql('ALTER TABLE events DROP created_at');
    }
}
