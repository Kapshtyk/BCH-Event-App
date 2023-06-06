<?php

namespace App\Controller\Admin;

use App\Entity\PollsQuestions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PollsQuestionsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PollsQuestions::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
