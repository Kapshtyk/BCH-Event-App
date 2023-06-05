<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CommentsRepository;
use Carbon\Carbon;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CommentsRepository::class)]
#[ApiResource(
    operations: [
            new Get(),
            new GetCollection(),
            new Post(),
            new Patch(
                denormalizationContext: ['groups' => ['comments:patch']]
            ),
            new Delete()
        ],
    order: ['createdAt' => 'DESC'],
    normalizationContext: ['groups' => ['comments:read']],
    denormalizationContext: ['groups' => ['comments:write']]
)]
#[ApiFilter(BooleanFilter::class, properties: ['isPublished'])]
class Comments
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['comments:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['comments:read', 'comments:write'])]
    private ?Events $event = null;
    
    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['users:write', 'comments:write', 'comments:read', 'events:read'])]
    private ?User $author = null;
    
    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['users:read', 'events:read', 'comments:write', 'comments:read', 'comments:patch'])]
    private ?string $text = null;
    
    #[ORM\Column]
    #[Groups(['users:read', 'events:read', 'comments:read',])]
    private ?\DateTimeImmutable $createdAt = null;
    
    #[ORM\Column]
    #[Groups(['users:read', 'events:read', 'comments:read', 'comments:patch'])]
    private bool $isPublished = true;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEvent(): ?Events
    {
        return $this->event;
    }

    public function setEvent(?Events $event): self
    {
        $this->event = $event;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
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

    #[Groups(['comments:read', 'events:read'])]
    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    #[Groups(['users:read', 'events:read', 'comments:write', 'comments:read'])]
    public function getCreatedAtAgo(): string
    {
        return Carbon::instance($this->createdAt)->diffForHumans();
    }

    public function setPublishDate(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

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
