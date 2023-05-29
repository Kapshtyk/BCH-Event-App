<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PollsQuestionsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PollsQuestionsRepository::class)]
#[ApiResource]
class PollsQuestions
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $question = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\OneToMany(mappedBy: 'question', targetEntity: PollsChoices::class, orphanRemoval: true)]
    private Collection $pollsChoices;

    #[ORM\OneToMany(mappedBy: 'question', targetEntity: PollsVotes::class, orphanRemoval: true)]
    private Collection $pollsVotes;

    public function __construct()
    {
        $this->pollsChoices = new ArrayCollection();
        $this->pollsVotes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): self
    {
        $this->question = $question;

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

    /**
     * @return Collection<int, PollsChoices>
     */
    public function getPollsChoices(): Collection
    {
        return $this->pollsChoices;
    }

    public function addPollsChoice(PollsChoices $pollsChoice): self
    {
        if (!$this->pollsChoices->contains($pollsChoice)) {
            $this->pollsChoices->add($pollsChoice);
            $pollsChoice->setQuestion($this);
        }

        return $this;
    }

    public function removePollsChoice(PollsChoices $pollsChoice): self
    {
        if ($this->pollsChoices->removeElement($pollsChoice)) {
            // set the owning side to null (unless already changed)
            if ($pollsChoice->getQuestion() === $this) {
                $pollsChoice->setQuestion(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PollsVotes>
     */
    public function getPollsVotes(): Collection
    {
        return $this->pollsVotes;
    }

    public function addPollsVote(PollsVotes $pollsVote): self
    {
        if (!$this->pollsVotes->contains($pollsVote)) {
            $this->pollsVotes->add($pollsVote);
            $pollsVote->setQuestion($this);
        }

        return $this;
    }

    public function removePollsVote(PollsVotes $pollsVote): self
    {
        if ($this->pollsVotes->removeElement($pollsVote)) {
            // set the owning side to null (unless already changed)
            if ($pollsVote->getQuestion() === $this) {
                $pollsVote->setQuestion(null);
            }
        }

        return $this;
    }
}