<?php

namespace App\Tests\Functional;

use App\Factory\EventsFactory;
use App\Factory\UserFactory;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Validator\Constraints\Json;
use Zenstruck\Browser\HttpOptions;
use Zenstruck\Browser\Test\HasBrowser;
use Zenstruck\Foundry\Test\ResetDatabase;
use function PHPUnit\Framework\assertJson;

class EventResourceTest extends KernelTestCase {
  use HasBrowser;
  use ResetDatabase;

  public function testGetCollectionOfEvents(): void
    {
      EventsFactory::createMany(5);

      $json = $this->browser()
            ->get('/api/v1/events')
            ->assertJson()
            ->assertJsonMatches('"hydra:totalItems"', 5)
            ->json(); 
      
      $json->assertMatches('keys("hydra:member"[0])', ['@id', '@type', 'id', 'title', 'description', 'eventDate', 'location', 'comments', 'isPublished']);
    }
  
    public function testPostToCreateTreasure(): void
    {
        $user = UserFactory::createOne();
        $this->browser()
            ->actingAs($user)
            ->post('/api/events', [
                'json' => [],
            ])
            ->assertStatus(422)
            ->dump()
        ;
    }
}
