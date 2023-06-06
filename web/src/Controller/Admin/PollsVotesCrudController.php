<?php

namespace App\Controller\Admin;

use App\Entity\PollsVotes;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PollsVotesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PollsVotes::class;
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
