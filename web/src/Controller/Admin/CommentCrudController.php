<?php

namespace App\Controller\Admin;


use App\Entity\Comment;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Filter\EntityFilter;

class CommentCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
        {
            return Comment::class;
        }


    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Event Comment')
            ->setEntityLabelInPlural('Event Comments')
            ->setSearchFields(['author', 'text', 'email'])
            ->setDefaultSort(['createdAt' => 'DESC']);
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add(EntityFilter::new('event'));
    }

    public function configureFields(string $pageName): iterable
    {

        yield AssociationField::new('event');
        yield TextField::new('author');
        yield EmailField::new('email');
        yield TextareaField::new('text')
            ->hideOnIndex();
        // yield TextField::new('photoFilename')
        //     ->onlyOnIndex();

        $createdAt = DateTimeField::new('createdAt')->setFormTypeOptions([
            'years' => range(date('Y'), date('Y') + 5),
            'widget' => 'single_text',
        ]);
        if (Crud::PAGE_EDIT === $pageName) {
            yield $createdAt->setFormTypeOption('disabled', true);
        } else {
            yield $createdAt;
        }
    }
}
    

// class CommentCrudController extends AbstractCrudController
// {
//     public static function getEntityFqcn(): string
//     {
//         return Comment::class;
//     }

//     /*
//     public function configureFields(string $pageName): iterable
//     {
//         return [
//             IdField::new('id'),
//             TextField::new('title'),
//             TextEditorField::new('description'),
//         ];
//     }
//     */
//     public function configureFields(string $pageName): iterable
//         {
//             $fields = parent::configureFields($pageName);
//             $fields[] = AssociationField::new('event');
//             return $fields;
        
//         }
// }
