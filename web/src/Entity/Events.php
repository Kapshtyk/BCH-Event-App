<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\EventsRepository;
use Carbon\Carbon;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EventsRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ],
    order: ['eventDate' => 'DESC'],
    normalizationContext: ['groups' => ['events:read']],
    denormalizationContext: ['groups' => ['events:write']]
)]
#[ApiFilter(BooleanFilter::class, properties: ['isPublished'])]
class Events
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['events:read', 'registration:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['events:read', 'events:write', 'registration:read'])]
    private ?string $title = null;
    
    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    #[Groups(['events:read', 'events:write'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['events:read', 'events:write', 'registration:read'])]
    #[Assert\NotBlank]
    #[Assert\DateTimeValidator]
    private ?\DateTimeInterface $eventDate = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['events:read', 'events:write'])]
    private ?string $location = null;

    #[ORM\OneToMany(mappedBy: 'event', targetEntity: Comments::class, orphanRemoval: true)]
    #[Groups(['events:read'])]
    private Collection $comments;

    #[ORM\Column]
    #[Groups(['events:read', 'events:write'])]
    private bool $isPublished = true;

    #[ORM\Column]
    private bool $isInternational = false;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\OneToMany(mappedBy: 'event', targetEntity: EventsUsers::class, orphanRemoval: true)]
    private Collection $eventsUsers;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\OneToMany(mappedBy: 'event', targetEntity: PollsQuestions::class)]
    private Collection $pollsQuestions;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->eventsUsers = new ArrayCollection();
        $this->pollsQuestions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getEventDate(): ?\DateTimeInterface
    {
        return $this->eventDate;
    }

    public function setEventDate(\DateTimeInterface $eventDate): self
    {
        $this->eventDate = $eventDate;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): self
    {
        $this->location = $location;

        return $this;
    }

    /**
     * @return Collection<int, Comments>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comments $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setEvent($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getEvent() === $this) {
                $comment->setEvent(null);
            }
        }

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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function isIsInternational(): ?bool
    {
        return $this->isInternational;
    }

    public function setIsInternational(bool $isInternational): self
    {
        $this->isInternational = $isInternational;

        return $this;
    }

    public function __toString()
    {
        return $this->title;
    }

    /**
     * @return Collection<int, EventsUsers>
     */
    public function getEventsUsers(): Collection
    {
        return $this->eventsUsers;
    }

    public function addEventsUser(EventsUsers $eventsUser): self
    {
        if (!$this->eventsUsers->contains($eventsUser)) {
            $this->eventsUsers->add($eventsUser);
            $eventsUser->setEvent($this);
        }

        return $this;
    }

    public function removeEventsUser(EventsUsers $eventsUser): self
    {
        if ($this->eventsUsers->removeElement($eventsUser)) {
            // set the owning side to null (unless already changed)
            if ($eventsUser->getEvent() === $this) {
                $eventsUser->setEvent(null);
            }
        }

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        if (!$this->image) {
            return null;
        }

        if (strpos($this->image, '/') !== false) {
            return $this->image;
        }

        return sprintf('/var/www/web/public/uploads/images/%s', $this->image);
    }

    #[Groups(['events:read', 'events:write'])]
    public function getBaseImage()
    {
        $imageUrl = $this->getImageUrl();
        
        if ($imageUrl) {
            $imageContent = file_get_contents($imageUrl);
            $base64Image = base64_encode($imageContent);
            return $base64Image;
        }
    }

    /**
     * @return Collection<int, PollsQuestions>
     */
    public function getPollsQuestions(): Collection
    {
        return $this->pollsQuestions;
    }

    public function addPollsQuestion(PollsQuestions $pollsQuestion): self
    {
        if (!$this->pollsQuestions->contains($pollsQuestion)) {
            $this->pollsQuestions->add($pollsQuestion);
            $pollsQuestion->setEvent($this);
        }

        return $this;
    }

    public function removePollsQuestion(PollsQuestions $pollsQuestion): self
    {
        if ($this->pollsQuestions->removeElement($pollsQuestion)) {
            // set the owning side to null (unless already changed)
            if ($pollsQuestion->getEvent() === $this) {
                $pollsQuestion->setEvent(null);
            }
        }

        return $this;
    }
};
