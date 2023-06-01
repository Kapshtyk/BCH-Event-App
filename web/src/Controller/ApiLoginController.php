<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;



use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

  class ApiLoginController extends AbstractController
  {
      #[Route('/api/login', name: 'api_login')]
     public function index(#[CurrentUser] ?User $user): Response
      {
        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials 2',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = '445...';

          return $this->json([
            'user'  => $user->getId(),
            'token' => $token,
            'roles' => $user->getRoles()
          ]);
      }
  }