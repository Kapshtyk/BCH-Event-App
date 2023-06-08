<?php

namespace App\DataFixtures;

use App\Factory\AdminFactory;
use App\Factory\CommentsFactory;
use App\Factory\EventsFactory;
use App\Factory\PollsChoicesFactory;
use App\Factory\PollsQuestionsFactory;
use App\Factory\QuestionsFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        EventsFactory::createMany(20);
        PollsQuestionsFactory::createMany(7, function() {
            return [
                'event' => EventsFactory::random()
            ];
        });
        AdminFactory::createOne();
        UserFactory::createMany(15);
        CommentsFactory::createMany(40, function() {
            return [
                'author' => UserFactory::random(),
                'event' => EventsFactory::random()
            ];
        });
        PollsChoicesFactory::new()->createMany(21, function() {
            return [
                'question' => PollsQuestionsFactory::random()
            ];
        });
    }
}
