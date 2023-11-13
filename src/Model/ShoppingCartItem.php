<?php

namespace App\Model;

use App\Entity\Product;

class ShoppingCartItem
{
    public function __construct(
        public Product $product,
        public int $quantity
    ) {
    }
}