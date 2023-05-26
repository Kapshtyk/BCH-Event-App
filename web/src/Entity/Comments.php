<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CommentsRepository;
use Carbon\Carbon;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CommentsRepository::class)]
#[ApiResource( 
    normalizationContext: ['comment' => ['comment:read']],
    denormalizationContext: ['comment' => ['comment:write']],
)]
#[ApiFilter(BooleanFilter::class, properties: ['isPublished'])]
class Comments
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['users:read', 'comment:read', 'comment:write'])]
    private ?Events $event_id = null;
    
    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['users:write', 'comment:read', 'comment:write', 'events:read'])]
    private ?Users $author = null;
    
    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['users:read', 'events:read'])]
    private ?string $text = null;
    
    #[ORM\Column]
    #[Groups(['users:read', 'events:read'])]
    private ?\DateTimeImmutable $publishDate;
    
    #[ORM\Column]
    #[Groups(['users:read', 'events:read'])]
    private bool $isPublished = true;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEventId(): ?Events
    {
        return $this->event_id;
    }

    public function setEventId(?Events $event_id): self
    {
        $this->event_id = $event_id;

        return $this;
    }

    public function getAuthor(): ?Users
    {
        return $this->author;
    }

    public function setAuthor(?Users $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getPublishDate(): ?\DateTimeImmutable
    {
        return $this->publishDate;
    }

    public function getPublishDateAgo(): string
    {
        return Carbon::instance($this->publishDate)->diffForHumans();
    }

    public function setPublishDate(\DateTimeImmutable $publishDate): self
    {
        $this->publishDate = $publishDate;

        return $this;
    }

    public function getIsPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): self
    {
        $this->isPublished = $isPublished;

        return $this;
    }
}
