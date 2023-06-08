<?php

namespace App\Controller\Admin;

use App\Entity\PollsChoices;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;

use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;

use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;

use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;


class PollsChoicesCrudController extends AbstractCrudController
{

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Poll Choice')
            ->setEntityLabelInPlural('Poll Choices');
            // ->setSearchFields(['author', 'text', 'email']);
            // ->setDefaultSort(['createdAt' => 'DESC']);
    }
   

    public static function getEntityFqcn(): string
    {
        return PollsChoices::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            yield IntegerField::new('id')->onlyOnIndex(),
            yield AssociationField::new('question'),
            yield IntegerField::new('votes'),
            yield TextField::new('choice')
        ];
    }

   
}
