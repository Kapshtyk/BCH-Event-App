<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Comments;
use Doctrine\ORM\EntityManagerInterface;
use WebSocket\Client;


class CommentsStateProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $persistProcessor,
        private EntityManagerInterface $entityManager,
        private Comments $entity,
    ) {
    }

    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {    
        $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        $this->sendComments();
        return $result;
    }

    private function sendComments()
    {
       $comments = $this->entityManager->getRepository(Comments::class)->findAll();
       $client = new Client('ws://localhost:8080');

       

       foreach ($comments as $comment) {
        $message = $comment->getText();
        $client->send($message);

        $client->close();
    }
}
}
