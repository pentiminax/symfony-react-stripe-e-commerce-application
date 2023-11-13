<?php

namespace App\Model;

use Doctrine\Common\Collections\ArrayCollection;

class ShoppingCart
{
    public function __construct(
        public ArrayCollection $items = new ArrayCollection()
    ) {
    }
}