<?php

namespace App\Controller\Admin;

use ApiPlatform\Api\QueryParameterValidator\Validator\ArrayItems;
use App\Entity\PollsQuestions;
use ArrayIterator;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;

use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;
use Symfony\Component\Form\ChoiceList\ChoiceList;

class PollsQuestionsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PollsQuestions::class;
    }



    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            // ->setEntityLabelInSingular('Event Comment')
            // ->setEntityLabelInPlural('Event Comments')
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
            yield AssociationField::new('event'),
            yield DateTimeField::new('createdAt')->onlyOnIndex(),
            yield BooleanField::new('isPublished')
            
        ];
    }

    
}
