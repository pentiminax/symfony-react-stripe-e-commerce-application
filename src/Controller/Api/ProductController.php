<?php

namespace App\Controller\Api;

use App\Repository\ProductRepository;
use App\Service\SessionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ProductController extends AbstractController
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly SessionService $sessionService
    )
    {
    }

    /**
     * @throws ExceptionInterface
     */
    #[Route('/api/products', name: 'api_products', methods: ['GET'])]
    public function getProducts(Request $request, NormalizerInterface $normalizer): Response
    {
        $inShoppingCart = $request->query->getBoolean('inShoppingCart');

        if ($inShoppingCart) {
            $products = $this->productRepository->findBy(['id' => $this->sessionService->getShoppingCartProductIds()]);
        } else {
            $products = $this->productRepository->findAll();
        }

        $serializedProducts = $normalizer->normalize($products, 'json', [
            'groups' => 'product:read'
        ]);

        return $this->json($serializedProducts);
    }
}