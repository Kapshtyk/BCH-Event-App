<?php

namespace App\DataFixtures;

use App\Factory\CommentsFactory;
use App\Factory\EventsFactory;
use App\Factory\RolesFactory;
use App\Factory\UsersFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        RolesFactory::createMany(3);
        UsersFactory::createMany(15, function() {
            return [
                'role' => RolesFactory::random()
            ];
        });
        EventsFactory::createMany(20);
        CommentsFactory::createMany(40, function() {
            return [
                'author' => UsersFactory::random(),
                'event' => EventsFactory::random()
            ];
        });
    }
}
