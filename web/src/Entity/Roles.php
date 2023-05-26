<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RolesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RolesRepository::class)]
#[ApiResource]
class Roles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['users:read'])]
    private ?string $roleName = null;

    #[ORM\OneToMany(mappedBy: 'role', targetEntity: User::class, orphanRemoval: true)]
    private Collection $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRoleName(): ?string
    {
        return $this->roleName;
    }

    public function setRoleName(string $roleName): self
    {
        $this->roleName = $roleName;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

        /* public function addUser(User $user): self
        {
            if (!$this->users->contains($user)) {
                $this->users->add($user);
                $user->setRole($this);
            }

            return $this;
        }

        public function removeUser(User $user): self
        {
            if ($this->users->removeElement($user)) {
                // set the owning side to null (unless already changed)
                if ($user->getRole() === $this) {
                    $user->setRole(null);
                }
            }

            return $this;
        } */
}
