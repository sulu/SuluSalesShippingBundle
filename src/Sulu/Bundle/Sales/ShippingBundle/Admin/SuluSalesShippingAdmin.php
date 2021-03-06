<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\Sales\ShippingBundle\Admin;

use Sulu\Bundle\AdminBundle\Admin\Admin;
use Sulu\Bundle\AdminBundle\Navigation\Navigation;
use Sulu\Bundle\AdminBundle\Navigation\NavigationItem;

class SuluSalesShippingAdmin extends Admin
{

    public function __construct($title)
    {
        $rootNavigationItem = new NavigationItem($title);

        $section = new NavigationItem('');

        $sales = new NavigationItem('navigation.sales');
        $sales->setIcon('shopping-cart');
        $section->addChild($sales);

        $shipping = new NavigationItem('navigation.sales.shipping');
        $shipping->setAction('sales/shippings');
        $sales->addChild($shipping);

        $rootNavigationItem->addChild($section);
        $this->setNavigation(new Navigation($rootNavigationItem));
    }

    /**
     * {@inheritdoc}
     */
    public function getCommands()
    {
        return array();
    }

    /**
     * {@inheritdoc}
     */
    public function getJsBundleName()
    {
        return 'sulusalesshipping';
    }
}
