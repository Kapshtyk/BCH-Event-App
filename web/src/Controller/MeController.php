<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class MeController extends AbstractController
{
    private $jwtTokenManager;

    public function __construct(JWTTokenManagerInterface $jwtTokenManager)
    {
        $this->jwtTokenManager = $jwtTokenManager;
    }

    #[Route("/api/check-token", name: "check_token", methods: ["POST"])]
    public function checkToken(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user instanceof UserInterface) {
            throw new AuthenticationException('Invalid JWT token');
        }

        $userId = $user->getId();

        $this->jwtTokenManager->create($user);

        return $this->json([
            'id' => $userId,
            'roles' => $user->getRoles(),
        ]);
    }
}
