<?php

namespace App\Controller\Admin;

use App\Entity\PollsVotes;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;


use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;

use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;


class PollsVotesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PollsVotes::class;
    }

   

    
    public function configureFields(string $pageName): iterable
    {
        return [
            yield TextField::new('question'),
            yield IntegerField::new('id'),
            yield TextField::new('choice'),
            yield AssociationField::new('question'),
            yield IntegerField::new('votes'),


            yield TextField::new('author')
        ];
    }
    
}
