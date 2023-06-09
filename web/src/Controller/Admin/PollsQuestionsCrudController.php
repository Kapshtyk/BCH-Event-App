<?php

namespace App\Controller\Admin;


use App\Entity\PollsQuestions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;


class PollsQuestionsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PollsQuestions::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('poll')
            ->setEntityLabelInPlural('Polls')
            // ->setSearchFields(['author', 'text', 'email'])
            ->setDefaultSort(['createdAt' => 'DESC']);
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')->onlyOnIndex(),
            yield TextareaField::new('question'),
            // yield AssociationField::new('pollsChoices'),
            
            // yield IntegerField::new('pollsVotes')->onlyOnIndex(),
            yield AssociationField::new('event')->setFormTypeOption('required', false),
            yield DateTimeField::new('createdAt')->onlyOnIndex(),
            yield BooleanField::new('isPublished')
            
        ];
    }

    
}
