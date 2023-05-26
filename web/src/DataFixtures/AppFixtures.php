<?php

namespace App\DataFixtures;

use App\Factory\CommentFactory;
use App\Factory\EventFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        EventFactory::createOne();
        CommentFactory::createMany(15);
        UserFactory::createOne();

    }
}
