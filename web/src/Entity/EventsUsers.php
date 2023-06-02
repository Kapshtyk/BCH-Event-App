<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\EventsUsersRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EventsUsersRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['registration:read']],
    denormalizationContext: ['groups' => ['registration:write']],
)]
#[ApiFilter(SearchFilter::class, properties: [
    'user' => 'exact'
])]
#[UniqueEntity(
    fields: ["user", "event"],
    message: "The combination of user and event must be unique.")]
class EventsUsers
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['registration:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'eventsUsers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['registration:read', 'registration:write'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'eventsUsers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['registration:read', 'registration:write'])]
    private ?Events $event = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
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
}
