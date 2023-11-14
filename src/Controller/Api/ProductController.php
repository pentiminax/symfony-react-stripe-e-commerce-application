<?php

namespace App\Controller\Api;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ProductController extends AbstractController
{
    public function __construct(
        private readonly ProductRepository $productRepository
    ){
    }

    /**
     * @throws ExceptionInterface
     */
    #[Route('/api/products', name: 'api_products', methods: ['GET'])]
    public function getProducts(NormalizerInterface $normalizer): Response
    {
        $products = $this->productRepository->findAll();

        $serializedProducts = $normalizer->normalize($products, 'json', [
            'groups' => 'product:read'
        ]);

        return $this->json($serializedProducts);
    }
}