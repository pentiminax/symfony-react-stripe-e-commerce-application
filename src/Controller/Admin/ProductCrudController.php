<?php

namespace App\Controller\Admin;

use App\Entity\Product;
use App\Service\StripeService;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Stripe\Exception\ApiErrorException;
use Symfony\Component\Asset\Package;
use Symfony\Component\Asset\Packages;
use Symfony\Component\Asset\VersionStrategy\EmptyVersionStrategy;
use Symfony\Component\HttpFoundation\UrlHelper;
use Vich\UploaderBundle\Form\Type\VichFileType;

class ProductCrudController extends AbstractCrudController
{
    public function __construct(
        private readonly StripeService $stripeService,
    ) {
    }

    public static function getEntityFqcn(): string
    {
        return Product::class;
    }


    public function configureFields(string $pageName): iterable
    {
        yield TextField::new('name')
            ->setRequired(true);

        yield TextareaField::new('description')
            ->setRequired(true);

        yield BooleanField::new('active');

        yield MoneyField::new('price')
            ->setCurrency('EUR')
            ->setRequired(true);

        yield Field::new('imageFile', 'Image')
            ->setFormType(VichFileType::class)
            ->onlyOnForms();

        yield TextField::new('stripeProductId', 'Identifiant Produit Stripe')
            ->hideWhenCreating();

        yield TextField::new('stripePriceId', 'Identifiant Prix Stripe')
            ->hideWhenCreating();
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

        $stripePrice = $this->stripeService->createPrice($product);

        $product->setStripePriceId($stripePrice->id);

        parent::persistEntity($entityManager, $entityInstance);
    }

    /**
     * @throws ApiErrorException
     */
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        /** @var Product $product */
        $product = $entityInstance;

        $this->stripeService->updateProduct($product);

        parent::updateEntity($entityManager, $entityInstance);
    }
}
