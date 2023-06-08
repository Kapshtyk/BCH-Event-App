<?php

namespace App\Controller\Admin;

use App\Entity\Events;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class EventCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Events::class;
    }

    public function configureFields(string $pageName): iterable
    {

        yield IdField::new ('id')->hideOnForm();
        yield TextField::new ('title');
        yield TextField::new ('description');
        yield TextField::new ('location');
        yield BooleanField::new ('isPublished');
        yield BooleanField::new ('isInternational');
        yield DateTimeField::new ('eventDate');
        yield DateTimeField::new ('createdAt')->hideOnForm();
        yield ImageField::new ('image')->setBasePath('uploads/images')
        ->setUploadDir('public/uploads/images')
        ->setUploadedFileNamePattern('[slug]-[timestamp].[extension]');
        yield AssociationField::new ('pollsQuestions')->onlyOnIndex();
    }

}
