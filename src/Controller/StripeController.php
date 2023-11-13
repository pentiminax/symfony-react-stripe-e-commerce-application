<?php

namespace App\Controller;

use App\Service\SessionService;
use App\Service\StripeService;
use Stripe\Exception\ApiErrorException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{
    /**
     * @throws ApiErrorException
     */
    #[Route('/stripe/checkout-sessions', name: 'app_stripe', methods: ['GET'])]
    public function index(StripeService $stripeService, SessionService $sessionService): Response
    {
        return $this->json([
            'url' => $stripeService->createCheckoutSession($sessionService->getShoppingCart())->url
        ]);
    }
}
