<?php

namespace App\Controller\Admin;

use App\Entity\EventsUsers;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;

class EventsUsersCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return EventsUsers::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('participant')
            ->setEntityLabelInPlural('Events participants')
            ->setSearchFields(['event', 'user']);
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add(EntityFilter::new('event'));
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id'),
            yield AssociationField::new('event')->setFormTypeOption('required', false),
            yield AssociationField::new('user')->setFormTypeOption('required', false),
        ];
    }
   
}
