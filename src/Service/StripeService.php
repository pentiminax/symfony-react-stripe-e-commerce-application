<?php

namespace App\Service;

use App\Entity\Product;
use App\Model\ShoppingCart;
use App\Model\ShoppingCartItem;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\Price;
use Stripe\StripeClient;

class StripeService
{
    private ?StripeClient $stripe;

    /**
     * @throws ApiErrorException
     */
    public function createProduct(Product $product): \Stripe\Product
    {
        return $this->getStripe()->products->create([
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'active' => $product->isActive(),
        ]);
    }

    /**
     * @throws ApiErrorException
     */
    public function createPrice(Product $product): Price
    {
        return $this->getStripe()->prices->create([
            'unit_amount' => $product->getPrice(),
            'currency' => 'EUR',
            'product' => $product->getStripeProductId()
        ]);
    }

    /**
     * @throws ApiErrorException
     */
    public function createCheckoutSession(ShoppingCart $shoppingCart): Session
    {
        $lineItems = [];

        /**
         * @var ShoppingCartItem $item
         */
        foreach ($shoppingCart->items as $item) {
            $lineItems[] = [
                'price' => $item->product->getStripePriceId(),
                'quantity' => $item->quantity
            ];
        }

        return $this->getStripe()->checkout->sessions->create([
            'currency' => 'EUR',
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => 'https://127.0.0.1:8000/stripe/success?session_id={CHECKOUT_SESSION_ID}',
        ]);
    }

    /**
     * @throws ApiErrorException
     */
    public function getCheckoutSession(string $sessionId): Session
    {
        return $this->getStripe()->checkout->sessions->retrieve($sessionId);
    }

    /**
     * @throws ApiErrorException
     */
    public function updateProduct(Product $product): \Stripe\Product
    {
        return $this->getStripe()->products->update($product->getStripeProductId(), [
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'active' => $product->isActive(),
        ]);
    }

    private function getStripe(): StripeClient
    {
        return $this->stripe ??= new StripeClient(
            $_ENV['STRIPE_API_SECRET']
        );
    }
}