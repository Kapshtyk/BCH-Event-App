<?php

namespace App\Controller\Admin;

use App\Entity\User;
// use App\Entity\Users;


use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

// class UsersCrudController extends AbstractCrudController
class UserCrudController extends AbstractCrudController

{
    public static function getEntityFqcn(): string
    {
        // return Users::class;
        return User::class;

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
