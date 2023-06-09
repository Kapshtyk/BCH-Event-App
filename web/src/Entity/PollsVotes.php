<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\PollsVotesRepository;
use App\State\PollsVotesStateProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: PollsVotesRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post()
    ],
    processor: PollsVotesStateProcessor::class,
)]
#[ApiFilter(SearchFilter::class, properties: [
    'question' => 'exact',
    'author' => 'exact'
])]
#[UniqueEntity(
    fields: ["author", "choice"],
    message: "The combination of answer and user must be unique.")]
#[UniqueEntity(
    fields: ["author", "question"],
    message: "The combination of poll and user must be unique.")]
class PollsVotes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'pollsVotes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?PollsQuestions $question = null;

    #[ORM\ManyToOne(inversedBy: 'pollsVotes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?PollsChoices $choice = null;

    #[ORM\ManyToOne(inversedBy: 'pollsVotes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getChoice(): ?PollsChoices
    {
        return $this->choice;
    }

    public function setChoice(?PollsChoices $choice): self
    {
        $this->choice = $choice;

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
}
