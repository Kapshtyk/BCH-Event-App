<?php

namespace App\Factory;

use App\Entity\Roles;
use App\Repository\RolesRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Roles>
 *
 * @method        Roles|Proxy create(array|callable $attributes = [])
 * @method static Roles|Proxy createOne(array $attributes = [])
 * @method static Roles|Proxy find(object|array|mixed $criteria)
 * @method static Roles|Proxy findOrCreate(array $attributes)
 * @method static Roles|Proxy first(string $sortedField = 'id')
 * @method static Roles|Proxy last(string $sortedField = 'id')
 * @method static Roles|Proxy random(array $attributes = [])
 * @method static Roles|Proxy randomOrCreate(array $attributes = [])
 * @method static RolesRepository|RepositoryProxy repository()
 * @method static Roles[]|Proxy[] all()
 * @method static Roles[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Roles[]|Proxy[] createSequence(iterable|callable $sequence)
 * @method static Roles[]|Proxy[] findBy(array $attributes)
 * @method static Roles[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static Roles[]|Proxy[] randomSet(int $number, array $attributes = [])
 */
final class RolesFactory extends ModelFactory
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
            'roleName' => self::faker()->titleMale(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Roles $roles): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Roles::class;
    }
}
