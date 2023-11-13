<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use App\Service\SessionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SessionController extends AbstractController
{
    public function __construct(
        private readonly SessionService $sessionService
    ) {
    }

    #[Route('/session/shopping-cart/{id}', name: 'app_session_add_to_shopping_cart', methods: ['POST'])]
    public function addToShoppingCart(?Product $product): Response
    {
        $this->sessionService->addToShoppingCart($product);

        return $this->json($this->sessionService->getShoppingCart());
    }

    #[Route('/session/shopping-cart', name: 'app_session_get_shopping_cart', methods: ['GET'])]
    public function getShoppingCart(): Response
    {
        return $this->json($this->sessionService->getShoppingCart());
    }

    #[Route('/session/shopping-cart/{id}', name: 'app_session_remove_from_shopping_cart', methods: ['DELETE'])]
    public function removeFromShoppingCart(?Product $product): Response
    {
        $this->sessionService->removeFromShoppingCart($product);

        return $this->json($this->sessionService->getShoppingCart());
    }
}