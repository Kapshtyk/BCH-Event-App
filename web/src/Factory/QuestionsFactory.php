<?php

namespace App\Factory;

use App\Entity\Questions;
use App\Repository\QuestionsRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Questions>
 *
 * @method        Questions|Proxy create(array|callable $attributes = [])
 * @method static Questions|Proxy createOne(array $attributes = [])
 * @method static Questions|Proxy find(object|array|mixed $criteria)
 * @method static Questions|Proxy findOrCreate(array $attributes)
 * @method static Questions|Proxy first(string $sortedField = 'id')
 * @method static Questions|Proxy last(string $sortedField = 'id')
 * @method static Questions|Proxy random(array $attributes = [])
 * @method static Questions|Proxy randomOrCreate(array $attributes = [])
 * @method static QuestionsRepository|RepositoryProxy repository()
 * @method static Questions[]|Proxy[] all()
 * @method static Questions[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Questions[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Questions[]|Proxy[] findBy(array $attributes)
 * @method static Questions[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Questions[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class QuestionsFactory extends ModelFactory
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
            'answer' => self::faker()->text(),
            'isPublished' => self::faker()->boolean(),
            'question' => self::faker()->text(255),
            'author' => EventsFactory::new()
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Questions $questions): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Questions::class;
    }
}
