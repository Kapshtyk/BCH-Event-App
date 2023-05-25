<?php

namespace App\Factory;

use App\Entity\Comments;
use App\Repository\CommentsRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Comments>
 *
 * @method        Comments|Proxy create(array|callable $attributes = [])
 * @method static Comments|Proxy createOne(array $attributes = [])
 * @method static Comments|Proxy find(object|array|mixed $criteria)
 * @method static Comments|Proxy findOrCreate(array $attributes)
 * @method static Comments|Proxy first(string $sortedField = 'id')
 * @method static Comments|Proxy last(string $sortedField = 'id')
 * @method static Comments|Proxy random(array $attributes = [])
 * @method static Comments|Proxy randomOrCreate(array $attributes = [])
 * @method static CommentsRepository|RepositoryProxy repository()
 * @method static Comments[]|Proxy[] all()
 * @method static Comments[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Comments[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Comments[]|Proxy[] findBy(array $attributes)
 * @method static Comments[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Comments[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class CommentsFactory extends ModelFactory
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
            'author' => UsersFactory::new(),
            'event' => EventsFactory::new(),
            'isPublished' => self::faker()->boolean(),
            'created_at' => \DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'text' => self::faker()->text(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Comments $comments): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Comments::class;
    }
}
