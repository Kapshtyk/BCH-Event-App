<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PollsChoicesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PollsChoicesRepository::class)]
#[ApiResource]
class PollsChoices
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $choice = null;

    #[ORM\Column]
    private ?int $votes = null;

    #[ORM\ManyToOne(inversedBy: 'pollsChoices')]
    #[ORM\JoinColumn(nullable: false)]
    private ?PollsQuestions $question = null;

    #[ORM\OneToMany(mappedBy: 'choice', targetEntity: PollsVotes::class, orphanRemoval: true)]
    private Collection $pollsVotes;

    public function __construct()
    {
        $this->pollsVotes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChoice(): ?string
    {
        return $this->choice;
    }

    public function setChoice(string $choice): self
    {
        $this->choice = $choice;

        return $this;
    }

    public function getVotes(): ?int
    {
        return $this->votes;
    }

    public function setVotes(int $votes): self
    {
        $this->votes = $votes;

        return $this;
    }

    public function getQuestion(): ?PollsQuestions
    {
        return $this->question;
    }

    public function setQuestion(?PollsQuestions $question): self
    {
        $this->question = $question;

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
            $pollsVote->setChoice($this);
        }

        return $this;
    }

    public function removePollsVote(PollsVotes $pollsVote): self
    {
        if ($this->pollsVotes->removeElement($pollsVote)) {
            // set the owning side to null (unless already changed)
            if ($pollsVote->getChoice() === $this) {
                $pollsVote->setChoice(null);
            }
        }

        return $this;
    }
}
