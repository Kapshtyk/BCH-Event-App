<?php

namespace App\Factory;

use App\Entity\Events;
use App\Repository\EventsRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Events>
 *
 * @method        Events|Proxy create(array|callable $attributes = [])
 * @method static Events|Proxy createOne(array $attributes = [])
 * @method static Events|Proxy find(object|array|mixed $criteria)
 * @method static Events|Proxy findOrCreate(array $attributes)
 * @method static Events|Proxy first(string $sortedField = 'id')
 * @method static Events|Proxy last(string $sortedField = 'id')
 * @method static Events|Proxy random(array $attributes = [])
 * @method static Events|Proxy randomOrCreate(array $attributes = [])
 * @method static EventsRepository|RepositoryProxy repository()
 * @method static Events[]|Proxy[] all()
 * @method static Events[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Events[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Events[]|Proxy[] findBy(array $attributes)
 * @method static Events[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Events[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class EventsFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'created_at' => \DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'description' => self::faker()->text(),
            'eventDate' => self::faker()->dateTimeThisYear(),
            'isPublished' => self::faker()->boolean(),
            'location' => self::faker()->text(50),
            'title' => self::faker()->text(255),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Events $events): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Events::class;
    }
}
