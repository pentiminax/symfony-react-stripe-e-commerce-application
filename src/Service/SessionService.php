<?php

namespace App\Service;

use App\Entity\Product;
use App\Model\ShoppingCart;
use App\Model\ShoppingCartItem;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

readonly class SessionService
{
    public const SHOPPING_CART = 'shoppingCart';

    public function __construct(
        private RequestStack $requestStack
    ) {
    }

    public function getShoppingCart(): ShoppingCart
    {
        return $this->getSession()->get(self::SHOPPING_CART, new ShoppingCart());
    }

    public function addToShoppingCart(Product $product, int $quantity = 1): void
    {
        $shoppingCart = $this->getShoppingCart();

        $existingShoppingCardItem = $this->getExistingShoppingCardItem($product);

        if ($existingShoppingCardItem) {
            $existingShoppingCardItem->quantity += $quantity;
        } else {
            $shoppingCart->items->add(new ShoppingCartItem($product, $quantity));
        }

        $this->getSession()->set(self::SHOPPING_CART, $shoppingCart);
    }

    public function removeFromShoppingCart(Product $product): void
    {
        $shoppingCart = $this->getShoppingCart();

        $existingShoppingCardItem = $this->getExistingShoppingCardItem($product);

        if (!$existingShoppingCardItem) {
            return;
        }

        $shoppingCart->items->removeElement($existingShoppingCardItem);

        $reindexedItems = array_values($shoppingCart->items->toArray());
        $shoppingCart->items = new ArrayCollection($reindexedItems);

        $this->getSession()->set(self::SHOPPING_CART, $shoppingCart);
    }


    private function getSession(): SessionInterface
    {
        return $this->requestStack->getSession();
    }

    private function getExistingShoppingCardItem(Product $product): ?ShoppingCartItem
    {
        $existingShoppingCardItem = $this
            ->getShoppingCart()
            ->items
            ->filter(fn (ShoppingCartItem $item) => $item->product->getId() === $product->getId())
            ->first();

        if (!$existingShoppingCardItem) {
            return null;
        }

        return $existingShoppingCardItem;
    }
}