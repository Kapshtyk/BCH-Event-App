<?php

namespace App\Factory;

use App\Entity\PollsQuestions;
use App\Repository\PollsQuestionsRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<PollsQuestions>
 *
 * @method        PollsQuestions|Proxy create(array|callable $attributes = [])
 * @method static PollsQuestions|Proxy createOne(array $attributes = [])
 * @method static PollsQuestions|Proxy find(object|array|mixed $criteria)
 * @method static PollsQuestions|Proxy findOrCreate(array $attributes)
 * @method static PollsQuestions|Proxy first(string $sortedField = 'id')
 * @method static PollsQuestions|Proxy last(string $sortedField = 'id')
 * @method static PollsQuestions|Proxy random(array $attributes = [])
 * @method static PollsQuestions|Proxy randomOrCreate(array $attributes = [])
 * @method static PollsQuestionsRepository|RepositoryProxy repository()
 * @method static PollsQuestions[]|Proxy[] all()
 * @method static PollsQuestions[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static PollsQuestions[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static PollsQuestions[]|Proxy[] findBy(array $attributes)
 * @method static PollsQuestions[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static PollsQuestions[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class PollsQuestionsFactory extends ModelFactory
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
            'createdAt' => \DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'question' => self::faker()->text(75),
            'event' => EventsFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(PollsQuestions $pollsQuestions): void {})
        ;
    }

    protected static function getClass(): string
    {
        return PollsQuestions::class;
    }
}
