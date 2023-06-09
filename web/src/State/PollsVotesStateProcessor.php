<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\PollsChoices;
use App\Entity\PollsVotes;

class PollsVotesStateProcessor implements ProcessorInterface
{
    public function __construct(private ProcessorInterface $persistProcessor)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        if ($data instanceof PollsVotes && $data->getChoice() !== null) {
            $data->getChoice()->setVotes($data->getChoice()->getVotes() + 1);
        }
        $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        $this->incrementVotes($data->getChoice());
    }

    public function incrementVotes(PollsChoices $choice) {
        $choice->setVotes($choice->getVotes() + 1);
    }
}
