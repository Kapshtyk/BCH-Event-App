<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UsersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['users:read']],
    denormalizationContext: ['groups' => ['users:write']]
)]
class Users
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['users:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['users:read', 'users:write', 'comments:read', 'events:read'])]
    #[Assert\NotBlank]
    private ?string $firstname = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['users:read', 'users:write', 'events:read', 'comments:read'])]
    #[Assert\NotBlank]
    private ?string $lastname = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['users:read', 'users:write'])]
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['users:write'])]
    #[Assert\NotBlank]
    private ?string $password = null;
    
    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Comments::class, orphanRemoval: true)]
    #[Groups(['users:read'])]
    private Collection $comments;
    
    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['users:read', 'users:write'])]
    private ?Roles $role = null;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Questions::class)]
    private Collection $questions;

    public function __construct()
{
    $this->comments = new ArrayCollection();
    $this->questions = new ArrayCollection();
}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

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
            $comment->setAuthor($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getAuthor() === $this) {
                $comment->setAuthor(null);
            }
        }

        return $this;
    }

    public function getRole(): ?Roles
    {
        return $this->role;
    }

    public function setRole(?Roles $role): self
    {
        $this->role = $role;

        return $this;
    }

    /**
     * @return Collection<int, Questions>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Questions $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions->add($question);
            $question->setAuthor($this);
        }

        return $this;
    }

    public function removeQuestion(Questions $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getAuthor() === $this) {
                $question->setAuthor(null);
            }
        }

        return $this;
    }
}
