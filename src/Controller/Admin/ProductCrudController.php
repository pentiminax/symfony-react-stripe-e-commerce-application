<?php

namespace App\Controller\Admin;

use App\Entity\Product;
use App\Service\StripeService;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Stripe\Exception\ApiErrorException;
use Vich\UploaderBundle\Form\Type\VichFileType;

class ProductCrudController extends AbstractCrudController
{
    public function __construct(
        private readonly StripeService $stripeService
    ) {
    }

    public static function getEntityFqcn(): string
    {
        return Product::class;
    }


    public function configureFields(string $pageName): iterable
    {
        yield TextField::new('name');
        yield TextareaField::new('description');
        yield BooleanField::new('active');

        yield MoneyField::new('price')
        ->setCurrency('EUR');

        yield Field::new('imageFile', 'Image')
            ->setFormType(VichFileType::class)
            ->onlyOnForms();

        yield TextField::new('stripeProductId', 'Identifiant Produit Stripe');
        yield TextField::new('stripePriceId', 'Identifiant Prix Stripe');
    }

    /**
     * @throws ApiErrorException
     */
    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        /** @var Product $product */
        $product = $entityInstance;

        $stripeProduct = $this->stripeService->createProduct($product);

        $product->setStripeProductId($stripeProduct->id);

        $this->stripeService->createPrice($product);

        parent::persistEntity($entityManager, $entityInstance);
    }
}
