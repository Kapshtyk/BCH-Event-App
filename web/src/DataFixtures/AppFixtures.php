<?php

namespace App\DataFixtures;

use App\Factory\AdminFactory;
use App\Factory\CommentsFactory;
use App\Factory\EventsFactory;
use App\Factory\QuestionsFactory;
use App\Factory\RolesFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        AdminFactory::createOne();
        EventsFactory::createMany(20);
        CommentsFactory::createMany(40, function() {
            return [
                'author' => UserFactory::random(),
                'event' => EventsFactory::random()
            ];
        });
        QuestionsFactory::createMany(15,function() {
            return [
                'author' => UserFactory::random()
            ];
        });
    }
}
