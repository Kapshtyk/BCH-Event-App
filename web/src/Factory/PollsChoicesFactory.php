<?php

namespace App\Factory;

use App\Entity\PollsChoices;
use App\Repository\PollsChoicesRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<PollsChoices>
 *
 * @method        PollsChoices|Proxy create(array|callable $attributes = [])
 * @method static PollsChoices|Proxy createOne(array $attributes = [])
 * @method static PollsChoices|Proxy find(object|array|mixed $criteria)
 * @method static PollsChoices|Proxy findOrCreate(array $attributes)
 * @method static PollsChoices|Proxy first(string $sortedField = 'id')
 * @method static PollsChoices|Proxy last(string $sortedField = 'id')
 * @method static PollsChoices|Proxy random(array $attributes = [])
 * @method static PollsChoices|Proxy randomOrCreate(array $attributes = [])
 * @method static PollsChoicesRepository|RepositoryProxy repository()
 * @method static PollsChoices[]|Proxy[] all()
 * @method static PollsChoices[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static PollsChoices[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static PollsChoices[]|Proxy[] findBy(array $attributes)
 * @method static PollsChoices[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static PollsChoices[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class PollsChoicesFactory extends ModelFactory
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
            'choice' => self::faker()->text(25),
            'question' => PollsQuestionsFactory::new(),
            'votes' => 0,
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(PollsChoices $pollsChoices): void {})
        ;
    }

    protected static function getClass(): string
    {
        return PollsChoices::class;
    }
}
