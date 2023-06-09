<?php

namespace App\Controller\Admin;

use App\Entity\Events;
use App\Entity\Comments;
use App\Entity\EventsUsers;
use App\Entity\PollsChoices;
use App\Entity\PollsQuestions;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

     $routeBuilder = $this->container->get(AdminUrlGenerator::class);
     $url = $routeBuilder->setController(EventCrudController::class)->generateUrl();
     return $this->redirect($url);

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        // $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        // return $this->redirect($adminUrlGenerator->setController(OneOfYourCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Web');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        // yield MenuItem::linkToCrud('The Label', 'fas fa-list', EntityClass::class);
        // yield MenuItem::linktoRoute('Go to homepage', 'fas fa-home', 'homepage');
        yield MenuItem::linkToCrud('Users', 'fas fa-user', User::class);
        yield MenuItem::linkToCrud('Comments', 'fas fa-comments', Comments::class);
        yield MenuItem::linkToCrud('Events', 'fas fa-map-marker-alt', Events::class);
        // yield MenuItem::linkToCrud('Questions', 'fas fa-question', Questions::class);
        yield MenuItem::linkToCrud('Polls', 'fas fa-question-circle', PollsQuestions::class);
        // yield MenuItem::linkToCrud('Polls votes', 'fas fa-vote-yea', PollsVotes::class);
        yield MenuItem::linkToCrud('Polls\' responce options', 'fas fa-check-square', PollsChoices::class);
        yield MenuItem::linkToCrud('Participants of the events', 'fas fa-registered', EventsUsers::class);

    }
}
