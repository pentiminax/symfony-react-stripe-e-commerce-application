<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ShoppingCartController extends AbstractController
{
    #[Route('/shopping-cart', name: 'app_shopping_cart')]
    public function index(): Response
    {
        return $this->render('shopping_cart/index.html.twig');
    }
}
